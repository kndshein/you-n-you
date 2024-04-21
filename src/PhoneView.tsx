import { useRef } from 'preact/hooks';
import { PastMessages, SendMessage, SetCurrSelectedPhone } from './App';
import { Chatbox } from './ChatBox';
import { UserId } from './types';

interface Props {
  user_id: UserId;
  past_messages: PastMessages;
  sendMessage: SendMessage;
  is_curr_selected_phone: boolean;
  setCurrSelectedPhone: SetCurrSelectedPhone;
}

export type InputRef = HTMLInputElement | null;

export function PhoneView({
  user_id,
  past_messages,
  sendMessage,
  is_curr_selected_phone,
  setCurrSelectedPhone,
}: Props) {
  const input_ref = useRef<InputRef>(null);

  return (
    <section
      className={`phone_wrapper ${
        is_curr_selected_phone ? 'selected_phone' : ''
      }`}
    >
      <div
        className="phone_background"
        onClick={() => input_ref.current?.focus()}
      ></div>
      <section className="phone">
        <div className="past_messages_wrapper">
          {past_messages
            .slice() // Slice since `reverse()` mutates the array
            .reverse()
            .map((message) => {
              const is_curr_user_message = message.user_id == user_id;
              return (
                <p
                  key={message.datetime}
                  className={`${
                    is_curr_user_message ? 'curr_user' : ''
                  } message`}
                >
                  {message.text}
                </p>
              );
            })}
        </div>
        <Chatbox
          input_ref={input_ref}
          user_id={user_id}
          sendMessage={sendMessage}
          setCurrSelectedPhone={setCurrSelectedPhone}
        />
      </section>
    </section>
  );
}
