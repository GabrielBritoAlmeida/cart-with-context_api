import { createContext, ReactNode, useContext } from 'react'

type ListProductsProviderProps = {
  children: ReactNode
}

type ListProductsContextProps = {
  name: string
}

const ListProductsContext = createContext({} as ListProductsContextProps)

export function ListProductsProvider({ children }: ListProductsProviderProps) {
  return (
    <ListProductsContext.Provider value={{ name: 'teste' }}>
      {children}
    </ListProductsContext.Provider>
  )
}

export function useListProductsContext() {
  return useContext(ListProductsContext)
}
