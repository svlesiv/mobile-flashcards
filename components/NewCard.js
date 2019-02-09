import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { addCard } from "../actions";
import { saveCard } from "../utils/api";

class NewCard extends Component {
  state = {
    question: '',
    answer: 'yes'
  }
  static navigationOptions = {
    title: 'Add Card',
  };

  submit = () => {
    const { dispatch, deck, navigation } = this.props;
   
    //create object with question and answer
    const newCard = {
      question: this.state.question,
      answer: this. state.answer
    };

    //dispatch action
    dispatch(
      addCard(
        newCard,
        deck,
      )
    );
    
    //save to AsyncStorage
    saveCard(deck, newCard);

    //redirect to the deck
    navigation.goBack();
  }

  render() {
    const radio_props = [
      {label: 'yes', value: 'yes' },
      {label: 'no', value: 'no' }
    ];
    
    return (
      <View>
        <TextInput 
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          maxLength = {40}
          placeholder="Statement" />
        <Text>Answer: </Text>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(answer) => {this.setState({answer})}}/>
        <TouchableOpacity onPress={() => this.submit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View> 
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    decks: state,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(NewCard)