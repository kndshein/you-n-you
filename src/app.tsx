import { useState } from 'preact/hooks';
import './styles/styles.scss';
import { Message, UserId } from './types';
import { PhoneView } from './PhoneView';

export type PastMessage = {
  user_id: UserId;
  text: Message;
  datetime: number;
  is_start: boolean;
  is_end: boolean;
};
export type PastMessages = PastMessage[];

export type SendMessage = (user_id: UserId, message: Message) => void;
export type SetCurrSelectedPhone = (user_id: string) => void;

export function App() {
  const [users] = useState(['1', '2']);
  const [past_messages, setPastMessages] = useState<PastMessages>([]);
  const [curr_selected_phone, setCurrSelectedPhone] = useState('1');

  const sendMessage: SendMessage = (user_id, text) => {
    const is_first_message = !past_messages.length;
    const is_new_message_chain =
      !is_first_message && past_messages[0].user_id != user_id;
    const previous_message: PastMessage = {
      ...past_messages[0],
      is_end: is_new_message_chain,
    };
    const new_message: PastMessage = {
      user_id: user_id,
      text: text,
      datetime: Date.now(),
      is_start: is_new_message_chain,
      is_end: true,
    };
    if (is_first_message) {
      setPastMessages([new_message]);
    } else {
      setPastMessages([
        new_message,
        previous_message,
        ...past_messages.slice(1),
      ]);
    }
  };

  return (
    <div className="phones_container">
      {users.map((user_id) => {
        return (
          <PhoneView
            key={user_id}
            user_id={user_id}
            past_messages={past_messages}
            sendMessage={sendMessage}
            is_curr_selected_phone={curr_selected_phone == user_id}
            setCurrSelectedPhone={setCurrSelectedPhone}
          />
        );
      })}
    </div>
  );
}
