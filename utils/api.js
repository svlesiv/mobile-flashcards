import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "mobile-flashcards:decks";

let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
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
            return JSON.parse(results);
        } 
    });       
}

export function saveDeck({ deck, key }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }));
}