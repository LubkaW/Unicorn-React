import {useEffect, useState} from "react";
import styles from "../css/recipe-list.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import RecipeTable from "../components/RecipeTable";

function IngredientList() {

    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({ state: "error", error: responseJson });
            } else {
                setIngredientLoadCall({ state: "success", data: responseJson });
            }
        }).catch((err) => {setIngredientLoadCall({ state: "error", error: err });});
    }, []);

    function getIngredients() {
        switch (ingredientLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <div>
                        <div className={"d-none d-md-block"} style={{marginTop: '20px'}}>
                            {<RecipeTable entities={ingredientLoadCall.data}/>}
                        </div>
                    </div>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data pro seznam ingrediencí.</div>
                        <br />
                        <pre>{JSON.stringify(ingredientLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>{getIngredients()}</div>
    );
}

export default IngredientList;