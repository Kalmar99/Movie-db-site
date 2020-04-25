const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {Header} = require('../../src/client/components/header')
 

test('Test logged in',() => {
    
    const username = 'user'

    const driver = mount(
        <MemoryRouter initialEntries={['/home']} >
            <Header 
                username={username}
                updateLoggedInUser={() => {}}
                history={{ push: () => {}}}/>
        </MemoryRouter>
    )

    const html = driver.html()

    expect(html).toMatch('Log Out')

})
