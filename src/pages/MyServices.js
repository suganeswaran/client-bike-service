import React, { useState, useEffect } from "react";
import axiosPrivate from "../api/axiosPrivate";
import Loading from "../components/Loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import Popup from "reactjs-popup";
import { useAuth } from "../Authentication";
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Rooms() {
  const [start, setStart] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const user = auth.user;

  const Load=async()=>{
    if(!auth.user)
    {
      toast.error("Please Login")
      return;
    }
    try{
     const res=await axiosPrivate.post("/book/myservices",{email:auth.user.email});
     setData(res.data.services);
     console.log(res.data.services);
    }
    catch(err){
toast.error("Some thing went wrong")
    }
  }
  useEffect(()=>{
    Load()
  },[])

  return (
    <>
    <ToastContainer/>
      <Header />
      <Container>
        <h2>My Services</h2>
        <br />
        <>
          {data.length === 0 && (
            <>
              <p>No Services</p>
            </>
          )}
          {data.slice(start * 4, start * 4 + 4).map((item, idx) => (
            <Row key={idx} className="card-wrapper justify-content-center">
              <Card className="w-75 mx-auto">
                <Card.Body>
                  <Card.Title>Model : {item.modelName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.issuedBy}
                  </Card.Subtitle>
                  <br/>
                  <Row>
                    <Col>
                  <Card.Text className="float-left">Kms Driven: {item.kmDriven}</Card.Text></Col>
                  <Col>
                  <Card.Text className="float-right">Booking Status: {item.bookingStatus}</Card.Text>
                  </Col>
                  </Row>
<br/>
                  
                  <Row>
                    <Col>
                  <Card.Text className="float-left">Contact : {item.phonenum}</Card.Text></Col>
                  <Col>
                  <Card.Text className="float-right">Name : {item.name}</Card.Text>
                  </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                  <Card.Text className="float-left">Booking Date: {new Date(item.created_at).toLocaleDateString()}</Card.Text></Col>
                  <Col>
                  <Card.Text className="float-right">last Update Date: {new Date(item.updated_at).toLocaleDateString()}</Card.Text>
                  </Col>
                  </Row>
<br/>
                  <Row>
                  <Col>
                  
                  {item.bookingStatus === "Accepted" && (
                    <Card.Text className="float-right">
                      Service Status: {item.serviceStatus}
                    </Card.Text>
                  )}
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          ))}
          <Row>
            <Col>
              {start > 0 && (
                <div className="button-wrapper">
                  <Button
                    className="success w-25"
                    onClick={() => setStart((prev) => prev - 5)}
                  >
                    Prev
                  </Button>
                </div>
              )}
            </Col>

            <Col>
              {data.length > start * 4 + 4 && (
                <div className="button-wrapper ">
                  <Button
                    className="success w-25"
                    onClick={() => setStart((prev) => prev + 5)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </>
      </Container>{" "}
      <Footer />
    </>
  );
}
