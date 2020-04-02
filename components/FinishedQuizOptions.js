import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default props => (
  <View style={styles.container}>
    <Text
      style={styles.text}
    >{`Your score is ${props.score}/${props.noQuestions}`}</Text>
    <Button
      title="Restart The Quiz"
      onPress={props.handleFinishQuiz.bind(this, "restart")}
    />
    <Button
      title="Go To Deck Page"
      onPress={props.handleFinishQuiz.bind(this, "DeckPage")}
    />
  </View>
);

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
  }
});
