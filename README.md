# redbook

The best prediction record-keeping bot in the universe!

## features

- battle-tested
- gold standard
- blazingly fast

## usage

- `/prediction`
  - `create <conditions> <judge>` - Create a prediction.
    - `conditions` string - The conditions of the prediction.
    - `judge` user - The default user to judge the prediction.
  - `cancel <id>` - Cancel a prediction.
    - `id` string - Prediction mnemonic ID.
- `/vote <id> <verdict>`
  - `id` string - Prediction mnemonic ID.
  - `verdict` boolean - Your verdict of the prediction.
- `/user`
  - `summary <user>` - Summary of user statistics.
  - `predictions <user>` - List a user's predictions.

## todo

- user commands :heavy_check_mark:
  - summary :heavy_check_mark:
  - predictions :heavy_check_mark:
- prediction sub-commands
  - create :heavy_check_mark:
  - cancel :heavy_check_mark:
  - add judge
- created-at column for records :heavy_check_mark:
- migrations
- POSTGRES_PORT :heavy_check_mark:
- support AWS RDS
- support TypeOrm
  - `bundle: { nodeModules: ['pg-native'] }`
- delete unused commands :heavy_check_mark:
- betting?
