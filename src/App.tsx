import { GlobalStyles } from 'global'
import { Home } from 'pages/home'

import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const App: React.FC = () => {
  return (
    <>
      <Home />
      <GlobalStyles />
    </>
  )
}

export default App
