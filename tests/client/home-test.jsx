const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/components/home')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app')
const db = require('../../src/server/db')


test("Test failed fetch", async () => {

    stubFetch(500, {}, null);

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
        );

    await flushPromises();

    const html = driver.html();

    
    expect(html).toMatch("Cant get movies code: 500");
});

test('Display 1 movie using stubFetch',async () => {
  
    const title = 'Goodfellas';

    stubFetch(
        200,
        [{
            name: title,
            stars: 8,
            year: 1990,
            description: 'Best mafia movie ever made',
            image: 'imgUrl',
            review: [{
                title: 'Its Fantastic',
                description: 'Completly Lost for words',
                stars: '10'
            }]
        }],
        (url) => url.endsWith('/api/movies')
    )

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
    )

    await flushPromises()

    const html = driver.html()

    expect(html).toMatch(title)
})

test('Display movies using supertest',async () => {
    
    db.addExampleMovies()

    overrideFetch(app)

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
    )

    const predicate = () => {
        driver.update();
        console.log(driver.html())
        const movieSearch = driver.find('.allMovies')
        console.log(movieSearch.length)
        const movieIsDisplayed = (movieSearch.length >= 1)
        return movieIsDisplayed;
    }

    const displayedMovie = asyncCheckCondition(predicate,7000,700);
    expect(displayedMovie).toBe(true)

    const movies = db.getAllMovies()
    const html = driver.html()

    for(let i = 0; i < movies.length; i++) {
        expect(html).toMatch(movies[i].image)
    }

})