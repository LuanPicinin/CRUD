import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid;
  border-color: transparent;
  border-radius: 5px;
  font-size: 14px;
  height: 40px;
  min-width: 100px;
  padding: 0 10px;
  white-space: nowrap;

  ${({ color }) => css`
    background-color: ${color}};
    color: #fff;
  `};

  &:hover:enabled {
    ${({ color }) =>
      css`
        background-color: ${shade(0.2, color)};
      `};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  > img {
    filter: invert(100%) sepia(4%) saturate(7470%) hue-rotate(242deg)
      brightness(123%) contrast(101%);
  }
`;
