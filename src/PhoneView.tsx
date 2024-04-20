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
    <section className="phone_container">
      <div className="past_messages_container">
        {past_messages
          .slice() // Slice since `reverse()` mutates the array
          .reverse()
          .map((message) => {
            const is_curr_user_message = message.user_id == user_id;
            return (
              <p
                key={message.datetime}
                className={`${is_curr_user_message ? 'curr_user' : ''} message`}
              >
                {message.text}
              </p>
            );
          })}
      </div>
      <Chatbox user_id={user_id} sendMessage={sendMessage} />
    </section>
  );
}
