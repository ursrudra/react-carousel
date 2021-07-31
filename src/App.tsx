import React, { useState, useEffect } from "react";
import "./App.css";
import  Carousel  from "./components/carousel/Carousel";
import { IProps as IState } from "./components/interfaces";

function App(): JSX.Element {
  const [data, setData] = useState<Array<IState> | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./api/cars.json");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <main className="App">
       { data ? <Carousel data={data} /> : <h3 className="loading">Loading</h3>}
    </main>
  );
}

export default App;
