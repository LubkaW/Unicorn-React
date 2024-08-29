import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

function RecipeForm({showModal, handleCloseModal}){

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{
            index: 0,
            id: "",
            amount: "",
            unit: ""
        }]
    });
    const [ingredientsForms, setIngredientsForms] = useState([])
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

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            if (ingAtributesNames.includes(name)) {
                newData.ingredients.
            }
            newData[name] = val;
            return newData;
        });
    };

    const setIngredients = (name, val, index) => {
        setIngredientsForms((prevForms) => {
            return prevForms.map((form, idx) =>
                idx === index ? { ...form, [name]: val } : form
            );
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            ...formData,
        };

        console.log(payload);
    };

    const addIngredientForm = () => {
        setIngredientsForms((prevForms) => [...prevForms,
            {
                index: ingredientsForms.length,
                id: "",
                amount: "",
                unit: ""
            }
        ]);
    }

    function getIngredientName(id) {
        if (id !== "" && ingredientLoadCall.data != null) {
            const ingredient = ingredientLoadCall.data.find(ingredient => ingredient.id === id);
            return ingredient.name
        }
        return "";
    }

    function makeIngredientForm() {
        if (ingredientLoadCall.state === "error") {
            return (<div>Chyba při načítání možných ingrediencí</div>)
        } else {
            return formData.ingredients.map((form) => {
                return(<div className="d-flex flex-row gap-1">
                        <Form.Group>
                                <Form.Label>Ingredience</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={getIngredientName(form.id)}
                                    onChange={(e) => setIngredients("id", e.target.value, form.index)}
                                />
                        </Form.Group>
                        <Form.Group>
                                <Form.Label>Počet</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.unit}
                                    onChange={(e) => setIngredients("name", e.target.value, form.index)}
                                />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.amount}
                                onChange={(e) => setIngredients("amount", e.target.value, form.index)}
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
                        <Button style={{marginLeft: "8px"}} variant="outline-success" onClick={addIngredientForm}>
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