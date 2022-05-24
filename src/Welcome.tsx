import CSS from 'csstype';
import React from 'react';
import { AppState, useMessageContext } from './context/MessageContext';
export const Welcome: React.FC = ({ children }) => {
  const messageContext = useMessageContext();
  return (
    <div className="p-4 flex h-screen justify-center items-end">
      <div className="">
        <button
          className="p-3 bg-white transform rounded-md border-2 border-black w-40 hover:bg-gray-400 hover:translate-y-1 transition-all hover:cursor-pointer mx-2"
          onClick={() => {
            messageContext.setAppState(AppState.chat);

            messageContext.setBackground('inside_bakery.gif');
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};