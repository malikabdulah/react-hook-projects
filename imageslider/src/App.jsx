import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [limit, setLimit] = useState(10)
  const [url, setUrl] = useState(`https://picsum.photos/v2/list?page=1&limit=${limit}`)

  async function fetchImages(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
    }}

  useEffect(() => {
    if(url!=='') fetchImages(url)
  },[url])
useEffect(() => {
  setImages([])
  setUrl(`https://picsum.photos/v2/list?page=1&limit=${limit}`)
}, [limit])
  return (
    <>
    <div className="App flex flex-col items-center justify-center min-h-screen bg-[#214141]">
      <div className="slider-container flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#214444]">Image Slider</h1>
      {images && images.length > 0 ? (
        <><div className="slider flex items-center justify-center gap-4 flex-row">
          <button onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)} className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition duration-300">
            <ChevronLeft />
          </button>
          <img src={images[currentSlide].download_url} alt={images[currentSlide].author} className="w-100 h-100 object-cover rounded-xl" />
          <button onClick={() => setCurrentSlide((currentSlide + 1) % images.length)} className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition duration-300">
            <ChevronRight />
          </button>
        </div>
          <span className='current-slide-indicator text-center flex flex-row justify-center mt-4'>
            {images&&images.length > 0 ? images.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full mx-1 ${index === currentSlide ? 'bg-[#214441]' : 'bg-gray-300 hover:bg-gray-400'}`}></button>
            )) : null}
          </span>
          <p className="text-sm text-gray-500 mt-4 text-center justify-center"> Limit:
            <input type="number" placeholder='Enter Limit' value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#214441] ml-2" />
          </p>
          </>
      ) : (
        <p>Loading images...</p>
      )}
      </div>
    </div>
    </>
  )
}

export default App
