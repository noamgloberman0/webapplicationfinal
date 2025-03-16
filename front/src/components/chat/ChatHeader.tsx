import { Link } from 'react-router-dom';

// Icons
import { X } from "lucide-react";


const ChatHeader = () => {


  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* Profile Picture */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
                {/* <img
                  src={selectedUser?.profilePicture}
                  key={selectedUser?.profilePicture}
                  alt={selectedUser?.username}
                  className="w-10 h-10 rounded-full mr-3"
                /> */}
            </div>
          </div>

        </div>

        {/* Close button */}
        <button>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
