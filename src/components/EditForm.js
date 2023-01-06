import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";

function EditForm({ editFormState, handlerSubmitEditForm, handlerUpdateEditForm }) {

    const navigate = useNavigate();

    return (
        <form onSubmit={handlerSubmitEditForm} className={styles.center}>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>
                            <input value={editFormState.name} type='text' name='name'
                                onChange={(e) => handlerUpdateEditForm(e, 'name')} />
                        </td>
                    </tr>
                    <tr>
                        <th>Qty</th>
                        <td>
                            <input value={editFormState.quantity} type='number' name='quantity' min={1}
                                onChange={(e) => handlerUpdateEditForm(e, 'quantity')} />
                        </td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>
                            <input value={editFormState.price} type='number' name='price' min={0} step={0.01}
                                onChange={(e) => handlerUpdateEditForm(e, 'price')} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" />
            {/* redirect to updated list of products */}
            <button label='Cancel' onClick={() => {
                navigate("/");
            }}>Cancel</button>
        </form >
    )
};

export default EditForm;