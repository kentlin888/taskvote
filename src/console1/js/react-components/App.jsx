import React, { PureComponent } from 'react'
import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Link,
    //IndexRoute,
    // IndexRedirect,
    //DefaultRoute,

    Redirect,

} from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";

import MTSwitch from './MTSwitch.jsx'

// import { HashLink as Link } from 'react-router-hash-link';
//import AddProduct from './AddProduct.jsx'
import style from './App.css'
//import { ThemeContext, themes } from './theme-context.js';
//import AppContext, { themes } from './app-context.js'
//import DataContext from '../DataContext.js'
import TaskEvaluation from './TaskEvaluation.jsx'
import Statics from './Statics.jsx'
import TaskManagement from './TaskManagement.jsx'
import TaskAdd from './TaskAdd.jsx'
import MeetingAdd from './MeetingAdd.jsx'


import PersonalTasks from './PersonalTasks.jsx'
import Rules from './Rules.jsx'
import SystemPurpose from './SystemPurpose.jsx'
import TaskAcception from './TaskAcception.jsx'
//import BootstrapTable2 from './BootstrapTable2.jsx'
//import loadingSpinner from './loadingSpinner.css'


// import ProductManagement from './ProductManagement/ProductManagement.jsx'
// import OrderManagement from './OrderManagement/OrderManagement.jsx'


class A2 extends PureComponent {
    render() {
        return (<div>
            {/* <h1>Electronics</h1> */}
            <Router>
                <div className="flexContainer bodyBox">
                    {/* ========= sidenav =========== */}
                    <div className="sidenav leftMenu bd3">
                        <MTSwitch></MTSwitch>
                        <Link to={`/SystemPurpose`} >系統目的</Link>
                        <Link to={`/TaskManagement`} >TaskManagement (admin)</Link>                        
                        <Link to={`/TaskEvaluation`} >TaskEvaluation</Link>
                        <Link to={`/TaskAcception`} >TaskAcception</Link>                        
                        <Link to={`/Statics`} >Statistic</Link>
                        <Link to={`/PersonalTasks`} >PersonalTasks</Link>
                        
                        {/* <Link to={`/TaskAdd`} >TaskAdd</Link>
                        <Link to={`/MeetingAdd`} >MeetingAdd</Link> */}

                        <Link to={`/Rules`} >Rules</Link>
                        
                        
                        {/* <Link to="/ProductListSearch/#category-beef" className="categoryItem">Your link text</Link> */}
                        {/* <a href="#OrderManagement">Order Management</a>
                        <a href="#ProductManagement">Product Management</a>
                        <a href="#clients">Clients</a>
                        <a href="#contact">Contact</a> */}
                    </div>
                    {/* =============== Route Switch =================== */}
                    <div className="centerBox bd5">
                        <Switch>
                            <Route path="/SystemPurpose" component={SystemPurpose} />
                            {/* The component will show here if the current URL matches the path */}
                            <Route path="/" exact component={TaskManagement} />
                            <Route path="/TaskEvaluation">
                                <TaskEvaluation></TaskEvaluation>
                            </Route>
                            <Route path="/Statics" component={Statics} />
                            <Route path="/TaskManagement">
                                <TaskManagement></TaskManagement>
                            </Route>
                            <Route path="/TaskAcception">
                                <TaskAcception></TaskAcception>
                            </Route>
                            {/* <Route path="/TaskAdd" component={TaskAdd} />
                            <Route path="/MeetingAdd" component={MeetingAdd} /> */}
                            
                            <Route path="/PersonalTasks" component={PersonalTasks} />
                            <Route path="/Rules" component={Rules} />
                            
                            
                        </Switch>
                    </div>

                </div>
            </Router>
        </div>)
    }
}
export default class App extends PureComponent {
    //static contextType = DataContext; // 才可以使用 this.context

    constructor() {
        super()
        let history = createHashHistory(this.props)

    }

    render() {
        return (
            <A2></A2>
            // <A1></A1>

        )
    }
}
//ThemedButton.contextType = ThemeContext;