const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Movie} = require('../../src/client/components/movie')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app')
const db = require('../../src/server/db')


test("Test failed fetch", async () => {

    stubFetch(500, {}, null);

    const driver = mount(
        <MemoryRouter initialEntries={["/movie"]}>
            <Movie updateLoggedInUser={() => {}} username='test'/>
        </MemoryRouter>
        );

    await flushPromises();

    const html = driver.html();

    
    expect(html).toMatch("error retrieving movie, status code: 500");
});

test('Display movie using stubFetch',async () => {
  
    const title = 'Goodfellas';

    stubFetch(
        200,
        {
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
        },
        (url) => url.endsWith('/api/movies')
    );

    const driver = mount(
        <MemoryRouter initialEntries={["/movie"]}>
            <Movie updateLoggedInUser={() => {}} username='test'/>
        </MemoryRouter>
    );

    await flushPromises()

    const html = driver.html()

    expect(html).toMatch(title)
}); 

test("Test display movie using SuperTest", async () => {

    db.addExampleMovies();
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter initialEntries={["/movie?n=The%20Hateful%20Eight"]}>
            <Movie updateLoggedInUser={() => {}} username='test'/>
        </MemoryRouter>
    );


    const predicate = () => {
      
        driver.update();
        const movieSearch = driver.find('.movie');
        const movieIsDisplayed =  (movieSearch.length >= 1);
        return movieIsDisplayed;
    };

    const displayedMovie = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedMovie).toBe(true);
});