import ReactDOM from 'react-dom/client';

import { useEffect, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(interval); // очистка таймера при размонтировании
  }, []);

  useEffect(() => {
    console.log('Счётчик изменился')
  }, [count])

  return <p>Счётчик: {count}</p>;
}

export const App = () => {
  return <><h1>Test</h1><Timer /></>
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);