import { useState } from 'preact/hooks';
import './app.css';
import { Chatbox } from './chatbox';
import { Message, UserId } from './types';

type PastMessage = {
  user_id: UserId;
  message: Message;
  datetime: number;
};

export type SendMessage = (user_id: UserId, message: Message) => void;

export function App() {
  const [users] = useState([1, 2]);
  const [past_messages, setPastMessages] = useState<PastMessage[]>([]);

  const sendMessage: SendMessage = (user_id, message) => {
    const past_messages_clone = [...past_messages];
    const new_message: PastMessage = {
      user_id: user_id,
      message: message,
      datetime: Date.now(),
    };
    past_messages_clone.push(new_message);
    setPastMessages(past_messages_clone);
  };

  return (
    <>
      {users.map((user_id) => {
        return (
          <Chatbox key={user_id} user_id={user_id} sendMessage={sendMessage} />
        );
      })}
    </>
  );
}
