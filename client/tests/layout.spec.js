const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('there is a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Hobbit');
        });

        test('there is a favicon', () => {   
            const head = document.querySelector('head')
            expect(head.innerHTML).toContain('link rel=\"icon\"');
        })

        test('there is a stylesheet linked', () => {
            const head = document.querySelector('head')
            expect(head.innerHTML).toContain('link rel=\"stylesheet\"');
        })
    })

    describe('body', () => {
        test('there is a header', () => {
            expect(document.querySelector('header')).toBeTruthy();
        });

        test('there is a logo in the header', () => {
            let header = document.querySelector('header');
            expect(header.innerHTML).toContain('img src=');
        })

        test('there is a button for logging in', () => {
            let loginButton = document.querySelector('#login');
            expect(loginButton).toBeTruthy();
        })

        test('there is a button for users to register', () => {
            let loginButton = document.querySelector('#register');
            expect(loginButton).toBeTruthy();
        })

        test('there is a footer', () => {
            let footer = document.querySelector('footer');
            expect(footer).toBeTruthy()
        })
    })
});