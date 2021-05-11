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
  const { cart } = useCartContext()
  console.log('🚀 ~ file: index.tsx ~ line 27 ~ cart', cart)

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
        <Button>+ Buy</Button>
        <Button>- Remove</Button>
      </S.Product>
    ))
  }, [listProducts, handleUpdateProduct])

  return (
    <S.Wrapper>
      <S.Container>
        <S.SectionProducts>
          <S.Title>Lista de Produtos</S.Title>
          {currentListProducts}
        </S.SectionProducts>

        <S.Cart>
          <S.Title>Carrinho</S.Title>
          <S.ProductCart>
            <S.Text>Produto 1</S.Text>
            <S.Text>1</S.Text>
            <Button>x</Button>
          </S.ProductCart>
        </S.Cart>
      </S.Container>

      <S.Footer>
        <Button onClick={() => setOpenModalNewProduct(true)}>
          Adicionar novo produto
        </Button>
        <S.Text style={{ marginLeft: 16 }}>Valor total: R$30,00</S.Text>
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
