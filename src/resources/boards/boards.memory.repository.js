const database = require('../../memoryDb/memoryDb');

const { boards } = database.memoryDb;

const getAll = async () => [...boards];

const get = async (itemId) => boards.find((item) => item.id === itemId);

const create = async (item) => {
  boards.push(item);
  return get(item.id);
};

const update = async (itemId, itemData) => {
  const index = boards.findIndex((item) => item.id === itemId);
  if (index === -1) return null;

  boards[index] = { ...boards[index], ...itemData, itemId };
  return get(itemId);
};

const remove = async (itemId) => {
  const index = boards.findIndex((item) => item.id === itemId);
  if (index === -1) return false;

  return boards.splice(index, 1).length;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
