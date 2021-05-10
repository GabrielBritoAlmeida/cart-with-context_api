import { ListProductsProvider } from 'context/products/get_products'
import { Home } from 'templates/home'

export const HomePage: React.FC = () => {
  return (
    <>
      <ListProductsProvider>
        <Home />
      </ListProductsProvider>
    </>
  )
}
