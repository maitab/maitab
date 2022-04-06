import * as React from 'react'
import { useReducer } from 'react'
import { ThemeProvider } from 'styled-components'
import CardStack from './components/CardStack'
import Container from './components/Container'
import Footer from './components/Footer'
import GlobalStyle from './components/GlobalStyle'
import MenuToggle from './components/MenuToggle'
import Overlay from './components/Overlay'
import SidePanel from './components/SidePanel'
import Dispatch from './context/Dispatch'
import useFetchWord from './hooks/useFetchWord'
import useInitDb from './hooks/useInitDb'
import useUserSettings from './hooks/useUserSettings'
import reducer from './reducer'
import { AppState } from './types'
import theme from './utils/theme'

const initialState: AppState = {
  isModalOpen: false,
  isMenuOpen: false,
  word: null,
  userSettings: {},
  fetchingNext: false,
  fetchSettings: false
}

const App = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get('uuid')
  const [store, dispatch] = useReducer(reducer, initialState)

  useInitDb(dispatch)
  useUserSettings(store.userSettings, store.fetchSettings, dispatch)
  useFetchWord(
    store.fetchingNext,
    store.userSettings.wordLibrary,
    uuid,
    dispatch
  )

  return (
    <Dispatch.Provider value={dispatch}>
      <Container>
        {store.word && (
          <CardStack
            word={store.word}
            hideFurigana={store.userSettings.hideFurigana}
            hideRomaji={store.userSettings.hideRomaji}
            hideMeaning={store.userSettings.hideMeaning}
          />
        )}
      </Container>
      <Overlay
        isShown={store.isMenuOpen || store.isModalOpen}
        onClick={() => dispatch({ type: 'closeAll' })}
      />
      <MenuToggle isActive={store.isMenuOpen} />
      <SidePanel
        isOpened={store.isMenuOpen}
        userSettings={store.userSettings}
      />
      <Footer />
    </Dispatch.Provider>
  )
}

export default () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
)
