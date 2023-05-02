import Image from "next/image";
import React from "react";

type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar = ({ src, alt }: AvatarProps) => {
  return <Image src={src} alt={alt} fill className="h-8 w-8 rounded-full" />;
};

export default Avatar;
