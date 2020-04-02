import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default props => {
  const {
    question,
    showAnswer,
    answer,
    handleAnswerSubmission,
    handleShowAnswer
  } = props;
  let content;
  if (showAnswer) {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>{answer}</Text>
        <Button
          title="Correct"
          onPress={props.handleAnswerSubmission.bind(this, "correct")}
        />
        <Button
          title="Incorrect"
          onPress={props.handleAnswerSubmission.bind(this, "incorrect")}
        />
      </View>
    );
  } else {
    content = <Button title="Show Answer" onPress={handleShowAnswer} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{question}</Text>
      {content}
    </View>
  );
};

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
