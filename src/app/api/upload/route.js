

// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs/promises';

// export const runtime = 'nodejs';

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return new NextResponse(JSON.stringify({ error: 'No file provided' }), { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const filePath = path.join(process.cwd(), 'public', 'upload', file.name);
//     await fs.writeFile(filePath, buffer);

//     return new NextResponse(JSON.stringify({ filePath: `/upload/${file.name}` }), { status: 200 });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return new NextResponse(JSON.stringify({ error: 'Internal Server Error', message: error.message }), { status: 500 });
//   }
// }








// Code to upload file in Upload folder

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('No file provided');
      return new NextResponse(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(process.cwd(), 'public', 'upload', file.name);
    console.log(`Saving file to: ${filePath}`);
    await fs.writeFile(filePath, buffer);

    return new NextResponse(JSON.stringify({ filePath: `/upload/${file.name}` }), { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error', message: error.message }), { status: 500 });
  }
}
