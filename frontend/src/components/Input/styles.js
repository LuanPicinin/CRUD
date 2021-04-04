import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;

  > label {
    font-weight: bold;

    ${({ disabled }) => {
      return css`
        color: ${disabled ? '#ccc' : '#171717'};
      `;
    }}
  }
`;

export const InputText = styled.input`
  height: 40px;

  padding: 5px;

  border: none;
  border-radius: 5px;
  box-shadow: 0px 3px 4px 0px #cccccc50;
  font-size: 14px;

  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;

    &::placeholder {
      color: #ddd;
    }
  }
`;
