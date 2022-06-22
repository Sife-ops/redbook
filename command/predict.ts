export const predict = {
  name: "predict",
  type: 1,
  description: "make a prediction",
  options: [
    {
      type: 3,
      name: "prediction",
      description: "Your prediction in full.",
      required: true,
    },
    {
      type: 6,
      name: "validator",
      description: "The Nth validator for your prediction.",
      required: true,
    },
  ],
};
