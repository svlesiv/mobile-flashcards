import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";

class DeckPreview extends Component {
	render() {
		const { title, numCards, navigation } = this.props;
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Deck', {deckId: title})}>
					<Text>{title}</Text>
					<Text>{numCards} cards</Text>
			</TouchableOpacity>
		);
	}
}

export default withNavigation(DeckPreview);