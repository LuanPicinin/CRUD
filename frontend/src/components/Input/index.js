import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';

import { Container, InputText } from './styles';

export default function Input({ disabled, label = 'teste', name }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const [value] = useState(defaultValue);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <Container disabled={disabled}>
      <label>{label}</label>
      <InputText ref={inputRef} defaultValue={value} disabled={disabled} />
    </Container>
  );
}
