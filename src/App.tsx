import { GlobalStyles } from 'global'
import { HomePage } from 'pages/home'

import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const App: React.FC = () => {
  return (
    <>
      <HomePage />
      <GlobalStyles />
    </>
  )
}

export default App
