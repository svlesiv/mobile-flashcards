import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Alert } from "react-native";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  handleQuizRedirect = () => {
    this.props.deck.questions.length > 0 
      ? this.props.navigation.navigate('Quiz', {deckId: this.props.deck.title})
      : Alert.alert(
        'This deck doesn\'t have cards'
      )
  }

  render() {
    const { deck, navigation } = this.props;
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewCard', {deckId: deck.title})}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleQuizRedirect()}>
          <Text>Quiz</Text>
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

export default connect(mapStateToProps)(Deck);
