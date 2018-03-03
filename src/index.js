import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from './reducer'
import './config'
import Login from './container/login/login.js';
import Register from './container/register/register.js';
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniousInfo from './container/geniousinfo/geniousinfo.js'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension() : f=>f
))

ReactDOM.render(
    (<Provider store={store}>
    <BrowserRouter>
    <div>
    <AuthRoute></AuthRoute>
    <Route path='/geniousinfo' component={GeniousInfo}></Route>    
    <Route path='/bossinfo' component={BossInfo}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
    </div>
    </BrowserRouter>
    </Provider>),
document.getElementById('root')
)
