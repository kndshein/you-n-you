import { useState } from 'preact/hooks';
import './app.css';
import { Message, UserId } from './types';
import { PhoneView } from './PhoneView';

export type PastMessage = {
  user_id: UserId;
  text: Message;
  datetime: number;
};
export type PastMessages = PastMessage[];

export type SendMessage = (user_id: UserId, message: Message) => void;

export function App() {
  const [users] = useState([1, 2]);
  const [past_messages, setPastMessages] = useState<PastMessages>([]);

  const sendMessage: SendMessage = (user_id, text) => {
    const past_messages_clone = [...past_messages];
    const new_message: PastMessage = {
      user_id: user_id,
      text: text,
      datetime: Date.now(),
    };
    past_messages_clone.push(new_message);
    setPastMessages(past_messages_clone);
  };

  return (
    <>
      {users.map((user_id) => {
        return (
          <PhoneView
            key={user_id}
            user_id={user_id}
            past_messages={past_messages}
            sendMessage={sendMessage}
          />
        );
      })}
    </>
  );
}
