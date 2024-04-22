import { Ref, useState } from 'preact/hooks';
import { UserId } from './types';
import { SendMessage, SetCurrSelectedPhone } from './App';
import { InputRef } from './PhoneView';
import { IoMdArrowRoundUp } from 'react-icons/io';
import ReactTextareaAutosize from 'react-textarea-autosize';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Somehow `event` can't be properly typed inlined
    setCurrText(event.currentTarget.value);
  };

  return (
    <form className="chatbox" onSubmit={handleSubmit} ref={chatbox_ref}>
      <ReactTextareaAutosize
        ref={input_ref}
        className="chatbox_input"
        value={curr_text}
        onInput={handleInputChange}
        onFocus={() => setCurrSelectedPhone(user_id)}
        placeholder="iMessage"
        minRows={1}
        maxRows={10}
        onHeightChange={(rowHeight) => {
          if (input_ref.current) {
            let radius = 30;
            if (rowHeight > 40) radius = 20;
            if (rowHeight > 60) radius = 18;
            if (rowHeight > 80) radius = 15;
            if (rowHeight > 100) radius = 12;
            input_ref.current.style.borderRadius = `${radius}px`;
          }
        }}
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
