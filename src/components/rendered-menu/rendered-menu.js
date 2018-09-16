import React, { Component } from "react";

import styled from "styled-components";

import MenuSection from "../menu-section";

const Main = styled.main`
  text-align: center;
  height: 100%;
  padding: 1rem;
  overflow: auto;
`;
const MenuHeader = styled.h1`
  font-family: ${props => props.fontFamily || props.theme.base.fontFamily};
`;

const SubTitle = styled.h2`
  font-family: ${props => props.fontFamily || props.theme.base.fontFamily};
  font-size: ${props => props.fontSize};
`;

const Rule = styled.hr`
  margin: 2rem auto 1rem;
  width: 50%;
  border: none;
  border-top: 3px double #333;
  color: #333;
  overflow: visible;
  text-align: center;
  height: 5px;

  &::after {
    background: #fff;
    content: "★";
    padding: 0 4px;
    position: relative;
    top: -13px;
  }
`;

class RenderedMenu extends Component {
  constructor(props) {
    super(props);

    this.handlers = {};

    this.getChangeHandler = this.getChangeHandler.bind(this);
  }

  getChangeHandler(path) {
    const handler = this.handlers[path];
    console.log("path: ", path);
    if (handler) {
      console.log("has handler");
      return handler;
    } else {
      console.log("no handler");
      this.handlers[path] = text => this.props.handleValueChange(path, text);
      return this.handlers[path];
    }
  }

  render() {
    const data = this.props.data;
    return (
      <Main className={this.props.className + " apply-font"}>
        <MenuHeader fontFamily={data.title.fontFamily}>
          {data.title.text}
        </MenuHeader>
        {data.subtitle.map((s, i) => (
          <SubTitle
            key={"subtitle-" + i}
            fontSize={s.fontSize}
            fontFamily={s.fontFamily}
            // handleTitleChange={}
          >
            {s.text}
          </SubTitle>
        ))}
        <Rule />
        {data.sections.map((s, i) => (
          <MenuSection
            key={"section- " + i}
            {...s}
            baseProps={this.props.data.base}
            handleTitleChange={this.getChangeHandler(`sections.${i}.name`)}
            handleChange={this.getChangeHandler}
          />
        ))}
        <Rule />
        <SubTitle
          fontSize={data.footer.fontSize}
          fontFamily={data.footer.fontFamily}
        >
          {data.footer.text}
        </SubTitle>
      </Main>
    );
  }
}

export default RenderedMenu;
