import { Ref, useState } from 'preact/hooks';
import { UserId } from './types';
import { SendMessage, SetCurrSelectedPhone } from './App';
import { InputRef } from './PhoneView';
import { IoMdArrowRoundUp } from 'react-icons/io';

interface Props {
  chatbox_ref: Ref<HTMLFormElement>;
  input_ref: Ref<InputRef>;
  user_id: UserId;
  sendMessage: SendMessage;
  setCurrSelectedPhone: SetCurrSelectedPhone;
}

export function Chatbox({
  chatbox_ref,
  input_ref,
  user_id,
  sendMessage,
  setCurrSelectedPhone,
}: Props) {
  const [curr_text, setCurrText] = useState('');

  const handleSubmit = (event: SubmitEvent) => {
    if (!curr_text) return;
    event.preventDefault();
    sendMessage(user_id, curr_text);
    setCurrText('');
  };

  return (
    <form className="chatbox" onSubmit={handleSubmit} ref={chatbox_ref}>
      <input
        ref={input_ref}
        className="chatbox_input"
        value={curr_text}
        onInput={(event) => {
          setCurrText(event.currentTarget.value);
        }}
        onFocus={() => setCurrSelectedPhone(user_id)}
      />
      <button
        type="submit"
        className="chatbox_submit_btn"
        disabled={!curr_text}
      >
        <IoMdArrowRoundUp />
      </button>
    </form>
  );
}
