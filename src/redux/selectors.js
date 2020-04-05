export const getHist = store => store.newHistory;

export const getHistList = store =>
  getHist(store) ? getHist(store).allIds : [];

export const getHistById = (store, id) =>
  getHist(store) ? {...getHist(store).byIds[id], id} : {};

export const getHists = store =>
  getHistList(store).map(id => getHistById(store, id));