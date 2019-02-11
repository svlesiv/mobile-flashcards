import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { textColorSecondary, textColorPrimary, baseColorSecondary } from "../utils/colors";

class DeckPreview extends Component {
  render() {
    const { title, numCards, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Deck', {deckId: title})}>
          <View style={styles.innerFlex}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.body}>{numCards} cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    alignItems: "center",
  },
  header:{
    fontSize: 30,
    color: textColorPrimary,
    padding: 5,
  },
  body:{
    fontSize: 20,
    color: textColorSecondary,
  }
})

export default withNavigation(DeckPreview);