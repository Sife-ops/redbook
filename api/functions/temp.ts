import { APIGatewayProxyEventV2 } from 'aws-lambda';
import Joi from 'joi';

const steps = [
  {
    name: 'validation',
    action: async (context: any) => {
      const body = JSON.parse(context.event.body);

      const joiOptions = { allowUnknown: true }
      const interactionTypeSchema = Joi.object({
        body: Joi.object({
          type: Joi.number()
        })
      }).options(joiOptions);

      const { error, value } = interactionTypeSchema.validate(body);
      if (error) throw new Error('ree');

      return {
        body,
        interactionType: value.type
      }
    },
    onError: (a: any, b: any) => {
      console.log('ree')
    }
  }
]

export const temp = async (event: APIGatewayProxyEventV2) => {
  let context = {
    event,
    returns: null
  };

  for (const step of steps) {
    try {
      context = {
        ...context,
        [step.name]: await step.action(context)
      };
    } catch (error) {
      if (step.onError) {
        step.onError(context, error);
      } else {
        console.error(`error: ${step.name} had an error`);
        throw error;
      }
    }
  }

  console.log(context)

  return context.returns
}
