import { ButtonHTMLAttributes } from 'react'

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
} & ButtonTypes

import * as S from './styles'

export function Button({ children, type = 'button', ...props }: ButtonProps) {
  return (
    <S.Container type={type} {...props}>
      {children}
    </S.Container>
  )
}
