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
            <Movie/>
        </MemoryRouter>
        );

    await flushPromises();

    const html = driver.html();

    
    expect(html).toMatch("error retrieving movie, status code: 500");
});