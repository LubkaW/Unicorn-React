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
                {props.entities.map((entity) => (
                    <tr key={entity.id}>
                        <td style={{ textAlign: 'left' }}>{entity.id}</td>
                        <td style={{ textAlign: 'left' }}>{entity.name}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RecipeTable;