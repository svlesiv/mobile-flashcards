import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "mobile-flashcards:decks";

let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'React is a library for managing user interfaces.',
          answer: 'yes'
        },
        {
          question: 'Ajax requests in React happens in shouldComponentUpdate lifecycle event.',
          answer: 'no'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'Closure is the combination of a function and the lexical environment within which that function was declared.',
          answer: 'yes'
        }
      ]
    }
  }

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(results => {
        if (results === null) {
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
            return decks;
        } else {
            //AsyncStorage.removeItem(DECK_STORAGE_KEY) 
            return JSON.parse(results);
        } 
    });       
}

export function saveDeck({ deck, key }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }));
}