import { createContext, ReactNode, useContext } from 'react'

type CartProviderProps = {
  children: ReactNode
}

type CartContextProps = {
  cart: string
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  return (
    <CartContext.Provider value={{ cart: 'certo' }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
