import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './components/header'
import Title from './components/title'
import Menu from './components/menu'

import RenderedMenu from './components/rendered-menu'

const Main = styled.main`
  display: flex;
  height: calc(100vh - 67px);

  overflow: hidden;
`

const FlexRenderedMenu = styled(RenderedMenu)`
  flex-grow: 1;
`

const Builder = styled.section`
  border-right: 1px solid rgba(51, 51, 51, 0.3);
  max-width: 240px;
  padding: 1rem;
  box-sizing: border-box;
`

const MenuData = {
  title: {
    text: 'Burma ★ Superstar',
    fontFamily: 'monospace'
  },
  subtitle: [
    {
      text: 'since 1992',
      fontFamily: 'monospace',
      fontSize: '16px'
    },
    {
      text: '4 SF Locations',
      fontFamily: 'monospace',
      fontSize: '14px'
    }
  ]
}

class App extends Component {
  render () {
    return (
      <div>
        <Header>
          <Title>CloudMenu</Title>
          <Menu>Sign in</Menu>
        </Header>
        <Main>
          <Builder>List of droppable menu items goes here</Builder>
          <FlexRenderedMenu data={MenuData} />
        </Main>
      </div>
    )
  }
}

export default App
