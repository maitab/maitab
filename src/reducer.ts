import * as React from 'react'
import { Action, AppState } from './types'

const reducer: React.Reducer<AppState, Action> = (
  prevState: AppState,
  action: Action
) => {
  switch (action.type) {
    case 'initDb':
      return { ...prevState, fetchSettings: true }
    case 'initSettings':
      return {
        ...prevState,
        fetchSettings: false,
        fetchingNext: true,
        userSettings: action.payload
      }
    case 'initWord':
      return {
        ...prevState,
        fetchingNext: false,
        word: action.payload
      }
    case 'toggleMenu':
      return { ...prevState, isMenuOpen: !prevState.isMenuOpen }
    case 'closeModal':
      return { ...prevState, isModalOpen: false }
    case 'closeAll':
      return { ...prevState, isModalOpen: false, isMenuOpen: false }
    case 'switchNext':
      return { ...prevState, fetchingNext: true }
    case 'changeUserSetting':
      return {
        ...prevState,
        userSettings: { ...prevState.userSettings, ...action.payload },
        fetchingNext:
          action.payload.wordLibrary != null &&
          prevState.userSettings.wordLibrary !== action.payload.wordLibrary
      }
    default:
      console.warn('Unhandled action: ' + action.type)
      return prevState
  }
}

export default reducer
