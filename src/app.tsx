import { useState } from 'preact/hooks';
import './styles/styles.scss';
import { Message, MessageId, UserId } from './types';
import { PhoneView } from './PhoneView';
import { useHotkeys } from 'react-hotkeys-hook';

export type PastMessage = {
  message_id: MessageId;
  user_id: UserId;
  text: Message;
  date: Date;
  is_start: boolean;
  is_end: boolean;
  reaction:
    | {
        [user_id in UserId]?: ReactionType;
      }
    | null;
};
export type PastMessages = PastMessage[];
export type SetPastMessages = React.Dispatch<
  React.SetStateAction<PastMessages>
>;

export type ReactionType =
  | 'heart'
  | 'thumbs_up'
  | 'thumbs_down'
  | 'laugh'
  | 'emphasis'
  | 'question_mark';

export type SendMessage = (user_id: UserId, message: Message) => void;
export type SetCurrSelectedPhone = (user_id: string) => void;
export type SetTypingUser = (user_id: string) => void;

export function App() {
  const [users] = useState(['1', '2']);
  const [past_messages, setPastMessages] = useState<PastMessages>([]);
  const [curr_selected_phone, setCurrSelectedPhone] = useState('1');
  const [typing_user, setTypingUser] = useState('');

  console.log(past_messages);

  const handleShortcut = () => {
    // https://stackoverflow.com/a/54770183
    const curr_user_idx = users.indexOf(curr_selected_phone);
    const next__user_idx = (curr_user_idx + 1) % users.length;
    setCurrSelectedPhone(users[next__user_idx]);
  };

  useHotkeys('ctrl+shift+u', handleShortcut, { enableOnFormTags: true });

  const sendMessage: SendMessage = (user_id, text) => {
    const is_first_message = !past_messages.length;
    const is_new_message_chain =
      !is_first_message && past_messages[0].user_id != user_id;
    const previous_message: PastMessage = {
      ...past_messages[0],
      is_end: is_new_message_chain,
    };
    const new_message: PastMessage = {
      message_id: past_messages.length.toString(),
      user_id: user_id,
      text: text,
      date: new Date(),
      is_start: is_new_message_chain,
      is_end: true,
      reaction: null,
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
            setPastMessages={setPastMessages}
            sendMessage={sendMessage}
            is_curr_selected_phone={curr_selected_phone == user_id}
            setCurrSelectedPhone={setCurrSelectedPhone}
            typing_user={typing_user}
            setTypingUser={setTypingUser}
          />
        );
      })}
    </div>
  );
}
