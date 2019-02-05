import { AsyncStorage } from "react-native";

export const DECK_STORAGE_KEY = "mobile-flashcards:decks";

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {results !== null
        ? JSON.parse(results)
        : AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(results))
    });       
}

export function saveDeck({ deck, key }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }));
}