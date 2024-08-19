import {Card} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"

function RecipeCard(props) {
    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>{props.recipe.name}</Card.Title>
                <Card.Text className={styles.cardTextBig}>
                    {props.recipe.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;