import React, {useState, useEffect}from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import {updateCategory, getCategory} from './helper/adminapicall'

const UpdateCategory = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        error: '', 
        success: false
    })

    const {name, error, success} = values

    const {user, token} = isAuthenticated()

    const preload = (categoryId) =>{

        getCategory(categoryId).then(data =>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values,
                    name: data.name,
                    error: false
                })
            }
        })
    }

    useEffect(()=>{
        preload(match.params.categoryId)
     }, [])


     const onSubmitt = (event) =>{
        event.preventDefault()
        setValues({error: ''})
        
        //setValues({name: ''})

        //backend request fired

        updateCategory( match.params.categoryId, user._id, token, {name})
            .then(data => {
                if(data.error){
                    setValues({error: true})
                }else{
                    setValues({
                        error: '',
                        success: true
                    })
        
                }
            })
    }


    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
        console.log(event.target.value);
        
    }

    const createProductForm = () => (
        <form >
          
          <div className="form-group">
            <input
              
              onChange={handleChange('name')}
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={name}
            />
          </div>
          
          <button type="submit" 
            onClick={onSubmitt} 
            className="btn btn-outline-success">
            Update Product
          </button>
        </form>
      );

      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                 Category is updated successfully
              </div>
            </div>
          </div>
        );
      };

     
    return (
        <Base
            title="Update a category here"
            description="Category updation section"
            className="container bg-success p-4"
        >
            <Link className="btn btn-md btn-dark mb-3"
                to="/admin/dashboard">
                    Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 p-3">
                   {successMessage()}
                   {errorMessage()}
                   {createProductForm()}                    
                </div> 
            </div>
        </Base>
    )
}

export default UpdateCategory
