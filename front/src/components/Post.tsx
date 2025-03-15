import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Types
import { Post as PostType } from '../types';

// Services
import { likePost } from '../services/postService';
import { createComment, fetchComments } from '../services/commentService';

// Icons
import { Heart, MessageCircle } from 'lucide-react';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {

  // User info
  const [userInfo] = useState(post?.user ? JSON.parse(post.user) : {});
  const userID = localStorage.getItem('_id') || '';
  const user = {
    name: localStorage.getItem('username') || '',
    profilePicture: localStorage.getItem('profilePicture') || '',
  };

  // Likes
  const [isLiked, setIsLiked] = useState(false);
  const [likeNum, setLikeNum] = useState<number>(post.likes.length);
  
  // Comments
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState<any>([]);

  // Get comments of post
  useEffect(() => {

    const getComments = async (postId: string) => {
      const result = await fetchComments(postId);
      setPostComments(result?.data);      
    }

    getComments(post._id);
  }, [post]);
  
  // Check if the current user has liked the post 
  useEffect(() => {
    setIsLiked(post.likes.includes(userID));
  }, [post]);
  

  // Functions

  const handleLike = async () => {

    const updatedLikes = isLiked ? 
      post.likes.filter((liker) => liker !== userID) : 
      [...new Set([...post.likes, userID])];

    const postData = {
      id: post._id,
      likes: updatedLikes,
    };

    await likePost(postData);

    setIsLiked(!isLiked);
    setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
  };

  const handleNewComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const formData = new FormData();
    
    formData.append('user', JSON.stringify(user)); // Comment Sender
    formData.append('postId', post._id); // Post ID to comment on
    formData.append('content', newComment); // Comment content

    const result = await createComment(formData);
    
    // In a real app, this would be handled by the backend
    setNewComment('');

    if(result?.status === 200) {
      window.location.href = `/home#${post._id}`;
      window.location.reload();
    }
    else {
      console.error('Error creating comment:', result);
      alert('Something went wrong while creating your comment. Please try again later.');
    }
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

          <div className="space-y-4">
            {postComments.length > 0 && postComments.map((comment: any) => (
              <div key={comment._id} id={comment._id} className="flex items-start space-x-3">
                
                {/* Comment Creator */}
                <img
                  src={comment?.user ? JSON.parse(comment.user).profilePicture : ""}
                  alt={comment?.user ? JSON.parse(comment.user).name : ""}
                  className="w-8 h-8 rounded-full"
                />
                
                <div className='bg-gray-100 w-full p-2 rounded-lg flex items-start space-x-3'>

                  {/* Comment Content */}
                  <div className="flex-1">

                    <div className="rounded-lg p-3">
                      <Link to={`/profile/${comment.userId}`}>
                        <span className="font-semibold">{comment?.user ? JSON.parse(comment.user).name : ""}</span>
                      </Link>
   
                      <p>{comment.content}</p>

                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
