import React, {useEffect, useState} from 'react';
import '../styles.css'
import {API} from '../backend'
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';



export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProducts = () =>{
    getProducts().then(products => {
      if(products.error){
        setError(products.error)
      }else{
        setProducts(products)
      }
    })
  }

  useEffect(()=>{
	loadAllProducts()
  }, [])
       
  return (
    <Base title="Home Page" description="Welcome to My Store">
      <div className="row text-center">
        <h1 className="text-center text-white">All Products</h1>
		<div className="row">
			{products.map((product, index) => {
				return (
					<div className="col-4 mb-4" key={index}>
						<Card product={product} />
					</div>
				)
			})}
		</div>
      </div>
    </Base>
  );
}
