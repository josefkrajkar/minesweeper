import styled from "styled-components";

import Button from "./Button";

export const StyledButton = styled(Button)<{
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  neighborMineCount: number;
}>`
  font-size: 1.125rem;
  font-weight: bold;
  font-family: Arial, sans-serif;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.isRevealed
      ? props.isMine
        ? "#FF4C4C"
        : "#E0E0E0"
      : props.isFlagged
        ? "#BDBDBD"
        : "#BDBDBD"};
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #7b7b7b;
  border-right: 2px solid #7b7b7b;
  border: ${(props) => (props.isRevealed ? "1px solid #7B7B7B" : undefined)};
  color: ${(props) => {
    switch (props.neighborMineCount) {
      case 1:
        return "#0000FF";
      case 2:
        return "#008200";
      case 3:
        return "#FF0000";
      case 4:
        return "#000084";
      case 5:
        return "#840000";
      case 6:
        return "#008284";
      case 7:
        return "#000000";
      case 8:
        return "#808080";
      default:
        return "#000000";
    }
  }};
`;
