import { createContext, ReactNode, useContext, useState } from 'react'
import { IProduct } from './types'

type CartProviderProps = {
  children: ReactNode
}

type CartProps = {
  product: IProduct
  quantity: number
}

type CartContextProps = {
  listCartProducts: CartProps[]
  handleAddProductToCart: (product: IProduct) => void
  handleRemoveProductToCart: (product: IProduct) => void
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [listCartProducts, setListCartProducts] = useState<CartProps[]>([])

  function handleAddProductToCart(product: IProduct) {
    const productInCartIndex = listCartProducts.findIndex(
      (item) => item.product.id === product.id
    )

    if (productInCartIndex >= 0) {
      listCartProducts[productInCartIndex].quantity++
      setListCartProducts([...listCartProducts])
    } else {
      const updateArr = [...listCartProducts, { product, quantity: 1 }]
      setListCartProducts(updateArr)
    }
  }

  function handleRemoveProductToCart(product: IProduct) {
    const productInCartIndex = listCartProducts.findIndex(
      (item) => item.product.id === product.id
    )

    if (productInCartIndex >= 0) {
      if (listCartProducts[productInCartIndex].quantity > 1) {
        listCartProducts[productInCartIndex].quantity--
        setListCartProducts([...listCartProducts])
      } else {
        const list = [...listCartProducts]
        list.splice(productInCartIndex, 1)
        setListCartProducts(list)
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        listCartProducts,
        handleAddProductToCart,
        handleRemoveProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
