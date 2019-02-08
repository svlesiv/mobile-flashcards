import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class Card extends Component {
	state = {
		showAnswer: false
	}

	handleAnswer = (ans) => {
		let isCorrect = this.props.deck.questions[this.props.index].answer===ans;
		this.props.handleAnswer(isCorrect);

		this.setState({showAnswer: false})
	}

  render() {
		const { deck, index } = this.props;
		const { showAnswer } = this.state;

    return (
			<View>
				<Text>{showAnswer ? deck.questions[index].answer : deck.questions[index].question}</Text>
				<TouchableOpacity onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
					<Text>{showAnswer ? "Question" : "Answer"}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.handleAnswer('yes')}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleAnswer('no')}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
			</View>
    );
  }
}