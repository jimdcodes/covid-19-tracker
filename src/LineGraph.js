import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
//import numeral from "numeral";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js/auto";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
)

function LineGraph({ casesType }) {
  const [data, setData] = useState({})

  const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]){
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  // https://disease.sh/v3/covid-19/historical/all?lastdays=30

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=15")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let chartData = buildChartData(data, casesType);
      setData(chartData);      
      console.log("HI", chartData);
      console.log("HI2", casesType);
    })
  }, [casesType]);

  return (
    <div>
      <Line
      data = {{
        datasets: [{
          data: data,
          backgroundColor: "rgba(204, 16, 52, 0.5)",
          borderColor: "#CC1034",
          fill: true
        }]
      }}
      options = {{
        plugins: {legend: false}
      }}
      ></Line>
    </div>
  )
}

/*
const options = {
  plugins: {legend: false},
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.casesType) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line data={{
            datasets: [{
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              }],
          }}
          options={options}
        >hi</Line>
      )}
    </div>
  );
}
*/

export default LineGraph;