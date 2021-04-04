import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import arrowDown from '../../assets/arrow-down.png';

import {
  Container,
  ErrorSpan,
  Img,
  Label,
  Options,
  SelectInput,
} from './styles';

export default function Select({
  disabled = false,
  label = 'teste',
  list = [],
  name,
  onSelectElement,
  ...rest
}) {
  const inputLabelRef = useRef(null);
  const inputRef = useRef(null);
  const optionsRef = useRef(null);
  const { defaultValue, error, fieldName, registerField } = useField(name);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (defaultValue !== undefined && inputRef.current && optionsRef.current) {
      const selectedOption = Array.from(optionsRef.current.children).find(
        (option) => option.getAttribute('value') === defaultValue.toString()
      );

      if (inputLabelRef.current) {
        if (selectedOption) {
          inputLabelRef.current.value = selectedOption.innerHTML;
          inputRef.current.value = selectedOption.getAttribute('value') || '';
        }

        if (!selectedOption || defaultValue === undefined) {
          inputLabelRef.current.value = '';
          inputRef.current.value = '';
        }
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref) => {
        return ref.value || '';
      },
      setValue: (ref, selectValue) => {
        if (disabled) return;

        const selectedOption = Array.from(optionsRef.current.children).find(
          (option) => option.getAttribute('value') === selectValue.toString()
        );

        if (inputLabelRef.current) {
          if (selectedOption) {
            inputLabelRef.current.value = selectedOption.innerHTML;
            ref.value = selectedOption.getAttribute('value');
          }

          if (!selectedOption || !selectValue) {
            inputLabelRef.current.value = '';
            ref.value = '';
          }
        }
      },
    });
  }, [disabled, fieldName, registerField]);

  const searchOptions = useCallback(
    (event) => {
      if (!open) setOpen(true);

      if ((event.target.value = '' && inputRef.current))
        inputRef.current.value = '';

      setSearch(event.target.value);
    },
    [open]
  );

  const selectList = useMemo(() => {
    if (search.length) {
      const filteredList = list.filter((element) =>
        element.label.toLowerCase().includes(search.toLowerCase())
      );

      return filteredList;
    }

    return list;
  }, [list, search]);

  return (
    <>
      <Container
        onClick={() => {
          if (disabled) return;

          setSearch('');
          setOpen(!open);

          inputLabelRef.current.focus();
        }}
      >
        <Label disabled={disabled}>{label}</Label>
        <SelectInput
          ref={inputLabelRef}
          disabled={disabled}
          onChange={searchOptions}
          open={open}
          placeholder="Selecione uma opção.."
          {...rest}
        />
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          disabled
          hidden
          {...rest}
        />
        <Img src={arrowDown} alt="genêro" open={open} />
        <Options ref={optionsRef} open={open}>
          {selectList.map((element, key) => (
            <option
              key={key}
              title={element.label}
              value={element.value}
              onClick={async () => {
                setSearch('');

                if (inputLabelRef.current && inputRef.current) {
                  inputLabelRef.current.value = element.label;
                  inputRef.current.value = element.value.toString();
                }

                if (onSelectElement) onSelectElement(element.value);
              }}
            >
              {element.label}
            </option>
          ))}
        </Options>
      </Container>
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </>
  );
}
