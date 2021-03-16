
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App, { rootReducer } from '@wrp/reading-core'

const div = document.createElement('div')
// div.style = `
//     z-index: 99999999999999999999
// `

const target = document.body.appendChild(div)

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    target
)