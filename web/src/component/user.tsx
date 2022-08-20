import React, { useEffect, useState } from 'react';
import { useAvatar } from '../hook/avatar';

interface props {
  userId: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export const User: React.FC<{ user: props }> = (props) => {
  const {
    avatar,
    discriminator,
    username,
    userId,
  } = props.user;

  const { avatarImg, fetchAvatar } = useAvatar();

  useEffect(() => {
    fetchAvatar({ userId, avatar });
  }, [])

  return (
    <div>
      {avatarImg && <img src={avatarImg} alt="icons" />}
      {username}#{discriminator}
    </div>
  )
}


