import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";

import * as chirps from "./dummy_data/chirps";
import Header from "./Components/Header";
import Feed from "./Views/Feed";
import { ThemeContext, themes } from "./ThemeProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Components/header.css";

Amplify.configure(aws_exports);
library.add(faPlus, faSearch);

class App extends Component {
  state = {
    chirps: chirps.default,
    user: [],
    filter: "",
    theme: themes.dark
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp");
    chirps = await chirps.json();
    chirps = chirps.reverse();
    console.log("chirps", chirps, "user", user);
    this.setState({ user, chirps });
  };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  };

  handleFilter = e => {
    const { value } = e.target;
    this.setState({
      filter: value
    });
  };

  addPost = async post => {
    const newPost = await fetch(
      "https://nov-chirp-backend.herokuapp.com/chirp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${post}`,
          username: `${this.state.user.username}`
        })
      }
    );
    const reply = await newPost.json();
    this.setState(prevState => {
      prevState.chirps.unshift(reply);
      return prevState;
    });
  };

  render() {
    const { chirps, user, filter, theme } = this.state;
    const themeChange = {
      theme,
      toggleTheme: this.toggleTheme
    };
    const searchedChirps = chirps.filter(chirp =>
      chirp.message
        ? chirp.message.toLowerCase().includes(filter.toLowerCase())
        : false
    );
    return (
      <ThemeContext.Provider value={themeChange}>
        <Router>
          <ThemeContext.Consumer>
            {({ theme }) => (
              <div
                className={`App
                ${theme.lightBlueBackground}
                ${theme.blackBackground}`}
              >
                <Header
                  handleFilter={this.handleFilter}
                  addPost={this.addPost}
                  user={user.attributes}
                  filter={filter}
                />
                {searchedChirps ? <Feed chirps={searchedChirps} /> : null}
              </div>
            )}
          </ThemeContext.Consumer>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default withAuthenticator(App);
