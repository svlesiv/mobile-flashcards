import React, { Component } from "react";
import { connect } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { addDeck } from "../actions";
import { saveDeck } from "../utils/api";


class NewDeck extends Component {
  state = {
    text: ''
  }

  submit = () => {
    const newDeck = {
      [this.state.text]: {
        title: this.state.text,
        questions: []
      }
    };
    //dispatch action
    this.props.dispatch(
      addDeck(
        newDeck
      )
    );
    //save to AsyncStorage
    saveDeck(this.state.text, newDeck );

    this.setState({
      text: ''
    })
  }
  
  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput 
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          maxLength = {40}
          placeholder="Deck Title"/>
        <TouchableOpacity onPress={() => this.submit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewDeck)