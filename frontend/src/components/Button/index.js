import React from 'react';

import { Container } from './styles';

export default function Button({
  handleClick,
  color = '#ff9d2e',
  children,
  ...rest
}) {
  return (
    <Container color={color} onClick={handleClick} {...rest}>
      {children}
    </Container>
  );
}
