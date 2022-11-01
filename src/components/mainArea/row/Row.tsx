import { memo } from "react";

import s from "./Row.module.scss";

interface IRowProps {
  y: number;
  fieldState: number[][];
  setFieldState: (value: number[][]) => void;
  isStarted: boolean;
}

const Row = memo(({ y, fieldState, setFieldState, isStarted }: IRowProps) => {
  const onSquareHover = (x: number) => {
    if (!isStarted) {
      return;
    }
    setFieldState(
      fieldState.map((row, i) => {
        if (i === y) {
          if (fieldState[y].includes(x)) {
            return fieldState[y].filter((el) => el !== x);
          } else {
            return [...fieldState[y], x];
          }
        }
        return row;
      })
    );
  };

  const squareClassName = (x: number) => {
    if (fieldState[y].includes(x)) {
      return `${s.square} ${s.picked}`;
    }
    return `${s.square}`;
  };

  return (
    <div className={s.row}>
      {fieldState.map((row, i) => (
        <div
          key={i}
          className={squareClassName(i)}
          onMouseEnter={() => onSquareHover(i)}
        ></div>
      ))}
    </div>
  );
});

export default Row;
