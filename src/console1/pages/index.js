//@ts-check
import smoothscroll from 'smoothscroll-polyfill';
import 'jquery'
import 'bootstrap'
//import 'popper.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './bd.css'
import App from '../js/react-components/App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
//===============REDUX
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import ReduxLogger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../js/redux/reducers";
//================
//import indexEsm from './index.esm.js'
import FirebaseMJS, {
    //syncEmailVerified_ToDB,
    Email_ResendPassword,
    FIRESTORE_COLLECTION
} from '../js/firebase/FirebaseMJS.js'
import {
    getPlainObject
} from '../js/lib/dataKits.js'
import * as dataKits from '../js/lib/dataKits.js'
// import firebase from "firebase/app";
// import "firebase/auth"
// import 'firebase/firestore'

//import fontawesome from "@fortawesome/fontawesome";
// import {
//     faUser,
//     faShoppingCart
// } from "@fortawesome/fontawesome-free-solid";
// import index_css from './index.css'
import {
    UserData
} from '../js/dataDefine/index.js'


import cusModalLogin from '../webcomponents/cusModalLogin3/cusModalLogin.js'
import cusModalUserProfile from '../webcomponents/cusModalUserProfile3/cusModalUserProfile.js'
import cusFullPageScroll from '../webcomponents/cusFullPageScroll/fullPageScroll.js'

import '../webcomponents/cusModalUserProfile3/cusModalUserProfile.css'
import '../webcomponents/cusModalLogin3/cusModalLogin.css'
require('@babel/polyfill') //for async await syntax

//const Swal = require('sweetalert2')
import Swal from 'sweetalert2'
import { ENUM_orderStatus } from '../js/firebase/Firebase';
import { useComponent } from '../js/others/useComponent3.js'
//fontawesome.library.add([faUser,faShoppingCart]);
import _ from 'lodash'
//require("html-loader!./webpack_html/img_html.html");
window.Swal = Swal;
window.$ = $
window._ = _;
//console.log('lodash--',_)

// kick off the polyfill!
smoothscroll.polyfill();

let firebaseConfig = require('../config/firebaseProj.config.json')
let firebase = require('firebase/app');
require('firebase/auth')
require('firebase/firestore')
console.log('ppp-->', firebase)
firebase = firebase.default
firebase.initializeApp(firebaseConfig);

// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();

let liLogin = document.querySelector('#liLogin');
let liUserDropdown = document.querySelector('#liUserDropdown');
let aMyOrder = document.querySelector('#aMyOrder');
let aMyProfile = document.querySelector('#aMyProfile');

let aLogout = document.querySelector('#aLogout');
let spanDisplayEmail = document.querySelector('#spanDisplayEmail');
let aOpenModalShopcart = document.querySelector('#aOpenModalShopcart');
let liOpenModalShopcart = document.querySelector('#liOpenModalShopcart');

window.firebase = firebase
window.firebaseMJS = new FirebaseMJS(firebase, dataKits);
/**@enum {string} */
const ENUM_static_scroll_href_Id = {
    history: 'history',
    news: 'news',
    qanda: 'qanda',
    contactus: 'contactus',
    //page-react
}

// const ENUM_reactSwitchPage = {
//     ProductListSearch: 'ProductListSearch',
//     ViewOrders: 'ViewOrders',
// }


//var //---pure data
var proxyMainPageUI = {
    /**@type {boolean} */
    isReactPage: false,
    //.history|'news'|'qanda'|'contactus
    /**@type {ENUM_static_scroll_href_Id} */
    scrollToHrefId: ENUM_static_scroll_href_Id.history,
    // /**@type {ENUM_reactSwitchPage} */
    // reactSwitchPage: ENUM_reactSwitchPage.ProductListSearch,
    /**@type {number} */
    shopItemCount: 0,
    /**@type {cusFullPageScroll}} */
    cusFullPageScroll: null,
    /**@type {cusModalLogin} */
    cusModalLogin: null,
    /**@type {cusModalUserProfile}} */
    cusModalUserProfile: null,
}


window.app = {
    /**
     * @callback pushUrlFunc
     * @param {string} url - ...
     */
    pushUrl: (url) => {
        /* history.push(?) */
    },
    viewSize: function () {
        return $('#sizer').find('div:visible').data('size');
    },
    setShopItemCount: function (itemCount) {
        proxyMainPageUI.shopItemCount = itemCount;
    },
    navbar1: document.querySelector('#navbar1'),
    navbar1Height: document.querySelector('#navbar1').clientHeight,
    openModalShopCart: null,
    userData: null,
    history: null,
    store: null,
    //switchIndexPage: switchIndexPage,
    pageViewOrders: null,
    arrayGroupedCategories: null,
    arrayProductInfo: null,
}
window.app = new Proxy(window.app, {
    get: function ( /**@type {any} */ target, /**@type {any} */ prop) {
        return target[prop];
    },
    set: function ( /**@type {any} */ target, /**@type {any} */ prop, value) {
        switch (prop) {
            case 'userData':
                if (value === null) {
                    console.log('window.app.userData -->', value)
                    proxyUserMenuDropdown.isLogin = false;
                    proxyUserMenuDropdown.loginName = ''
                }
                else {
                    console.log('window.app.userData -->', value)
                    //navbarCollapse();
                    let newUserData = value;//target[prop];
                    proxyUserMenuDropdown.isLogin = true;
                    proxyUserMenuDropdown.loginName = newUserData.email
                }
                break;

            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})

console.log('aa.height-->', window.app.navbar1Height)
window.addEventListener('click', (evt) => {
    //console.log('click wwwwww')
    navbarCollapse();
})
// let divMenu = document.querySelector('#divMenu')
// divMenu.addEventListener('click',(evt) => {
//     evt.stopPropagation()
//     //console.log('click divMenu')
// })


//-------------Proxy
//---pure data
let proxyUserMenuDropdown = {
    /** user dropdown menu, display login button / user dropdown menu */
    isLogin: false,
    /** user dropdown menu, display email account name */
    loginName: "",
}
//mvvm observeble pattern
proxyUserMenuDropdown = new Proxy(proxyUserMenuDropdown, {
    get: function ( /**@type {any} */ target, /**@type {any} */ prop) {
        return target[prop];
    },
    set: function ( /**@type {any} */ target, /**@type {any} */ prop, value) {
        switch (prop) {
            case "isLogin":
                if (value == true) {
                    //remove class displayNone
                    liLogin.classList.add('displayNone')
                    liUserDropdown.classList.remove('displayNone')
                } else {
                    //add class displayNone
                    liLogin.classList.remove('displayNone')
                    liUserDropdown.classList.add('displayNone')
                }

                break;
            case "loginName":
                spanDisplayEmail.textContent = value;

                break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})

//test mvvm data binding
// let aTestLogin = document.querySelector('#aTestLogin');
// let aTestLogout = document.querySelector('#aTestLogout');
// aTestLogin.addEventListener('click', (e) => {
//     proxyUserMenuDropdown.isLogin = true;
//     proxyUserMenuDropdown.loginName = "John"
// })
// aTestLogout.addEventListener('click', (e) => {
//     proxyUserMenuDropdown.isLogin = false;
// })

//------------firebase onAuthChanged
// tset case 1: no authUser (not signin)
// tset case 2: has authUser -- UI display name change
// tset case 3: (has authUser, has window.app.userData) -- sync emailVerified_auth
// tset case 4: (has authUser, no window.app.userData) -- getDbUser
// tset case 5: (has authUser, no window.app.userData, has DbUser) -- window.app.userData = dbUser; + sync emailVerified_auth;
// tset case 6: (has authUser, no window.app.userData, no DbUser) -- userInfo = authUser; + window.app.userData = userInfo(已同時 sync emailVerified_auth);
firebase.auth().onAuthStateChanged(function ( /**@type {any}*/ authUser) {
    let db = firebase.firestore();
    //functions....
    /**
     * save partial fields of UserInfo to firestore.collection('Users')
     * @param {any} userInfo 
     */
    function SetUserData(userInfo) {
        // let type = 
        return db.collection(FIRESTORE_COLLECTION.Users).doc(userInfo.uid).set(userInfo, {
            merge: true
        })
    }
    /**
     * save UserInfo.emailVerified to firestore.collection('Users')
     * @param {boolean} emailVerified_FromAuth auth-user's emailVerified prop value
     * @param {string} uid auth-user's uid
     */
    function syncEmailVerified_ToDB(emailVerified_FromAuth, uid) {
        let userInfo = {
            uid: uid,
            emailVerified: emailVerified_FromAuth
        }
        return SetUserData(userInfo)
    }
    //-----------------
    if (authUser) {
        // User is signed in.

        proxyUserMenuDropdown.isLogin = true;
        proxyUserMenuDropdown.loginName = authUser.email

        // let uid = authUser.uid
        // let emailVerified = authUser.emailVerified
        let {
            uid,
            emailVerified: emailVerified_auth
        } = authUser
        console.log("LOG:: authUser", authUser)
        console.log("LOG:: uid", uid)

        //----window.app.userData exist
        if (window.app.userData) {
            let {
                emailVerified: emailVerified_db
            } = window.app.userData
            //sync auth emailVerified to DB
            if (emailVerified_auth != emailVerified_db)
                syncEmailVerified_ToDB(emailVerified_auth, uid)
        }
        //----window.app.userData not exist!
        if (!window.app.userData) {
            console.log('load user data from firestore...')

            function getDbUser( /**@type {string} */ uid) {
                return db.collection(FIRESTORE_COLLECTION.Users).doc(uid).get()
                    .then(( /**@type {any}*/ querySnapshot) => {
                        if (querySnapshot.exists === false)
                            return null;
                        else
                            return querySnapshot.data();

                        // let dbUser = {
                        //     exists: querySnapshot.exists,
                        //     doc: querySnapshot.data()
                        // }
                        // return dbUser
                    })
            }
            /**
             * 
             * @param {any} authUser 
             */
            function getUserInfo(authUser) {
                let userInfo = new UserData();
                // let dispalyName = null;
                // if (authUser.dispalyName === undefined)
                //     dispalyName = null;
                // else
                //     dispalyName = authUser.dispalyName;
                // }
                userInfo.dispalyName = (authUser.dispalyName) ? authUser.dispalyName : null
                userInfo.email = authUser.email;
                userInfo.emailVerified = authUser.emailVerified;
                userInfo.phoneNumber = authUser.phoneNumber;
                userInfo.photoURL = authUser.photoURL;
                userInfo.uid = authUser.uid;
                userInfo.listProviderId = UserData.getListProviderId_ByAuthUserProviderData(authUser.providerData);
                //providerId: auto get by self. //authUser.providerData[0].providerId,   

                return userInfo
            }
            // start load db user info --> ready to set window.app.userData
            getDbUser(uid)
                .then(( /**@type {any}*/ dbUser) => {
                    // db user exist
                    if (dbUser) {
                        window.app.userData = Object.assign(new UserData(), dbUser);
                        let emailVerified_db = dbUser.emailVerified
                        //sync auth emailVerified to DB
                        if (emailVerified_auth != emailVerified_db)
                            syncEmailVerified_ToDB(emailVerified_auth, uid)
                    } //not exist
                    else {
                        //get info from authUser
                        let userInfo = getUserInfo(authUser);
                        window.app.userData = userInfo;
                        //save info to db (First time)
                        let userData_fs = getPlainObject(userInfo)
                        SetUserData(userData_fs);
                        // return true //new user
                    }

                })
                .catch(( /**@type {any}*/ err) => {
                    console.error('onAuthStateChanged, get userData failed. ', err.code, err.message)
                })

        }

    } else {
        // No user is signed in.
        proxyUserMenuDropdown.isLogin = false;
        proxyUserMenuDropdown.loginName = null
        console.log('No user is signed in...')
    }
});


//firebase.analytics();
// console.log(firebase)

// let db = firebase.firestore();

// db.collection("Products")//.where("autoNum", "==", 7)
//     .get()
//     .then(function (querySnapshot) {
//     })
//     .catch((err) => {

//     })
// console.log(__dirname)



//mvvm observeble pattern

// let pageStatic = $('#page-static')
// let pageReact = $('#page-react')
//let navbar1 = document.querySelector('#navbar1');
//let navbar_height = window.app.navbar1.offsetHeight + 5
proxyMainPageUI = new Proxy(proxyMainPageUI, {
    get: function ( /**@type {any} */ target, /**@type {any} */ prop) {
        return target[prop];
    },
    set: function ( /**@type {any} */ target, /**@type {any} */ prop, value) {
        switch (prop) {
            // case "isReactPage":
            //     if (value == true) {
            //         pageStatic.hide()
            //         pageReact.fadeIn(500)
            //     } else {
            //         pageStatic.fadeIn(500)
            //         pageReact.hide()
            //     }
            //     break;
            case "scrollToHrefId":
                target.cusFullPageScroll.scrollToElem('#' + value)
                break;
            case "shopItemCount":
                //$('.fa-shopping-cart').attr("data-count", value)
                let numberBadges = document.querySelectorAll('.numberBadge')
                numberBadges.forEach((element) => {
                    element.textContent = value
                })
                break;
            // case "reactSwitchPage":
            //     switch (value) {
            //         case ENUM_reactSwitchPage.ProductListSearch:
            //             window.app.pushUrl('/ProductListSearch'); //ProductListSearch
            //             setTimeout(() => {
            //                 window.scrollTo({
            //                     top: 0,
            //                     left: 0,
            //                     behavior: 'auto' //'smooth'
            //                 });
            //             }, 10); //0的話有可能無法滑到最頂端，看運氣

            //             break;
            //         case ENUM_reactSwitchPage.ViewOrders:
            //             window.app.pushUrl('/ViewOrders'); //ProductListSearch
            //             setTimeout(() => {
            //                 window.scrollTo({
            //                     top: 0,
            //                     left: 0,
            //                     behavior: 'auto' //'smooth'
            //                 });
            //             }, 10); //0的話有可能無法滑到最頂端，看運氣
            //             break;
            //         default:
            //             break;
            //     }
            //     break;
            default:
                break;
        }
        target[prop] = value;
        return true;
    }
})


//------------ load webcomponents
// let newTagName = "cus-full-page-scroll";
// let pathHtml_fullPageScroll = '../webcomponents/cusFullPageScroll/fullPageScroll.htm';
// if (!proxyMainPageUI.cusFullPageScroll)
//     useComponent(newTagName, pathHtml_fullPageScroll, cusFullPageScroll)
//     .then((htmlFile) => {
//         let newComponent = new htmlFile.ctor(htmlFile.templateContent);
//         proxyMainPageUI.cusFullPageScroll = newComponent
//         pageStatic.append(newComponent)
//         //newComponent.scrollToElem('#news')
//     })
//---------------------Constructor()-> setFirebase(firebase) - > Auth().getRedirectResult()
let newTagName = "cus-modal-login";
//let login_Element = document.querySelector(newTagName);
if (!proxyMainPageUI.cusModalLogin) {
    useComponent(newTagName, '../webcomponents/cusModalLogin3/cusModalLogin.htm', cusModalLogin)
        .then((htmlFile) => {
            let plugins = {
                Swal,
                Email_ResendPassword
            }
            //class-instance APPEAR!!  you can set template now~~~
            /**@type {cusModalLogin} */
            let newComponent = new htmlFile.ctor(htmlFile.templateContent, plugins);

            // if (WebpackDefinePlugin.devMode) {
            //     newComponent.proxyUI.bindIptSigninEmail = 'ice4kimo@yahoo.com.tw'
            //     newComponent.proxyUI.bindIptSigninPWD = '11111111'
            //     newComponent.proxyUI.bindIptRegisterEmail = 'ice4kimo@yahoo.com.tw'
            //     newComponent.proxyUI.bindIptRegisterPWD1 = '11111111'
            //     newComponent.proxyUI.bindIptRegisterPWD2 = '11111111'
            //     newComponent.proxyUI.bindIptResentPwdEmail = 'ice4kimo@yahoo.com.tw'
            // }


            proxyMainPageUI.cusModalLogin = newComponent
            /**@type {any} */
            let node = newComponent
            document.body.appendChild(node)
        })
}
//------------------- aMyProfile
let pathHtml_userProfile = '../webcomponents/cusModalUserProfile3/cusModalUserProfile.htm';
aMyProfile.addEventListener('click', (e) => {
    e.preventDefault();
    navbarCollapse();
    let newTagName = "cus-modal-user-profile";
    //let login_Element = document.querySelector(newTagName);
    if (proxyMainPageUI.cusModalUserProfile)
        proxyMainPageUI.cusModalUserProfile.showModal(true)
    else {
        useComponent(newTagName, pathHtml_userProfile, cusModalUserProfile)
            .then((compUI) => {
                let plugins = {
                    Swal,
                    Email_ResendPassword
                }

                let newComponent = new compUI.ctor(compUI.templateContent, plugins);
                proxyMainPageUI.cusModalUserProfile = newComponent
                // newComponent.setDataDefine({
                //     UserData: UserData
                // });
                document.body.appendChild(newComponent)

                let uid = firebase.auth().currentUser.uid
                newComponent.loadDbProfile(uid);
                newComponent.showModal(true)
                //UI control
                newComponent.proxyUI.isEmailVerified = firebase.auth().currentUser.emailVerified;
            })

            .catch((err) => {
                console.log(err)
            });
    }
});

// get 5 navbar items
let all_MenuHref = document.querySelectorAll('a[href]')
// ----------- add button click event
//     <a href="#history" class="nav-link">老店歷史</a>
//     <a href="#news" class="nav-link">最新消息</a>
//     <a href="#page-react" class="nav-link" id="aOrderProducts">產品訂購</a>
//     <a href="#qanda" class="nav-link">常見問題(購物)</a>
//     <a href="#contactus" class="nav-link">聯絡我們</a>
let array_MenuHrefs = [...all_MenuHref].filter((item) => {
    let href = item.getAttribute('href')
    return href !== "#" // 總共有5個
})

function navbarCollapse() {
    $('.navbar-collapse').collapse('hide');
    // $('.navbar-nav>li>a').on('click', function(){
    //     $('.navbar-collapse').collapse('hide');
    // });
}
// add nav item click event
// e.preventDefault()->ignore default scroll behavior, need to change react page?
array_MenuHrefs.forEach(function (element) {
    let href = element.getAttribute('href')
    switch (href) {
        case '#page-react':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                navbarCollapse();
                //proxyMainPageUI.isReactPage = true;
                //proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ProductListSearch;

                window.app.switchIndexPage(ENUM_switchIndexPage.ProductListSearch)
            });
            break;
        case '#history':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                navbarCollapse();
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.history
            });
            break;
        case '#news':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                navbarCollapse();
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.news
            });
            break;
        case '#qanda':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                navbarCollapse();
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.qanda
            });
            break;
        case '#contactus':
            element.addEventListener('click', (e) => {
                e.preventDefault()
                navbarCollapse();
                proxyMainPageUI.isReactPage = false;
                proxyMainPageUI.scrollToHrefId = ENUM_static_scroll_href_Id.contactus
            });
            break;
        default:
            break;
    }
});

//------------------- liLogin
liLogin.addEventListener('click', (e) => {
    e.preventDefault()
    proxyMainPageUI.cusModalLogin.showModal(true)
});
//------------------- aLogout
aLogout.addEventListener('click', (e) => {
    e.preventDefault()
    navbarCollapse();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.app.userData = null;
        //window.app.switchIndexPage(ENUM_switchIndexPage.ProductListSearch);
        //proxyMainPageUI.isReactPage = false;
    }).catch(function ( /**@type {any}*/ error) {
        // An error happened.
    });
})
//------------------- aMyOrder
aMyOrder.addEventListener('click', (e) => {
    e.preventDefault()
    navbarCollapse();
    //window.app.switchIndexPage(ENUM_switchIndexPage.ViewOrders);
    // proxyMainPageUI.isReactPage = true
    // proxyMainPageUI.reactSwitchPage = ENUM_reactSwitchPage.ViewOrders
    //window.app.pushUrl('/ViewOrders'); //ProductListSearch
});


//================ REDUX
var rootReducer = reducer; //already combine Reducers

const middlelogger = (/**@type {any}*/store) => (/**@type {any}*/next) => (/**@type {any}*/action) => {
    console.log("middlelogger dispatching", action);
    let result = next(action);
    console.log("middlelogger next state", store.getState());
    return result;
};

const middlewares = [];
console.log(process.env.NODE_ENV);
// 用process.env.NODE_ENV來判斷
if (process.env.NODE_ENV === "development") {
    // options設定執行時間
    //const logger = createLogger({ duration:true });
    middlewares.push(middlelogger);
    middlewares.push(ReduxLogger);
}
middlewares.push(thunk);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

window.app.store = store;

//======================================



let divRoot = document.querySelector('#root');
//divRoot.innerHTML = 'SDSDSD'
//console.log(React)
// STEP 1: createContext(<defaultValue>)
// const AppContext = React.createContext({
//     theme: 'light',
//     size: '2x',
// });
var ReactApp =
    <Provider store={store}>
        <App></App>
    </Provider>

ReactDOM.render(ReactApp, divRoot);

//-------------
$(function () {
    //pageStatic.hide();
    //pageReact.hide();
    proxyMainPageUI.isReactPage = false;

    //trigger - shop cart count = 0
    //let aa = countAllItems_Price()
    //window.app.setShopItemCount(0)

})
// $(document).ready(function () {
//     //pageStatic.hide();
//     //pageReact.hide();
//     proxyMainPageUI.isReactPage = false;
// })