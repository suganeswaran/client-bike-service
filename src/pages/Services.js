import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axiosPrivate from "../api/axiosPrivate";
import {
  Col,
  Row,
  Container,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import Popup from "reactjs-popup";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ToastContainer, toast } from 'react-toastify';


export default function Services() {
  const auth = useAuth();
  const [serviceStatus, setServiceStatus] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modelName, setmodelName] = useState("");
  const [KMDriven, setKMDriven] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [serviceDescription, setserviceDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [serviceType, setServiceType] = useState("General service check-up");

  const [addData, setAddData] = useState(false);
  const [status, setstatus] = useState(false);
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const result = await axiosPrivate.get("/book/all");
      const cleanedData = result.data.services.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setData(cleanedData);
      console.log(cleanedData);
      setstatus(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const clear = () => {
    setServiceStatus("");
    setBookingStatus("");
    setmodelName("");
    setKMDriven("");
    setAppointmentDate("");
    setserviceDescription("");
    setContactNumber("");
    setServiceType("General service check-up");
  };

  const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: (row, isSelected) => {
      const updatedData = data.map((item) =>
        item.id === row.id ? { ...item, isSelected } : item
      );
      setData(updatedData);
    },
  };
  const onAfterSaveCell = async (row, cellName, cellValue) => {
    try {
      await axiosPrivate.put('/book/update/', {
        data: { [cellName]: cellValue },
        _id:row._id,
        email:row.email
      });
      const updatedData = data.map((item) =>
        item.id === row.id ? { ...item, [cellName]: cellValue } : item
      );
      setData(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();
    const selectedRows = data.filter((row) => row.isSelected);
    const idsToDelete = selectedRows.map((row) => row._id);
    try {
      await axiosPrivate.post("/book/remove", { ids: idsToDelete });
      load();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        name,
        modelName,
        appointmentDate,
        phonenum: contactNumber,
        kmDriven: KMDriven,
        serviceType,
        serviceDescription,
      };
      const resp = await axiosPrivate.post("/book/new", body);
      toast.success("Added Successfully")
      clear();
      load();
    } catch (err) {
      toast.error("Some thing went wrong try again")
      console.log(err);
    }
  };

  
if(!auth?.user?.isAdmin){
  return <Navigate to="/"/>
}


  return (
    <>
    <ToastContainer/>
      <Popup
        open={addData}
        onClose={() => {
          setAddData(false);
          clear();
        }}
        position="center"
        className="login-popup"
      >
        <Container fluid className="login-template">
          <Form className="popup-form">
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
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Form.Select
                  aria-label="Default select example"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="General service check-up">
                    General service check-up
                  </option>
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
                  rows={1}
                />
              </Form.Group>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="success float-right"
              onClick={handleAddData}
            >
              Book
            </Button>
          </Form>
        </Container>
      </Popup>
      <Header />
      {status ? (
        <Container>
          <Row>
            <Col>
              <h1 className="heading">Services</h1>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Button
                variant="success"
                onClick={() => setAddData(true)}
                className="floatRightBtn"
              >
                Add
              </Button>
              <Button
                variant="danger"
                className="floatRightBtn"
                onClick={(e) => deleteData(e)}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <br/>
          <Row className="topspace">
            <Col>
              <BootstrapTable
                data={data}
                striped
                hover
                pagination
                cellEdit={{
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: onAfterSaveCell,
                }}
                selectRow={selectRowProp}
              >
                <TableHeaderColumn isKey dataField="id" dataSort={true} editable={false}>
                  Service ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="modelName" editable={false}>
                  Model Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="kmDriven" editable={false}>
                  Kms Driven
                </TableHeaderColumn>
                <TableHeaderColumn dataField="serviceType" editable={false}>
                  Service Type
                </TableHeaderColumn>
                
                <TableHeaderColumn dataField="phonenum">
                  Contact
                </TableHeaderColumn>
                
                <TableHeaderColumn dataField="serviceDescription">
                  Description
                </TableHeaderColumn>
                <TableHeaderColumn dataField="serviceStatus">
                  Service Status
                </TableHeaderColumn>
                <TableHeaderColumn dataField="bookingStatus">
                  Booking Status
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
