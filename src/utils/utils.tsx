import { JSX } from 'preact/jsx-runtime';
import { ReactionType } from '../App';
import { FaRegHeart } from 'react-icons/fa6';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { FaRegLaughSquint } from 'react-icons/fa';
import { BsExclamationDiamond, BsQuestionCircle } from 'react-icons/bs';

type ReactionDict = {
  [reaction in ReactionType]: JSX.Element;
};

export const reaction_dict: ReactionDict = {
  heart: <FaRegHeart size={20} />,
  thumbs_up: <LuThumbsUp size={20} />,
  thumbs_down: <LuThumbsDown size={20} />,
  laugh: <FaRegLaughSquint size={20} />,
  emphasis: <BsExclamationDiamond size={20} />,
  question_mark: <BsQuestionCircle size={20} />,
};
