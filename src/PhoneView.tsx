import { useEffect, useRef, useState } from 'preact/hooks';
import { PastMessages, SendMessage, SetCurrSelectedPhone } from './App';
import { Chatbox } from './ChatBox';
import { UserId } from './types';
import { PastMessagesWrapper } from './PastMessagesWrapper';

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
  const real_past_messages_ref = useRef<HTMLDivElement>(null);
  const cloned_past_messages_ref = useRef<HTMLDivElement>(null);
  const chatbox_ref = useRef<HTMLFormElement>(null);
  const [chatbox_height, setChatBoxHeight] = useState(0);

  const handleScrolling = () => {
    if (cloned_past_messages_ref.current && real_past_messages_ref.current)
      cloned_past_messages_ref.current.scrollTop =
        real_past_messages_ref.current.scrollTop;
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
        <PastMessagesWrapper
          component_ref={real_past_messages_ref}
          past_messages={past_messages}
          user_id={user_id}
          handleScrolling={handleScrolling}
        />
        <PastMessagesWrapper
          component_ref={cloned_past_messages_ref}
          past_messages={past_messages}
          user_id={user_id}
          handleScrolling={handleScrolling}
          is_cloned
          chatbox_height={chatbox_height}
        />
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
