import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import './Table.css';
import { sortData } from './util';
import LineGraph from './LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // STATE = How to write a variable in REACT

  useEffect (() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);
  
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
      });
    };
    getCountriesData(); // Calls the function
  }, []);

  const onCountryChange = async (event) => { // For every event, pulls the target value
    const countryCode = event.target.value;     

    // If URL equals worldwide, then all, else specific country code | backtick for Javascript
    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      // Now when event occurs, output is countryCode for the dropdown
      setCountry(countryCode);
      // All of the data from the country response
      setCountryInfo(data);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          {/* Adding dropdown */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all the countries and show a drop down list of the options */}
              {/* Default value is Worldwide before selecting anything */}
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* Writing JavaScript in HTML using curly brackets AKA JSX */}
              {countries.map(country => ( // Using ES6 syntax: For every country return, '=>', ...
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
          />
          <InfoBox title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
          />
          <InfoBox title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
          />
        </div>  

        {/* Header */}
        {/* Title + Select input dropdown field */}        

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Total Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          {/* Graph */}
          <LineGraph casesType={casesType}/>
        </CardContent>        
      </Card>     
    </div>
    
  );
}

export default App;
