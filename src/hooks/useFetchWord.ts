import { Dispatch, useEffect } from 'react'
import { getWord } from '../data'
import { Action } from '../types'

function useFetchWord (
  fetchingNext: boolean,
  wordLibrary: string,
  uuid: string,
  dispatch: Dispatch<Action>
) {
  useEffect(
    function fetchNext () {
      if (fetchingNext) {
        (async () => {
          const word = await getWord(wordLibrary, uuid)
          if (word == null) {
            dispatch({
              type: 'changeUserSetting',
              payload: { wordLibrary: '01' }
            })
            return
          }
          dispatch({ type: 'initWord', payload: word })
        })()
      }
    },
    [wordLibrary, fetchingNext, uuid]
  )
}

export default useFetchWord
