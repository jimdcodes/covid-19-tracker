import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([
    'USA','UK','INDIA'
  ]);

  // STATE = How to write a variable in REACT

  // https://disease.sh/docs/#/COVID-19:%20Worldometers/get_v3_covid_19_countries
  
  /* USEEFFECT = runs a piece of code based on a given condition */

  // The code inside here will run once
  // when the component loads and not again after
  useEffect (() => {
    // async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries") // Wait, then fetch from link
      .then((response) => response.json()) // Get entire response, then just take json of it
      .then((data) => {
        const countries = data.map((country) => ({ // Going through every country and return the following:          
            name: country.country, // Country value (United States, United Kingdom) and assigning it name key
            value: country.countryInfo.iso2, // UK, USA, FR
          }));

          setCountries(countries);
      });
    };
  }, []);

  return (
    <div className="app">      
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        {/* Adding dropdown */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and show a drop down list of the options */}

            {/* Writing JavaScript in HTML using curly brackets AKA JSX */}
            {
              countries.map(country => ( // Using ES6 syntax: For every country return, '=>', ...
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }

            {/* Dropdown choices */}
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
          </Select>
        </FormControl>
      </div>      

      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}      
    </div>
  );
}

export default App;
