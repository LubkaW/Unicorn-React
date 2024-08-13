import {Table} from "react-bootstrap";

function RecipeTable(props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th style={{ textAlign: 'left', width: '1%'}}>Id</th>
                    <th style={{ textAlign: 'left' }}>Recipe name</th>
                </tr>
            </thead>
            <tbody>
                {props.recipes.map((recipe, index) => (
                    <tr key={recipe.id}>
                        <td style={{ textAlign: 'left' }}>{recipe.id}</td>
                        <td style={{ textAlign: 'left' }}>{recipe.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RecipeTable;