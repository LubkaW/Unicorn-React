import {useEffect, useState} from "react";
import RecipeTable from "./RecipeTable";
import RecipeGrid from "./RecipeGrid";
import {Container, Nav, Navbar} from "react-bootstrap";
import styles from "../css/recipe-list.module.css"
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function RecipeList() {

    const [viewType, setViewType] = useState("small")
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({data: []});

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeLoadCall({ state: "error", error: responseJson });
            } else {
                setRecipeLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientsLoadCall({data: []});
            } else {
                setIngredientsLoadCall({data: responseJson });
            }
        });
    }, []);

    function getRecipes() {
        switch (recipeLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <div>
                        {/* Render view based on selected type */}
                        <div style={{marginTop: '20px'}}>
                            {viewType === 'small' && <RecipeGrid recipes={recipeLoadCall.data} ingredients={ingredientsLoadCall.data} smallDetail/>}
                            {viewType === 'big' && <RecipeGrid recipes={recipeLoadCall.data} />}
                            {viewType === 'table' && <RecipeTable recipes={recipeLoadCall.data}/>}
                        </div>
                    </div>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data pro seznam receptů.</div>
                        <br />
                        <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

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

            {getRecipes()}
        </div>
    );




}

export default RecipeList;