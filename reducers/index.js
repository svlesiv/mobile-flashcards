import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      const { decks } = action;
      return {
        ...state,
        ...decks
      }
    case ADD_DECK :
      const { deck } = action;
      return {
        ...state,
        ...deck
      }
    case ADD_CARD :
      const { card, cardDeck } = action;
      return {
        ...state,
        [cardDeck.title]: {
          ...state[cardDeck.title],
          questions: [...state[cardDeck.title].questions, card]
        }
      }
    default :
      return state
  }
}