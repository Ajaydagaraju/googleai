// Code of simple text generate 


// 'use client';
// import axios from 'axios';
// import { useState } from 'react';

// export default function Home() {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [error, setError] = useState("")
//   console.log("prompt value ",prompt === "")

//   const handleGenerate = async () => {
//     if(prompt === ""){
//       setError("Enter a search value.")
//     }else{
//     try {
//       const res = await axios.post('/api/generate', {
//         prompt
//       });

//       const data = res.data; 
//       setError("")
//       setResponse(data.result);
//       setPrompt("")
//     } catch (error) {
//       console.error('API request failed:', error);
//       setResponse('Error: ' + error.message);
//       setError("Someting Went Wrong Please try again!")
//     }
//   }
//   };

//   return (
//     <div>
//       <h1>Gemini API Integration</h1>
//       <textarea
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter your prompt"
//       />
//       <button onClick={handleGenerate}>Generate</button>
//       <div>
//         {
//           error && <p className='error' >{error}</p>
//         }
//         <h2>Response:</h2>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// }






// Code with option to add attachements

'use client';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (prompt === "" && !file) {
      setError("Enter a search value or upload a file.");
      return;
    }

    let filePath = '';

    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      try {
        const uploadRes = await axios.post('/api/upload', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        filePath = uploadRes.data.filePath;
      } catch (error) {
        console.error('File upload failed:', error);
        setResponse('Error: ' + error.message);
        setError("File upload failed. Please try again!");
        return;
      }
    }

    try {
      const res = await axios.post('/api/generate', { prompt, filePath });

      const data = res.data;
      setError("");
      setResponse(data.result);
      setPrompt("");
      setFile(null);
    } catch (error) {
      console.error('API request failed:', error);
      setResponse('Error: ' + error.message);
      setError("Something went wrong. Please try again!");
    }
  };

  return (
    <div>
      <h1>Gemini API Integration</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleGenerate}>Generate</button>
      <div>
        {error && <p className='error'>{error}</p>}
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
