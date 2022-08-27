import { useTypedQuery } from '../../urql';

// todo: not very dry
export const usePredictionsQuery = (userId: string) => {
  return useTypedQuery({
    query: {
      predictions: [
        {
          userId
        },
        {
          __typename: true,
          predictionId: true,
          conditions: true,
          created_at: true,
          verdict: true,
          likes: true,
          dislikes: true,

          user: {
            __typename: true,
            userId: true,
            username: true,
            discriminator: true,
            avatar: true,
            created_at: true
          },

          judges: {
            __typename: true,
            predictionId: true,
            verdict: true,

            user: {
              __typename: true,
              userId: true,
              username: true,
              discriminator: true,
              avatar: true,
              created_at: true
            }
          },

          comments: {
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
            },

            replies: {
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
          }
        }
      ]
    }
  });
};
