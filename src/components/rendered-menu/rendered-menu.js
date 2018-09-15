import React, { Component } from 'react'

import styled from 'styled-components'

const Main = styled.main`
  text-align: center;
  height: 100%;
  padding: 1rem;
`
const MenuHeader = styled.h1`
  font-family: ${props => props.fontFamily};
`

const SubTitle = styled.h2`
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
`

class RenderedMenu extends Component {
  render () {
    const data = this.props.data
    return (
      <Main className={this.props.className}>
        <MenuHeader fontFamily={data.title.fontFamily}>
          {data.title.text}
        </MenuHeader>
        {data.subtitle.map((s, i) => (
          <SubTitle
            key={'subtitle-' + i}
            fontSize={s.fontSize}
            fontFamily={s.fontFamily}
          >
            {s.text}
          </SubTitle>
        ))}
      </Main>
    )
  }
}

export default RenderedMenu
