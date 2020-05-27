import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SearchForm({ listOfChamps, url, setData, data }) {
  const [query, setQuery] = useState("");

  const search = (e) => {
    const closestMatch = listOfChamps.find((x) =>
      x.toLowerCase().includes(query.toLowerCase())
    );
    axios.post(`${url}/champions`, { name: closestMatch }).then((res) => {
      console.log("fetch champion data");
      setData([...data, res.data]);
    });
  };

  const queryValue = (e) => setQuery(e.target.value);

  const enter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      search();
    }
  };

  const filterList = listOfChamps
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
    .map((x) => {
      return <div>{x}</div>;
    });
  return (
    <Form>
      <input type="text" onChange={queryValue} onKeyDown={enter} />
      <Button onClick={search}>Submit</Button>
      <div>{query ? filterList : ""}</div>
    </Form>
  );
}

export default SearchForm;
