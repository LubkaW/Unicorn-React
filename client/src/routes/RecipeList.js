import {useEffect, useMemo, useState} from "react";
import RecipeTable from "../components/RecipeTable";
import RecipeGrid from "../components/RecipeGrid";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import styles from "../css/recipe-list.module.css"
import Icon from "@mdi/react";
import {mdiLoading, mdiMagnify, mdiPlus, mdiTable, mdiViewComfy, mdiViewGrid} from "@mdi/js";
import RecipeForm from "../components/RecipeForm";

function RecipeList() {

    const [viewType, setViewType] = useState("small")
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({data: []});
    const [searchBy, setSearchBy] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const filteredRecipeList = useMemo(() => {
        if (recipeLoadCall.data != null) {
            return recipeLoadCall.data.filter((recipe) => {
                return (
                    recipe.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    recipe.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            });
        }
    }, [searchBy, recipeLoadCall.data]);

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
        }).catch((err) => {setRecipeLoadCall({ state: "error", error: err });});
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
        }).catch(() => setIngredientsLoadCall({data: []}));
    }, []);



    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

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
                        <div className={"d-block d-md-none"}>
                            {<RecipeGrid recipes={filteredRecipeList} ingredients={ingredientsLoadCall.data} smallDetail/>}
                        </div>
                        <div className={"d-none d-md-block"} style={{marginTop: '20px'}}>
                            {viewType === 'small' && <RecipeGrid recipes={filteredRecipeList} ingredients={ingredientsLoadCall.data} smallDetail/>}
                            {viewType === 'big' && <RecipeGrid recipes={filteredRecipeList}/>}
                            {viewType === 'table' && <RecipeTable entities={filteredRecipeList}/>}
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
                    <Navbar.Brand className={styles.navbarBrand}>Seznam receptů</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse style={{ justifyContent: "right" }}>
                        <Nav className={styles.navLinks}>
                            <Nav.Link onClick={() => setViewType('small')}>
                                <Icon size={1.5} path={mdiViewGrid}/>
                            </Nav.Link>
                            <Nav.Link onClick={() => setViewType('big')} className={"d-none d-md-block icon-button"}>
                                <Icon size={1.5} path={mdiViewComfy}/>
                            </Nav.Link>
                            <Nav.Link onClick={() => setViewType('table')} className={"d-none d-md-block"}>
                                <Icon size={1.5} path={mdiTable}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                id={"searchInput"}
                                style={{maxWidth: "250px"}}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearchDelete}
                            />
                            <Button style={{marginLeft: "8px"}} variant="outline-success" type="submit">
                                <Icon size={1} path={mdiMagnify}/>
                            </Button>
                        </Form>
                    </div>
                    <div>
                        <Button style={{marginLeft: "8px"}} variant="outline-success" onClick={handleShowModal}>
                            <Icon path={mdiPlus} size={1} />
                        </Button>
                    </div>
                    <RecipeForm showModal={showModal} handleCloseModal={handleCloseModal}/>
                </Container>
            </Navbar>

            {getRecipes()}
        </div>
    );


}

export default RecipeList;