import React, { useContext } from 'react'
import { Shopcontext } from '../Context/ShopContext'
import Item from './Item'

const NewCollection = () => {
    const {new_collections} = useContext(Shopcontext)
  return (
    <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
            <h2 className='text-4xl font-bold tracking-tight text-gray-900 text-center font-serif'>New Collection</h2>
            <p className='text-center mt-3 md:px-56'>Discover the art of stillness with our new collection of minimalist home essentials. Built around the philosophy that less is truly more, these pieces combine clean lines, rich textures, and muted colorways to transform your space into a peaceful retreat. Every item—from the hand-thrown ceramics to the linen throws—is designed to bring a sense of tranquility and order to your daily life.</p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {new_collections.map((product) => {
                    return <Item key={product.id} product={product}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default NewCollection
