import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function RecipeForm({showModal, handleCloseModal, onComplete}){

    const ingAtributesNames = ["id", "amount", "unit"]
    const defaultForm = {
        name: "",
        description: "",
        ingredients: []
    }

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(defaultForm);
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });
    const [recipeAddCall, setRecipeAddCall] = useState({
        state: 'inactive'
    });

    const handleClose = () => {
        setFormData(defaultForm);
        handleCloseModal();
    }

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

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        e.preventDefault();
        e.stopPropagation();

        const payload = {
            ...formData,
        };

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setRecipeAddCall({ state: 'pending' });
        const res = await fetch(`http://localhost:3000/recipe/create`, {
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
        } else {
            return formData.ingredients.map((form, index) => {
                return(<div className="d-flex flex-row gap-1" key={form.id}>
                        <Form.Group>
                                <Form.Label>Ingredience</Form.Label>
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
                        <Form.Group>
                                <Form.Label>Počet</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={form.amount}
                                    onChange={(e) => setField("amount", e.target.value, index)}
                                    min={1}
                                    max={20}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadejte hodnotu mezi 1 - 20
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.unit}
                                onChange={(e) => setField("unit", e.target.value, index)}
                                required
                            />
                        </Form.Group>
                </div>)
            });
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} >
                    <Modal.Header closeButton>
                        <Modal.Title>Vytvořit recept</Modal.Title>
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                rows={8}  // Optional: sets the number of rows for the textarea
                                maxLength={500}
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
                                    "Přidat"
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