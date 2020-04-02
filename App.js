import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
// import stack from "./navigation";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckPage from "./components/DeckPage";
import AddCard from "./components/AddCard";
import QuizPage from "./components/QuizPage";
import { setLocalNotification } from "./notification";

const Stack = createStackNavigator({
  Decks: {
    screen: DeckList
  },
  AddDeck: {
    screen: AddDeck
  },
  DeckPage: {
    screen: DeckPage
  },
  AddCard: {
    screen: AddCard
  },
  QuizPage: {
    screen: QuizPage
  }
});

const tabs = createMaterialBottomTabNavigator({
  Home: {
    screen: Stack
  },
  ["Add Deck"]: {
    screen: AddDeck
  }
});

const Container = createAppContainer(tabs);
export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    // AsyncStorage.removeItem('decks')
    return (
      <View style={styles.container}>
        <Container />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignContent: 'center',
  }
});
