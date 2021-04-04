import React, { useEffect } from 'react';

import { Container } from './styles';

export default function Notification({ status, message, handleClose }) {
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 5000);
  }, [handleClose]);

  let color;

  switch (status) {
    case 'warning':
      color = '#fff49a';
      break;
    case 'error':
      color = '#f7867e';
      break;
    default:
      color = '#7cb342';
  }

  return (
    <Container color={color}>
      <span>{message}</span>
    </Container>
  );
}
