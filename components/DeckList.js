import React, { Component } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { fetchDecks } from "../api";
import Deck from "./Deck";

export default class extends Component {
  state = {
    decks: {},
    emptyDecks: false
  };
  componentDidMount() {
    this.updateDecks();
    this.props.navigation.addListener('didFocus', () => {
      this.updateDecks();
    })  
  }

  updateDecks = async () => {
    const decks = await fetchDecks();
    if (!decks || Object.keys(decks).length === 0) {
      this.setState(() => ({
        emptyDecks: true
      }));
    } else {
      this.setState(() => ({
        decks,
        emptyDecks: false
      }));
    }
  };
  render() {
    const { decks, emptyDecks } = this.state;
    if (emptyDecks) {
      return <Text style={{ fontWeight: "bold" }}>There are no Decks</Text>;
    }
    if (Object.keys(decks).length === 0) {
      return <Text style={{ fontWeight: "bold" }}>Loading...</Text>;
    }
    const decksKeys = Object.keys(decks);
    const renderedDecks = decksKeys.map(key => (
      <TouchableOpacity
        key={key}
        onPress={() => {
          this.props.navigation.navigate("DeckPage", {
            deck: decks[key],
            id: key
          });
        }}
      >
        <Deck noCards={decks[key].noCards} deckTitle={decks[key].title} />
      </TouchableOpacity>
    ));
    return <ScrollView>{renderedDecks}</ScrollView>;
  }
}

