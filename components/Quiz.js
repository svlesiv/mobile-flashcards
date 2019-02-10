import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "./Card";
import QuizScore from "./QuizScore";

class Quiz extends Component {
  state = {
    index: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false
  }
  static navigationOptions = {
    title: "Quiz",
  };

  nextCard = () => {
    if(this.state.index < this.props.deck.questions.length-1) {
      this.setState({
        index: this.state.index + 1
      })
    }
  }

  gradeAnswer = (isCorrect) => {
    if (this.state.correct + this.state.incorrect < this.props.deck.questions.length){
      if (isCorrect){
        this.setState({
          correct: this.state.correct + 1
        })
      }else {
        this.setState({
          incorrect: this.state.incorrect + 1
        })
      } 
    } 
  }
  
  handleAnswer = (isCorrect) => {
    this.nextCard();
    this.gradeAnswer(isCorrect); 
  }

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
        <Text>{totalAnsw} / {deck.questions.length}</Text>
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

export default connect(mapStateToProps)(Quiz);
