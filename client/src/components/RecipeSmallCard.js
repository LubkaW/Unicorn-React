import {Card, ListGroup} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"

function RecipeSmallCard(props) {

    function getIngredientName(id) {
            const ingredient = props.ingredients.find(ingredient => ingredient.id === id);
            return ingredient.name
    }

    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{props.recipe.name}</Card.Title>
                <Card.Text className={styles.cardTextSmall}>
                    {props.recipe.description}
                </Card.Text>
                <div>
                    <ListGroup className={styles.listGroup}>
                        {props.ingredients && props.ingredients.length !== 0 &&
                            props.recipe.ingredients.map((ingredient) => (
                                <ListGroup.Item key={ingredient.id} className={styles.listGroupItem}>
                                    <span className="mr-2">&#8226;</span>
                                    {getIngredientName(ingredient.id)}
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecipeSmallCard;