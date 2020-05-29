import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

function SearchForm({ listOfChamps, url, setData, data }) {
  const [query, setQuery] = useState("");
  const search = (champ) => {
    if (typeof champ === "object") champ = null;

    const closestMatch =
      champ ||
      listOfChamps.find((x) => x.toLowerCase().includes(query.toLowerCase()));

    if (query === "" || !closestMatch) {
      console.log("invalid query, do not make a post request");
      alert("invalid query");
      return;
    }
    if (data[1].includes(closestMatch)) {
      console.log("already exists in data, move to end of list");
      let index = data[1].indexOf(closestMatch);
      let move = data.map((arr) => {
        let temp = arr.splice(index, 1);
        return [...arr, ...temp];
      });

      setData(move);

      return;
    }

    axios.post(`${url}/champions`, { name: closestMatch }).then((res) => {
      console.log("fetch champion data");
      setData([
        [...data[0], res.data],
        [...data[1], closestMatch],
      ]);
    });
    setQuery("");
  };

  const queryValue = (e) => setQuery(e.target.value);

  const enter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      search();
      e.target.value = "";
    }
  };

  const filterList = listOfChamps
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
    .map((x, i) => (
      <ListGroup.Item variant="dark" onClick={() => search(x)} key={i}>
        {x.replace(/[A-Z]/g, (x) => " " + x)}
      </ListGroup.Item>
    ))
    .slice(0, 6);
  return (
    <Form>
      <input type="text" onChange={queryValue} onKeyDown={enter} />
      <Button onClick={search}>Submit</Button>
      <ListGroup
        style={{ position: "absolute", backgroundColor: "beige", zIndex: "1" }}
      >
        {query ? filterList : ""}
      </ListGroup>
    </Form>
  );
}

export default SearchForm;
