import React, { useEffect, useState } from 'react';
import { Post as PostType } from '../types';

// Components
import Post from '../components/Post';

export default function Home() {

  const [postsArray, setPostsArray] = useState<PostType[]>([]);


  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-2xl mx-auto px-4">

        <div className="space-y-6 pb-6">
          {postsArray.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
