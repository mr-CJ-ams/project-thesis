import './App.css';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css'; // Import Date Range Picker CSS
import $ from 'jquery'; // Import jQuery
import 'bootstrap-daterangepicker'; // Import Date Range Picker

// Import the nationalities data
import nationalities from './nationalities'; 

const App = () => {
  const [guestList, setGuestList] = useState([]);
  const [guest, setGuest] = useState({ firstName: "", lastName: "", middleName: "", age: "", citizenship: "" });
  const [inputErrors, setInputErrors] = useState({ firstName: false, lastName: false, middleName: false, age: false, citizenship: false });
  const dateRangeRef = useRef();

  useEffect(() => {
    $(dateRangeRef.current).daterangepicker({
      locale: { format: 'YYYY-MM-DD' }
    });
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setGuest((prevGuest) => ({ ...prevGuest, [name]: value }));
    setInputErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const addGuest = () => {
    const { firstName, lastName, middleName, age, citizenship } = guest;
    if (!firstName || !lastName || !middleName || !age || !citizenship) {
      setInputErrors({
        firstName: !firstName,
        lastName: !lastName,
        middleName: !middleName,
        age: !age,
        citizenship: !citizenship,
      });
      return;
    }

    const newGuest = {
      id: uuidv4(),
      ...guest,
    };
    setGuestList((prevList) => [...prevList, newGuest]);
    setGuest({ firstName: "", lastName: "", middleName: "", age: "", citizenship: "" });
  };

  const deleteGuest = (id) => {
    setGuestList((prevList) => prevList.filter((guest) => guest.id !== id));
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Guest List</h1>
      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={guest.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                isInvalid={inputErrors.firstName}
              />
              <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={guest.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                isInvalid={inputErrors.lastName}
              />
              <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formMiddleName">
              <Form.Label>Middle Initial</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={guest.middleName}
                onChange={handleChange}
                placeholder="Enter middle initial"
                isInvalid={inputErrors.middleName}
              />
              <Form.Control.Feedback type="invalid">Middle initial is required</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={guest.age}
                onChange={handleChange}
                placeholder="Enter age"
                isInvalid={inputErrors.age}
              />
              <Form.Control.Feedback type="invalid">Age is required</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCitizenship">
              <Form.Label>Citizenship</Form.Label>
              <Form.Select
                name="citizenship"
                value={guest.citizenship}
                onChange={handleChange}
                isInvalid={inputErrors.citizenship}
              >
                <option value="">Select Citizenship</option>
                {nationalities.map((nationality) => (
                  <option key={nationality.value} value={nationality.value}>{nationality.label}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">Citizenship is required</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formDateRange">
              <Form.Label>Date Range</Form.Label>
              <input ref={dateRangeRef} type="text" className="form-control" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={{ span: 2, offset: 10 }}>
            <Button variant="primary" onClick={addGuest} className="w-100">+ Add</Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-4">
        <p>Total Guests in this room: {guestList.length}</p>
      </div>

      <div className="list mt-3">
        {guestList.map((guest) => (
          <div className="task card mb-2" key={guest.id}>
            <div className="card-body">
              <p className="card-text">
                {guest.id} - {guest.firstName} {guest.middleName} {guest.lastName} <br />
                Age: {guest.age}, Citizenship: {guest.citizenship}
              </p>
              <Button variant="danger" onClick={() => deleteGuest(guest.id)}>X</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
