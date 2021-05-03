import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import Dispatch from '../context/Dispatch'
import { UserSettings } from '../types'

export interface Props {
  isOpened: boolean;
  userSettings: UserSettings;
}

const USER_SETTINGS_TITLES = {
  // hideRomaji: 'Hide Romaji',
  hideHiragana: 'Hide Hiragana',
  hideMeaning: 'Hide Meaning'
}

const Panel = styled.div<{ isOpened: boolean }>`
  width: 240px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transform: ${(props) =>
    props.isOpened ? 'translateX(0)' : 'translateX(-240px)'};
  transition: transform 0.4s ease;
  overflow-y: auto;
  z-index: 1000;
`

const Title = styled.h2`
  padding: 0 8px;
`

const UserSettingList = styled.ul`
  padding: 0;
  margin: 1em 0;
`

const UserSettingListItem = styled.li<{ isActive: boolean }>`
  list-style: none;
  font-size: 1.4em;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: #ccc;
  }

  ${(props) =>
    props.isActive &&
    `
    &:after {
      content: "✓";
      font-weight: 700;
      position: absolute;
      right: 12px;
    }`}
`

const PanelLink = styled.a`
  display: block;
  color: #222;
  font-size: 0.8em;
  padding: 6px 8px;
`

const SidePanel: React.FunctionComponent<Props> = (props : Props) => {
  const dispatch = useContext(Dispatch)
  return (
    <Panel isOpened={props.isOpened}>
      <Title>Preferences</Title>
      <UserSettingList>
        {Object.entries(USER_SETTINGS_TITLES).map(([key, title]) => (
          <UserSettingListItem
            key={key}
            onClick={() =>
              dispatch({
                type: 'changeUserSetting',
                payload: { [key]: !props.userSettings[key] }
              })
            }
            isActive={Boolean(props.userSettings[key])}
          >
            {title}
          </UserSettingListItem>
        ))}
      </UserSettingList>
      <hr />
      <PanelLink
        href="https://github.com/maitab/maitab/issues/new"
        target="_blank"
      >
        Report Issue
      </PanelLink>
      <PanelLink>
        {chrome && chrome.runtime && chrome.runtime.getManifest
          ? chrome.runtime.getManifest().version
          : 'TEST_BUILD'}
      </PanelLink>
    </Panel>
  )
}

export default SidePanel
