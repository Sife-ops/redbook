// todo: only if running integration
export const setup = () => {
  if (!process.env.REDBOOK_BOT_URL) {
    throw new Error(`
You must run with REDBOOK_BOT_URL defined, eg:
REDBOOK_BOT_URL='https://abcdefghij.execute-api.us-east-1.amazonaws.com' npm test
    `)
  }
}
