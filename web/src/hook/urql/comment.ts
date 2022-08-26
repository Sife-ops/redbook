import { useTypedMutation } from '../../urql';

export const useCommentMutation = () => {
  return useTypedMutation((vars: { predictionId: string; comment: string }) => {
    return {
      comment: [
        vars,
        {
          __typename: true,
          predictionId: true,
          commentId: true,
          comment: true,
          created_at: true,
          replyTo: true,
          likes: true,
          dislikes: true,

          user: {
            __typename: true,
            userId: true,
            username: true,
            discriminator: true,
            avatar: true,
            created_at: true
          }
        }
      ]
    };
  });
};
