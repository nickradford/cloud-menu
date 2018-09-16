import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import dotProp from "dot-prop-immutable";
import FontPicker from "font-picker-react";

import Header from "./components/header";
import Title from "./components/title";
import Menu from "./components/menu";

import RenderedMenu from "./components/rendered-menu";

const theme = {
  base: {}
};

const Main = styled.main`
  display: flex;
  height: calc(100vh - 67px);

  overflow: hidden;
`;

const FlexRenderedMenu = styled(RenderedMenu)`
  flex-grow: 1;
`;

const Builder = styled.section`
  border-right: 1px solid rgba(51, 51, 51, 0.3);
  max-width: 240px;
  padding: 1rem;
  box-sizing: border-box;
`;

const MenuData = {
  title: {
    text: "Burma Superstar"
  },
  subtitle: [
    {
      text: "since 1992",
      fontSize: "13px"
    }
  ],
  sections: [
    {
      name: "Appetizers",
      headerProps: {
        fontSize: "18px"
      },
      items: [
        {
          name: "Burmese Samusas (3pc)",
          description:
            "Hand wrapped and filled with curried potatoes. Deep fried and served with our house special red sauce (Chicken, Beef, or Vegetarian)"
        },
        {
          name: "Lettuce Cups",
          description:
            "Crisp lettuce cups with cured pork or five spice tofu & shiitake mushroom, with pickled radish, carrots, and water chestnut stuffing"
        },
        {
          name: "Platha and Dip",
          description: "Homemade multi layered bread served with a curry sauce"
        },
        {
          name: "Fried Yellow Bean Tofu",
          description:
            "Homemade tofu made with fresh yellow beans. Crisp on the outside, silken center. Served with a soy & chili sauce"
        }
      ]
    },
    {
      name: "Soups",
      headerProps: {
        fontSize: "18px"
      }
    }
  ],
  footer: {
    text: "*18% gratuity will be added to parties of 6 or more",
    fontSize: "11px"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: JSON.parse(window.localStorage.getItem("menu")) || MenuData,
      theme: JSON.parse(window.localStorage.getItem("theme")) || theme
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.changeFont = this.changeFont.bind(this);

    this.fontManager = React.createRef();
  }

  changeFont(newFont) {
    const _theme = this.state.theme;
    _theme.base.fontFamily = newFont.family;

    this.setState({ theme: _theme }, () => {
      window.localStorage.setItem("theme", JSON.stringify(_theme));
    });
  }

  handleValueChange(path, value) {
    const menu = this.state.menu;
    const nextMenu = dotProp.set(menu, path, value);

    this.setState({ menu: nextMenu }, () => {
      window.localStorage.setItem("menu", JSON.stringify(nextMenu));
    });
  }

  render() {
    return (
      <div>
        <Header>
          <Title>CloudMenu</Title>
          <FontPicker
            activeFont={this.state.theme.base.fontFamily || "Open Sans"}
            apiKey="AIzaSyC1tCTVk1kWmgj4sWeBonS3PW4xd6Iqtw8"
            onChange={this.changeFont}
            ref={this.fontManager}
            options={{ sort: "popularity" }}
          />
          <Menu>Sign in</Menu>
        </Header>
        <Main>
          <Builder>List of droppable menu items goes here</Builder>
          <ThemeProvider theme={theme}>
            <FlexRenderedMenu
              data={this.state.menu}
              handleValueChange={this.handleValueChange}
            />
          </ThemeProvider>
        </Main>
      </div>
    );
  }
}

export default App;
