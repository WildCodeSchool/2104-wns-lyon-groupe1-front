import React from 'react';

export default function PageTitle({ textColor, content }: any) {
  return <h2 style={{ color: `${textColor}` }}> {content} </h2>;
}
