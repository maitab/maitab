import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Dispatch from '../context/Dispatch'
import { Word } from '../types'
import { getNextColor, getRandomColor } from '../utils/color'
import ReactFuri from 'react-furi'

import images from '../../images/*.png'
import imagesSvg from '../../images/*.svg'

export interface Props {
  word: Word;
  hideFurigana?: boolean;
  hideRomaji?: boolean;
  hideMeaning?: boolean;
}

const CardSection = styled.section<{ bgColor: string }>`
  display: flex;
  align-items: center;
  height: fit-content;
  min-height: 260px;
  width: 420px;
  margin: 16px;
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadowColor} 2px 2px 8px 2px;
  z-index: 10;
`

const CardShape = styled.div`
  width: 100%;
  color: #222;
  border-radius: 8px;
`

const ImageWrapper = styled.div`
  margin: 2em 0 0 0;
  text-align: center;
  width: 100%;
  height: 420px;
`

interface ImageProps {
  src: string;
}

const Image: React.FunctionComponent<ImageProps> = ({ src }: ImageProps) => {
  const imageName = src.substring(0, src.indexOf('.'))
  const image = src.includes('png') ? images[imageName] : imagesSvg[imageName]
  const width = src.includes('png') ? '100%' : '250px'

  return <img src={image} style={{ width: width, minHeight: '350px', maxHeight: '420px' }} />

  // return (
  //   <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width: width, minHeight: '350px', maxHeight: '420px' }}></div>
  // )
}

const Text = styled.div`
  padding: 0 2.2em 2em 2.2em;
`

const TitleBox = styled.span<{}>``

const Title = styled.div<{ hideFurigana?: boolean }>`
  font-family: ${(props) => props.theme.jpFont};
  font-weight: bold;
  margin: 0;
`

const Furigana = styled(ReactFuri.Furi) <{ hideFurigana?: boolean }>`
  visibility: ${(props) => (props.hideFurigana ? 'hidden' : 'visible')};

  ${TitleBox}:hover & {
    visibility: visible;
  }
`

const RomajiBox = styled.p<{}>``

const Romaji = styled.span<{ hide?: boolean }>`
  text-transform: lowercase;
  visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};

  ${RomajiBox}:hover & {
    visibility: visible;
  }
`

const Divider = styled.div`
  margin-top: 1em;
  border-top: 1px solid #000;
`

const MeaningBox = styled.span<{}>``

const Meaning = styled.p<{ hide?: boolean }>`
  font-size: 1.5em;
  padding-top: 0.6em;
  visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};

  ${MeaningBox}:hover & {
    visibility: visible;
  }
`

const Wrapper = styled.span`
display: inline-flex;
flex-flow: row wrap;
font-family: 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'TakaoPゴシック', TakaoPGothic,
  '游ゴシック', '游ゴシック体', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo, 'ＭＳ ゴシック',
  'MS Gothic', HiraKakuProN-W3, 'MotoyaLCedar', 'Droid Sans Japanese', sans-serif;
`

const Card: React.FunctionComponent<Props> = ({ word, hideMeaning, hideFurigana }: Props) => {
  const dispatch = useContext(Dispatch)
  const cardRef = useRef<HTMLElement>(null)
  const [bgColor, setBgColor] = useState(getRandomColor())

  useEffect(() => {
    setBgColor(getNextColor())
  }, [word.uuid])

  return (
    <CardSection ref={cardRef} bgColor={bgColor}>
      <CardShape onClick={() => dispatch({ type: 'switchNext' })}>
        <ImageWrapper>
          <Image src={word.image}></Image>
        </ImageWrapper>
        <Text>
          <TitleBox>
            <Title>
              <ReactFuri
                word={word.kana}
                reading={word.furigana}
                render={
                  ({ pairs }) => (
                    <Wrapper>
                      {
                        pairs.map(([furigana, text], index) => (
                          <ReactFuri.Pair key={index}>
                            <Furigana hideFurigana={hideFurigana}>{furigana}</Furigana>
                            <ReactFuri.Text>{text}</ReactFuri.Text>
                          </ReactFuri.Pair>
                        ))
                      }
                    </Wrapper>
                  )
                }
              />
            </Title>
          </TitleBox>
          <Divider />
          <MeaningBox>
            <Meaning hide={hideMeaning}>
              <span>{word.english}</span>
            </Meaning>
          </MeaningBox>
        </Text>
      </CardShape>
    </CardSection>
  )
}

export default Card
