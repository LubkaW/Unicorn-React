import {Col, Container, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function RecipeGrid(props) {
    return (
        <Container>
            <Row>
                {props.recipes.map((recipe) => (
                    <Col lg={3} md={4} sm={6} xs={12} key={recipe.id}>
                        <RecipeCard recipe={recipe} textStyle={props.textStyle}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RecipeGrid;