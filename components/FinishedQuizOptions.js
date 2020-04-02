import React from 'react';
import {View, Text, Button} from 'react-native';

export default props => (
    <View>
        <Text>{`Your score is ${props.score}/${props.noQuestions}`}</Text>
        <Button title="Restart The Quiz" onPress={props.handleFinishQuiz.bind(this, "restart")} />
        <Button title="Go To Deck Page" onPress={props.handleFinishQuiz.bind(this, "DeckPage")} />
    </View>
);