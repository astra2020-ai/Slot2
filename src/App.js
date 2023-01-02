import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import {
  ListGroup,
  InputGroup,
  Form,
  Button,
  Container
} from "react-bootstrap";
import logo from "./logo.png";

import "./styles.css";

function getRandomRolor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}
export default function App() {
  useEffect(() => {
    const localNumber = localStorage.getItem("number");
    if (!localNumber) {
      localStorage.setItem("number", "");
    }
  }, []);
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(null);

  const [spining, setSpining] = useState(false);
  const [names, setName] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const stopSpin = () => {
    setSpining(false);
  };
  const startSpin = () => {
    setSpining(true);
  };
  const handleAddName = (e) => {
    e.preventDefault();
    setName((prev) => [...prev, nameValue]);
    setNameValue("");
  };
  const [showWheel, setShowWheel] = useState();
  const handleName = (e) => {
    setNameValue(e.target.value);
  };
  const handleStart = () => {
    const formatNames = names.map((name) => ({
      option: name,
      style: {
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
        textColor: "white"
      }
    }));
    setData(formatNames);
    setShowWheel(true);
    const localNumber = localStorage.getItem("number");
    if (!localNumber) {
      setNumber(Math.floor(Math.random() * names.length));
    } else {
      setNumber(parseInt(localNumber) - 1);
    }

    startSpin();
  };
  return (
    <Container className="App">
      <ListGroup
        style={{ maxHeight: "25vh", overflowY: "scroll" }}
        as="ol"
        numbered
      >
        {names.map((name) => (
          <ListGroup.Item as="li">{name}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleAddName}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon2"
            value={nameValue}
            onChange={handleName}
          />
          <Button
            disabled={nameValue === ""}
            type="submit"
            variant="outline-success"
            id="button-addon2"
          >
            Add
          </Button>
        </InputGroup>
      </Form>
      <div
        style={{
          maxheight: "25vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center"
        }}
      >
        {showWheel ? (
          <div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  height: "100%",
                  zIndex: 9,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  style={{
                    marginBottom: 5,
                    width: 100,
                    background: "currentColor",
                    borderRadius: 52
                  }}
                  src={logo}
                  alt="logo"
                />
              </div>
              <Wheel
                prizeNumber={number}
                mustStartSpinning={spining}
                data={data}
                backgroundColors={getRandomRolor()}
                textColors={["#ffffff"]}
                onStopSpinning={stopSpin}
                radiusLineWidth={2}
                outerBorderWidth={2}
              />
            </div>
            <Button
              style={{ width: "100%" }}
              disabled={names.length < 6}
              onClick={handleStart}
              type="submit"
              variant="outline-success"
              id="button-addon2"
            >
              Re Spin
            </Button>
          </div>
        ) : (
          <Button
            style={{ width: "100%" }}
            disabled={names.length < 6}
            onClick={handleStart}
            type="submit"
            variant="outline-success"
            id="button-addon2"
          >
            Spin
          </Button>
        )}
      </div>
    </Container>
  );
}
