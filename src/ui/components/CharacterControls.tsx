import React from "react";

type CharacterControlsProps = {
  moveCharacter: (dx: number, dy: number) => void;
};

export const CharacterControls: React.FC<CharacterControlsProps> = ({
  moveCharacter,
}) => {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="transform w-28 h-28 flex justify-center items-center">
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 dark:bg-gray-50 dark:text-gray-900"
          onClick={() => moveCharacter(0, -30)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 dark:bg-gray-50 dark:text-gray-900"
          onClick={() => moveCharacter(0, 30)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 dark:bg-gray-50 dark:text-gray-900"
          onClick={() => moveCharacter(-30, 0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-200 dark:bg-gray-50 dark:text-gray-900"
          onClick={() => moveCharacter(30, 0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
