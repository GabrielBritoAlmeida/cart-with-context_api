import { createContext, ReactNode, useContext, useState } from 'react'
import { IProduct } from './types'

type CartProviderProps = {
  children: ReactNode
}

type CartContextProps = {
  listCartProducts: IProduct[]
  handleAddProductToCart: (product: IProduct) => void
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [listCartProducts, setListCartProducts] = useState<IProduct[]>([])

  function handleAddProductToCart(product: IProduct) {
    const updateArr = [...listCartProducts, product]
    setListCartProducts(updateArr)
  }

  return (
    <CartContext.Provider value={{ listCartProducts, handleAddProductToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
