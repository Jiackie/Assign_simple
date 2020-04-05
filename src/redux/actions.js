let nextId = 0;

export const addNew = (text, amount) => ({
  type: "ADD_NEW",
  playload: {
    id: ++nextId,
    text: text,
    amount: amount
  }
});

export const deleteNew = (id) => ({
  type: "DELET_NEW",
  playload: {
    id: id
  }
});