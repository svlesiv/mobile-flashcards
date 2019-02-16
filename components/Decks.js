import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { handleFetchDecks } from '../actions';
import { baseColorPrimary } from '../utils/colors';

import DeckPreview from './DeckPreview';

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetchDecks());
  }

  render() {
    const { decks, decksIds } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={decksIds}
        keyExtractor={(item) => {return decks[item].title}}
        renderItem={({item}) =>
            <DeckPreview
              key={decks[item].title}
              title={decks[item].title}
              numCards={decks[item].questions.length}/>
      }/>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
    decksIds: Object.keys(state)
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColorPrimary
  }
});

export default connect(mapStateToProps)(Decks);