import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;

  cursor: pointer;

  border-radius: ${({ open }) => (open ? '5px 5px 0 0' : '5px')};
`;

export const Label = styled.div`
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? '#ccc' : '#171717')};
`;

export const SelectInput = styled.input`
  height: 40px;
  padding: 5px;

  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 14px;
  border: none;
  border-radius: ${({ open }) => (open ? '5px 5px 0 0' : '5px')};
  box-shadow: 0px 3px 4px 0px #cccccc50;

  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;

    &::placeholder {
      color: #ddd;
    }
  }

  &::placeholder {
    font-size: 14px;
  }
`;

export const Options = styled.div`
  position: absolute;
  width: 300px;
  max-height: 155px;
  margin-top: 60px;

  cursor: pointer;
  overflow: auto;
  z-index: 50;
  box-shadow: 0px 3px 4px 0px #cccccc50;

  option {
    width: 100%;
    padding: 5px 10px;

    overflow: hidden;
    text-overflow: ellipsis;

    background-color: white;

    &:hover:enabled {
      background-color: #d6d6d6;
    }

    &:last-child {
      border-radius: 0 0 5px 5px;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  ${({ open }) => {
    return css`
      display: ${open ? 'block' : 'none'};
      border-radius: 0 0 5px 5px;
    `;
  }}
`;

export const Img = styled.img`
  position: absolute;
  width: 10px;
  height: 5px;
  margin: 15px 30px 0 0;
  margin-top: 35px;
  margin-left: 275px;

  transform: ${({ open }) => (open ? 'rotate(180deg)' : '')};

  ${({ disabled }) => {
    return css`
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      filter: ${disabled
        ? 'filter: invert(91%) sepia(0%) saturate(0%) hue-rotate(95deg) brightness(92%) contrast(88%)'
        : 'filter: invert(1%) sepia(1%) saturate(639%) hue-rotate(324deg) brightness(92%) contrast(84%)'};
    `;
  }}
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
