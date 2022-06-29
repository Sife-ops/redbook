export const user = {
  name: 'user',
  description: 'User information.',
  options: [
    {
      name: 'summary',
      description: 'User summary.',
      type: 1,
      options: [
        {
          type: 6,
          name: 'user',
          description: 'user',
          required: true,
        },
      ],
    },
    {
      name: 'predictions',
      description: 'List predictions.',
      type: 2,
      options: [
        {
          name: 'all',
          description: 'List all predictions.',
          type: 1,
          options: [
            {
              type: 6,
              name: 'user',
              description: 'user',
              required: true,
            },
          ],
        },
        {
          name: 'correct',
          description: 'List correct predictions.',
          type: 1,
          options: [
            {
              type: 6,
              name: 'user',
              description: 'user',
              required: true,
            },
          ],
        },
        {
          name: 'incorrect',
          description: 'List incorrect predictions.',
          type: 1,
          options: [
            {
              type: 6,
              name: 'user',
              description: 'user',
              required: true,
            },
          ],
        },
        {
          name: 'undecided',
          description: 'List undecided predictions.',
          type: 1,
          options: [
            {
              type: 6,
              name: 'user',
              description: 'user',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
