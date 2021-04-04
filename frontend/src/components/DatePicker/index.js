import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { setDefaultLocale, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from '@unform/core';
import { getMonth, getYear } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { Container, DateButton, Label, MonthHeader, ErrorSpan } from './styles';

export default function SelectDate({
  name,
  label,
  handleChange,
  monthly,
  placeholder,
  disabled = false,
  ...rest
}) {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);
  registerLocale('br', br);
  setDefaultLocale('br');

  useEffect(() => {
    registerField({
      ref: datePickerRef.current.input,
      name: fieldName,
      setValue: (ref, value) => {
        setSelectedDate(value);
      },
      getValue: (ref) => {
        if (ref.value.length === 7) {
          return `01/${ref.value}`;
        }

        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <>
      <Container id={`datepicker-${fieldName}`} open={open}>
        <Label
          disabled={disabled}
          onClick={() => {
            setOpen(true);
          }}
        >
          {label}
        </Label>

        <DatePicker
          ref={datePickerRef}
          open={open}
          showMonthYearPicker={monthly}
          locale={br}
          formatWeekDay={(weekDay) => weekDay.substr(0, 1)}
          dateFormat={monthly ? 'MM/yyyy' : 'dd/MM/yyyy'}
          showPopperArrow={false}
          selected={selectedDate}
          useWeekdaysShort
          className="date-picker"
          calendarClassName="date-calendar"
          dayClassName={(day) =>
            getMonth(day) !== getMonth(selectedDate) ? 'differentMonth' : ''
          }
          placeholderText={placeholder || 'Selecione uma data'}
          onInputClick={() => {
            setOpen(true);
          }}
          onClickOutside={() => {
            setOpen(false);
          }}
          onChange={(newDate) => {
            if (handleChange) {
              handleChange(newDate);
            }
            setSelectedDate(newDate);
            setOpen(false);
          }}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
          }) => (
            <MonthHeader>
              <DateButton
                type="button"
                onClick={monthly ? decreaseYear : decreaseMonth}
                disabled={
                  monthly ? prevYearButtonDisabled : prevMonthButtonDisabled
                }
              >
                {'<'}
              </DateButton>
              <h1>
                {!monthly && months[getMonth(date)]} {getYear(date)}
              </h1>
              <DateButton
                type="button"
                onClick={monthly ? increaseYear : increaseMonth}
                disabled={
                  monthly ? nextYearButtonDisabled : nextMonthButtonDisabled
                }
              >
                {'>'}
              </DateButton>
            </MonthHeader>
          )}
          {...rest}
        />
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </Container>
    </>
  );
}
