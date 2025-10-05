'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef, FormEvent } from 'react';

export default function UploadImage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `/api/images/upload?filename=${file.name}`,
      {
        method: 'POST',
        body: file,
      },
    );

    const { data } = await response.json();

    setBlob(data);
  }

  const handleCopy = (blobUrl: string) => {
    navigator.clipboard.writeText(blobUrl);
  }

  return (
    <div className='flex flex-col'>
      <form
        onSubmit={handleUpload}
        className='border-2 border-dashed border-blue-900 rounded-md p-4'
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <button type="submit" className='bg-black text-white py-2 px-4 rounded-2xl'>Upload</button>
      </form>
      {blob && (
        <div className='flex items-center justify-center flex-col mt-4'>
          Blob url: <p onClick={() => handleCopy(blob.url)}>{blob.url}</p>
        </div>
      )}
    </div>
  );
}