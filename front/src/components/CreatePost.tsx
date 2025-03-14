import React, { useState } from 'react';

// Icons
import { Image, X } from 'lucide-react';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(new Blob());
  const [imageName, setImageName] = useState('');


  const handleUpload = async(e: any) => {
    e.preventDefault();    
  
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 mt-6">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"What's on your mind?"}
            className="w-full p-4 rounded-lg border focus:outline-none focus:border-indigo-500 resize-none"
            rows={3}
          />
        </div>

        {imageFile.size > 0 && (
          <div className="mt-4">
            <button
                type="button"
                onClick={() => {
                  setImageFile(new Blob());
                  setImageName('');
                }}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mt-4 rounded-lg max-h-64 object-cover mx-auto"
            />
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          
          <button
            type="button"
            onClick={() => { window.document.getElementById('file-upload')?.click(); }}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700" >
            <Image className="h-5 w-5" />
            <span>Add Image</span>
          </button>
          
          <input type="file" id="file-upload" name="image" accept=".png, .jpeg, .jpg" onChange={handleUpload} />

          <button type="submit" disabled={!content.trim() || imageName === ""}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          > Post </button>

        </div>
      </form>
    </div>
  );
}
