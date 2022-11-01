import { memo, useState, useEffect } from "react";

import { range } from "utils/utils";
import Row from "components/mainArea/row/Row";
import Mode from "components/mainArea/mode/Mode";
import Preloader from "components/mainArea/preloader/Preloader";
import useGetModes from "components/mainArea/mode/hooks/useGetModes";

import s from "./MainArea.module.scss";

type TMode = {
  name: string;
  field: number;
};

interface IMainAreaProps {
  fieldState: number[][] | null;
  setFieldState: (value: number[][]) => void;
}

const MainArea = memo(({ fieldState, setFieldState }: IMainAreaProps) => {
  const [size, setSize] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [modes, setModes] = useState<TMode[] | null>(null);

  const { isLoading, response, error, doFetch } = useGetModes();

  const buttonClassName = isStarted
    ? `${s.button} ${s.disabled}`
    : `${s.button}`;

  useEffect(() => {
    if (!size) {
      return;
    }
    setFieldState(range(size));
  }, [size, setFieldState]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setModes(response);
    setSize(response[0].field);
  }, [response]);

  const isError = !!error || (!isLoading && !response && !error);

  if (isError) {
    return <h2>Something went wrong</h2>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.head}>
        <Mode setIsStarted={setIsStarted} setSize={setSize} modes={modes} />
        <button onClick={() => setIsStarted(true)} className={buttonClassName}>
          START
        </button>
      </div>
      <div className={s.field}>
        {!!fieldState &&
          fieldState.map((row, i) => (
            <Row
              key={i}
              y={i}
              fieldState={fieldState}
              setFieldState={setFieldState}
              isStarted={isStarted}
            />
          ))}
        {isLoading && <Preloader />}
      </div>
    </div>
  );
});

export default MainArea;
