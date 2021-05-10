import { useState } from 'react'

import { Button } from 'components/Button'
import { ModalNewProduct } from 'components/ModalNewProduct'
import { formatPrice } from 'util/format'

import * as S from './styles'

export const Home: React.FC = () => {
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false)

  return (
    <S.Wrapper>
      <S.Container>
        <S.SectionProducts>
          <S.Title>Lista de Produtos</S.Title>
          <S.Product>
            <Button title="Editar">Produto 1</Button>
            <S.Text>{formatPrice(55.1)}</S.Text>
            <Button>+ Buy</Button>
            <Button>- Remove</Button>
          </S.Product>
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
