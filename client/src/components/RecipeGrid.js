import {Col, Container, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function recipeGrid(props) {
    return (
        <Container>
            <h1>List of recipes</h1>
            <Row>
                {props.recipes.map((recipe) => (
                    <Col lg={3} md={4} sm={6} xs={12} key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default recipeGrid;