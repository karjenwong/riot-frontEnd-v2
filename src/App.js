import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";

const url =
  "http://ec2-34-217-208-140.us-west-2.compute.amazonaws.com:8080/riot";

function App() {
  const [data, setData] = useState([]);
  const [listOfChamps, setListOfChamps] = useState([]);

  useEffect(() => {
    axios.post(`${url}/championslist`).then(function (response) {
      setListOfChamps(response.data);
    });
  }, []);

  console.log(data);
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
    <div>Filler</div>
    </>
  );
}

export default App;
