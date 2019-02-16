import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import Button from './Button';
import { textColorPrimary, textColorSecondary, baseColorAccentPrimary } from '../utils/colors';

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
    saveDeck(this.state.text, newDeck)
    //navigate to newly created deck
    this.props.navigation.navigate('Deck', {deckId: this.state.text});

    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          maxLength = {40}
          placeholder='Deck Title'
          autoFocus={true}/>
        <Button
            style={{ backgroundColor: baseColorAccentPrimary}}
            onPress={() => this.submit()}>
          Create Deck
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    fontSize: 30,
    color: textColorPrimary,
    padding: 50,
  },
  input:{
    borderWidth: 1,
    borderColor: textColorSecondary,
    borderRadius: 5,
    padding: 20,
    margin: 40,
    marginTop: 0,
    fontSize: 20
  }
});

export default connect()(NewDeck);