import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, createAProduct } from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper/index'
import AdminDashBoard from '../user/AdminDashBoard'

const AddProduct = () => {

    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name:'',
        description:"",
        price: '',
        stock: '',
        photo:'',
        categories: [],
        category: '',
        loading: false, 
        error: '',
        createProduct: '',
        getRedirect: false,
        formData:''
    })

    const { name, 
            description, 
            price, 
            stock, 
            categories, 
            category, 
            loading, 
            error, 
            createdProduct, 
            getRedirect, 
            formData
        } = values


    const preload = () =>{
        getCategories().then(data =>{
            console.log(data)
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(()=>{
       preload()
    }, [])

    const handleChange = name => event => {

        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name] : value})

    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})

        createAProduct(user._id, token, formData)
            .then(data => { 
                if(data.error){
                    setValues({...values, error: data.error})
                }else{
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        photo: '',
                        stock: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })

    }

    const successMessage = () => {
           
      return(
          <div 
              style={{ display: createdProduct? '': 'none'}}
              className="alert alert-success mt-3">
                  <h4>{createdProduct} created successfully</h4>
          </div>
      )

    }


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate, index) => (
                  
                  <option key={index} value={cate._id}>{cate.name}</option>
                  
                ))}
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );


    return (
        <Base
            title="Add a product here"
            description="Product creation section"
            className="container bg-success p-4"
        >
            <Link className="btn btn-md btn-dark mb-3"
                to="/admin/dashboard">
                    Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 p-3">
                    {createProductForm()}    
                    {successMessage()}
                </div> 
            </div>
        </Base>
    )
}

export default AddProduct