import { useState } from 'react'
import Modal from 'react-modal'

type ModalNewProductProps = {
  modalIsOpen: boolean
  closeModal: () => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

import * as S from './styles'

export function ModalNewProduct({
  modalIsOpen,
  closeModal
}: ModalNewProductProps) {
  const [nameProduct, setNameProduct] = useState('')
  const [priceProduct, setPriceProduct] = useState('')

  function handleSubmit() {
    if (!nameProduct || !priceProduct) {
      return alert('Verifiquei os campos nome e valor do produto!')
    }

    const newObj = {
      name: nameProduct,
      price: priceProduct
    }
    console.log(
      '🚀 ~ file: index.tsx ~ line 38 ~ handleSubmit ~ newObj',
      newObj
    )

    handleCloseModalClearInputs()
  }

  function handleCloseModalClearInputs() {
    closeModal()
    setNameProduct('')
    setPriceProduct('')
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModalClearInputs}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <S.FormModal>
        <S.TitleModal>Adicionar novo produto</S.TitleModal>
        <S.InputModal
          required
          type="text"
          placeholder="Nome do produto"
          value={nameProduct}
          onChange={(e) => setNameProduct(e.target.value)}
        />
        <S.InputModal
          required
          type="number"
          placeholder="100 valor em número"
          pattern="[0-9]*{1,5}"
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)}
        />

        <S.AlignButtonModal>
          <S.ButtonModalCancel type="button" onClick={closeModal}>
            Cancelar
          </S.ButtonModalCancel>
          <S.ButtonModalAdd type="button" onClick={handleSubmit}>
            Adicionar Produto
          </S.ButtonModalAdd>
        </S.AlignButtonModal>
      </S.FormModal>
    </Modal>
  )
}
