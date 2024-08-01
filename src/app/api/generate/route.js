

// Backend code for Generate Response  only for text replies

// import { GoogleGenerativeAI } from '@google/generative-ai';

// // export const config = {
// //   runtime: 'edge',
// // };

// export async function POST(req) {
//   console.log('API route hit');

//   if (req.method !== 'POST') {
//     return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
//   }

//   try {
//     console.log('Request received');
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       throw new Error('GEMINI_API_KEY is not defined in environment variables');
//     }

//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     const { prompt } = await req.json();
//     console.log('Prompt:', prompt);

//     const apiResponse = await model.generateContent({
//       contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       generationConfig: {
//         temperature: 0.9,
//         topK: 1,
//         topP: 1,
//         maxOutputTokens: 400,
//       },
//       safetySettings: [
//         { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
//         { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
//         { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
//         { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
//       ],
//     });
//     console.log('Full response:', JSON.stringify(apiResponse));
//     console.log('Response received:', apiResponse);

//     // Check if candidates array is defined and not empty
//     const candidates = apiResponse?.response?.candidates;
//     if (!candidates || candidates.length === 0) {
//       throw new Error('No candidates found in the response');
//     }

//     // Extract the text from the response
//     const result = candidates[0]?.content?.parts?.[0]?.text;
//     if (!result) {
//       throw new Error('No text found in the first candidate');
//     }

//     return new Response(JSON.stringify({ result }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error in API handler:', error.message);
//     return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

















// Backend code for Generate Response using attachement or without attachement

import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import fs from 'fs/promises';

let requestCount = 0; 
export const runtime = 'nodejs';

export async function POST(req) {
  requestCount += 1; 
  console.log(`Request count: ${requestCount}`);

  try {
    const { prompt, filePath } = await req.json();

    if (!prompt && !filePath) {
      return new Response(JSON.stringify({ error: 'No content provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    let content = prompt || '';
    if (filePath) {
      const fullPath = path.join(process.cwd(), 'public', filePath);
      const fileContent = await fs.readFile(fullPath, 'utf8');
      content += fileContent;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const apiResponse = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: content }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 50,
        topP: 0.95,
        maxOutputTokens: 512,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    const candidates = apiResponse?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates found in the response');
    }

    const result = candidates[0]?.content?.parts?.[0]?.text;
    if (!result) {
      throw new Error('No text found in the first candidate');
    }

    return new Response(JSON.stringify({ result }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in API handler:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
















































// test code is backend running
// export const runtime = 'nodejs';

// export async function POST(req) {
//   try {
//     const { prompt, filePath } = await req.json();
//     console.log('Received payload:', { prompt, filePath });

//     if (!prompt && !filePath) {
//       return new Response(JSON.stringify({ error: 'No content provided' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ message: 'Received successfully', prompt, filePath }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error in API handler:', error.message);
//     return new Response(JSON.stringify({ error: 'Internal Server Error', message: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

