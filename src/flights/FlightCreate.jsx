import axios from "axios";
import PageHeader from "../header/PageHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FlightCreate() {
    const [flight, setFlight] = useState({
        Id:          "001",
        Number:      "AI 845",
        AirlineName: "Air India",
        Source:      "Mumbai",
        Destination: "Abu dhabi",
        Capacity:    300,
        Price:       5000.0
    });

    const navigate = useNavigate();

    const OnChangeBox = (event) => {
        const newFlight = { ...flight };
        newFlight[event.target.id] = event.target.value;
        setFlight(newFlight);
    };

    const OnCreate = async () => {
        try {
            const baseUrl = 'http://127.0.0.1:8080';
            const response = await axios.post(`${baseUrl}/flights`, {
                ...flight,
                capacity: parseInt(flight.capacity),
                price: parseFloat(flight.price)
            });

            const json = response.data;
            setFlight(json.flight);
            alert(json.message);
            navigate('/flights/list');
        } catch (error) {
            alert("Server Error");
        }
    };

    return (
        <>
            <PageHeader />
            <h3>
                <a href="/flights/list" className="btn btn-primary">Go back</a> &nbsp; Add flight
            </h3>

            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="number" className="form-label">Flight Id</label>
                    <input type="text" className="form-control" id="number" placeholder="please enter flight id" onChange={OnChangeBox} />
                    value={flight.Id}
                    onChange={OnChangeBox}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="airline" className="form-label">Airline</label>
                    <input type="text" className="form-control" id="airline" placeholder="please enter airline" onChange={OnChangeBox} />
                    value={flight.AirlineName}
                    onChange={OnChangeBox}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="source" className="form-label">Source</label>
                    <input type="text" className="form-control" id="source" placeholder="please enter source" onChange={OnChangeBox} />
                    value={flight.Source}
                    onChange={OnChangeBox}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input type="text" className="form-control" id="destination" placeholder="please enter destination" onChange={OnChangeBox} />
                    value={flight.Destination}
                    onChange={OnChangeBox}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input type="text" className="form-control" id="capacity" placeholder="please enter flight capacity" onChange={OnChangeBox} />
                    value={flight.capacity}
                    onChange={OnChangeBox}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" placeholder="please enter price" onChange={OnChangeBox} />
                    value={flight.Price}
                    onChange={OnChangeBox}
                </div>

                <button className="btn btn-primary" onClick={OnCreate}>Create Flight</button>
            </div>
        </>
    );
}

export default FlightCreate;
