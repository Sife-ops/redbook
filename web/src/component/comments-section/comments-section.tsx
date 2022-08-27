import 'twin.macro';
import React from 'react';
import { Comment as CommentType } from '@redbook/graphql/genql/schema';
import { useComments } from '../../hook/comments';
import { CommentForm } from './comment-form';
import { Comments } from './comments';

export const CommentsSection: React.FC<{
  comments: CommentType[];
  predictionId: string;
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const { comments, pushComment } = useComments(props.comments);

  // todo: comment count
  return (
    <div>
      <div tw="mb-4">
        <CommentForm
          predictionId={props.predictionId}
          pushComment={pushComment}
          user={props.user}
        />
      </div>
      <Comments type="comments" comments={comments} user={props.user} />
    </div>
  );
};
