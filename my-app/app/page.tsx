'use client'

import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import DropdownMenu from "./components/DropdownMenu";
import { Button } from "react-bootstrap";

export interface CountriesApi {
  continents: {
    name: string;
    countries: string[];
  }[];
}

export default function Home() {
  const [countries, setCountries] = useState({} as CountriesApi);
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState("");

  function handleRefreshButtonClick() {
    getCountries();
  }

  async function getCountries() {
    try {
      const response = await fetch("http://localhost:8080/countries");

      if (!response.ok) {
        console.log(response);
        setErrorMessage("Couldn't fetch countries, please refresh page");
        return;
      }

      const result: CountriesApi = await response.json();
      setCountries(result);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong when getting the countries.");
    }
  }

  useEffect(() => {
    getCountries();
  }, [])

  return (
    <div className="App">
      <Container>
        <div className="wrapper">
          <div className="content">
            <DropdownMenu setErrorMessage={setErrorMessage} setInfo={setInfo} countries={countries}></DropdownMenu>
            <div>
              {
                (() => {
                  if (info.length !== 0) {
                    return <p>{info}</p>
                  }
                  if (errorMessage.length !== 0) {
                    return (
                      <>
                        <p>{errorMessage}</p>
                        {!countries.continents && <Button onClick={handleRefreshButtonClick} variant="secondary">Refresh</Button>}
                      </>
                    )
                  }
                })()
              }
            </div>
          </div>
        </div>
      </Container>
    </div >
  );
}


