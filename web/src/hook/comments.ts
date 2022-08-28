import { useState } from 'react';
import { Comment as CommentType } from '../../../graphql/genql/schema';

const sortComments = (c: CommentType[]) => {
  const comments = c;
  comments.sort((a, b) => {
    return parseInt(b.created_at) - parseInt(a.created_at);
  });
  return comments;
};

export const useComments = (c: CommentType[]) => {
  const [comments, setComments] = useState(sortComments(c));

  const pushComment = (c: any) => {
    setComments(s => {
      return [c, ...s];
    });
  };

  return {
    comments,
    setComments,
    pushComment
  };
};
