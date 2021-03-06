import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { IProduct } from './types'
import { formatPrice } from 'util/format'

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
  handleUpdateProductCart: (product: IProduct) => void
  handleDeleteProductCart: (id: string) => void
  handleCalcTotalPrice: () => string
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [listCartProducts, setListCartProducts] = useState<CartProps[]>([])

  const handleCalcTotalPrice = useCallback(() => {
    return formatPrice(
      listCartProducts.reduce((sumTotal, item) => {
        return sumTotal + Number(item.product.price) * item.quantity
      }, 0)
    )
  }, [listCartProducts])

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

  function handleUpdateProductCart(product: IProduct) {
    const productInCartIndex = listCartProducts.findIndex(
      (item) => item.product.id === product.id
    )

    if (productInCartIndex >= 0) {
      listCartProducts[productInCartIndex].product.price = product.price
      listCartProducts[productInCartIndex].product.name = product.name
      setListCartProducts([...listCartProducts])
    }
  }

  function handleDeleteProductCart(id: string) {
    const list = listCartProducts.filter((item) => item.product.id !== id)
    setListCartProducts(list)
  }

  useEffect(() => {
    handleCalcTotalPrice()
  }, [handleCalcTotalPrice])

  return (
    <CartContext.Provider
      value={{
        listCartProducts,
        handleAddProductToCart,
        handleRemoveProductToCart,
        handleCalcTotalPrice,
        handleUpdateProductCart,
        handleDeleteProductCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
