import { PastMessages, SendMessage } from './App';
import { Chatbox } from './ChatBox';
import { UserId } from './types';

interface Props {
  user_id: UserId;
  past_messages: PastMessages;
  sendMessage: SendMessage;
}

export function PhoneView({ user_id, past_messages, sendMessage }: Props) {
  return (
    <div>
      {past_messages.map((message) => {
        return <p>{message.text}</p>;
      })}
      <Chatbox user_id={user_id} sendMessage={sendMessage} />
    </div>
  );
}
