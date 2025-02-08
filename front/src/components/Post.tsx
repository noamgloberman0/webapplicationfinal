import React, {useState} from 'react';
import { Link } from 'react-router-dom';

// Types
import { Post as PostType } from '../types';

// Icons
import { Heart, MessageCircle, Share, Settings2, Edit, Trash, Image, X } from 'lucide-react';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {

  // User info
  const [userInfo] = useState(post?.user ? JSON.parse(post.user) : {});
  const userID = localStorage.getItem('_id') || '';

  
  // Likes
  const [isLiked, setIsLiked] = useState(false);


  // Functions

  const handleLike = async () => {
    setIsLiked(!isLiked);
  };


  return (
    <div id={post._id} className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center mb-4">
            <Link to={`/profile/${post.userId}`}>
              <img
                src={userInfo.profilePicture}
                key={userInfo.profilePicture}
                alt={userInfo.name}
                className="w-10 h-10 rounded-full mr-3"
              />
            </Link>
            <div>
              <Link to={`/profile/${post.userId}`}>
                <h3 className="font-semibold">{userInfo.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {post.userId === userID && (
              <div>
                <button className="flex items-center space-x-2 text-gray-500">
                  <Settings2 className="h-5 w-5" />
                </button>

              </div> 
          )}
        </div>

        <p className="mb-4">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full mb-4"
          />
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>6</span>
          </button>

          <button>
            <MessageCircle className="h-5 w-5" />
            <span>5</span>
          </button>

        </div>
      </div>

    </div>
  );
}
