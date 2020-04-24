const request = require('supertest')
const app = require('../../src/server/app')
const db = require('../../src/server/db')


beforeEach(() => {db.addExampleMovies()});

test("Get Movie by name",async () => {
    const response = await request(app).get('/api/movies/The%20Hateful%20Eight')
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('The Hateful Eight');
})

test('Create movie',async () => {

    const username = 'user_admin'
    const numberOfMovies = await (await request(app).get('/api/movies')).body.length;

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
        
