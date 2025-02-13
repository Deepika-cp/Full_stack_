import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../header/PageHeader';

function FlightEdit() {
    const [flight, setFlight] = useState({
        id: "001",
        number: "AI 845",
        airline_name: "Air India",
        source: "Mumbai",
        destination: "Abu Dhabi",
        capacity: 300,
        price: 5000.0
    });

    const params = useParams();
    const navigate = useNavigate();

    const readFlightById = async () => {
        try {
            const baseUrl = 'http://127.0.0.1:8080';
            const response = await axios.get(`${baseUrl}/flights/${params.id}`);
            setFlight(response.data);
        } catch (error) {
            alert("Server Error");
        }
    };

    const onChangeBox = (event) => {
        const { id, value } = event.target;
        setFlight(prevFlight => ({
            ...prevFlight,
            [id]: value
        }));
    };

    const onUpdate = async () => {
        try {
            const baseUrl = 'http://127.0.0.1:8080';
            const response = await axios.put(`${baseUrl}/flights/${params.id}`, {
                ...flight,
                capacity: parseInt(flight.capacity, 10),
                price: parseFloat(flight.price)
            });

            setFlight(response.data.flight);
            alert(response.data.message);
            navigate("/flights/list");
        } catch (error) {
            alert("Server Error");
        }
    };

    useEffect(() => {
        readFlightById();
    }, []);

    return (
        <>
            <PageHeader />
            <h3>
                <a href="/flights/list" className="btn btn-primary">Go back</a> &nbsp; Edit Flight
            </h3>

            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="number" className="form-label">Flight Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder="Please enter flight number"
                        value={flight.number}
                        onChange={onChangeBox}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="airline_name" className="form-label">Airline</label>
                    <input
                        type="text"
                        className="form-control"
                        id="airline_name"
                        placeholder="Please enter airline"
                        value={flight.airline_name}
                        onChange={onChangeBox}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="source" className="form-label">Source</label>
                    <input
                        type="text"
                        className="form-control"
                        id="source"
                        placeholder="Please enter source"
                        value={flight.source}
                        onChange={onChangeBox}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destination"
                        placeholder="Please enter destination"
                        value={flight.destination}
                        onChange={onChangeBox}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        placeholder="Please enter flight capacity"
                        value={flight.capacity}
                        onChange={onChangeBox}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Please enter price"
                        value={flight.price}
                        onChange={onChangeBox}
                    />
                </div>

                <button className="btn btn-warning" onClick={onUpdate}>Update Flight</button>
            </div>
        </>
    );
}

export default FlightEdit; 