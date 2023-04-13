import './App.css';
import { Abacus } from './Abacus';

function App() {

  const arr = new Array(13).fill(0).map((el, i) => [
    [17.5 + (30 * i), 0, 5, 200],
    [(30 * i) + 10, 5, 20, 15],
    new Array(4).fill(0).map((ele, j) => [(30 * i) + 10, 200 - ((16 * (j)) + 20), 20, 15])
  ]);

  return (
    <div className="App">
      <h1>Japanese Abacus (soroban)</h1>
     <Abacus data={arr} width="500" height="300" />
    </div>
  );
}

export default App;
