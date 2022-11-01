import { memo } from 'react';

import s from 'components/hoverSquares/HoverSquares.module.scss';

interface IHoverSquaresProps {
  fieldState: number[][] | null;
}

const HoverSquares = memo(({ fieldState }: IHoverSquaresProps) => {
  const hoverItems = fieldState?.map((row, y) =>
    row
      .sort((a, b) => a - b)
      .map((col) => (
        <div className={s.item} key={`${y}${col}`}>
          row {y + 1} col {col + 1}
        </div>
      )),
  );

  return (
    <div className={s.wrapper}>
      <h1>Hover Squares</h1>
      <div className={s.hoverItems}>{hoverItems || null}</div>
    </div>
  );
});

export default HoverSquares;
