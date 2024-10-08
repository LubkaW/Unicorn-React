import {Col, Container, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import RecipeSmallCard from "./RecipeSmallCard";

function RecipeGrid(props) {

    return (
        <Container>
            <Row>
                {props.recipes.map((recipe) => (
                    <Col lg={3} md={4} sm={6} xs={12} key={recipe.id}>
                        {props.smallDetail ? (
                            <RecipeSmallCard recipe={recipe} ingredients={props.ingredients} handleAddRecipe={props.handleAddRecipe}/>
                        ) : (
                            <RecipeCard recipe={recipe} handleAddRecipe={props.handleAddRecipe}/>
                        )}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RecipeGrid;