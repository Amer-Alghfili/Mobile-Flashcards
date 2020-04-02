import { AsyncStorage } from "react-native";

export const fetchDecks = async () => {
  const decks = await AsyncStorage.getItem("decks");
  return JSON.parse(decks);
};

export const fetchDeck = async id => {
  const decks = await fetchDecks();
  return decks[id];
};
export const submitDeck = async deck => {
  let decks = { ...(await fetchDecks()) };
  if (!decks) {
    decks = {};
  }
  for (let key in decks) {
    if (decks[key].title === deck.title) {
      return "The deck title is already exist";
    }
  }
  const id = Math.random();
  decks[id] = { ...deck };
  decks[id].cards = [];
  await AsyncStorage.setItem("decks", JSON.stringify(decks));
  return id;
};

export const deleteDeck = async id => {
  const decks = { ...(await fetchDecks()) };
  delete decks[id];
  return await AsyncStorage.setItem("decks", JSON.stringify(decks));
};

export const submitQuestion = async (id, newCard) => {
  const decks = { ...(await fetchDecks()) };
  const deck = { ...decks[id] };
  for (const card of deck.cards) {
    if (card.question === newCard.question) {
      return "This question is already exist";
    }
  }
  deck.cards.push({
    ...newCard
  });
  deck.noCards += 1;
  decks[id] = deck;
  await AsyncStorage.setItem("decks", JSON.stringify(decks));
  return decks[id];
};

export const fetchQuestions = async id => {
  const decks = await fetchDecks();
  const deck = await fetchDeck(id);
  return deck.cards;
};
