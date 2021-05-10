import { useMemo, useState } from 'react'

import { Button } from 'components/Button'
import { ModalNewProduct } from 'components/ModalNewProduct'

import { useListProductsContext } from 'context/products/get_products'

import * as S from './styles'

export const Home: React.FC = () => {
  const { listProducts } = useListProductsContext()
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false)

  const currentListProducts = useMemo(() => {
    return listProducts.map((item) => (
      <S.Product key={item.id}>
        <Button title="Editar">{item.name}</Button>
        <S.Text>{item.price}</S.Text>
        <Button>+ Buy</Button>
        <Button>- Remove</Button>
      </S.Product>
    ))
  }, [listProducts])

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
    </S.Wrapper>
  )
}
