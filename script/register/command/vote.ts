export const vote = {
  name: 'vote',
  type: 1,
  description: 'Vote on a prediction.',
  options: [
    {
      type: 3,
      name: 'id',
      description: 'The prediction ID.',
      required: true,
    },
    {
      type: 5,
      name: 'verdict',
      description: 'Your verdict on the prediction.',
      required: true,
    },
  ],
};

