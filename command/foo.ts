export const foo = {
  name: 'foo',
  description: 'replies with bar',
  options: [
    {
      name: 'user',
      description: 'Get or edit permissions for a user',
      type: 1, // 2 is type SUB_COMMAND_GROUP
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
      name: 'role',
      description: 'Get or edit permissions for a role',
      type: 1,
      options: [
        {
          type: 6,
          name: 'judge',
          description: 'The default judge for your prediction.',
          required: true,
        },
      ],
    },
  ],
};
