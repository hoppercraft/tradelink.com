import { useNavigate } from 'react-router-dom';
import defaultUser from '../assets/default-avatar.jpg';
import api from '../apicentralize';

const NotificationCard = ({ conversation }) => {
  const navigate = useNavigate();

  const openChat = async () => {
    try {
      await api.post(`/api/conversations/${conversation.id}/read/`);

      navigate('/home/chat', {
        state: { selectedId: conversation.id }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      onClick={openChat}
      className="w-full bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 flex items-center gap-3 text-sm text-gray-800 hover:bg-indigo-50 transition cursor-pointer group"
    >
      <img 
        src={conversation.other_person.avatar || defaultUser} 
        className="h-8 w-8 rounded-full object-cover border border-indigo-100"
        alt="sender"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-xs text-indigo-600">
          New message from {conversation.other_person.name}
        </p>
        <p className="truncate text-gray-500 italic">
          "{conversation.last_message}"
        </p>
      </div>
      <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
    </div>
  );
};

export default NotificationCard;