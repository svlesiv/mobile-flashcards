import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import QuizScore from './QuizScore';
import { textColorPrimary } from '../utils/colors';

class Quiz extends Component {
  state = {
    index: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false
  }

  static navigationOptions = {
    title: 'Quiz'
  };

  /**
  * @description Changes the state of a card index.
  */
  nextCard = () => {
    if(this.state.index < this.props.deck.questions.length-1) {
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  /**
  * @description Depending on the value of a parameter,
  *              changes the state of correct or incorrect answer.
  * @param {boolean} isCorrect
  */
  gradeAnswer = (isCorrect) => {
    if (this.state.correct + this.state.incorrect < this.props.deck.questions.length){
      if (isCorrect){
        this.setState({
          correct: this.state.correct + 1
        });
      }else {
        this.setState({
          incorrect: this.state.incorrect + 1
        });
      }
    }
  }

  /**
  * @description Calls method nextCard() and gradeAnswer().
  */
  handleAnswer = (isCorrect) => {
    this.nextCard();
    this.gradeAnswer(isCorrect);

    // clear notifications after user took a quiz
    clearLocalNotification().then(setLocalNotification);
  }

  /**
  * @description Resets the state of the quiz.
  */
  resetQuiz = () => {
    this.setState({
      index: 0,
      correct: 0,
      incorrect: 0
    })
  }

  render() {
    const { index, correct, incorrect } = this.state;
    const { deck, deckId } = this.props;
    const totalAnsw = correct + incorrect;

    return (
      <View>
        <Text style={styles.score}>{totalAnsw} / {deck.questions.length}</Text>
        {totalAnsw !== deck.questions.length
         ? (
          <Card
            deck={deck}
            index={index}
            correct={correct}
            handleAnswer={this.handleAnswer}
          />
         ):(
           <QuizScore
            correct={correct}
            numQuestions={deck.questions.length}
            title={deckId}
            resetQuiz={this.resetQuiz}
            />
         )}
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

const styles = StyleSheet.create({
  score: {
    fontSize: 20,
    color: textColorPrimary,
    padding: 15
  }
});

export default connect(mapStateToProps)(Quiz);
