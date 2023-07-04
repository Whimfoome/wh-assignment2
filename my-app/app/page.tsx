'use client'

import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import DropdownMenu from "./components/DropdownMenu";

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

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/countries");

        if (!response.ok) {
          console.log(response);
          setErrorMessage("Couldn't fetch countries, please refresh page");
          return;
        }

        const result: CountriesApi = await response.json();
        setCountries(result);
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong when getting the countries.");
      }
    }

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
                  return <p>{errorMessage.length !== 0 ? errorMessage : ""}</p>
                })()
              }
            </div>
          </div>
        </div>
      </Container>
    </div >
  );
}


