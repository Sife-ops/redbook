export const cancel = async (body: any) => {
  console.log('cancel');

  return JSON.stringify({
    type: 4,
    data: {
      content: 'cancel',
    },
  });
};
