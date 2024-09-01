import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet, useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {useContext} from "react";
import UserContext from "./UserProvider";


function App() {

    const title = "LubkaRecipeApp";
    let navigate = useNavigate();
    const {isAuthorized, handleAuthorize} = useContext(UserContext);

    return (
      <div className="App">
          <Navbar
              fixed="top"
              expand={"sm"}
              className="mb-3"
              bg="dark"
              variant="dark"
          >
              <Container fluid>
                  <Navbar.Brand onClick={() => navigate("/")}>
                      {title}
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
                  <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                      <Offcanvas.Header closeButton>
                          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                              {title}
                          </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                          <Nav className="justify-content-end flex-grow-1 pe-3">
                              <Nav.Link onClick={() => navigate("/home")}>
                                  Home
                              </Nav.Link>
                              <Nav.Link onClick={() => navigate("/recipeList")}>
                                  RecipeList
                              </Nav.Link>
                              <Nav.Link onClick={() => navigate("/ingredientList")}>
                                  IngredientList
                              </Nav.Link>
                          </Nav>
                          <Button
                              variant={isAuthorized ? "danger" : "success"}
                              onClick={handleAuthorize}
                          >
                              {isAuthorized ? "Logout" : "Login"}
                          </Button>
                      </Offcanvas.Body>
                  </Navbar.Offcanvas>
              </Container>
          </Navbar>

          <Outlet/>
      </div>
  );
}

export default App;
