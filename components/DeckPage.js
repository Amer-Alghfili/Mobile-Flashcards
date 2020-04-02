import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { fetchDeck, deleteDeck } from "../api";

export default class extends Component {
  state = {
    id: null,
    deck: {}
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this.props.navigation.addListener("didFocus", () => {
      this.updateDeck(id);
    });
  }

  updateDeck = async id => {
    const deck = await fetchDeck(id);
    this.setState(() => ({
      id,
      deck
    }));
  };

  handleDeleteDeck = async id => {
    await deleteDeck(id);
    this.props.navigation.navigate("Decks");
  };

  startQuiz = id => {
    if (this.state.deck.cards.length === 0) {
      return alert("There are no questions in this deck!");
    }
    this.props.navigation.navigate("QuizPage", { id });
  };

  addCard = id => {
    this.props.navigation.navigate("AddCard", { id });
  };
  render() {
    const { id, deck } = this.state;
    if (!deck) {
      return <Text>Loadin...</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={styles.text}>{`${deck.noCards} ${
          deck.noCards != 1 ? "cards" : "card"
        }`}</Text>
        <Button title="Add Card" onPress={this.addCard.bind(this, id)} />
        <Button title="Start Quiz" onPress={this.startQuiz.bind(this, id)} />
        <Button
          title="Delete Deck"
          color="red"
          onPress={this.handleDeleteDeck.bind(this, id)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    margin: 8
  }
});
