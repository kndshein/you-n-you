import { useEffect, useRef, useState } from 'preact/hooks';
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
  const real_scroll_ref = useRef<HTMLDivElement>(null);
  const fake_scroll_ref = useRef<HTMLDivElement>(null);
  const chatbox_ref = useRef<HTMLFormElement>(null);
  const [chatbox_height, setChatBoxHeight] = useState(0);

  const handleScrolling = () => {
    if (fake_scroll_ref.current && real_scroll_ref.current)
      fake_scroll_ref.current.scrollTop = real_scroll_ref.current.scrollTop;
  };

  useEffect(() => {
    if (chatbox_ref.current) {
      const el = chatbox_ref.current;
      const style = window.getComputedStyle(el);
      // https://stackoverflow.com/a/40448767
      const height = ['height', 'margin-top']
        .map((key) => parseInt(style.getPropertyValue(key), 10))
        .reduce((prev, curr) => prev + curr);
      setChatBoxHeight(height);
    }
  }, [chatbox_ref.current?.clientHeight]);

  return (
    <section
      className={`phone_wrapper ${
        is_curr_selected_phone ? 'selected_phone' : ''
      }`}
    >
      <button
        className="phone_background"
        onClick={() => {
          if (!is_curr_selected_phone) input_ref.current?.focus();
        }}
      ></button>
      <section className="phone">
        <div
          ref={real_scroll_ref}
          className="past_messages_wrapper"
          onScroll={handleScrolling}
        >
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
        <div
          ref={fake_scroll_ref}
          className="past_messages_wrapper past_messages_wrapper_clone"
        >
          {past_messages
            .slice() // Slice since `reverse()` mutates the array
            .reverse()
            .map((message, idx) => {
              const is_curr_user_message = message.user_id == user_id;
              return (
                <p
                  key={message.datetime}
                  className={`${
                    is_curr_user_message ? 'curr_user' : ''
                  } message`}
                  style={
                    idx == 0 ? { marginBottom: `${chatbox_height + 8}px` } : {}
                  }
                >
                  {message.text}
                </p>
              );
            })}
        </div>
        <Chatbox
          chatbox_ref={chatbox_ref}
          input_ref={input_ref}
          user_id={user_id}
          sendMessage={sendMessage}
          setCurrSelectedPhone={setCurrSelectedPhone}
        />
      </section>
    </section>
  );
}
