# redbook

The best prediction record-keeping bot in the universe!

## features

- battle-tested
- gold standard
- batteries-included
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

- migrate to ElectroDB
- Color scheme
- Shell REDBOOK_ENV overwrites .env file, consider changing
- update usage
- user commands
  - summary :heavy_check_mark:
  - predictions :heavy_check_mark:
- prediction sub-commands
  - create :heavy_check_mark:
  - cancel :heavy_check_mark:
  - add judge :heavy_check_mark:
- created-at column for records :heavy_check_mark:
- migrations
- POSTGRES_PORT :heavy_check_mark:
- support AWS RDS
- support TypeOrm
  - `bundle: { nodeModules: ['pg-native'] }` :x:
    - will not work due to 'import-metadata' and esbuild
- delete unused commands :heavy_check_mark:
- betting?
