import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Icons
import { MessageSquare, MapPin, Calendar } from 'lucide-react';

// Types
import *  as Interfaces from '../types/index';

// Components
import Post from '../components/Post';
import Chat from '../components/Chat';

export default function Profile() {
  const id: any = localStorage.getItem('_id');

  const [showChat, setShowChat] = useState(false);
  const [userPosts, setUserPosts] = useState<Interfaces.Post[]>([]);
  const [user, setUser] = useState<Interfaces.User | null>(null);
  const [username, setUsername] = useState('');
  const [editMode, setEditMode] = useState(false);


  const location = useLocation();

  const profileID = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const isOwnProfile = profileID === id;



  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white mt-4 rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600" />

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20">
              {user && !editMode && (<img
                src={user.profilePicture}
                alt={user.profilePicture}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />)}

              <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user?.username}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              <div className="flex flex-row gap-4 ml-auto">
                {!isOwnProfile && (
                  <button onClick={() => setShowChat(true)}
                    className="ml-auto mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Message
                  </button>
                )}
                
              </div>
            </div>

            <div className="flex items-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{user?.city}, {user?.country}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Joined {user?.month} {user?.year}</span>
              </div>
            </div>

            <div className="flex space-x-6 border-t border-b py-4">
              <div>
                <span className="font-bold">{userPosts.length}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-6">
          {userPosts.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>

      {showChat && user && (
        <Chat user={user} onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}
