import { useState } from "react";


export default function Filter(props) {

    const { setFilteredEvents, getFilteredEvents } = props;
    const [filterParams, setFilterParms] = useState({
        year: 2021,
        month: 5
    });

    const handleChangeFilterParams = (e) => {
        const { name, value } = e.target;
        setFilterParms(prev => ({
            ...prev,
            [name]: Number(value)
        }));

    };

    const filterEvents = () => {
        setFilteredEvents(getFilteredEvents(filterParams));
    };

    return (
        <div className="filter">
            <h2>Filter</h2>
            <select name="year" id="year" onChange={handleChangeFilterParams}>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>


            <select name="month" id="month" onChange={handleChangeFilterParams}>
                <option value="4">May</option>
                <option value="3">April</option>
            </select>

            <button onClick={filterEvents}>Search</button>
        </div>
    );
}