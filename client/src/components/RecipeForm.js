import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiClose, mdiLoading, mdiTrashCan} from "@mdi/js";

function RecipeForm({showModal, handleCloseModal, onComplete, recipe}){

    const defaultForm = {
        name: "",
        description: "",
        ingredients: []
    }
    const ingAtributesNames = ["id", "amount", "unit"]

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(defaultForm);
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });
    const [recipeAddCall, setRecipeAddCall] = useState({
        state: 'inactive'
    });

    const handleClose = () => {
        setFormData(defaultForm)
        handleCloseModal();
    }

    useEffect(() => {
        if (recipe) {
            setFormData(
                {
                    name: recipe.name,
                    description: recipe.description,
                    ingredients: recipe.ingredients
                });
        } else {
            setFormData(defaultForm);
        }
    }, [recipe]);

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

    const setField = (name, val, index) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            if (ingAtributesNames.includes(name)) {
                newData.ingredients[index] = {
                    ...newData.ingredients[index],
                    [name]: name === 'amount' ? Number(val) : val
                };
            } else {
                newData[name] = val;
            }
            return newData;
        });
    };

    const removeIngredientForm = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: prevFormData.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        e.preventDefault();
        e.stopPropagation();


        const payload =
            recipe ? {
                ...formData,
                id: recipe.id
            }
            :
            {...formData,};

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setRecipeAddCall({ state: 'pending' });
        const res = await fetch(`http://localhost:3000/recipe/${recipe ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setRecipeAddCall({ state: "error", error: data });
        } else {
            setRecipeAddCall({ state: "success", data });

            if (typeof onComplete === 'function') {
                onComplete(data);
            }

            handleClose();
        }
    };

    const addIngredientForm = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: [
                ...prevFormData.ingredients,
                {
                    id: Math.random().toString(),
                    amount: "",
                    unit: ""
                }
            ]
        }));
    }

    function makeIngredientForm() {
        if (ingredientLoadCall.state === "error") {
            return (<div>Chyba při načítání možných ingrediencí</div>)
        } else if (formData.ingredients.length !== 0) {
                return (
                    <>
                        <Row className="mb-2">
                            <Col md={6}><strong>Ingredience</strong></Col>
                            <Col md={3}><strong>Počet</strong></Col>
                            <Col md={2}><strong>Jednotka</strong></Col>
                            <Col md={1}></Col> {/* Empty column for the delete button */}
                        </Row>
                        {formData.ingredients.map((form, index) => (
                            <Row className="mb-2" key={form.id}>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Select
                                            value={form.id}
                                            onChange={(e) => setField("id", e.target.value, index)}
                                            required
                                        >
                                            <option value="">Vyber ingredienci</option>
                                            {ingredientLoadCall.data && ingredientLoadCall.data.map((ingredient) => (
                                                <option key={ingredient.id} value={ingredient.id}>
                                                    {ingredient.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Control
                                            type="number"
                                            value={form.amount}
                                            onChange={(e) => setField("amount", e.target.value, index)}
                                            min={1}
                                            max={1000}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Zadejte hodnotu mezi 1 - 1000
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            value={form.unit}
                                            onChange={(e) => setField("unit", e.target.value, index)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={1} className="d-flex align-items-center">
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeIngredientForm(index)}
                                        style={{ height: "38px", width: "38px", padding: "0" }}
                                    >
                                        <Icon path={mdiClose} size={1} />
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </>
                );
        }
    }
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{recipe ? "Upravit recept" : "Vytvořit recept"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Název receptu je povinný!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Popis receptu</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                rows={8}  // Optional: sets the number of rows for the textarea
                                maxLength={1000}
                            />
                        </Form.Group>
                        {makeIngredientForm()}
                        <Button style={{marginTop: "8px"}} variant="outline-success" onClick={addIngredientForm}>
                            Přidat ingredienci
                        </Button>
                        </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row gap-2">
                            <div>
                                {recipeAddCall.state === 'error' &&
                                    <div className="text-danger">Error: {recipeAddCall.error.errorMessage}</div>
                                }
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                Zavřít
                            </Button>
                            <Button variant="primary" type="submit" disabled={recipeAddCall.state === 'pending'}>
                                { recipeAddCall.state === 'pending' ? (
                                    <Icon size={0.8} path={mdiLoading} spin={true} />
                                ) : (
                                    recipe ? "Upravit" : "Přidat"
                                )}
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default RecipeForm;