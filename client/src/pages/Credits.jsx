import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Credits = () => {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const {token, axios } = useAppContext()

  const fetchPlans = async () => {
   try {
    const { data } = await axios.get('/api/credit/plan', {
      headers: { Authorization: token }
    })
    if (data.success){
      setPlans(data.plans)
    }else{
      toast.error(data.message || 'Failed to fetch plans.')
    }
   } catch (error) {
    toast.error(error.message)
   }
   setLoading(false)
  }

      const purchasePlan = async (planId) => {
        try {
          const { data } = await axios.post('/api/credit/purchase', {planId}, {headers: { Authorization: token }})
          if (data.success) {
            window.location.href = data.url
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }

  useEffect(()=>{
    fetchPlans()
  },[])

  if(loading) return <Loading />

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up scroll-smooth pb-20'>
      <h2 className='text-3xl font-light tracking-tight text-center mb-16 xl:mt-32 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]'>Choose Your Power.</h2>

      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan, index)=>(
          <div key={plan._id} className={`glass-panel p-8 rounded-3xl min-w-[320px] flex flex-col group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 animate-slide-in-left ${plan._id === "pro" ? "border-white/30" : "border-white/5"}`} style={{animationDelay: `${index * 0.1}s`}}>
            <div className='flex-1'>
              <h3 className='text-xl font-medium text-white mb-2 tracking-wide'>{plan.name}</h3>
              <p className='text-3xl font-light text-white mb-6'>${plan.price}
                <span className='text-sm font-medium text-gray-500 uppercase tracking-widest ml-2'>/ {plan.credits} credits</span>
              </p>
              <ul className='list-none text-sm text-gray-300 space-y-3 font-light'>
                {plan.features.map((feature, featureIndex)=>(
                  <li key={featureIndex} className='flex items-center gap-3'>
                    <div className='w-1.5 h-1.5 rounded-full bg-white opacity-70'></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={()=> toast.promise(purchasePlan(plan._id), {loading: 'Processing...'})} className='mt-8 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-medium py-3 rounded-xl transition-all duration-300 cursor-pointer tracking-wide shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
              Acquire
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
