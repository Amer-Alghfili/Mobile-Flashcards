import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { fetchQuestions } from "../api";
import Quiz from "./Quiz";
import FinishedQuizOptions from "./FinishedQuizOptions";
import { clearLocalNotification, setLocalNotification } from "../notification";

export default class extends Component {
  state = {
    questions: [],
    quizFinished: false,
    showAnswer: false,
    questionNumber: 0,
    score: 0,
    noQuestions: 0,
    noOfAnsweredQuestions: 0
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this.updateQuestions(id);
  }

  updateQuestions = async id => {
    const questions = await fetchQuestions(id);
    this.setState(() => ({
      questions,
      noQuestions: questions.length
    }));
  };

  handleAnswerSubmission = answer => {
    const {
      score,
      questions,
      questionNumber,
      noOfAnsweredQuestions
    } = this.state;
    let newScore = score;
    const question = questions[questionNumber];
    if (answer === question.realAnswer) {
      newScore += 1;
    }
    const quizFinished = this.checkQuizFinish();
    let newQuestionNumber = questionNumber;
    let newNoOfAnsweredQuestions = noOfAnsweredQuestions;
    if (!quizFinished) {
      newQuestionNumber += 1;
      newNoOfAnsweredQuestions += 1;
    }
    this.setState(() => ({
      quizFinished,
      score: newScore,
      questionNumber: newQuestionNumber,
      noOfAnsweredQuestions: newNoOfAnsweredQuestions,
      showAnswer: false
    }));
  };

  checkQuizFinish = () => {
    const { questionNumber, noQuestions } = this.state;
    if (questionNumber === noQuestions - 1) {
      return true;
    }
    return false;
  };

  handleFinishQuiz = operation => {
    if (operation === "DeckPage") {
      return this.props.navigation.goBack();
    } else {
      this.restartQuiz();
    }
  };

  restartQuiz = () => {
    this.setState(() => ({
      quizFinished: false,
      showAnswer: false,
      questionNumber: 0,
      score: 0,
      noOfAnsweredQuestions: 0
    }));
  };

  render() {
    let content;
    const {
      questions,
      questionNumber,
      showAnswer,
      quizFinished,
      noQuestions,
      noOfAnsweredQuestions,
      score
    } = this.state;
    if (questions.length === 0) {
      return <Text>Loading...</Text>;
    }
    if (quizFinished) {
      clearLocalNotification().then(setLocalNotification);
      content = (
        <FinishedQuizOptions
          score={score}
          noQuestions={noQuestions}
          handleFinishQuiz={this.handleFinishQuiz}
        />
      );
    } else {
      content = (
        <Quiz
          question={questions[questionNumber].question}
          showAnswer={showAnswer}
          answer={questions[questionNumber].answer}
          handleShowAnswer={() => this.setState({ showAnswer: true })}
          handleAnswerSubmission={this.handleAnswerSubmission}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${noOfAnsweredQuestions +
          1}/${noQuestions}`}</Text>
        {content}
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
  }
});
