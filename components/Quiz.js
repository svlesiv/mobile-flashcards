import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import Card from "./Card";

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

  render() {
    const { index, correct } = this.state;
    const { deck } = this.props;

    return (
      <View>
        <Text>{correct} / {deck.questions.length}</Text>
        <Card 
          deck={deck} 
          index={index} 
          correct={correct} 
          handleAnswer={this.handleAnswer}
          />
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
