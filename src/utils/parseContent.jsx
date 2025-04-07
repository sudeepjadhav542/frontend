// src/utils/parseContent.ts
import React from 'react';

const parseContent = (content) => {
  const paragraphs = content.split('\n').map((paragraph, index) => {
    if (paragraph.startsWith('##')) {
      return <h3 key={`sub-title-${index}`}>{paragraph.slice(2).trim()}</h3>;
    } else if (paragraph.startsWith('#')) {
      return <h2 key={`title-${index}`}>{paragraph.slice(1).trim()}</h2>;
    } else {
      return <p key={`paragraph-${index}`}>{paragraph.trim()}</p>;
    }
  });

  return <>{paragraphs}</>;
};

export default parseContent;