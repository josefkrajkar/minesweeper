import { memo } from "react";

// Types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  neighborMineCount: number;
}

function Button(props: ButtonProps) {
  const { isRevealed, isMine, isFlagged, neighborMineCount, ...restProps } =
    props;

  return (
    <button {...restProps}>
      {isFlagged && "🚩"}
      {isRevealed && isMine && "💣"}
      {isRevealed && !isMine && neighborMineCount > 0 && neighborMineCount}
    </button>
  );
}

export default memo(Button);
