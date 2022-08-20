import { useState } from 'react';

export const useAvatar = () => {
  const [avatarImg, setAvatar] = useState<string | undefined>();

  const fetchAvatar = async (user: { userId: string, avatar: string }) => {
    const res = await fetch(`https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setAvatar(imageObjectURL);
  };

  return {
    avatarImg,
    fetchAvatar
  }
}

