const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {AddMovie} = require('../../src/client/components/addMovie')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app')
const db = require('../../src/server/db')

test('Test unautorized acess', () => {

  
    const driver = mount(
        <MemoryRouter initialEntries={["/editmovie"]}>
            <AddMovie
            username={null}
            />
        </MemoryRouter>
        );
    
    const html = driver.html();

    
    expect(html).toMatch("You need to be logged in to add movies");

})

test('Test authorized access', () => {
    
    const driver = mount(
        <MemoryRouter initialEntries={["/editmovie"]}>
            <AddMovie
            username='user'
            />
        </MemoryRouter>
        );
    
        const html = driver.html()


        expect(html).toMatch('<div class="review-box container">')

})

