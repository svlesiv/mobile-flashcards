import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

class Quiz extends Component {
  state = {
    index: 0
  }
  static navigationOptions = {
    title: 'Quiz',
  };

  nextCard = () => {
    if(this.state.index < this.props.deck.questions.length-1) {
      this.setState({
        index: this.state.index + 1
      })
    }
  }

  render() {
    const { index } = this.state;
    const { deck } = this.props;

    return (
      <View>
        <Text>statistic</Text> 
        <Text>{deck.questions[index].question}</Text>
        <Text>{deck.questions[index].answer}</Text>
        <TouchableOpacity onPress={() => this.nextCard()}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.nextCard()}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
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
