import logo from "../images/logo.png";
import Nav from "react-bootstrap/Nav";
import Popup from "reactjs-popup"
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./Signup";
import { useAuth } from "../Authentication";
function Header() {
  const auth=useAuth();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <Popup
      open={isOpen}
      onClose={() => { setOpen(false) }}
      position="center"
    >
      <Signup setOpen={setOpen}/>
      
    </Popup>
      <Navbar className="colorNav" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand>
            <div className="logoWrapper">
              <img src={logo} alt="logo" />
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              { !auth?.user?.isAdmin &&
              <>
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/mybookings");
                }}
              >
                Book Service
              </Nav.Link>
              
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/myservices");
                }}
              >
                My Services
              </Nav.Link>
              </>
              }
              
              {auth?.user?.isAdmin &&
              <Nav.Link
                className="navLink"
                onClick={() => {
                  navigate("/services");
                }}
              >
                Services
              </Nav.Link>}
              {auth.user ? (
                <Nav.Link className="navLinkbtn">
                  <span style={{ color: "#ED117F" }} onClick={()=>auth.logout()} >Logout</span>{" "}
                </Nav.Link>
              ) : (
                <Nav.Link className="navLinkbtn" >
                  <span style={{ color: "#ED117F" }} onClick={()=>setOpen(true)}>Login</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
