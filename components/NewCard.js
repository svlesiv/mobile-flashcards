import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { addCard } from "../actions";
import { saveCard } from "../utils/api";
import Button from "./Button";
import { textColorPrimary, textColorSecondary, baseColorAccentPrimary } from "../utils/colors";

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
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          maxLength = {40}
          placeholder="Plese write your question for the card" />
        <Text style={styles.header}>answer</Text>
        <RadioForm
          style={styles.radioButtons}
          radio_props={radio_props}
          initial={0}
          onPress={(answer) => {this.setState({answer})}}
          animation={true}
          borderWidth={1}
          buttonInnerColor={baseColorAccentPrimary}
          buttonOuterColor={baseColorAccentPrimary}
          buttonSize={15}
          buttonOuterSize={30}
          labelStyle={{fontSize: 20, color: textColorPrimary}}/>
        <Button
            style={{ backgroundColor: baseColorAccentPrimary}}
            onPress={() => this.submit()}>
          Submit
        </Button>
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

const styles = StyleSheet.create({
  container:{
    alignItems: "center"
  },
  header:{
    textAlign: "center",
    fontSize: 30,
    color: textColorPrimary,
    padding: 50,
  },
  input:{
    borderWidth: 1,
    borderColor: textColorSecondary,
    borderRadius: 5,
    padding: 20,
    marginTop: 40,
    marginBottom: -20,
    fontSize: 20
  },
  radioButtons:{
    marginTop: -30,
    marginBottom: 30,
  }
});

export default connect(mapStateToProps)(NewCard);