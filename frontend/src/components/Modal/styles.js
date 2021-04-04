import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #17171750;

  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 0px) and (max-width: 449px) {
    width: 350px;
    height: 550px;
  }

  @media (min-width: 450px) and (max-width: 700px) {
    width: 350px;
    height: 550px;
  }

  width: 675px;
  height: 350px;

  padding: 25px;

  border-radius: 5px;
  background-color: #ebebeb;

  > form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    height: 100%;

    > div {
      margin-top: 10px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  width: 100%;

  flex-grow: 1;

  > button:first-child {
    margin-right: 15px;
  }
`;
