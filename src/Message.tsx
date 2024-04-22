import { PastMessage, Reaction, SetPastMessages } from './App';
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
  setPastMessages: SetPastMessages;
}

export function Message({
  message,
  style,
  is_curr_user_message,
  setPastMessages,
}: Props) {
  const [is_reaction_popup_open, setIsReactionPopupOpen] = useState(false);

  const handleReactionClick = (reaction: Reaction) => {
    setPastMessages((past_messages) => {
      const past_messages_cloned = past_messages.slice();
      const curr_message_id = past_messages_cloned.findIndex(
        (past_message) => past_message.message_id == message.message_id
      );
      if (curr_message_id == -1)
        throw new Error('Could not find current message to react');
      past_messages_cloned[curr_message_id].reaction = reaction;
      return past_messages_cloned;
    });
  };

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
        <button onClick={() => handleReactionClick('heart')}>
          <FaRegHeart size={20} />
        </button>
        <button onClick={() => handleReactionClick('thumbs_up')}>
          <LuThumbsUp size={20} />
        </button>
        <button onClick={() => handleReactionClick('thumbs_down')}>
          <LuThumbsDown size={20} />
        </button>
        <button onClick={() => handleReactionClick('laugh')}>
          <FaRegLaughSquint size={20} />
        </button>
        <button onClick={() => handleReactionClick('emphasis')}>
          <BsExclamationDiamond size={20} />
        </button>
        <button onClick={() => handleReactionClick('question_mark')}>
          <BsQuestionCircle size={20} />
        </button>
      </div>
    </div>
  );
}
