import { createContext, ReactNode } from 'react'

type ListProductsProviderProps = {
  children: ReactNode
}

export const ListProductsContext = createContext({})

export function ListProductsProvider({ children }: ListProductsProviderProps) {
  return (
    <ListProductsContext.Provider value={{ name: 'teste' }}>
      {children}
    </ListProductsContext.Provider>
  )
}
