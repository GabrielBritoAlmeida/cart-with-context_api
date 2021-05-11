import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from 'services/api'
import { IProduct, IProductCrud } from './types'

type ListProductsProviderProps = {
  children: ReactNode
}

type ListProductsContextProps = {
  setOpenModalNewProduct: (isOpen: boolean) => void
  setOpenModalUpdateProduct: (isOpen: boolean) => void
  openModalNewProduct: boolean
  openModalUpdateProduct: boolean
  listProducts: IProduct[]
  handleNewProduct: (newProduct: IProductCrud) => Promise<void>
  handleUpdateProduct: (updateProduct: IProduct) => Promise<void>
  handleDeleteProduct: (id: string) => Promise<void>
}

const ListProductsContext = createContext({} as ListProductsContextProps)

export function ListProductsProvider({ children }: ListProductsProviderProps) {
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false)
  const [openModalUpdateProduct, setOpenModalUpdateProduct] = useState(false)
  const [listProducts, setListProducts] = useState<IProduct[]>([])

  async function handleNewProduct(newProduct: IProductCrud) {
    const { name, price } = newProduct
    const response = await api.post('products', { name, price })

    if (response.status === 201) {
      handleListProducts()
      setOpenModalNewProduct(false)
    }
  }

  async function handleUpdateProduct(newProduct: IProduct) {
    const { id, name, price } = newProduct
    const response = await api.put(`products/${id}`, { id, name, price })

    if (response.status === 200) {
      handleListProducts()
      setOpenModalUpdateProduct(false)
    }
  }

  async function handleDeleteProduct(id: string) {
    const response = await api.delete(`products/${id}`)

    if (response.status === 200) {
      handleListProducts()
      setOpenModalUpdateProduct(false)
    }
  }

  async function handleListProducts() {
    const response = await api.get('products')

    if (response.status === 200) {
      const list = response.data.map((item: IProduct) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price
        }
      })

      setListProducts(list)
    }
  }

  useEffect(() => {
    handleListProducts()
  }, [])

  return (
    <ListProductsContext.Provider
      value={{
        listProducts,
        handleNewProduct,
        handleDeleteProduct,
        handleUpdateProduct,
        setOpenModalNewProduct,
        setOpenModalUpdateProduct,
        openModalNewProduct,
        openModalUpdateProduct
      }}
    >
      {children}
    </ListProductsContext.Provider>
  )
}

export function useListProductsContext() {
  return useContext(ListProductsContext)
}
