import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { submitDeck } from "../api";

export default class extends Component {
  state = {
    inputValue: ""
  };

  handleInputChange = text => {
    this.setState(() => ({
      inputValue: text
    }));
  };

  handleSubmit = async () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return alert("Please Enter The Deck Title");
    }
    const deck = {
      title: inputValue,
      noCards: 0
    };
    this.setState(() => {
      return { inputValue: "" };
    });
    const id = await submitDeck(deck);
    if (id === "The deck title is already exist") {
      alert(id);
      return;
    }
    this.props.navigation.navigate("DeckPage", {
      id
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} h2>
          What's the title of your new deck ?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Title"
          value={this.state.inputValue}
          onChangeText={this.handleInputChange}
        />
        <Button title="Submit" color="black" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    margin: 32
  },
  text: {
    textAlign: "center",
    fontWeight: "bold"
  },
  input: {
    width: 300,
    marginTop: 16,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 16
  }
});
