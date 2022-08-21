# redbook

The best prediction record-keeping bot in the universe!

## features

- battle-tested
- gold standard
- batteries-included
- blazingly fast

## usage (outdated)

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

1.
  - vote on predictions in web
  - user summary in web
    - remove user prediction subcommands
    - move /user summary to /user
    - /help command
  - bug can't /prediction judge add user with no avatar!!!
  - user predictions page
  - update packages
  - io-ts validation
  - banner
  - secrets manager
2.
  - update exportJsonLambda
  - responsive comment
  - finish migrating judges in dynamodb
  - edit comment
  - track mnemonic collisions
  - banned list
  - integration tests
  - Color scheme
  - update usage
  - Shell REDBOOK_ENV overwrites .env file, consider changing
  - betting?

## done

- fetch avatars
- link text
- delete kysely model
- token secret
- prediction sub-commands
  - create :heavy_check_mark:
  - cancel :heavy_check_mark:
  - add judge :heavy_check_mark:
- created-at column for records :heavy_check_mark:
- support TypeOrm
  - `bundle: { nodeModules: ['pg-native'] }` :x:
    - will not work due to 'import-metadata' and esbuild
- POSTGRES_PORT :heavy_check_mark:
- delete unused commands :heavy_check_mark:
- migrate to ElectroDB :heavy_check_mark:
- user commands
  - summary :heavy_check_mark:
  - predictions :heavy_check_mark:
