import { useEffect, useState, memo } from "react";

import s from "./Mode.module.scss";

type TMode = {
  name: string;
  field: number;
};

interface IModeProps {
  setIsStarted: (value: boolean) => void;
  setSize: (value: number) => void;
  modes: TMode[] | null;
}

const Mode = memo(({ setIsStarted, setSize, modes }: IModeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState<TMode | null>(null);

  const onOptionClick = (mode: TMode) => {
    setIsStarted(false);
    setIsExpanded(false);
    setSelectedMode(mode);
  };

  useEffect(() => {
    if (!modes) {
      return;
    }
    setSelectedMode(modes[0]);
  }, [modes]);

  useEffect(() => {
    if (!selectedMode) {
      return;
    }
    setSize(selectedMode.field);
  }, [selectedMode, setSize]);

  const buttonClassName = isExpanded
    ? `${s.button} ${s.active}`
    : `${s.button}`;
  const expanMenuClassName = isExpanded
    ? `${s.expandMenu} ${s.active}`
    : `${s.expandMenu}`;

  return (
    <div tabIndex={1} className={s.mode} onBlur={() => setIsExpanded(false)}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={buttonClassName}
      >
        {selectedMode?.name || ""}
      </div>
      <div className={expanMenuClassName}>
        {!!modes &&
          modes.map((mode) => (
            <div
              className={s.expandMenu__item}
              key={mode.name}
              onClick={() => onOptionClick(mode)}
            >
              {mode.name}
            </div>
          ))}
      </div>
    </div>
  );
});

export default Mode;
