import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert, StyleSheet, Animated } from 'react-native';
import Button from './Button';
import { textColorPrimary, textColorSecondary, baseColorAccentPrimary } from '../utils/colors';

class Deck extends Component {
  state = {
    opacity: new Animated.Value(0),
    bounceValue: new Animated.Value(0.98)
  }

  componentDidMount() {
    const { opacity, bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200 }),
      Animated.timing(bounceValue, { duration: 200, toValue: 1.01 }),
      Animated.timing(bounceValue, { duration: 200, toValue: 1 })
    ]).start();
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  /**
  * @description Navigates to Quiz view if a deck has cards, 
  *              otherwise shows alert message.
  */
  handleQuizRedirect = () => {
    this.props.deck.questions.length > 0
      ? this.props.navigation.navigate('Quiz', {deckId: this.props.deck.title})
      : Alert.alert(
        'This deck doesn\'t have cards'
      )
  }

  render() {
    const { deck, navigation } = this.props;
    const { opacity, bounceValue } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity, transform: [{scale: bounceValue}] }]}>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.body}>{deck.questions.length} cards</Text>
        <View style={styles.buttonGroup}>
          <Button style={{ backgroundColor: baseColorAccentPrimary}}
                  onPress={() => navigation.navigate('NewCard', {deckId: deck.title})}>
            Add Card
          </Button>
          <Button style={{ backgroundColor: baseColorAccentPrimary}}
                  onPress={() => this.handleQuizRedirect()}>
            Start Quiz
          </Button>
        </View>
      </Animated.View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    paddingTop: 20,
    paddingBottom: 30
  },
  header: {
    fontSize: 50,
    color: textColorPrimary,
    padding: 5
  },
  body: {
    fontSize: 30,
    color: textColorSecondary,
    paddingBottom: 35,
    paddingTop: 5
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps)(Deck);
