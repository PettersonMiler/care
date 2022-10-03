import { useState, useEffect } from "react";
import Select from "react-select";
import api from "./services/api";
import "./App.css";

function App() {
    const [nurses, setNurses] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [value, setValue] = useState();

    const handleSubmit = async () => {
        const response = await api.get(`/facilities/${value}/hiring-priority`);

        setNurses(response.data);
    };

    const handleChange = ({ value }) => setValue(value);

    useEffect(() => {
        api.get("facilities").then((response) => {
            setFacilities(response.data);
        });
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="facility">
                    <Select
                        className="select"
                        name="facility"
                        // value={value}
                        onChange={handleChange}
                        options={facilities.map((item) => ({
                            value: item.id,
                            label: item.facility_name,
                        }))}
                    />
                    <button disabled={!value} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                <div className="content">
                    <ul className="list">
                        {nurses.map(({ nurse_id }) => (
                            <li key={nurse_id}>
                                <div className="nurse">{nurse_id}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
