import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Community = () => {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios } = useAppContext()

  const fetchImages = async () => {
    try {
      const {data} = await axios.get('/api/user/published-images')
      if (data.success) {
        setImages(data.images)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchImages()
  },[])

  if(loading) return <Loading />

  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll pb-20 animate-fade-in-up scroll-smooth'>
      <h2 className='text-2xl font-light tracking-tight mb-8 text-white'>Community Generations.</h2>

      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-6'>
          {images.map((item, index)=>(
            <a key={index} href={item.imageUrl} target='_blank' className='relative group block rounded-2xl overflow-hidden glass-panel shadow-[0_0_15px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500 animate-slide-in-left' style={{animationDelay: `${index * 0.05}s`}}>
              <img src={item.imageUrl} alt="Community Generation" className='w-full h-44 md:h-56 2xl:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100'/>
              
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
              
              <p className='absolute bottom-4 left-4 text-xs text-white/90 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0'>
                {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 font-light mt-16 text-lg'>No images have been published yet.</p>
      )}
    </div>
  )
}

export default Community
