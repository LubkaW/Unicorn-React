import {Card} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"
import Icon from "@mdi/react";
import {mdiPencilOutline} from "@mdi/js";

function RecipeCard(props) {
    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>
                    {props.recipe.name}
                    <Icon
                        size={0.8}
                        path={mdiPencilOutline}
                        style={{ color: 'orange', cursor: 'pointer' }}
                        onClick={() => props.handleAddRecipe(props.recipe)}
                    />
                </Card.Title>
                <Card.Text className={styles.cardTextBig}>
                    {props.recipe.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;