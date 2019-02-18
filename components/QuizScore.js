import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';
import Button from './Button';
import { textColorPrimary, baseColorAccentPrimary } from '../utils/colors';

const QuizScore = (props) => {

  /**
  * @description Calls method resetQuiz() of a parent component and navigates to Quiz view.
  */
  resetQuiz = () => {
    props.resetQuiz();
    props.navigation.navigate('Quiz', {deckId: props.title});
  }

  const { correct, numQuestions, title, navigation } = props;

  return (
    <View>
      <Text style={styles.score}>Your score is {correct} out of {numQuestions}.</Text>
      <Button
        style={{backgroundColor: baseColorAccentPrimary}}
        onPress={() => this.resetQuiz()}>
          Restart Quiz
      </Button>
      <Button
        style={{backgroundColor: baseColorAccentPrimary}}
        onPress={() => navigation.navigate('Deck', {deckId: title})}>
          Back to Deck
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  score:{
    textAlign: 'center',
    fontSize: 25,
    color: textColorPrimary,
    padding: 50
  }
});

export default withNavigation(QuizScore);