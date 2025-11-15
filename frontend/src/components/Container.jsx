import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";


 const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
    
export default function Container(){
    const [products, setProducts] = useState([]);
    const [filter,setFilter]=useState("");
    const[editId,setEditId]=useState(null);
    const[loading,setLoading]=useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    


    const[form,setForm]=useState({
         id: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
    })

 
  const fetchProduct=async()=>{
    setLoading(true);
    try{
      const res=await api.get("/products/");
       setProducts(
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.products)
          ? res.data.products
          : []
      );
      setError("");
    }catch(err){
      setError("failed to fetch data")
    }
    setLoading(false);
  }
 
// 🔥 Call API when component loads
useEffect(() => {
  fetchProduct();
}, []);

const resetForm=()=>{
  setForm({...form,id:"",name:"",description:"",price:"",quantity:""})
}

 const handleSubmit=async(e)=>{
               e.preventDefault();
               setLoading(true);  
               try{
                  if(editId){
                   await api.put(`/products/${editId}`,{...form,
                    id:Number(form.id),
                    name:String(form.name),
                    description:String(form.description),
                    price:Number(form.price),
                    quantity:Number(form.quantity)
                   })
                   setMessage("Product updated successfully");
                  }
                  else{
                    await api.post("/products",{...form,
                      id:Number(form.id),
                    name:String(form.name),
                    description:String(form.description),
                    price:Number(form.price),
                    quantity:Number(form.quantity)
                    })
                    setMessage("Product added successfully");
                  }
                  resetForm();
                 fetchProduct();
              }
              catch(err){
                setError("Operation failed")
              }
     }


    useEffect(()=>{
        const timer = setTimeout(()=>{
            setMessage("");
        },5000)
        return () => clearTimeout(timer);
    },[message])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setError("");
        },5000)
        return () => clearTimeout(timer);
    },[error])


    
    
     const handleChange=async(e)=>{
               e.preventDefault();
                console.log(e.target.value);
               setForm({ ...form, [e.target.name]: e.target.value });
              
     }

    const handleEdit=(product)=>{
      setForm({
        ...form,
        id:product.id,
        name:product.name,
        description:product.description,
        price:product.price,
        quantity:product.quantity

      })
      setEditId(product.id);
      setMessage("");
      setError("");
    }


    const handleDelete=async(product)=>{
      const ok=window.confirm("delete this product");
      if(ok){
          setError("");
          setMessage("");
          setLoading(true);
          try{
            await api.delete(`/products/${product.id}`)
            setMessage("Product deleted Successfully")
            fetchProduct();
          }
          catch(err){
            setError("Operation not work");
          }
      }
         setLoading(false);

    }

    return(
       <div className="text-white w-screen h-screen flex flex-col gap-11 ">
        
            <div className="flex flex-row justify-between">
                <h1 className="bg-white text-black p-2 ml-5 rounded-full w-40">Total:{products.length}</h1>
                 <input className="ml-auto mr-4 p-1 rounded-lg w-80 text-black"
              type="text"
              placeholder="Search by id, name or description..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            </div>
            
            <div className="flex flex-col">
              <div className="border-b-green-500 bg-white w-1/2 ml-[20px] rounded-lg text-black font-bold flex flex-col p-11  max-md:w-full max-xs:w-full max-xs:grid-col-1 max-xs:  ">
                    <h2 className="mb-8">{editId ? "Edit Product" : "Add Product"}</h2>
                    
                    <form onSubmit={handleSubmit} className="  grid grid-cols-4 max-xs:grid-cols-1 md:grid-cols-4 gap-6">
                            <input className="inputbox" type="number" value={form.id} onChange={handleChange} name="id" placeholder="ID" required disabled={!!editId}></input>
                             <input className="inputbox" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                             <input className="inputbox" type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                            <input className="inputbox" type="number" value={form.price} onChange={handleChange} name="price" placeholder="Price" required></input>
                           <input className="inputbox" type="number" value={form.quantity} onChange={handleChange} name="quantity" placeholder="Quantity" required></input>
                        <div className="formbutton">
                            <button className="btn"type="submit">{editId ? "Update":"Add"}</button>
                        
                              {message && <div className="msg">{message}</div>}
                              {error && <div className="err">{error}</div>}
                        </div>
                    </form>
            
              </div>
              <div className="m-[20px] bg-white text-black flex flex-col max-xs:w-full">
                <h2 className="font-bold text-4xl m-6">Products</h2>
                {loading ? ("loading..."):(
                 <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                          {products
                          .sort((a, b) => a.id - b.id)
                           .filter((p) => {
                            const text = filter.toLowerCase();
                            return (
                                  p.id.toString().includes(text) ||
                                  p.name.toLowerCase().includes(text) ||
                                  p.description.toLowerCase().includes(text)
                                 );
                           })
                          .map((p) => (
                            <tr key={p.id}>
                              <td>{p.id}</td>
                              <td>{p.name}</td>
                              <td>{p.description}</td>
                              <td>{p.price}</td>
                              <td>{p.quantity}</td>
                              <td>
                          <div className="row-actions ">
                            <button className="btn justify-center items-center mr-8" onClick={() => handleEdit(p)}>
                              Edit
                            </button>
                            <button className="justify-center items-center text-white p-3 bg-red-900 rounded-lg  hover:scale-95" onClick={() => handleDelete(p)}>
                              Delete
                            </button>
                          </div>
                        </td>
                            </tr>
                          ))}
                        </tbody>
                 </table>
                )}
              </div>


            </div>


       </div>
    )

}