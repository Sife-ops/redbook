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
          name: 'id',
          description: 'The prediction ID.',
          type: 3,
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
          name: 'conditions',
          description: 'The conditions for the prediction being true.',
          type: 3,
          required: true,
        },
        {
          name: 'judge',
          description: 'The default judge for your prediction.',
          type: 6,
          required: true,
        },
      ],
    },
    {
      name: 'judge',
      description: 'Manage judges.',
      type: 2,
      options: [
        {
          name: 'add',
          description: 'Add a judge to a prediction.',
          type: 1,
          options: [
            {
              name: 'id',
              description: 'The prediction ID.',
              type: 3,
              required: true,
            },
            {
              name: 'judge',
              description: 'The judge for your prediction.',
              type: 6,
              required: true,
            },
          ],
        },
        {
          name: 'remove',
          description: 'Remove a judge from a prediction.',
          type: 1,
          options: [
            {
              name: 'id',
              description: 'The prediction ID.',
              type: 3,
              required: true,
            },
            {
              name: 'judge',
              description: 'The judge for your prediction.',
              type: 6,
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
