import { useEffect, useRef, useState } from 'preact/hooks';
import {
  PastMessages,
  SendMessage,
  SetCurrSelectedPhone,
  SetPastMessages,
  SetTypingUser,
} from './App';
import { Chatbox } from './Chatbox';
import { UserId } from './utils/types';
import { PastMessagesWrapper } from './PastMessagesWrapper';
import { PiCursorClick } from 'react-icons/pi';
import PhoneHeader from './PhoneHeader';

interface Props {
  idx: number;
  user_id: UserId;
  past_messages: PastMessages;
  setPastMessages: SetPastMessages;
  sendMessage: SendMessage;
  is_curr_selected_phone: boolean;
  setCurrSelectedPhone: SetCurrSelectedPhone;
  typing_user: string;
  setTypingUser: SetTypingUser;
}

export type InputRef = HTMLTextAreaElement | null;

export function PhoneView({
  idx,
  user_id,
  past_messages,
  setPastMessages,
  sendMessage,
  is_curr_selected_phone,
  setCurrSelectedPhone,
  typing_user,
  setTypingUser,
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

  useEffect(() => {
    if (is_curr_selected_phone) input_ref.current?.focus();
  }, [is_curr_selected_phone]);

  let profile_name = 'You';
  if (idx > 0 && idx < 4) {
    profile_name = 'The ' + 'Other '.repeat(idx) + profile_name;
  } else if (idx >= 4) {
    profile_name = 'The ' + 'Other' + `<sup>${idx}</sup> ` + profile_name;
  }

  return (
    <section
      className={`phone_container ${
        is_curr_selected_phone ? 'selected_phone' : ''
      }`}
    >
      <button
        className="phone_background"
        onClick={() => {
          if (!is_curr_selected_phone) input_ref.current?.focus();
        }}
      >
        {!is_curr_selected_phone && (
          <div className="phone_switch_disclaimer">
            <div className="instruction_wrapper click">
              <PiCursorClick />
            </div>
            <p className="instruction_wrapper">Ctrl + Shift + U</p>
          </div>
        )}
      </button>
      <section className="phone">
        <PhoneHeader user_idx={idx} />
        <PastMessagesWrapper
          component_ref={real_past_messages_ref}
          past_messages={past_messages}
          setPastMessages={setPastMessages}
          user_id={user_id}
          handleScrolling={handleScrolling}
          typing_user={typing_user}
        />
        <PastMessagesWrapper
          component_ref={cloned_past_messages_ref}
          past_messages={past_messages}
          setPastMessages={setPastMessages}
          user_id={user_id}
          handleScrolling={handleScrolling}
          typing_user={typing_user}
          is_cloned
          chatbox_height={chatbox_height}
        />
        <Chatbox
          chatbox_ref={chatbox_ref}
          input_ref={input_ref}
          user_id={user_id}
          sendMessage={sendMessage}
          setCurrSelectedPhone={setCurrSelectedPhone}
          setTypingUser={setTypingUser}
        />
      </section>
    </section>
  );
}
