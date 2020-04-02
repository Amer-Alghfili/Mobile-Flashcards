import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { submitQuestion } from "../api";

export default class extends Component {
  state = {
    question: "",
    answer: ""
  };

  hanldeInputChnage = (field, text) => {
    this.setState(() => ({
      [field]: text
    }));
  };

  handleSubmit = async (id, realAnswer) => {
    const deck = await submitQuestion(id, { ...this.state, realAnswer });
    if (deck === "This question is already exist") {
      return alert(deck);
    }
    this.setState(() => ({
      question: "",
      answer: ""
    }));
    this.props.navigation.navigate("DeckPage", {
      noCards: deck.noCards
    });
  };
  render() {
    const id = this.props.navigation.getParam("id");
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add New Question</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Question Here"
          value={this.state.question}
          onChangeText={this.hanldeInputChnage.bind(this, "question")}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter The Question's Answer Here"
          value={this.state.answer}
          onChangeText={this.hanldeInputChnage.bind(this, "answer")}
        />
        <Button
          title="Submit as correct"
          onPress={this.handleSubmit.bind(this, id, "correct")}
        />
        <Button
          title="Submit as incorrect"
          onPress={this.handleSubmit.bind(this, id, "incorrect")}
        />
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
