import { Ref, useState } from 'preact/hooks';
import { UserId } from './types';
import { SendMessage, SetCurrSelectedPhone } from './App';
import { InputRef } from './PhoneView';

interface Props {
  input_ref: Ref<InputRef>;
  user_id: UserId;
  sendMessage: SendMessage;
  setCurrSelectedPhone: SetCurrSelectedPhone;
}

export function Chatbox({
  input_ref,
  user_id,
  sendMessage,
  setCurrSelectedPhone,
}: Props) {
  const [curr_text, setCurrText] = useState('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    sendMessage(user_id, curr_text);
    setCurrText('');
  };

  return (
    <form className="chatbox" onSubmit={handleSubmit}>
      <input
        ref={input_ref}
        value={curr_text}
        onInput={(event) => {
          setCurrText(event.currentTarget.value);
        }}
        onFocus={() => setCurrSelectedPhone(user_id)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
