import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

function RecipeForm({showModal, handleCloseModal}){

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{
            id: "",
            amount: "",
            unit: ""
        }]
    });
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    const ingAtributesNames = ["id", "amount", "unit"]

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
                    [name]: val
                };
            } else {
                newData[name] = val;
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            ...formData,
        };

        console.log(payload);
    };

    const addIngredientForm = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: [
                ...prevFormData.ingredients,
                {
                    id: "",
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
                return(<div className="d-flex flex-row gap-1">
                        <Form.Group>
                                <Form.Label>Ingredience</Form.Label>
                                <Form.Select
                                    value={form.id}
                                    onChange={(e) => setField("id", e.target.value, index)}
                                >
                                    <option value="">Select an ingredient</option>
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
                                    type="text"
                                    value={form.unit}
                                    onChange={(e) => setField("unit", e.target.value, index)}
                                />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.amount}
                                onChange={(e) => setField("amount", e.target.value, index)}
                            />
                        </Form.Group>
                </div>)
            });
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form onSubmit={(e) => handleSubmit(e)} >
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
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                rows={8}  // Optional: sets the number of rows for the textarea
                            />
                        </Form.Group>
                        {makeIngredientForm()}
                        <Button style={{marginTop: "8px"}} variant="outline-success" onClick={addIngredientForm}>
                            Přidat recept
                        </Button>
                        </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Zavřít
                            </Button>
                            <Button variant="primary" type="submit">
                                Vytvořit
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default RecipeForm;