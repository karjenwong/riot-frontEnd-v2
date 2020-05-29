import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ChampCard({ info, data, setData }) {
  const { name, title, stats } = info;
  const format = (x) => {
    x = x.replace(
      /damage|speed|regen|range/g,
      (x) => " " + x[0].toUpperCase() + x.slice(1)
    );
    return x[0].toUpperCase() + x.slice(1);
  };
  const perLevelStats = Object.keys(stats)
    .filter((x) => x.includes("perlevel"))
    .map((x, i) => {
      if (x === "critperlevel") return null;
      let stat = x.slice(0, x.indexOf("per"));
      return (
        <ListGroup.Item key={i}>
          {stat === "spellblock" ? "Magic Resist" : format(stat)}:{" "}
          {stats[stat].toFixed(0)}- {(stats[x] * 17 + stats[stat]).toFixed(0)}
        </ListGroup.Item>
      );
    });

  const flatLevelStats = ["attackrange", "movespeed"].map((x, i) => (
    <ListGroup.Item key={i}>
      {format(x)}: {stats[x]}
    </ListGroup.Item>
  ));
  return (
    <Card style={{ width: "18rem" }}>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => {
          console.log("Closed " + name);
          setData([
            data[0].filter((x) => x.id !== name),
            data[1].filter((x) => x !== name),
          ]);
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <Card.Body>
        <div className="flex flex-col">
          <Card.Title>{name}</Card.Title>
          <Card.Title>{title.replace("t", "T")}</Card.Title>
          <Card.Img
            src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${info.id}.png`}
            style={{ width: "100px", alignSelf: "center" }}
          />
        </div>
        <ListGroup variant="flush">
          {perLevelStats}
          {flatLevelStats}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ChampCard;
