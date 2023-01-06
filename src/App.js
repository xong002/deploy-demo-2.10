import './App.css';
//import the API connection
import mockAPI from './api/mockapi';
import { Routes, Route, useNavigate } from "react-router-dom";
import Table from './components/Table';
import { useEffect, useState } from "react";
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';


const DefaultPage = () => <p>Nothing to see here!</p>;

function App() {
  const [products, setProducts] = useState([]);
  const [editFormState, setEditFormState] = useState();
  const navigate = useNavigate();

  //function that gets the data from the API
  const apiGet = async () => {
    try {
      const response = await mockAPI.get("/product")
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  //saves new entry into database
  const apiPost = async (newProduct) => {
    try {
      const response = await mockAPI.post('/product', newProduct);
      console.log(response.data)
      //call apiGet to repopulate the data
      apiGet();
    } catch (error) {
      console.log(error.message)
    }
  }

  const apiPut = async (editFormState) => {
    try {
      const response = await mockAPI.put(`/product/${editFormState.id}`, {
        name: editFormState.name,
        quantity: editFormState.quantity,
        price: editFormState.price,
      });
      console.log(response.data);
      apiGet();
    } catch (error) {
      console.log(error.message);
    }
  }

  const apiDelete = async (id) => {
    try {
      const response = await mockAPI.delete(`/product/${id}`);
      console.log(response.data);
      apiGet();
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlerEdit = (id) => {
    const foundIndex = products.findIndex((item) => item.id === id);
    setEditFormState((prevState) => {
      return {
        ...prevState,
        id: products[foundIndex].id,
        name: products[foundIndex].name,
        quantity: products[foundIndex].quantity,
        price: products[foundIndex].price,
      }
    })

  };

  const handlerUpdateEditForm = (e) => {
    setEditFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handlerSubmitEditForm = (e) => {
    e.preventDefault();
    apiPut(editFormState);

    navigate("/", { replace: true });
  };

  //use the useEffect hook to run apiGet when the application starts
  useEffect(() => {
    apiGet();
  }, []);

  // the [] is the 2nd argument of the useEffect function that ensures that the apiGet is called ONLY during the first render.
  //the [] can contain any state values, and if it does, the hook will also run when the state changes.
  //the useEffect hook can prevent missing values during application starts as it runs functions when the app starts.

  return (
    <Routes>

      <Route path="*" element={<DefaultPage />} />

      <Route path="/" element={
        <div className="App">
          <h1>Product List</h1>
          <button onClick={apiGet}>Load Products</button>
          {/* {products && <Table list={products} />} */}
          <Table
            list={products}
            handlerEdit={handlerEdit}
            handlerDelete={apiDelete}
          />
          <AddForm handlerAddItem={apiPost} />
        </div>
      }>
      </Route>

      <Route path=":id" element={<EditForm
        editFormState={editFormState}
        handlerSubmitEditForm={handlerSubmitEditForm}
        handlerUpdateEditForm={handlerUpdateEditForm}
      />}>

      </Route>

    </Routes>
  );
}

export default App;
