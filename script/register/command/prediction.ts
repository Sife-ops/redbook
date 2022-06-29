export const prediction = {
  name: 'prediction',
  description: 'Make a prediction.',
  options: [
    {
      name: 'cancel',
      description: 'Cancel a prediction.',
      type: 1,
      options: [
        {
          type: 3,
          name: 'id',
          description: 'The prediction ID.',
          required: true,
        },
      ],
    },
    {
      name: 'create',
      description: 'Create a prediction.',
      type: 1,
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
    },
    {
      name: 'judge',
      description: 'Add a judge to a prediction.',
      type: 1,
      options: [
        {
          type: 3,
          name: 'id',
          description: 'The prediction ID.',
          required: true,
        },
        {
          type: 6,
          name: 'judge',
          description: 'The judge for your prediction.',
          required: true,
        },
      ],
    },
  ],
};