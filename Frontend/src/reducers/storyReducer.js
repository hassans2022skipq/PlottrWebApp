export const storyReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STORY':
            return [...state, action.payload];
        case 'REMOVE_STORY':
            return state.filter(story => story.id !== action.payload.id);
        default:
            return state;
    }
};