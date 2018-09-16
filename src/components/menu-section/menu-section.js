import React, { Component } from "react";

import { RIEInput, RIETextArea } from "riek";

import styled from "styled-components";

const Title = styled.h3`
  font-family: ${props => props.fontFamily || props.theme.base.fontFamily};
  font-size: ${props => props.fontSize};
`;

const LeftAligned = styled.h3`
  text-align: left;
`;

const MenuItem = styled.div`
  font-family: ${props => props.fontFamily || props.theme.base.fontFamily};
  font-size: ${props => props.fontSize};
`;

const ItemDescription = styled.p`
  font-weight: 100;
  font-size: 0.8rem;
`;

class MenuSection extends Component {
  static defaultProps = {
    name: "Untitled",
    items: [],
    index: 0,
    handleTitleChange: newTitle => console.log(`New title: ${newTitle}`)
  };

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(e) {
    this.props.handleTitleChange(e.title);
  }

  render() {
    console.log(this.props.baseProps);
    return (
      <section>
        <Title baseProps={this.props.baseProps} {...this.props.headerProps}>
          <RIEInput
            value={this.props.name}
            propName="title"
            change={this.handleTitleChange}
          />
        </Title>
        <LeftAligned>
          {this.props.items.map((item, itemIndex) => (
            <MenuItem
              key={item.name}
              {...item}
              baseProps={this.props.baseProps}
            >
              <RIEInput
                value={item.name}
                propName="itemName"
                change={val => {
                  this.props.handleChange(
                    `sections.${this.props.index}.items.${itemIndex}.name`
                  )(val.itemName);
                }}
              />
              <ItemDescription>
                <RIETextArea
                  value={item.description}
                  propName="itemDescription"
                  change={val => {
                    this.props.handleChange(
                      `sections.${
                        this.props.index
                      }.items.${itemIndex}.description`
                    )(val.itemDescription);
                  }}
                  rows={5}
                  cols={50}
                />
              </ItemDescription>
            </MenuItem>
          ))}
        </LeftAligned>
      </section>
    );
  }
}

export default MenuSection;
