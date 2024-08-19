import {Card, ListGroup} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"

function RecipeSmallCard(props) {
    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{props.recipe.name}</Card.Title>
                <Card.Text className={styles.cardTextSmall}>
                    {props.recipe.description}
                    {<ListGroup>
                        {props.recipe.ingredients.map((ingredient) => {
                            <ListGroup.Item className="d-flex align-items-start">
                                <span className="mr-2">&#8226;</span>
                                ingredient
                            </ListGroup.Item>
                        })}
                    </ListGroup>}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeSmallCard;