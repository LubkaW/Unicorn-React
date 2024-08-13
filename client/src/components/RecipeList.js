import {useState} from "react";
import RecipeTable from "./RecipeTable";
import RecipeGrid from "./RecipeGrid";
import {Container, Nav, Navbar} from "react-bootstrap";
import styles from "../css/recipe-list.module.css"
import stylesCard from "../css/recipe-card.module.css"

function RecipeList(props) {

    const [viewType, setViewType] = useState("small")

    return (
        <div>
            {/* Navbar to switch views */}
            <Navbar expand="lg" className={styles.navbar}>
                <Container>
                    <Navbar.Brand className={styles.navbarBrand}>Lubka Recipes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={styles.navLinks}>
                            <Nav.Link onClick={() => setViewType('small')}>
                                SmallDetail
                            </Nav.Link>
                            <Nav.Link onClick={() => setViewType('big')}>
                                BigDetail
                            </Nav.Link>
                            <Nav.Link onClick={() => setViewType('table')}>
                                Table
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Render view based on selected type */}
            <div style={{marginTop: '20px'}}>
                {viewType === 'small' && <RecipeGrid recipes={props.recipes} textStyle={stylesCard.cardTextSmall}/>}
                {viewType === 'big' && <RecipeGrid recipes={props.recipes} textStyle={stylesCard.cardTextBig}/>}
                {viewType === 'table' && <RecipeTable recipes={props.recipes}/>}
            </div>
        </div>
    );

}

export default RecipeList;