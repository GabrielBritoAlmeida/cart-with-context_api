import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from 'services/api'
import { formatPrice } from 'util/format'
import { IProduct } from './types'

type ListProductsProviderProps = {
  children: ReactNode
}

type ListProductsContextProps = {
  listProducts: IProduct[]
}

const ListProductsContext = createContext({} as ListProductsContextProps)

export function ListProductsProvider({ children }: ListProductsProviderProps) {
  const [listProducts, setListProducts] = useState<IProduct[]>([])

  async function handleListProducts() {
    const response = await api.get('products')

    if (response.status === 200) {
      const list = response.data.map((item: IProduct) => {
        return {
          id: item.id,
          name: item.name,
          price: formatPrice(Number(item.price))
        }
      })

      setListProducts(list)
    }
  }

  useEffect(() => {
    handleListProducts()
  }, [])

  return (
    <ListProductsContext.Provider value={{ listProducts }}>
      {children}
    </ListProductsContext.Provider>
  )
}

export function useListProductsContext() {
  return useContext(ListProductsContext)
}
