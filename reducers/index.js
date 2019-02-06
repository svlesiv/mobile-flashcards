import { RECEIVE_DECKS, ADD_DECK } from "../actions";

export function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS :
			const { decks } = action;
			return {
				...state,
				...decks,
			}
		case ADD_DECK :
			const { deck } = action;
			return {
				...state,
				[deck.id]: deck,
			}
		default:
			return state
	}
}