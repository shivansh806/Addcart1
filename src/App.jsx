import React, { use, useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  
  const [product, setproduct] = useState([])
  const [Cart, setCart] = useState([])
  const [value, setvalue] = useState(0)


  useEffect(()=>{
     priceOf()
  },[Cart])
  
  const getData = async()=>{
    const cart = await axios.get('https://fakestoreapi.com/products')
    console.log(cart.data)
    setproduct(cart.data)
  }

  const addcart = (idx)=>{
       var copy = [...Cart]
       copy.push(product[idx])
       setCart(copy)
  }

  const removeData = (idx)=>{
      var copy = [...Cart]
      copy.splice(idx,1)
      setCart(copy)
  }

  const priceOf = ()=>{
      const copy = [...Cart]
      let sum = 0;
      copy.forEach((elem)=>{
        sum = sum + elem.price
      })
      setvalue(sum);
  }
  

  return (
    <div className='p-2'>
       <button 
       onClick={()=>{
           getData()
       }}
       className='bg-green-800 text-white px-3 py-2 font-semibold rounded active:scale-95 cursor-pointer'>Get Data</button>
       <div className='py-3 px-2 flex gap-3 w-[100%]'>
          <div className="left w-[70%] flex flex-wrap items-center gap-10 bg-pink-700 p-8 justify-center rounded-xl">
            {
              product.map((elem,idx)=>{

                return <div key={idx} className='p-4 bg-gray-300 text-center rounded-xl'>
                       <img className='h-30 w-30 rounded-full mb-5' src={elem.image} alt="" />
                       <h1>{elem.category}</h1>
                       <h2>{elem.price}</h2>
                       <button
                       onClick={()=>{
                          addcart(idx)
                       }}
                       className='px-3 py-2 bg-yellow-600 font-semibold text-white active:scale-95 cursor-pointer rounded-xl mt-3'
                       >Add Cart</button>
                </div>
              })
            }
          </div>
          <div className="relative right w-[30%] bg-blue-400 rounded-xl p-3 ">
               {
                Cart.map((elem,idx)=>{

                  return <div key={idx} className='px-3 py-3 bg-white text-center rounded-xl flex items-center gap-4 mt-4'>
                          <img className='h-15 w-15 rounded-full mb-5' src={elem.image} alt="" />
                          <div>
                           <h1 className='text-xl'>{elem.category}</h1>
                           <h2>${elem.price}</h2>
                          </div>
                          <button
                          onClick={()=>{
                            removeData(idx)
                          }}
                          className='px-3 py-2 bg-red-600 font-semibold text-white active:scale-95 cursor-pointer rounded-xl mt-3'
                          >Remove</button>
                  </div>
                })
               }
              <div className="amount bg-white flex justify-between items-center w-[300px] h-8 fixed bottom-6 right-6 p-4 rounded">
                  <h1>Total Amount : </h1>
                  <h2>${value}</h2>
              </div>
          </div>

       </div>
    </div>
  )
}

export default App