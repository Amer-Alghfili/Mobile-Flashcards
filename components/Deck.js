import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default props => (
  <View style={styles.deck}>
    <Text style={{...styles.text, fontWeight: 'bold'}}>{props.deckTitle}</Text>
    <Text style={styles.text}>{`${props.noCards} ${props.noCards != 1 ? 'cards' : 'card'}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  deck: {
    margin: 8,
    padding: 64,
    flex: 1,
    justifyContent: 'center',
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'solid'
  },
  text: {
    textAlign: 'center'
  }
});

