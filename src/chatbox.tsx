import { useState } from 'preact/hooks';
import { UserId } from './types';
import { SendMessage } from './app';

interface Props {
  user_id: UserId;
  sendMessage: SendMessage;
}

export function Chatbox({ user_id, sendMessage }: Props) {
  const [curr_message, setCurrMessage] = useState('');
  return (
    <>
      <input
        value={curr_message}
        onInput={(event) => {
          setCurrMessage(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(user_id, curr_message);
          setCurrMessage('');
        }}
      >
        Send
      </button>
    </>
  );
}
