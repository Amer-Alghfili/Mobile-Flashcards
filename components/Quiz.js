import React from "react";
import { View, Text, Button } from "react-native";

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
      <View>
        <Text>{answer}</Text>
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
    <View>
      <Text>{question}</Text>
      {content}
    </View>
  );
};
