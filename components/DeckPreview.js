import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { textColorSecondary, textColorPrimary, baseColorSecondary } from '../utils/colors';

const DeckPreview = (props) => {
  const { title, numCards, navigation } = props;
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Deck', {deckId: title})}
      style={styles.container}>
      <View style={styles.innerFlex}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.body}>{numCards} cards</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: baseColorSecondary,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: textColorSecondary,
    shadowOffset: {
      width: 0,
      height: 3
    },
    borderRadius: 5,
  },
  innerFlex: {
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: textColorPrimary,
    padding: 5,
  },
  body: {
    fontSize: 20,
    color: textColorSecondary,
  }
})

export default withNavigation(DeckPreview);