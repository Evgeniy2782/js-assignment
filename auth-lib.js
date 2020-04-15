let allUsers = [];
let allGroups = [];
let allRights = [];
let session  = [];
let emulation ={};
let counter = 0;

// Возвращает массив всех пользователей.
function users() {
  var arrUsers = [];
  for (var i = 0; i < allUsers.length; i++) {
    arrUsers.push(allUsers[i].name);
  }
  return arrUsers;
}
// Возвращает массив групп
function groups() {
  var arrGroups = [];
  for (var i = 0; i < allGroups.length; i++) {
    arrGroups.push(allGroups[i].name);
  }
  return arrGroups;
}
// Возвращает массив прав
function rights() {
  var arrRights = [];
  for (var i = 0; i < allRights.length; i++) {
    arrRights.push(allRights[i].name);
  }
  return arrRights;
}
//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) {
  var user = {
    name,
    password,
    groups: [],
  };
  allUsers.push(user);
  return name;
}
// Удаляет пользователя user
function deleteUser(user) {
  if (!user) {
    throw new Error("Erorr ");
  }
  let index = allUsers.map((x) => x.name).indexOf(user);
  if (index == -1) {
    throw new Error("Erorr ");
  } else {
    allUsers.splice(index, 1);
  }
}
// Создает новую группу и возвращает её.
function createGroup(name) {
  var group = {
    name,
    right: [],
  };
  allGroups.push(group);
  return name;
}

// Создает новое право с именем name и возвращает его
function createRight(name) {
  var right = {
    name,
  };
  allRights.push(right);
  return name;
}
// Удаляет группу group
function deleteGroup(group) {
  if (!group) {
    throw new Error("Erorr ");
  }
  let index = allGroups.map((x) => x.name).indexOf(group);

  if (index == -1) {
    throw new Error("Erorr ");
  } else {
    allGroups.splice(index, 1);
  }
  for (var i = 0; i < allUsers.length; i++) {
    for(var j = 0; j < allUsers[i].groups.length; j++){
    if (allUsers[i].groups[j] == group) {
      allUsers[i].groups.splice(j, 1);
      }
    }
  }
}
// Удаляет право right
function deleteRight(right) {
  if (!right) {
    throw new Error("Erorr ");
  }
  let index = allRights.map((x) => x.name).indexOf(right);
  if (index == -1) {
    throw new Error("Erorr ");
  } else {
    allRights.splice(index, 1);
  }
  for (var i = 0; i < allGroups.length; i++) {
    for(var j = 0; j < allGroups[i].right.length; j++){
    if (allGroups[i].right[j] == right) {
      allGroups[i].right.splice(j, 1);
    }
  }
 }
}
// Добавляет право right к группе group
function addRightToGroup(right, group) {
  if (!right) {
    throw new Error("Error right !" + right);
  }
  if (!group) {
    throw new Error("Error group !" + group);
  }

  let indexGroup = allGroups.map((x) => x.name).indexOf(group);

  if (indexGroup == -1) {
    throw new Error("Erorr group !");
  }
  let indexRight = allRights.map((x) => x.name).indexOf(right);

  if (indexRight == -1) {
    throw new Error("Erorr user");
  } else {
    allGroups[indexGroup].right.push(right);
  }
}
// Добавляет пользователя user в группу group
function addUserToGroup(user, group) {
  if (!user) {
    throw new Error("Error user !" + user);
  }
  if (!group) {
    throw new Error("Error group !" + group);
  }

  let indexGroup = allGroups.map((x) => x.name).indexOf(group);
  let indexUser = allUsers.map((x) => x.name).indexOf(user)

  if (indexGroup == -1) {
    throw new Error("Erorr group !");
  }
  if (indexUser == -1) {
    throw new Error("Erorr user !");
  }else{
    allUsers[indexUser].groups.push(group);
  } 
}
// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) {
 var arrGroupsToUser = [];
    for (var i in allUsers) {
      if (allUsers[i].name == user) {
        arrGroupsToUser.push(allUsers[i].groups);
      }
    }
    return arrGroupsToUser[0];
}
// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) {
  var arrRights = [];        //ошибка
  for (var i in allGroups) {
    if (allGroups[i].name == group) {
      for (var j in allGroups[i].right) {
        arrRights.push(allGroups[i].right[j]);
      }
    }
  }
  return arrRights;
}
// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) {
var arrGroupRight = groupRights(group);

if (right && group) {
   let indexGroup = allGroups.map((x) => x.name).indexOf(group);
  if (indexGroup == -1) {
    throw new Error();
  }
  let indexGroupRight = arrGroupRight.map((x) => x).indexOf(right);
  console.log(arrGroupRight);
  if (indexGroupRight == -1) {
    throw new Error();
  }else{
    arrGroupRight.splice(indexGroupRight, 1);
  }
    if (allGroups[indexGroup].name == group) {
      allGroups[indexGroup].right = arrGroupRight;
    }
} else {
  throw new Error('Error !');
}
 }

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
  function removeUserFromGroup(user, group) {
   
   let indexUser = allUsers.map((x) => x.name).indexOf(user);
   if (indexUser == -1) {
    throw new Error("Erorr ");
 }

var arrUserGroups = userGroups(user);
 if (user && group) {
    let indexarrUserGroup = arrUserGroups.map((x) => x).indexOf(group);
    if (indexarrUserGroup == -1) {
      throw new Error();
    }else{
      arrUserGroups.splice(indexarrUserGroup, 1);
    }
       if (allUsers[indexUser].name == user) {
        allUsers[indexUser].groups = arrUserGroups;
    }
  } else {
    throw new Error('Error !');
  }
}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function login(username, password) {
  let user = allUsers.map((x) => x.name).indexOf(username);
  let pass = allUsers.map((x) => x.password).indexOf(password);
  if(session.onlain === true){
    console.log(' Это сессия уже занята пользователем: ' + session.username + " !");
    return false;
  }else if(user == -1 || pass == -1){
    console.log('Не верный логин или пароль !');
   return false;
  }else {
    console.log('Вы зашли под учетной записью '+ username + ' !');
  //  alert('Вы зашли под учетной записью '+ username + ' !');
     session.username = username;
     session.password = password;
     session.onlain = true;
    return true;
  }
}
function currentUser() {
  return session.username;
}

function isAuthorized(user, right) {     

  let indexUser = allUsers.map((x) => x.name).indexOf(user);
  let indexRight = allRights.map((x) => x.name).indexOf(right);

  if(indexUser == -1){
    throw new Error('Error !');
  }
 if(indexRight == -1){
   throw new Error('Error !');
 }

  var arrFullUserGroups = userGroups(user);

  var arrFullRightsUser = [];

  for (var i = 0; i < arrFullUserGroups.length; i++) {
     arrFullRightsUser.push(groupRights(arrFullUserGroups[i]));
 }

var x = false;
 for (var i in arrFullRightsUser) {
  for (var j in arrFullRightsUser[i]) {
    if (arrFullRightsUser[i][j] == right) {
      x = true;
    }
  }
} if (x == true) {
  return true;
} else {
  return false;
 }
}

function logout() {
  if (emulation.name){
   console.log('delete emalation ' + emulation.name + ' !');
   delete emulation.name;
   return;
 }else{
 if(session.username != 0){
   delete session.onlain;
   delete session.username;
   console.log('delete session !');
   return;
  }
 }
}
createUser("Pety", "123");
createUser("Evgen", "123");
createUser("Vasy", "123");
createUser("guest", "");

createGroup("admin");
createGroup("manager");
createGroup("user");
createGroup("guestGroup");

createRight("addUserToGroup");
createRight("deleteUserToGroup");
createRight("readGroup");
createRight("writeGroup");
createRight("canIncreaseCounter");

addRightToGroup("addUserToGroup", "admin");
addRightToGroup("deleteUserToGroup", "admin");
addRightToGroup("readGroup", "guestGroup");
addRightToGroup("writeGroup", "admin");
addRightToGroup("readGroup", "admin");
addRightToGroup("readGroup", "manager");
addRightToGroup("writeGroup", "manager");
addRightToGroup("readGroup", "user");
addRightToGroup("canIncreaseCounter","admin");

addUserToGroup("Vasy", "user");
addUserToGroup("Evgen", "admin");
addUserToGroup("Evgen", "manager");
addUserToGroup("Pety", "manager");
addUserToGroup("guest", "guestGroup");

//Проверка прав на удаление или добавление в группы (admin имеет FullRights)
function deleteGroupsAndGropus(user, group){
  let groupsToUser = userGroups(user);
  let indexUser = allUsers.map((x) => x.name).indexOf(user);
  if(indexUser == -1){
    throw new Error('Error !');
  }
  let indexGroup = allGroups.map((x) => x.name).indexOf(group);
  if (indexGroup == -1) {
    throw new Error();
  }
  console.log(groupsToUser);
  groupsToUser.forEach(element => {
    if(element == group){
      return console.log('Есть права у группы  '+ element + '  на удаление или добавление в группы !!!');

    }else{
      console.log('Нет прав у группы '+ element + '  на удаление или добавление в группы !!!');
    }
   }
  )
};
//Просмотр всех групп (у всех права)
function lookGroups(user) {
  console.log(groups(user));
  console.log(users(user));
  console.log(rights(user));
  console.log(allRights);
  console.log(allUsers);
  console.log(allGroups);
}
lookGroups(currentUser());

//Проверка прав на создание пользователей, групп, прав 
 function fullCreate(user, group) {
  let createGroupAndUsers = userGroups(user);
  let indexUser = allUsers.map((x) => x.name).indexOf(user);
  if(indexUser == -1){
    throw new Error('Error !');
  }
  let indexGroup = allGroups.map((x) => x.name).indexOf(group);
  if (indexGroup == -1) {
    throw new Error();
  }
  createGroupAndUsers.forEach(element => {
    if(element == group){
      console.log('Есть права у группы '+ element +' на создание пользователей, группы, прав !!!')
    }
  });
}

function guest() {
  login('guest', '');
}

function loginAs(user){
  let indexGroups = userGroups(user);
  var  numberIndex = Math.floor(Math.random() * allUsers.length);

if(indexGroups == undefined){
  throw new Error('Error !');
}

let indexGroup = indexGroups.map((x) => x).indexOf('admin');

if(indexGroup == -1){
  console.log('Нет прав на создание Emulation '+ allUsers[numberIndex].name + ' !');
}else{
  emulation.name = allUsers[numberIndex].name;
  console.log('Создана Emulation '+ allUsers[numberIndex].name + ' !');
}
}

function increaseCounter(amount) {
  return counter += amount;
  };

function securityWrapper(action, right) {
    if(isAuthorized(currentUser(), right)) {
      console.log('SecurityWrapper: Есть права '+ right + " " + isAuthorized(currentUser(), right ));
      return action;
    }else{
      console.log('SecurityWrapper: Нет прав ' + right + isAuthorized(currentUser(), + right));
      return false;
    }
  }

  function addActionListener(user, action){
    console.log("Пользователь " + user + " только что сделал " + action.name);
    }

  
  // Проверка функций

//    login("Evgen", "123");
//    //logout();
//   // login("Evgen", "123");
//   console.log("Текущий пользователь ! " + currentUser());

//  var secureWrapperDeleteGroup = securityWrapper(deleteGroupsAndGropus(currentUser(), 'manager'), 'deleteUserToGroup');
//  var secureWrapperIncreaseCounter =securityWrapper(increaseCounter(1), "canIncreaseCounter");

//   deleteGroupsAndGropus(currentUser(), "admin");
//    fullCreate(currentUser(), 'manager');
//    loginAs(currentUser());
//    logout();
//    logout();
//    login('Pety','123');

//    //listener(currentUser(), 'canIncreaseCounter');
  
//   logout();
//   console.log("Текущий пользователь ! " + currentUser());


