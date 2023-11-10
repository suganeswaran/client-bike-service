import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import axiosPrivate from "../api/axiosPrivate";
import { useAuth } from "../Authentication";
import { ToastContainer, toast } from 'react-toastify';
import { Navigate,useNavigate } from "react-router-dom";

export default function MyBookings() {
  
  const auth=useAuth();
  const navigate=useNavigate();
  const [modelName, setmodelName] = useState("");
  const [KMDriven, setKMDriven] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [serviceDescription, setserviceDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [serviceType, setServiceType] = useState("General service check-up");


  
  if (!auth.user) {
    toast.error("Please Login to Book Service");
  }

  const clear = () => {
    setmodelName('');
    setKMDriven('');
    setAppointmentDate('');
    setserviceDescription('');
    setContactNumber('');
    setServiceType("General service check-up")
  }

  const handleBookings=async(e)=>{
    e.preventDefault();
    try{
      if(!auth.user){
        navigate("/")
      }
      const body={
        email:auth.user.email,
        name:auth.user.firstname,
        modelName,
        appointmentDate,
        phonenum:contactNumber,
        kmDriven:KMDriven,
        serviceType,
        serviceDescription,
      }
        const resp=await axiosPrivate.post("/book/new",body)
        toast.success("Booked Successfully")
        clear();

    }
    catch(err){
      console.log(err);
      toast.error("Fill all details")
    }

  }


  const Upload = () => {
    return (
      <Container>
        <ToastContainer />
        <h2 className="start">Book Service</h2>
        <Row>
          <Col xs={1} sm={1} md={4}></Col>
          <Col xs={10} sm={10} md={4}>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Model Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Eg : Pulsar 220"
                    value={modelName}
                    onChange={(e) => setmodelName(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridIssuer">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Issued By"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3" controlId="formGridDate">
                  <Form.Label>KM driven</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Km Driven"
                    value={KMDriven}
                    onChange={(e) => setKMDriven(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGridDate">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select aria-label="Default select example" value={serviceType} onChange={(e)=>setServiceType(e.target.value)}>
  <option value="General service check-up">General service check-up</option>
  <option value="Oil change">Oil change</option>
  <option value="Water wash">Water wash</option>
</Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text-area"
                    placeholder="contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Service Describtion</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="service description"
                    value={serviceDescription}
                    onChange={(e) => setserviceDescription(e.target.value)}
                    rows={4}
                  />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit" className="success" onClick={handleBookings}>
                Book
              </Button>
            </Form>
          </Col>
          <Col xs={1} sm={1} md={4}></Col>
        </Row>
      </Container>
    );
  };
  return (
    <>
      <Header />
      {Upload()}

      <Footer />
    </>
  );
}
