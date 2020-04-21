const users = new Map()

function createUser(username,password) {
    
    const user = {
        username: username,
        password: password
    }
    
    users.set(username,user)

    return user;
}

function getUser(username) {
    return users.get(username)
}

function verifyUser(username,password) {
    
    const user = getUser(username)
  
    if(!user) {
        return false;
    } else {
        return user.password === password
    }
}

createUser("kalmar","123");

module.exports = {createUser,getUser,verifyUser}