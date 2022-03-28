import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Button } from "antd";

const calsiusCalculated = (a) => {
  const result = Math.round(a - 273);
  if (result >= 1) return `${"+"}${result}`;
  return result;
};

const fahrenheitCalculated = (a) => {
  const result = Math.round(((a - 273.15) * 9) / 5 + 32);
  if (result >= 1) return `${"+"}${result}`;
  return result;
};

const App = () => {
  const columns = [
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "40%",
    },
    {
      title: "°C",
      dataIndex: "celsius",
      key: "celsius",
      width: "30%",
      align: "center",
    },
    {
      title: "℉",
      dataIndex: "fahrenheit",
      key: "fahrenheit",
      width: "30%",
      align: "center",
    },
  ];

  const [data, setData] = useState([
    {
      key: "1",
      city: "Moscow",
      celsius: 0,
      fahrenheit: 0,
    },
    {
      key: "2",
      city: "Saint Petersburg",
      celsius: 0,
      fahrenheit: 0,
    },
  ]);
  const [open, setOpen] = useState(null);

  const requestWeather = (town) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=9a6698e1ac53c8e8acfbf4d601a2aa26`
    )
      .then((res) => res.json())
      .then((body) =>
        setData((prevState) =>
          prevState.map((el) =>
            el.city === town
              ? {
                  ...el,
                  city: body.name,
                  celsius: calsiusCalculated(body.main.temp),
                  fahrenheit: fahrenheitCalculated(body.main.temp),
                }
              : el
          )
        )
      )
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (open) {
      requestWeather("Moscow");
      requestWeather("Saint Petersburg");
    }
  }, [open]);

  return (
    <div className="wrapper">
      <h1>Metcast</h1>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button
        type="primary"
        className="updateWeather"
        ghost
        onClick={() => setOpen(open + 0.01)}
      >
        Обновить
      </Button>
    </div>
  );
};

export default App;
