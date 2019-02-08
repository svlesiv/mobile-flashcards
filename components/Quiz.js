import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

class Quiz extends Component {
  state = {
    index: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false
  }
  static navigationOptions = {
    title: 'Quiz',
  };
  
  handleAnswer = (bool) => {
    if(this.state.index < this.props.deck.questions.length-1) {
      this.setState({
        index: this.state.index + 1
      })
    }
    if (this.state.correct + this.state.incorrect < this.props.deck.questions.length){
      if (bool){
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

  render() {
    const { index, showAnswer } = this.state;
    const { deck } = this.props;

    return (
      showAnswer 
        ? (
          <View>
            <Text>{this.state.correct} / {deck.questions.length}</Text> 
            <TouchableOpacity onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
              <Text>Question</Text>
            </TouchableOpacity>
            <Text>{deck.questions[index].answer}</Text>
            <TouchableOpacity onPress={() => this.handleAnswer(deck.questions[index].answer==='yes')}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleAnswer(deck.questions[index].answer==='no')}>
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ):(
          <View>
            <Text>{this.state.correct} / {deck.questions.length}</Text> 
            <Text>{deck.questions[index].question}</Text>
            <TouchableOpacity onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
              <Text>Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleAnswer(deck.questions[index].answer==='yes')}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleAnswer(deck.questions[index].answer==='no')}>
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ) 
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
