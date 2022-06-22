export const prediction = {
  // todo: delete 'predict' command
  name: 'prediction',
  type: 1,
  description: 'Make a prediction.',
  options: [
    {
      type: 3,
      name: 'conditions',
      description: 'The conditions for the prediction being true.',
      required: true,
    },
    {
      type: 6,
      name: 'judge',
      description: 'The default judge for your prediction.',
      required: true,
    },
  ],
};
