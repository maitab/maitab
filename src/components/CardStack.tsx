import * as React from 'react'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Dispatch from '../context/Dispatch'
import { Word } from '../types'
import Card from './Card'
import CardAction from './CardAction'

const nextIcon = require('../../icons/next.png')

export interface Props {
  word: Word;
  hideHiragana?: boolean;
  hideRomaji?: boolean;
  hideMeaning?: boolean;
}

const ActionBar = styled.div`
  width: 320px;
  height: 64px;
  display: flex;
  align-items: center;
`

const CardStack: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useContext(Dispatch)

  return (
    <>
      <Card
        word={props.word}
        hideHiragana={props.hideHiragana}
        hideRomaji={props.hideRomaji}
        hideMeaning={props.hideMeaning}
      />
      <ActionBar>
        <CardAction
          text="Next"
          icon={nextIcon}
          onClick={() => dispatch({ type: 'switchNext' })}
        />
      </ActionBar>
    </>
  )
}

export default CardStack
