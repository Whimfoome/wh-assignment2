'use client'

import { useState, useEffect, forwardRef, Children, CSSProperties, ReactNode, isValidElement } from "react";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import countriesData from "./countries.json"
import { Form } from "react-bootstrap";

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
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }

    getCountries();
  }, [])

  function handleSelection(country: { name: string; continent: string }) {
    setSelected(country);

    setInfo(country.continent);
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
                  return continent.countries.map((country) => {
                    return (
                      <Dropdown.Item key={crypto.randomUUID()} onClick={() => handleSelection({ name: country, continent: continent.name })}>
                        {country}
                      </Dropdown.Item>
                    );
                  })
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
                  // switch (selected.type) {
                  //   case ('A'):
                  //     return (<p>The employee should provide notarised copies of all official original documents (i.e. diploma, criminal record, etc.). The notarised copy should be in original (no copies of the notarised copy will be accepted). You need a notarisation of the sworn translator’s signature.</p>)
                  //   case ('B'):
                  //     return (<p>The employee should provide all official documents with an apostille</p>)
                  //   case ('C'):
                  //     return (<p>The employee needs to attest their official documents by the local Ministry of Foreign Affairs and then have it stamped in the Bulgarian embassy in their country of origin.</p>)
                  //   default:
                  //     return (<p></p>)
                  // }
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
  const [value, setValue] = useState('');

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <div className="m-2 p-0">
        <Form.Control
          autoFocus
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div className="custom-dropdown">
        {Children.toArray(children).filter(
          (child) => {
            if (isValidElement(child)) {
              const childText = child.props.children as string;
              return !value || childText.toLowerCase().startsWith(value);
            }

            return false;
          }
        )}
      </div>
    </div>
  );
});
CustomMenu.displayName = "CustomMenu";
