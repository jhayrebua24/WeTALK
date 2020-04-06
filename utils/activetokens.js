const users = [];

const getUsers = () => users;

const checkifUserExists = (user) => {
  const index = users.includes(user);
  if (index) return true;
  return false;
}

const addUser = (user) => {
  users.push(user);
}

const removeUser = (user) => {
  const index = users.indexOf(user);
  if (index !== -1) return users.splice(index, 1)[0];
  return false;
}

module.exports = {
  getUsers,
  checkifUserExists,
  addUser,
  removeUser,
}


