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

function LineGraph({ casesType, ...props }) {
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
      //console.log("HI", chartData);
      //console.log("HI2", casesType);
    })
  }, [casesType]);

  return (
    // Adding className from app.js and parsing it in here with ...props above
    <div className={props.className}>
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

export default LineGraph;