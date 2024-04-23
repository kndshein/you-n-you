import { JSX } from 'preact/jsx-runtime';
import { ReactionType } from '../App';
import { FaRegHeart } from 'react-icons/fa6';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { FaRegLaughSquint } from 'react-icons/fa';
import { BsExclamationDiamond, BsQuestionCircle } from 'react-icons/bs';

type ReactionDict = {
  [reaction in ReactionType]: {
    icon: (size: number) => JSX.Element;
    hover_color: string;
  };
};

export const reaction_dict: ReactionDict = {
  heart: { icon: (size) => <FaRegHeart size={size} />, hover_color: '#fb34e2' },
  thumbs_up: {
    icon: (size) => <LuThumbsUp size={size} />,
    hover_color: '#6fff0b',
  },
  thumbs_down: {
    icon: (size) => <LuThumbsDown size={size} />,
    hover_color: '#c18dff',
  },
  laugh: {
    icon: (size) => <FaRegLaughSquint size={size} />,
    hover_color: '#ffca00',
  },
  emphasis: {
    icon: (size) => <BsExclamationDiamond size={size} />,
    hover_color: '#ff4b0b',
  },
  question_mark: {
    icon: (size) => <BsQuestionCircle size={size} />,
    hover_color: '#85edd2',
  },
};
