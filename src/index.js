import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route,Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from './reducer'
import './config'
import Login from './container/login/login.js';
import Register from './container/register/register.js';
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo.js'
import geniusInfo from './container/geniusinfo/geniusinfo.js'
import Dashboard from './component/dashboard/dashboard'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension() : f=>f
))

ReactDOM.render(
    (<Provider store={store}>
    <BrowserRouter>
    <div>
    <AuthRoute></AuthRoute>
    <Switch>
    <Route path='/geniusinfo' component={geniusInfo}></Route>    
    <Route path='/bossinfo' component={BossInfo}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
    <Route component={Dashboard}></Route>
    </Switch>    
    </div>
    </BrowserRouter>
    </Provider>),
document.getElementById('root')
)
