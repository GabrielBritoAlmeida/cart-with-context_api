import { ListProductsProvider } from 'context/products/get_products'
import { CartProvider } from 'context/cart'
import { Home } from 'templates/home'

export const HomePage: React.FC = () => {
  return (
    <>
      <ListProductsProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </ListProductsProvider>
    </>
  )
}
