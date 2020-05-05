import React, {useState}from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import {createCategory} from './helper/adminapicall'

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const goBack = () => (
        <div className="mt-5">
            <Link 
                className="btn btn-sm btn-dark mb-3"
                to="/admin/dashboard">
                    Admin Home
                </Link>
        </div>
    )

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)
    }

    const onSubmit = (event) =>{
        event.preventDefault()
        setError('')
        setSuccess(false)
        setName('')

        //backend request fired

        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(true)
                }else{
                    setError(false)
                    setSuccess(true)
                }
            })
    }

    const successMessage = () =>{
        if(success){
            return (
                <h4 className="text-success">
                    Category Created Successfully
                </h4>
            )
        }
    }

    const errorMessage = () => {
        if(error){
            return (
                <h4 className="text-danger">
                    Failed to create category
                </h4>
            )
        }
    }


    const myCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input 
                        type="text"
                        className="form-control my-3"
                        value={name}
                        onChange={handleChange}
                        autoFocus
                        required
                        placeholder="For Ex. Laptop"
                    />
                    <button
                     onClick={onSubmit}
                     className="btn btn-outline-success">Create Category</button>
                </div>
            </form>
        )
    }


  return (
    <Base 
    title="Create a Category" 
    description="Add a new category for your products"
    className="container bg-dark p-3"
    >
        <div className="row bg-white rounded p-2">
            <div className="col-md-8 offset-md-2">
               
               {myCategoryForm()}
               {successMessage()}
               {errorMessage()} 
               {goBack()}
               
            </div>
        </div>
    </Base>
  );
}

export default AddCategory
