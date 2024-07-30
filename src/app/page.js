
// import React from 'react'
// import Chatbot from './component/chatboat'

// const Home = () => {
//   return (
//     <div>
//       <h2>Ai implement using github code</h2>
//       <Chatbot/>
//     </div>
//   )
// }

// export default Home


'use client';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.post('/api/generate', {
        prompt
      });
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      const data = res.data; // Axios automatically parses JSON responses
      setResponse(data.result);
    } catch (error) {
      console.error('API request failed:', error);
      setResponse('Error: ' + error.message);
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
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
