import axios from 'axios'
import { commandBody } from '../../../command-body'
import { expect, test } from 'vitest'

test("prediction create", async () => {

  const input = {
    conditions: 'kurt angle'
  }

  const res = await axios.post(process.env.REDBOOK_BOT_URL,
    commandBody({
      name: 'prediction',
      options: [
        {
          type: 1,
          name: 'create',
          options: [
            { name: 'conditions', type: 3, value: input.conditions },
            { name: 'judge', type: 6, value: '343675935217680385' }
          ],
        }
      ],
    })
  )

  // sample response
  // {
  //   "type": 4,
  //   "data": {
  //     "embeds": [
  //       {
  //         "title": "New Prediction",
  //         "description": "kurt angle",
  //         "color": 65535,
  //         "fields": [
  //           {
  //             "name": "By",
  //             "value": "<@343675935217680385>",
  //             "inline": true
  //           },
  //           {
  //             "name": "Judge",
  //             "value": "<@343675935217680385>",
  //             "inline": true
  //           },
  //           {
  //             "name": "ID",
  //             "value": "tremendous-repentant-plow",
  //             "inline": false
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }

  expect(res.data.data.embeds[0].description).toEqual(input.conditions)
})
