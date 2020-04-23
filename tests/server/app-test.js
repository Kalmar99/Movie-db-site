const request = require('supertest')
const app = require('../../src/server/app')
const db = require('../../src/server/db')


beforeEach(() => {db.addExampleMovies()});

test("Get all movies",async () => {
    const response = await request(app).get('/api/movies')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(12)
})

test("Get 404 on non existing movie",async () => {
    const response = await request(app).get('/api/movies/nonexistingmovie')
    expect(response.statusCode).toBe(404)
})

test("Get 200 on existing movie",async () => {
    const response = await request(app).get('/api/movies/Goodfellas')
    expect(response.statusCode).toBe(200)
})

test("Can recieve every movie in array",async () => {

    const response = await request(app).get('/api/movies')
    expect(response.statusCode).toBe(200)

    const movies = response.body;

    for(var i = 0; i < movies.length; i++) {
        const response2 = await request(app).get('/api/movies/' + movies[i].name)
        const movie = response2.body

        expect(movie.name).toBe(movies[i].name)
    }
})