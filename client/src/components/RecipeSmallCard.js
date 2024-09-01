import {Card, ListGroup} from "react-bootstrap";
import logo from "../food_placeholder.png"
import styles from "../css/recipe-card.module.css"
import Icon from "@mdi/react";
import {mdiPencilOutline} from "@mdi/js";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../UserProvider";

function RecipeSmallCard(props) {

    const navigate = useNavigate();
    const {isAuthorized} = useContext(UserContext);

    function getIngredientName(id) {
            const ingredient = props.ingredients.find(ingredient => ingredient.id === id);
            return ingredient.name
    }

    function handleTitleClick() {
        navigate(`/recipeDetail?id=${props.recipe.id}`);
    }

    return (
        <Card className={styles.card}>
            <Card.Img className={styles.cardImage} variant="top" src={logo}/>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>
                    <span onClick={handleTitleClick} style={{cursor: 'pointer'}}>
                        {props.recipe.name}
                    </span>
                    {isAuthorized && <Icon
                        size={0.8}
                        path={mdiPencilOutline}
                        style={{ marginLeft: '4px', color: 'orange', cursor: 'pointer'}}
                        onClick={() => props.handleAddRecipe(props.recipe)}
                    />}
                </Card.Title>
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