import { redbookModel } from '@redbook/lib/db';

// todo: implicit any
export const handler = async (event: any) => {

  const onboardUser = JSON.parse(event.Records[0].body)

  const found = await redbookModel
    .entities
    .UserEntity
    .query
    .user({
      userId: onboardUser.id,
    })
    .go();

  if (found.length < 1) {
    console.log('user not found')

    await redbookModel
      .entities
      .UserEntity
      .create({
        userId: onboardUser.id,
        username: onboardUser.username,
        discriminator: onboardUser.discriminator,
        avatar: onboardUser.avatar,
      })
      .go()

    console.log('user record created');
  } else {
    console.log('user found')

    const user = found[0];

    const onboardUserFields = {
      username: onboardUser.username,
      discriminator: onboardUser.discriminator,
      avatar: onboardUser.avatar
    };

    for (const field in onboardUserFields) {
      // todo: no feel like writing good code today
      // @ts-ignore
      if (onboardUserFields[field] !== user[field]) {
        await redbookModel
          .entities
          .UserEntity
          .update({
            userId: user.userId,
          })
          .set({
            username: onboardUserFields.username,
            discriminator: onboardUserFields.discriminator,
            avatar: onboardUserFields.avatar,
          })
          .go()

        console.log('user record updated');

        break;
      }
    }
  }

  return {};
}

