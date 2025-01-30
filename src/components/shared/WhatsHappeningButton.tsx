import React from 'react';

const WhatsHappeningButton: React.FC = () => {
  // const router = useRouter();

  
  return (
    <button
      // onClick={handleClick}
      className=" flex w-40 items-center justify-around gap-3 rounded-xl border-2 border-dashed border-black bg-white px-2 py-2 text-sm font-semibold text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-none hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none dark:border-white dark:bg-black dark:text-gray-400 dark:hover:shadow-[4px_4px_0px_white]"
      >
      What's happening?
    </button>
  );
};

export default WhatsHappeningButton;
