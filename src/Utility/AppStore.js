import AsyncStorage from '@react-native-community/async-storage';

storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

retrieveData = async key => {
  return await AsyncStorage.getItem(key);
};

getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    console.log({users});
    return !users ? [] : JSON.parse(users);
  } catch (error) {
    console.log(error);
    return [];
  }
};

getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return !user ? {} : JSON.parse(user);
  } catch (error) {
    console.log(error);
    return {};
  }
};

storeUser = async user => {
  try {
    let users = await getUsers();
    console.log({users, user});
    if (users.filter(x => x.username === user.username).length > 0)
      return {success: false, Message: 'Username is present'};
    if (users.filter(x => x.email === user.email).length > 0)
      return {success: false, Message: 'Email is present'};
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return {success: true, Message: 'User added'};
  } catch (error) {
    console.log(error);
    return {success: true};
  }
};

storeCurrentUser = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return {success: true, Message: 'User added'};
  } catch (error) {
    console.log(error);
    return {success: true};
  }
};

checkUsername = async username => {
  try {
    let users = await getUsers();
    if (users.filter(user => user.username === username).length > 0)
      return {success: false, Message: 'Username is present'};
    return {success: true};
  } catch (error) {
    console.log(error);
    return {success: true};
  }
};

checkEmail = async email => {
  try {
    let users = await getUsers();
    if (users.filter(user => user.email === email).length > 0)
      return {success: false};
    return {success: true};
  } catch (error) {
    console.log(error);
    return {success: true};
  }
};

clearData = async () => {
  await AsyncStorage.setItem('users', '');
};

logOut = async () => {
  await AsyncStorage.setItem('user', '');
};

export default {
  storeData,
  retrieveData,
  getUsers,
  getCurrentUser,
  storeUser,
  storeCurrentUser,
  checkUsername,
  checkEmail,
  logOut,
  clearData,
};
