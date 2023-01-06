import { useState } from "react";

function AddForm({ handlerAddItem }) {
    const [item, setItem] = useState();
    //placeholder for new item

    const handlerName = (event) => {
        const form = { ...item, name: event.target.value };
        setItem(form);
    }

    const handlerPrice = (event) => {
        const form = { ...item, price: event.target.value };
        setItem(form);
    }

    const handlerQuantity = (event) => {
        const form = { ...item, quantity: event.target.value }
        setItem(form);
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
        handlerAddItem(item);
    }

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <input type="text" name="name" placeholder="Product Name" onChange={handlerName} />
                <input type='text' name='quantity' placeholder='Quantity' onChange={handlerQuantity} />
                <input type='text' name='price' placeholder='Price' onChange={handlerPrice} />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddForm;