# redbook

## features

- battle-tested
- gold standard
- blazingly fast

## usage

- `/prediction`
  - `create <conditions> <judge>`
    - `conditions` string - The conditions of the prediction.
    - `judge` user - The default user to judge the prediction.
  - `cancel <id>`
    - `id` string - Prediction mnemonic ID.
- `/vote <id> <verdict>`
  - `id` string - Prediction mnemonic ID.
  - `verdict` boolean - Your verdict of the prediction.

## todo

- user commands
  - summary
  - predictions
- prediction sub-commands
  - create :heavy_check_mark:
  - ammend
    - save history of edits
  - cancel :heavy_check_mark:
  - add judge
- created-at column for records :heavy_check_mark:
- migrations
- POSTGRES_PORT :heavy_check_mark:
- support AWS RDS
- support TypeOrm
  - `bundle: { nodeModules: ['pg-native'] }`
- delete unused commands
- betting?
