import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const limit = 10;

  async function loadData() {
    setLoading(true)
    await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${count*limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(prevProducts => [...prevProducts, ...data.products])
        setCount(prevCount => prevCount + 1)
        setLoading(false)
  })}
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
    <div className='flex flex-col justify center text-center bg-gray-200'>
    <div className='text-2xl mt-4 font-bold'>Products List</div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {products&&products.length>0 ? products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title.slice(0, 20)}...</h2>
            {/* <p>{product.description}</p> */}
            <p className="price">Price: ${product.price}</p>
            <button className="bg-green-800 text-white py-1 px-2 rounded-lg mt-2" onClick={() => {alert(`You have bought ${product.title} for $${product.price}`)}}>
              Buy Now
            </button>
          </div>
        )) : loading ? <p>Loading...</p> : <p>No products found.</p>}
      </div>
          <button onClick={loadData} className="load-more-button bg-green-800 text-white py-2 px-4 rounded-lg mt-4 text-lg m-4 ml-80 mr-80" disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
    </div>
    </>
  )
}

export default App
