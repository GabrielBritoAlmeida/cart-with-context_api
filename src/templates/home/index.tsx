import { useCallback, useMemo, useState } from 'react'

import { Button } from 'components/Button'
import { ModalNewProduct } from 'components/ModalNewProduct'
import { ModalUpdateProduct } from 'components/ModalUpdateProduct'
import { formatPrice } from 'util/format'
import { useListProductsContext } from 'context/products/get_products'
import { useCartContext } from 'context/cart'
import { IProduct } from 'context/products/get_products/types'

import * as S from './styles'

export const Home: React.FC = () => {
  const {
    listProducts,
    openModalNewProduct,
    openModalUpdateProduct,
    setOpenModalNewProduct,
    setOpenModalUpdateProduct
  } = useListProductsContext()
  const [product, setProduct] = useState<IProduct>({
    id: '',
    name: '',
    price: ''
  })
  const {
    listCartProducts,
    handleAddProductToCart,
    handleRemoveProductToCart,
    handleCalcTotalPrice,
    handleDeleteProductCart
  } = useCartContext()
  const totalPrice = handleCalcTotalPrice()

  const handleUpdateProduct = useCallback(
    (product: IProduct) => {
      setProduct(product)
      setOpenModalUpdateProduct(true)
    },
    [setProduct, setOpenModalUpdateProduct]
  )

  const currentListProducts = useMemo(() => {
    return listProducts.map((item) => (
      <S.Product key={item.id}>
        <Button onClick={() => handleUpdateProduct(item)} title="Editar">
          {item.name}
        </Button>
        <S.Text>{formatPrice(Number(item.price))}</S.Text>
        <Button onClick={() => handleAddProductToCart(item)}>+ Buy</Button>
        <Button onClick={() => handleRemoveProductToCart(item)}>
          - Remove
        </Button>
      </S.Product>
    ))
  }, [
    listProducts,
    handleUpdateProduct,
    handleAddProductToCart,
    handleRemoveProductToCart
  ])

  const currentListCart = useMemo(() => {
    return listCartProducts.map((item) => (
      <S.ProductCart key={item.product.id}>
        <S.Text>{item.product.name}</S.Text>
        <S.Text>{item.quantity}</S.Text>
        <Button onClick={() => handleDeleteProductCart(item.product.id)}>
          x
        </Button>
      </S.ProductCart>
    ))
  }, [listCartProducts, handleDeleteProductCart])

  return (
    <S.Wrapper>
      <S.Container>
        <S.SectionProducts>
          <S.Title>Lista de Produtos</S.Title>
          {currentListProducts}
        </S.SectionProducts>

        <S.Cart>
          <S.Title>Carrinho</S.Title>
          {currentListCart}
        </S.Cart>
      </S.Container>

      <S.Footer>
        <Button onClick={() => setOpenModalNewProduct(true)}>
          Adicionar novo produto
        </Button>
        <S.Text style={{ marginLeft: 16 }}>Valor total: {totalPrice}</S.Text>
      </S.Footer>
      <ModalNewProduct
        modalIsOpen={openModalNewProduct}
        closeModal={() => setOpenModalNewProduct(false)}
      />

      <ModalUpdateProduct
        product={product}
        modalIsOpen={openModalUpdateProduct}
        closeModal={() => setOpenModalUpdateProduct(false)}
      />
    </S.Wrapper>
  )
}
