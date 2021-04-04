import { shade, transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

export const Filters = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 64%;
  height: 80px;

  > form {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    > button {
      margin-left: 20px;
    }
  }
`;

export const Content = styled.div`
  width: 64%;
  height: 72%;

  background-color: #ebebeb;

  border-radius: 5px;

  box-shadow: 0px 2px 5px 1px #20202020;
`;

export const DivTable = styled.div`
  position: relative;
  width: 100%;

  border-radius: 5px;
  overflow: auto;

  @media (max-width: 1366px) {
    max-height: 450px;
  }

  @media (min-width: 1920px) {
    max-height: 674px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    width: 100%;
    background-color: #cfd5e1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  tr {
    &:nth-child(even) {
      background: #ddd;
    }

    th {
      height: 40px;
      padding: 8px 30px;

      top: 0;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      white-space: nowrap;

      background-color: transparent;
      color: ${() => transparentize(0.5, '#171717')};
    }

    > div {
      width: 100%;
    }

    td {
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      padding: 10px 30px;

      max-width: 350px;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    td:last-child {
      padding: 5px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      button {
        min-width: 0;
        width: 30px;
        height: 30px;

        margin: 0 7.5px;
        padding: 3px 3px;
        border-radius: 5px;

        img {
          z-index: 2;
          width: 15px;
          height: 15px;
          filter: invert(100%) sepia(4%) saturate(7470%) hue-rotate(242deg)
            brightness(123%) contrast(101%);
        }
      }
    }
  }
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  width: 50px;
  height: 50px;

  border: none;
  border-radius: 50%;

  background-color: #ff9d2e;
  box-shadow: 0px 0px 10px 5px #20202050;

  right: 21%;
  top: 80%;
  z-index: 50;

  &:hover {
    background-color: ${shade(0.2, '#ff9d2e')};
  }

  > img {
    width: 20px;
    height: 20px;

    filter: invert(100%) sepia(4%) saturate(7470%) hue-rotate(242deg)
      brightness(123%) contrast(101%);
  }
`;
