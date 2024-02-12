// src/Message.tsx
import React from 'react';

interface MessageProps {
  author: string;
  text: string;
}

const Message: React.FC<MessageProps> = ({ author, text }) => {
  return (
    <div>
      <strong>{author}</strong>: {text}
    </div>
  );
}

export default Message;
