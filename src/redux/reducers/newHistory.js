const initialState = {
  allIds: [],
  byIds: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW": {
      const { id, text, amount } = action.playload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id] : {
            text,
            amount
          }
        }
      };
    }

    case "DELET_NEW": {
      const { id } = action.playload;
      return {
        allIds: state.allIds.filter( ids => ids !== id),
        byIds: Object.keys(state.byIds)
          .filter(key => parseInt(key) !== id)
          .reduce((obj, key) => {
            return {...obj, [key] : state.byIds[key]};
          }, {})
      };
    }

    default:
      return state;
  }
}
