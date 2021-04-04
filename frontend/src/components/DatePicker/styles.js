import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  position: relative;
  width: 300px;
  z-index: 20;

  .react-datepicker__day--outside-month {
    color: #d6d6d6 !important;
  }

  .react-datepicker__day--disabled {
    color: #d6d6d6 !important;
  }

  .react-datepicker__day--today {
    font-weight: initial;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--keyboard-selected {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    border: 2px solid #888;
    background-color: #f2f6fb;
    font-weight: normal;

    &.differentMonth {
      border: 0;
    }
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    height: 26px;
    width: 26px;
    line-height: 1.5rem;
    color: #444;
    margin: 0 2px;
  }

  .react-datepicker__month-container {
    width: 100%;
    border-radius: 0 0 5px 5px;
    -webkit-box-shadow: 1px 1px 6px #000;
    box-shadow: 1px 1px 6px
      ${({ theme: { colors } }) => transparentize(0.9, '#000')};
  }

  .react-datepicker__month-text {
    padding-top: 13px;
    font-size: 15px;
    height: 3rem;
    width: 3rem;
  }

  .react-datepicker__month--selected,
  .react-datepicker__month--selected:hover {
    color: #000;
    border: 2px solid #888;
    background-color: #f2f6fb;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    justify-content: center;
  }

  .date-calendar {
    display: flex;
    justify-content: center;

    width: 100%;
    border: none;
    margin-top: 2px;
    background-color: white;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    width: 100%;
    margin-top: 1px !important;

    .react-datepicker__header {
      border: none;
      background-color: white;

      .react-datepicker__current-month {
        text-transform: capitalize;
        font-weight: normal;
        color: #444;
      }

      .react-datepicker__day-name {
        color: #888;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
  .date-picker {
    width: 300px;
    height: 40px;
    z-index: -10;

    padding: 5px;

    color: #444;
    background-color: white;
    border: none;
    box-shadow: 0px 3px 4px 0px #cccccc50;
    font-size: 14px;

    ${(props) => {
      if (props.open) {
        return css`
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        `;
      }
      return css`
        border-radius: 5px;
      `;
    }}

    &::placeholder {
      font-size: 14px;
    }
  }
`;

export const DateButton = styled.button`
  height: 25px;
  width: 25px;
  line-height: 1.3rem;
  border-radius: 50%;
  border: 2px solid;
  background-color: #f2f6fb;

  &:not(:disabled) {
    border-color: #444;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;

  ${({ disabled }) => {
    return css`
      color: ${disabled ? '#ddd' : '#171717'};
    `;
  }}
`;

export const Img = styled.img`
  position: absolute;
  top: 27px;
  right: 15px;
  z-index: 10;
  height: 20px;
  width: 20px;
`;

export const MonthHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  font-size: 16px;
  margin-bottom: 10px;

  > h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #444;
  }
`;

export const ErrorSpan = styled.span`
  display: block;
  color: #e53e3e;
  margin-top: 5px;
  margin-left: 31px;
  font-size: 12px;
  font-weight: 300;
  text-align: start;
`;
