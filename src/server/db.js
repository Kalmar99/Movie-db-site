const users = new Map()
const movies = new Map()

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

function createMovie(name,stars,year,description,image) {
    
    const movie = {
        name: name,
        stars: stars,
        year: year,
        description: description,
        image: image
    }

    movies.set(name,movie)
    return movie
}

function getMovie(name) {
    return movies.get(name)
}

function getAllMovies() {
    return Array.from(movies.values())
}

function addExampleMovies() {
    
    createMovie("The Hateful Eight",7,2015,"In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.","https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_UX182_CR0,0,182,268_AL_.jpg")
    createMovie("Goodfellas",8,1990,"The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.","https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg")
    createMovie("Joker",8,2019,"In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.","https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg")

}

createUser("kalmar","123");
addExampleMovies();
console.log(getAllMovies())
module.exports = {createUser,getUser,verifyUser,getMovie,getAllMovies,createMovie}