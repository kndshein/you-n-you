import { PastMessage } from './App';
import { FaRegHeart } from 'react-icons/fa6';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { FaRegLaughSquint } from 'react-icons/fa';
import { BsExclamationDiamond } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';
import { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';

interface Props {
  message: PastMessage;
  style: JSX.AllCSSProperties;
  is_curr_user_message: boolean;
}

export function Message({ message, style, is_curr_user_message }: Props) {
  const [is_reaction_popup_open, setIsReactionPopupOpen] = useState(false);

  return (
    <div className="message_group">
      <p
        key={message.date}
        className={`message ${
          is_curr_user_message ? 'curr_user' : 'other_user'
        } ${message.is_start ? 'chain_start' : ''} ${
          message.is_end ? 'chain_last' : ''
        }`}
        style={style}
        onClick={() => setIsReactionPopupOpen((prev_value) => !prev_value)}
      >
        {message.text}
      </p>
      <div
        className={`reaction_icon_group ${
          is_reaction_popup_open ? 'open' : ''
        }`}
      >
        <FaRegHeart size={20} />
        <LuThumbsUp size={20} />
        <LuThumbsDown size={20} />
        <FaRegLaughSquint size={20} />
        <BsExclamationDiamond size={20} />
        <BsQuestionCircle size={20} />
      </div>
    </div>
  );
}
