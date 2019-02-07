import React, { Component } from "react";
import { connect } from 'react-redux'
import { View, Text } from "react-native";
import { handleFetchDecks } from "../actions";

import DeckPreview from "./DeckPreview";

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetchDecks());
  }
  
  render() {
    const {decks, decksIds} = this.props;
    return (
      <View>
          {decksIds.map(deck => (
            <>
              <DeckPreview 
                key={deck} 
                title={decks[deck].title}
                numCards={decks[deck].questions.length}/>
              <Text>___________________</Text>
            </>
            ))}
      </View>  
    );
  }
}

function mapStateToProps(decks) {
    return {
      decks,
      decksIds: Object.keys(decks)
    };
  }

export default connect(mapStateToProps)(Decks)