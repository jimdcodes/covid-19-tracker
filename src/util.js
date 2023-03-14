import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 80,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 120,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 200,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];
    // One line version
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));


    /* Long version
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
    */
};

// DRAW circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType="cases") => (
    data.map(country => ( // For every iteration, each object is a country
    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    fillOpacity={0.4}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }

    >
        <Popup>
            <h1>IM A POPUP</h1>
        </Popup>
    </Circle>
    ))
);