import {useState, useEffect} from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import store from "../store";

const Header = (props) => {
  const [mobile, setMobile] = useState(false);

  useEffect(()=>{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setMobile(true);
     }
  }, [])


  return (
    <Navbar className="mainColor" expand="lg">
      <Container style={{ color: "white", maxWidth: "640px" }}>
        <Navbar.Brand className={"logo " + (mobile?"mx-auto":"")} href="/">
          Number Guess?
        </Navbar.Brand>
        <Nav
          className={"justify-content-between d-flex flex-row align-items-baseline " + (mobile?"mx-auto  mt-1 mb-2":"float-end ")}
          style={{ minWidth: "160px" }}
        >
          <NavItem
            section="custom"
            icon={<i className="fas fa-user-plus"></i>}
            text="Create"
          />
          <NavItem
            section="stats"
            icon={<i className="fas fa-chart-bar"></i>}
            text="Stats"
          />
          <NavItem
            section="settings"
            icon={<i className="fas fa-cog"></i>}
            text="Settings"
          />
          <NavItem
            section="info"
            text="Info"
            icon={<i className="fas fa-info-circle"></i>}
          />
        </Nav>
      </Container>
    </Navbar>
  );
};

const NavItem = (props) => {
  const changeSection = (section) => {
    // eslint-disable-next-line default-case
    switch (section) {
      case "info":
        store.dispatch({
          type: "section",
          payload: "info",
        });
        break;
      case "stats":
        store.dispatch({
          type: "section",
          payload: "stats",
        });
        break;
      case "settings":
        store.dispatch({
          type: "section",
          payload: "settings",
        });
        break;
      case "custom":
        store.dispatch({
          type: "section",
          payload: "game",
        });
        store.dispatch({
          type: "customEquation",
          payload: "true",
        });
        break;
    }
  };
  return (
    <Button
      onClick={() => changeSection(props.section)}
      className="navBtn"
      style={{
        padding: "3px 5px",
        borderRadius: "5px",
      }}
      variant="outline-warning"
    >
      {props.icon} {props.text}
    </Button>
  );
};

export default Header;
