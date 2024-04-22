import { PastMessage, ReactionType, SetPastMessages } from './App';
import { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';
import { UserId } from './types';
import { reaction_dict } from './utils/utils';

interface Props {
  message: PastMessage;
  user_id: UserId;
  style: JSX.AllCSSProperties;
  setPastMessages: SetPastMessages;
}

export function Message({ message, user_id, style, setPastMessages }: Props) {
  const [is_reaction_popup_open, setIsReactionPopupOpen] = useState(false);

  const handleReactionClick = (reaction_type: ReactionType) => {
    setPastMessages((past_messages) => {
      const cloned_past_messages = past_messages.slice();
      const curr_message_id = cloned_past_messages.findIndex(
        (past_message) => past_message.message_id == message.message_id
      );
      if (curr_message_id == -1)
        throw new Error('Could not find current message to react');
      const cloned_reaction = {
        ...cloned_past_messages[curr_message_id].reaction,
      };
      const curr_reaction_type = cloned_reaction[reaction_type];
      if (curr_reaction_type) {
        cloned_reaction[reaction_type] = [user_id, ...curr_reaction_type];
      } else {
        cloned_reaction[reaction_type] = [user_id];
      }
      cloned_past_messages[curr_message_id].reaction = cloned_reaction;
      return cloned_past_messages;
    });
    setIsReactionPopupOpen(false);
  };

  return (
    <div className="message_group">
      <p
        key={message.date}
        className={`message ${
          message.user_id == user_id ? 'curr_user' : 'other_user'
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
        {reaction_dict.map((reaction_obj) => {
          const curr_reaction_obj = message.reaction;
          const curr_reaction_type_obj =
            curr_reaction_obj && curr_reaction_obj[reaction_obj.name];
          return (
            <button
              className={`${
                curr_reaction_type_obj &&
                curr_reaction_type_obj.includes(user_id)
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleReactionClick(reaction_obj.name)}
            >
              {reaction_obj.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
