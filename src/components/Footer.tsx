import * as React from 'react'
import styled from 'styled-components'

const FooterSection = styled.footer`
  flex: 0;
`

const Text = styled.p`
  font-size: 0.8em;
  color: #666;
  text-align: center;
  margin: 0.4em 0;

  & a {
    color: #5d5d5d;
  }
`

const Footer = () => (
  <FooterSection>
    <Text>
      Install this Chrome Extension from{' '}
      <a href="https://chrome.google.com/webstore/detail/mainichi-tango/alkncbflgoakllhkhkjpdabnbebejidl">
        Chrome Web Store
      </a>
      .
    </Text>
  </FooterSection>
)

export default Footer
