import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const QuizScore = (props) => {
  resetQuiz = () => {
    props.resetQuiz();
    props.navigation.navigate('Quiz', {deckId: props.title});
  }

  const { correct, numQuestions, title, navigation } = props;
  return (
    <View>
      <Text>Your score is {correct} out of {numQuestions}.</Text>
      <TouchableOpacity onPress={() => this.resetQuiz()}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Deck', {deckId: title})}>
        <Text>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  );  
}

export default withNavigation(QuizScore);