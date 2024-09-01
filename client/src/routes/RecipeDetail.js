import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "../css/recipe-list.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function RecipeDetail() {

    const [recipeDetail, setRecipeDetail] = useState({state:"pending"})

    let [searchParams] = useSearchParams();
    const recipeId = searchParams.get("id");

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/get?id=${recipeId}`, {
            method: "GET",

        })
            .then(async (response) => {
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setRecipeDetail({ state: "error", error: responseJson });
                } else {
                    setRecipeDetail({ state: "success", data: responseJson });
                }
            })
            .catch((err) => {
                setRecipeDetail({ state: "error", error: err });
            });
    }, []);

    function getRecipeDetail() {
        switch (recipeDetail.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <div>
                        <pre>{JSON.stringify(recipeDetail.data, null, 2)}</pre>
                    </div>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst detail receptu</div>
                        <br />
                        <pre>{JSON.stringify(recipeDetail.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return <div>{getRecipeDetail()}</div>
}

export default RecipeDetail;