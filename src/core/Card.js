import React, {useState, useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import { AddItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Redirect } from 'react-router-dom';

const Card = ({
        product,
        addtoCart = true,
        removeFromCart = false,
        setReload = f => f,
        //setReload = function(f){return f}
        reload = undefined
      }) => {

        const addToCart = () => {
            AddItemToCart(product, () => setRedirect(true))
        }

        const [redirect, setRedirect] = useState(false)
        const [count, setCount] = useState(product.count)

        const getRedirect = (redirect) =>{
            if(redirect){
                return <Redirect to="/cart" />
            }
        }

        const cartTitle = product ? product.name : "A photo from pexels"
        const cartDescription = product ? product.description : "A default description"
        const cartPrice = product ? product.price : "DEFAULT"


        const showAddtoCart = addtoCart => {
            return (
                addtoCart && (
                    <button
                        onClick={addToCart}
                        className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                    Add to Cart
                    </button>
                )
            )
        }
        const showRemoveFromCart = (removeFromCart) => {
            return (
                removeFromCart && (
                    <button
                        onClick={() => {
                            removeItemFromCart(product._id)
                            setReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2"
                        >
                        Remove from cart
                    </button>
                )
            )
        }

    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">

            {getRedirect(redirect)}
            
            <ImageHelper product={product}/>
            
            <p className="lead font-weight-normal text-wrap">
            {cartDescription}
            </p>

            <p className="btn btn-success rounded  btn-sm px-4">${cartPrice}</p>
            <div className="row">
            <div className="col-12">
               {showAddtoCart(addtoCart)}
            </div>
            <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Card