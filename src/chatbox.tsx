import { useState } from 'preact/hooks';
import { UserId } from './types';
import { SendMessage } from './App';

interface Props {
  user_id: UserId;
  sendMessage: SendMessage;
}

export function Chatbox({ user_id, sendMessage }: Props) {
  const [curr_text, setCurrText] = useState('');
  return (
    <>
      <input
        value={curr_text}
        onInput={(event) => {
          setCurrText(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(user_id, curr_text);
          setCurrText('');
        }}
      >
        Send
      </button>
    </>
  );
}
