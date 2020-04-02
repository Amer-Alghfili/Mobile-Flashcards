import { createStackNavigator } from "react-navigation-stack";
import DecksList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckPage from "./components/DeckPage";

const stack = createStackNavigator({
  Decks: {
    screen: DecksList
  },
  AddDeck: {
    screen: AddDeck
  },
  DeckPage: {
    screen: DeckPage
  }
});

export default stack;
// export default createAppContainer(stack);
