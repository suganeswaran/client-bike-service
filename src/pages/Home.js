import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import img2 from "../images/bikeservice2.jpg";
import img3 from "../images/service.webp";
import img4 from "../images/wash.jpg";
export default function Home() {
  


  return (
    <>
      <Header />
      <Container>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img4}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
      </Container>
      <Footer />
    </>
  );
}
