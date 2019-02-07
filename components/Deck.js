import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

class Deck extends Component {
  render() {
    const { deckId } = this.props;
    return (
      <View>
          <Text>{deckId}</Text>
          <Text>question</Text>
          <Text>button</Text>
          <Text>button</Text>
      </View> 
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId
  };
}

export default connect(mapStateToProps)(Deck);
