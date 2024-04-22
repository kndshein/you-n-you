import { Ref } from 'preact';
import { PastMessages } from './App';
import { UserId } from './types';

type Props = {
  component_ref: Ref<HTMLDivElement>;
  past_messages: PastMessages;
  user_id: UserId;
  handleScrolling: () => void;
} & ClonedComponent;

type ClonedComponent =
  | { is_cloned?: never; chatbox_height?: never }
  | { is_cloned: true; chatbox_height: number };

export function PastMessagesWrapper({
  component_ref,
  past_messages,
  user_id,
  handleScrolling,
  is_cloned,
  chatbox_height,
}: Props) {
  return (
    <div
      ref={component_ref}
      className={`past_messages_wrapper ${
        is_cloned ? 'past_messages_wrapper_clone' : ''
      }`}
      onScroll={handleScrolling}
    >
      {past_messages
        .slice() // Slice since `reverse()` mutates the array
        .reverse()
        .map((message, idx) => {
          const is_curr_user_message = message.user_id == user_id;
          let style = {};
          if (is_cloned && idx == 0)
            style = { marginBottom: `${chatbox_height + 8}px` };
          return (
            <p
              key={message.datetime}
              className={`${is_curr_user_message ? 'curr_user' : ''} message`}
              style={style}
            >
              {message.text}
            </p>
          );
        })}
    </div>
  );
}
