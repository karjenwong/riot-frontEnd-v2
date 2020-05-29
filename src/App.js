import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import ChampCard from "./Components/ChampCard"

function App() {
  const url =
    "http://ec2-34-217-208-140.us-west-2.compute.amazonaws.com:8080/riot";
  const [data, setData] = useState([[], []]);
  const [listOfChamps, setListOfChamps] = useState([]);
  useEffect(() => {
    console.log("request champions");
    axios.post(`${url}/championslist`).then(function (response) {
      setListOfChamps(response.data);
    });
  }, []);

  const showChamps = data[0].map((x, i) => <ChampCard key={i} info={x} data={data} setData={setData} />);
  return (
    <>
      <div className="form">
        <SearchForm
          listOfChamps={listOfChamps}
          data={data}
          setData={setData}
          url={url}
        />
      </div>
      <div className="flex flex-wrap">{showChamps}</div>
    </>
  );
}

export default App;
