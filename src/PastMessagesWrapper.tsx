import { Ref } from 'preact';
import { PastMessages, SetPastMessages } from './App';
import { UserId } from './utils/types';
import { GoDotFill } from 'react-icons/go';
import { DateTime } from 'luxon';
import { Message } from './Message';
import { useState } from 'preact/hooks';

type Props = {
  component_ref: Ref<HTMLDivElement>;
  past_messages: PastMessages;
  setPastMessages: SetPastMessages;
  user_id: UserId;
  handleScrolling: () => void;
  typing_user: string;
} & ClonedComponent;

type ClonedComponent =
  | { is_cloned?: never; chatbox_height?: never }
  | { is_cloned: true; chatbox_height: number };

export function PastMessagesWrapper({
  component_ref,
  past_messages,
  setPastMessages,
  user_id,
  handleScrolling,
  typing_user,
  is_cloned,
  chatbox_height,
}: Props) {
  const [reaction_popup_message_id, setReactionPopupMessageId] = useState('');

  return (
    <div
      className={`past_messages_wrapper ${
        is_cloned ? 'past_messages_wrapper_clone' : ''
      }`}
      onScroll={handleScrolling}
    >
      {!!reaction_popup_message_id && (
        <button
          className="messages_overlay"
          onClick={() => setReactionPopupMessageId('')}
        />
      )}
      <div
        ref={component_ref}
        className="past_messages_container"
        onScroll={handleScrolling}
      >
        {typing_user && typing_user != user_id && (
          <p className="message other_user chain_last typing">
            <GoDotFill />
            <GoDotFill />
            <GoDotFill />
          </p>
        )}
        {past_messages.map((message, idx) => {
          let style = {};
          if (is_cloned && idx == 0)
            style = { marginBottom: `${chatbox_height + 8}px` };
          let show_date = false;
          if (idx == past_messages.length - 1) {
            show_date = true;
          } else {
            const prev_message = past_messages[idx + 1];
            const diff_in_min = DateTime.fromJSDate(message.date)
              .diff(DateTime.fromJSDate(prev_message.date), 'minute')
              .as('minute');
            if (diff_in_min > 2) show_date = true;
          }
          return (
            <>
              <Message
                message={message}
                user_id={user_id}
                style={style}
                setPastMessages={setPastMessages}
                reaction_popup_message_id={reaction_popup_message_id}
                setReactionPopupMessageId={setReactionPopupMessageId}
              />
              {show_date && (
                <p className="date">
                  {DateTime.fromJSDate(message.date).toFormat(
                    "EEE, MMM dd 'at' t"
                  )}
                </p>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
