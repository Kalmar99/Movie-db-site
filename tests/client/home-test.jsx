const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/components/home')

const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const db = require('../../src/server/db')
const app = require('../../src/server/app')


test("Test failed fetch", async () => {

    /*
        in this case, we stub the fetch, by explicitly stating what to return when the component runs.
        the backend is not run in this test.
     */

    stubFetch(500, {}, null);

    const driver = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Home/>
        </MemoryRouter>
        );

    await flushPromises();

    const html = driver.html();

    //here we just check it appears somewhere in the updated HTML
    expect(html).toMatch("Cant get movies code: 500");
});