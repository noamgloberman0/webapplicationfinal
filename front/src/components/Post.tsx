import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Types
import { Post as PostType } from '../types';

// Icons
import { Heart, MessageCircle } from 'lucide-react';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {

  // User info
  const [userInfo] = useState(post?.user ? JSON.parse(post.user) : {});

  // Likes
  const [isLiked, setIsLiked] = useState(false);
  const [likeNum, setLikeNum] = useState<number>(post.likes.length);
  
  // Comments
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState<any>([]);

  // Functions

  const handleLike = async () => {

    // like post logic here
  };

  const handleNewComment = async (e: React.FormEvent) => {
    e.preventDefault();
    // New comment logic here
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
            <span>{likeNum}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{postComments.length}</span>
          </button>

          {/* <button className="flex items-center space-x-2 text-gray-500">
            <Share className="h-5 w-5" />
          </button> */}
        </div>
      </div>

      {/* Comment Displayer */}
      {showComments && (
        <div className="border-t p-4">
          <form onSubmit={handleNewComment} className="mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
            />
          </form>

        </div>
      )}

    </div>
  );
}
