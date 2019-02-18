import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import Button from './Button';
import { textColorPrimary, textColorSecondary, baseColorAccentPrimary } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

class NewDeck extends Component {
  state = {
    title: ''
  }

  /**
  * @description Saves a new deck and redirects to newly created deck;
  *              resets the state of a title.
  */
  submit = () => {
    const newDeck = {
      [this.state.title]: {
        title: this.state.title,
        questions: []
      }
    };

    // dispatch action
    this.props.dispatch(
      addDeck(
        newDeck
      )
    );

    // save to AsyncStorage
    saveDeck(this.state.title, newDeck)

    // navigate to newly created deck
    this.props.navigation.navigate('Deck', {deckId: this.state.title});

    // reset state of the title
    this.setState({
      title: ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}>
          <View style={styles.iconWrap}>
            <FontAwesome style={styles.icon} name='angle-left' size={40} color={textColorPrimary} />
            <Text style={styles.iconText}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          maxLength = {40}
          placeholder='Deck Title'
          autoFocus={true}/>
        <Button
            style={{ backgroundColor: baseColorAccentPrimary}}
            onPress={() => this.submit()}>
          Create Deck
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    margin: 10
  },
  iconText: {
    fontSize: 17
  },
  header:{
    textAlign: 'center',
    fontSize: 30,
    color: textColorPrimary,
    padding: 50,
    paddingTop: 0
  },
  input:{
    borderWidth: 1,
    borderColor: textColorSecondary,
    borderRadius: 5,
    padding: 20,
    margin: 40,
    marginBottom: 20,
    marginTop: -20,
    fontSize: 20
  }
});

export default connect()(NewDeck);