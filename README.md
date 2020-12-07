# Test Login

## Problem description

A customer should be able to log in on the website. The customer receives a Magic Link, which leads them to the account activation page, where they can set up their initial password. The prototype should provide the following screens and corresponding logic: account activation, login, password reset and dashboard. Implementation of the server is not needed and no requests should be fired.

## Launch instructions

- Run `npm install` to install dependencies
- Run `npm start` to launch the app in development mode
- First time running the app should get you to the account activation page, emulating the hypothetical scenario where a user enters the app via a magic link
- Use `john_doe@somemail.com` to log in

## Solution notes

The task poses itself very much like a technical task for a prototype app. Therefore, I approached it as I would a prototype. This means simplified logic and some workarounds. This is a UX prototype, so I focused exactly on that: correct flow and emulation of main controls and server responses.

The environment is set up with `create-react-app`

Tests are written with use of `jest` and `react-testing-library`

The task did not require specific implementation details, so I decided against using Redux or MobX. The purpose of this prototype is emulation and I decided to approach it differently. For data storage I used React Context and localStorage. React Context represents hypothetical contents of the app's local store (i.e. Redux, MobX, RxJS) and localStorage represents the server's data storage. Wherever I refer to localStorage directly within the code, in a real app it would have been an API call to fetch certain data from the server.

I only wrote tests for components within `/src/domains/auth` as it is where the bulk of the logic is. Dashboard does not have enough functionality to bother with covering it with tests and I do not have a server to test the API layer. All of the aforementioned elements could and should be tested in a real app (e.g. checking Router's history to see if redirects work correctly, checking request bodies, etc.). In testing I held to the same idea as I mentioned above: this is a UX prototype and UX is the very thing I should be testing.

All additional notes are given in commentaries within the code. I am open to any questions and willing to explain my decisions.