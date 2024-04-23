import { JSX } from 'preact/jsx-runtime';
import { ReactionType } from '../App';
import { FaRegHeart } from 'react-icons/fa6';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { FaRegLaughSquint } from 'react-icons/fa';
import { BsExclamationDiamond, BsQuestionCircle } from 'react-icons/bs';

type ReactionDict = {
  [reaction in ReactionType]: (size: number) => JSX.Element;
};

export const reaction_dict: ReactionDict = {
  heart: (size) => <FaRegHeart size={size} />,
  thumbs_up: (size) => <LuThumbsUp size={size} />,
  thumbs_down: (size) => <LuThumbsDown size={size} />,
  laugh: (size) => <FaRegLaughSquint size={size} />,
  emphasis: (size) => <BsExclamationDiamond size={size} />,
  question_mark: (size) => <BsQuestionCircle size={size} />,
};
