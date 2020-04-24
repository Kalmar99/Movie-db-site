const request = require('supertest')
const app = require('../../src/server/app')

let counter = 0;

test('Test failed login',async () => {
    const response = await request(app)
        .post('/api/login')
        .send({username:'user_' + (counter++),password:'username'})
        .set('Content-Type','application/json')

        expect(response.statusCode).toBe(401);
})

test('Test fail acess data from non existing user',async () => {
    const response = await request(app)
    .get('/api/user');

    expect(response.statusCode).toBe(401);
}) 

test('Test register user but fail to get the userdata',async () => {
    const username = 'user_' + (counter++)

    let response = await request(app)
        .post('/api/signup')
        .send({username: username,password:'bar'})
        .set('Content-Type','application/json');

    expect(response.statusCode).toBe(201);


    response = await request(app)
        .get('/api/user')

    expect(response.statusCode).toBe(401)
})

test('Test register user and get userdata',async () => {
    const username = 'user_' + (counter++)
    const agent = request.agent(app)

    let response = await agent
        .post('/api/signup')
        .send({username: username,password:'bar'})
        .set('Content-Type','application/json');

    expect(response.statusCode).toBe(201)

    response = await agent.get('/api/user');
    expect(response.statusCode).toBe(200)
    expect(response.body.username).toBe(username)
    expect(response.body.password).toBeUndefined();
});

test('Test create user, then log in from another session and get userdata',async () => {
    const username = 'user_' + (counter++)

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

    response = await agent.get('/api/user')

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(username)
    expect(response.body.password).toBeUndefined();
});
   
test('Test login after logout',async () => {
    const username = 'user_' + (counter++)

    const agent = request.agent(app)

    let response = await agent 
        .post('/api/signup')
        .send({username,password:'bar'})
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(201);

    response = await agent.get('/api/user')
    expect(response.statusCode).toBe(200)

    response = await agent.post('/api/logout')
    expect(response.statusCode).toBe(204)

    response = await agent.get('/api/user')
    expect(response.statusCode).toBe(401);

    response = await agent 
        .post('/api/login')
        .send({username,password:'bar'})
        .set('Content-Type','application/json')

    expect(response.statusCode).toBe(204)

    response = await agent.get('/api/user')

    expect(response.statusCode).toBe(200)

});