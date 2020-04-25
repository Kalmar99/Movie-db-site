const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {MovieForm} = require('../../src/client/components/movieForm')
 

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app')
const db = require('../../src/server/db')

test('test if data apears in form', () => {


    const name = 'Goodfellas'
    const year = 1990
    const description = 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.'
    const action = () => {}
    const username = 'user'
    const stars = 8
    const image = ''
    const title = 'Edit Movie'

    const driver = mount(
        <MemoryRouter initialEntries={["/editmovie"]}>
            <MovieForm
            name = {name}
            year = {year}
            description = {description}
            username = {username}
            stars = {stars}
            image = {image}
            title = {title}
            />
        </MemoryRouter>
        );
    



    const html = driver.html();

    
    expect(html).toMatch("Edit Movie");
    expect(html).toMatch("Goodfellas");
    expect(html).toMatch("1990");

})

test('Test that data does not appear in form',() => {


    const title = 'Add Movie'
    const username = 'user'

    const driver = mount(
        <MemoryRouter initialEntries={["/editmovie"]}>
            <MovieForm
            name={null}
            username = {username}
            title = {title}
            />
        </MemoryRouter>
        );
    

    const noDataInForm = (driver.find('.review-box-star-input').props().value === '')
    expect(noDataInForm).toBe(true)

    const html = driver.html();

    
    expect(html).toMatch("Add Movie");

})

