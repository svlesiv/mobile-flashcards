import React, { Component } from "react";
import { connect } from 'react-redux'
import { View, Text } from "react-native";
import { handleFetchDecks } from "../actions";

class Decks extends Component {
    componentDidMount() {
       const { dispatch } = this.props;
       dispatch(handleFetchDecks());
    }
    render() {
      return (
        <View>
            <Text>This is decks</Text> 
        </View>
       
      );
    }
}

export default connect()(Decks)