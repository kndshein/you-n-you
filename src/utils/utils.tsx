import { JSX } from 'preact/jsx-runtime';
import { ReactionType } from '../App';
import { FaRegHeart } from 'react-icons/fa6';
import { LuThumbsUp, LuThumbsDown } from 'react-icons/lu';
import { FaRegLaughSquint } from 'react-icons/fa';
import { BsExclamationDiamond, BsQuestionCircle } from 'react-icons/bs';

export const reaction_dict: Array<{ name: ReactionType; icon: JSX.Element }> = [
  {
    name: 'heart',
    icon: <FaRegHeart size={20} />,
  },
  {
    name: 'thumbs_up',
    icon: <LuThumbsUp size={20} />,
  },
  {
    name: 'thumbs_down',
    icon: <LuThumbsDown size={20} />,
  },
  {
    name: 'laugh',
    icon: <FaRegLaughSquint size={20} />,
  },
  {
    name: 'emphasis',
    icon: <BsExclamationDiamond size={20} />,
  },
  {
    name: 'question_mark',
    icon: <BsQuestionCircle size={20} />,
  },
];
