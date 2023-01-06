// function Table({ list }) {
//     return (
//         <div>
//             {list && <p>{list[0].name}</p>}
//         </div>
//     )
// }
//will cause error


import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';

function Table({ list, handlerEdit, handlerDelete }) {
    const navigate = useNavigate();

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list &&
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                {/* <td><Link to={`/${item.id}`}>Edit</Link></td> */}
                                <td><button onClick={() => {
                                    handlerEdit(item.id);
                                    navigate(`/${item.id}`, { replace: true });
                                }}>Edit</button></td>
                                <td><button onClick={() => {
                                    handlerDelete(item.id);
                                    navigate(`/`, { replace: true });
                                }}>Delete</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;