import React from 'react';
import { useRouter } from 'next/router';

const WhatsHappeningButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    // Redirect to the events page
    router.push('/events');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-sm text-gray-800 py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out"
    >
      What's happening?
    </button>
  );
};

export default WhatsHappeningButton;
