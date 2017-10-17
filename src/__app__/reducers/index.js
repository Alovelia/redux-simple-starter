export default (state = { version: '1.0' }, { type }) => {
  if (type === 'EVENT') {
    return { ...state, update: true, end: true, add: 1 };
  }
  return state;
};
