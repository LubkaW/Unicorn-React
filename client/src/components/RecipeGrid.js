import {Col, Container, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function recipeGrid(props) {
    return (
        <Container>
            <h1>List of recipes</h1>
            {props.recipes.map((recipe) => (
                <Col>
                    <RecipeCard recipe={recipe} />
                </Col>
            ))}
        </Container>
    );
}

export default recipeGrid;