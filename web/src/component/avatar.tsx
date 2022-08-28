import 'twin.macro';
import React, { useEffect } from 'react';
import { useAvatar } from '../hook/avatar';

export const Avatar: React.FC<{
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const { avatar, userId } = props.user;
  const { avatarImg, fetchAvatar } = useAvatar();

  useEffect(() => {
    fetchAvatar({ userId, avatar });
  }, []);

  return (
    <div tw="min-w-[48px] max-w-[48px]">
      {avatarImg && <img tw="rounded-full" src={avatarImg} alt="icons" />}
    </div>
  );
};
