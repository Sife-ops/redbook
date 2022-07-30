import axios from 'axios'
import { commandBody } from '../../../command-body'
import { expect, test } from 'vitest'

test("hello", async () => {

  await axios.post('https://dbq3scig4h.execute-api.us-east-1.amazonaws.com',
    commandBody({
      name: 'prediction',
      options: [
        {
          type: 1,
          name: 'create',
          options: [
            { name: 'conditions', type: 3, value: 'kurt angle' },
            { name: 'judge', type: 6, value: '343675935217680385' }
          ],
        }
      ],
    })
  )
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  const a = 'hello'
  expect(a).toEqual('hello')
})
