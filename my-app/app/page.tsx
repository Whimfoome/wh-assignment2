'use client'

import { useState, useEffect, forwardRef, Children, CSSProperties, ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

interface CountriesApi {
  continents: {
    name: string;
    countries: string[];
  }[];
}

interface ContinentsApi {
  continents: {
    name: string;
    info: string;
  }[];
}

export default function Home() {
  const [countries, setCountries] = useState({} as CountriesApi);
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState("");
  const [selected, setSelected] = useState({} as { name: string; continent: string });

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

  function handleSelection(country: { name: string; continent: string }) {
    setSelected(country);

    const getContinents = async () => {
      try {
        const response = await fetch("http://localhost:8080/continents");

        if (!response.ok) {
          console.log(response);
          setErrorMessage("Couldn't fetch continents, please try to select again");
          setInfo("");
          return;
        }

        const result: ContinentsApi = await response.json();
        const found = result.continents.find(element => element.name === selected.continent)
        if (found) {
          setInfo(found.info);
        } else {
          setErrorMessage("Couldn't find information about the continent of this country");
          setInfo("");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong when getting the continents.");
      }
    }

    getContinents();
  }

  return (
    <div className="App">
      <Container>
        <div className="wrapper">
          <div className="content">
            <Dropdown className="dropdown-button">
              <Dropdown.Toggle variant="custom">
                {Object.keys(selected).length === 0 ? 'Select Country' : selected.name}
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {countries.continents && countries.continents.map((continent) => {
                  return <>
                    <Dropdown.Item key={crypto.randomUUID()} disabled={true} className="dropdown-continent">
                      {continent.name}
                    </Dropdown.Item>
                    {continent.countries.map((country) => {
                      return (
                        <Dropdown.Item key={crypto.randomUUID()} onClick={() => handleSelection({ name: country, continent: continent.name })}>
                          {country}
                        </Dropdown.Item>
                      );
                    })}
                    <Dropdown.Divider key={crypto.randomUUID()} />
                  </>
                })}
              </Dropdown.Menu>
            </Dropdown>
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

interface Props {
  children?: ReactNode;
  style: CSSProperties;
  className: string;
  'aria-labelledby': string;
}

const CustomMenu = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, style, className, 'aria-labelledby': labeledBy } = props;

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <div className="custom-dropdown">
        {Children.toArray(children)}
      </div>
    </div>
  );
});
CustomMenu.displayName = "CustomMenu";
