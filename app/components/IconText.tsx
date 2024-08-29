import React from "react";

import { IconType } from "react-icons";

interface IconTextProps {
  icon: IconType;
  text: string;
  css?: string;
  size?: number;
}

const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  text,
  css,
  size = 20,
}) => {
  return (
    <div className="flex flex-row gap-1 text-neutral-400">
      <Icon size={size} />
      <p>{text}</p>
    </div>
  );
};

export default IconText;
