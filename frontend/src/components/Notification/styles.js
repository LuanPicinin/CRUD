import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 200px;
  height: 65px;

  padding: 10px;

  right: 0;
  bottom: 25px;
  z-index: 100;

  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;

  background-color: ${({ color }) => color};

  > span {
    color: white;
  }
`;
