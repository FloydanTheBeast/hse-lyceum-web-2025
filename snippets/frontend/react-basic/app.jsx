function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Привет от сыновей React'а!</h1>
      <Counter />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
