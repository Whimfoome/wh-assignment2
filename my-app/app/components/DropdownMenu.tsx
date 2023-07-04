import { useState, Dispatch, SetStateAction } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomMenu } from "./CustomMenu";
import { CountriesApi } from "../page";

interface ContinentsApi {
    continents: {
        name: string;
        info: string;
    }[];
}

interface DropdownMenuProps {
    setErrorMessage: Dispatch<SetStateAction<string>>;
    setInfo: Dispatch<SetStateAction<string>>;
    countries: CountriesApi;
}

export default function DropdownMenu({ setErrorMessage, setInfo, countries }: DropdownMenuProps) {
    const [selected, setSelected] = useState({} as { name: string; continent: string });

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
    )
}