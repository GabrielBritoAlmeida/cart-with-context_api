import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 16px;
  padding: 16px;
  border: 1px solid #333;
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  text-transform: uppercase;
  height: 50px;
  color: #333;
  font-size: 2.6rem;
  border: 1px solid #333;
`

export const SectionProducts = styled.section`
  border: 1px solid #333;
  padding: 16px;
  min-height: 400px;
`

export const Cart = styled.section`
  padding-left: 16px;
`

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 60% 39%;
  margin-top: 16px;
`

export const Product = styled.div`
  display: grid;
  grid-template-columns: 30% 20% 20% 25%;
  justify-content: space-between;
  margin-top: 16px;
`
export const ProductCart = styled.div`
  display: grid;
  grid-template-columns: 55% 20% 20%;
  justify-content: space-between;
  margin-top: 16px;
`
export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  font-size: 2.2rem;
  color: #333;
  border: 1px solid #333;
  text-transform: uppercase;
`
