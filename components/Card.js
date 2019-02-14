import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import TextButton from "./TextButton";
import { textColorPrimary, baseColorAccentPrimary } from "../utils/colors";

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
        <Text style={styles.ansQuest}>{showAnswer ? deck.questions[index].answer : deck.questions[index].question}</Text>
        <TextButton
          style={{color: baseColorAccentPrimary}}
          onPress={() => this.setState({showAnswer: !this.state.showAnswer})}>
            {showAnswer ? "Question" : "Answer"}
        </TextButton>

        <View style={styles.btnGroup}>
          <Button 
            style={{ backgroundColor: baseColorAccentPrimary}}
            onPress={() => this.handleAnswer('yes')}>
              Correct
          </Button>
          <Button
            style={{ backgroundColor: baseColorAccentPrimary}}
            onPress={() => this.handleAnswer('no')}>
              Incorrect
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ansQuest: {
    fontSize: 20,
    color: textColorPrimary,
    padding: 10,
    textAlign: "center"
  },
  btnGroup:{
    flexDirection: "row",
    justifyContent: "center"
  }
})