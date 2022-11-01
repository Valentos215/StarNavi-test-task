import { useState } from 'react';

import MainArea from 'components/mainArea/MainArea';
import HoverSquares from 'components/hoverSquares/HoverSquares';

import 'App.css';

function App() {
  const [fieldState, setFieldState] = useState<number[][] | null>(null);

  return (
    <div className="app-wrapper">
      <MainArea fieldState={fieldState} setFieldState={setFieldState} />
      <HoverSquares fieldState={fieldState} />
    </div>
  );
}

export default App;
