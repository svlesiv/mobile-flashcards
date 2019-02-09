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
            AsyncStorage.removeItem(DECK_STORAGE_KEY) // this is for testing; need to reload twice to get default data
            return JSON.parse(results);
        } 
    });       
}

export function saveDeck({ title, deck }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
      [title]: deck
    }));
}

export function saveCard(deck, card) {
  deck.questions.push(card);
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}