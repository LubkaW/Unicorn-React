import {Card, ListGroup} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"

function RecipeSmallCard(props) {

    function getIngredientName(id) {
        if (props.ingredients && props.ingredients.length !== 0) {
            const ingredient = props.ingredients.find(ingredient => ingredient.id === id);
            return ingredient.name
        }
        return undefined;
    }

    return (
        <Card className={styles.card}>
            {console.log(props.ingredients)}
            {console.log(props.recipe)}
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{props.recipe.name}</Card.Title>
                <Card.Text className={styles.cardTextSmall}>
                    {props.recipe.description}
                    <div>
                        <ListGroup>
                            {props.recipe.ingredients.map((ingredient) => (
                                <ListGroup.Item key={ingredient.id} className="d-flex align-items-start">
                                    <span className="mr-2">&#8226;</span>
                                    {console.log(ingredient.id)}
                                    {getIngredientName(ingredient.id)}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeSmallCard;