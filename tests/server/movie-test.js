const request = require('supertest')
const app = require('../../src/server/app')
const db = require('../../src/server/db')


const login = async (agent,name,pass) => {
    return await agent
    .post('/api/login')
    .send({username:name,password:pass})
    .set('Content-Type','application/json')
}

const signup = async (app,name,pass) => {
    return await request(app)
        .post('/api/signup')
        .send({username: name,password:pass})
        .set('Content-Type','application/json');
}

const createMovie = async (agent,movie) => {
    return await agent
        .post('/api/movies')
        .send(movie)
        .set('Content-Type','application/json')
}



beforeEach(() => {db.addExampleMovies()});

test("Get Movie by name",async () => {
    const response = await request(app).get('/api/movies/The%20Hateful%20Eight')
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('The Hateful Eight');
})

test('Create movie',async () => {

    const username = 'user_admin'
    const numberOfMovies = (await request(app).get('/api/movies')).body.length;

    let response = await request(app)
        .post('/api/signup')
        .send({username: username,password:'bar'})
        .set('Content-Type','application/json');

    expect(response.statusCode).toBe(201)

    const agent = request.agent(app)

    response = await agent
        .post('/api/login')
        .send({username,password:'bar'})
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)


    const movieName = 'Test Movie'

    const movie = {
        name: movieName,
        stars: 7,
        year: 1990,
        description: 'this is a test movie',
        image: 'url',
        review: null
    }

    response = await agent
        .post('/api/movies')
        .send(movie)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(201)


    response = await request(app).get('/api/movies')
    expect(response.body.length).toBe(numberOfMovies+1)

});

test('Test create movie without being logged in',async () => {
    
    const response = await request(app).post('/api/movies')
        .send({title:'tull',year:123,description:'ball',image:'123'})
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(401);
});

test('Test Update movie',async () => {

    const username = 'user_edit_admin'
    const pass = 'bar'

    let response = await signup(app,username,pass)

    expect(response.statusCode).toBe(201)

    const agent = request.agent(app)

    response = await login(agent,username,pass)

    expect(response.statusCode).toBe(204)


    const movieName = 'Test Movie'

    const movie = {
        name: movieName,
        stars: 7,
        year: 1990,
        description: 'this is a test movie',
        image: 'url',
        review: null
    }

    response = await createMovie(agent,movie)

    expect(response.statusCode).toBe(201)

    movie.name = 'New Name'

    response = await agent
        .put('/api/movies/' + movieName )
        .send(movie)
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)

    response = await agent
        .get('/api/movies/' + movie.name)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('New Name');



})


test('Delete Movie',async () => {

    const username = 'delete_user'
    const password = 'delete_user'

    let response = await signup(app,username,password)
    expect(response.statusCode).toBe(201)

    const agent = request.agent(app)

    response = await login(agent,username,password)

    expect(response.statusCode).toBe(204)

    const movieName = 'TestMovie'

    response = await createMovie(agent,{
        name: movieName,
        stars: 7,
        year: 1990,
        description: 'this is a test movie',
        image: 'url',
        review: null
    })

    expect(response.statusCode).toBe(201)

    //Delete movie
    response = await agent
        .delete('/api/movies/' + movieName)
    
    expect(response.statusCode).toBe(204)

    response = await agent
        .get('/api/movies/' + movieName)
    
    expect(response.statusCode).toBe(404)

})
