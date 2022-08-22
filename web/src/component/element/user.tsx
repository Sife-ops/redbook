import React, { useEffect } from 'react';
import { useAvatar } from '../../hook/avatar';

interface props {
  user: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string;
    verdict?: boolean | null;
  }
}

const verdict = (i: boolean | null) => {
  if (i === true) {
    return 'in favor'
  } else if (i === false) {
    return 'against'
  } else {
    return 'undecided'
  }
}

export const User: React.FC<props> = (props) => {
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
      {props.user.verdict !== undefined && verdict(props.user.verdict)}
    </div>
  )
}


