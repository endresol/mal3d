import React from "react";

interface AnimatedButtonProps {
  children: any;
  handleClick: () => any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  handleClick,
  children,
}) => {
  return (
    <button
      className='relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-transparent rounded hover:bg-white group border-2 text-white'
      onClick={() => handleClick()}
    >
      <span className='w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
      <span className='relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black'>
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
