import React, {useState} from 'react';
import './global.css';
import Header from './Header';
import RoutesMy from './routes';

export default function App() {

  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }

  return (
    //JSX JavaScript XML
    <div style={{padding:'10px'}}>

      {/*<Header
        title=""
        counter={counter}
      />

      <button style={{padding:'5px'}} onClick={increment}>Add</button>
      <button style={{padding:'5px'}} onClick={decrement}>Sub</button>*/}

      <RoutesMy/>

    </div>

  );

}
