import FirebaseMJS from '../firebase/FirebaseMJS.js'
import {
    OrderInfo,
    ShopItemInfo,
    TaskInfo
} from '../dataDefine/index.js'
import * as dataKits from '../lib/dataKits.js'
let firebaseConfig = require('../../config/firebaseProj.config.json')
let chai = require('chai')
let firebase = require('firebase/app');
require('firebase/firestore')


// let adminKeyJsonPath = '../../../adminKeys/ming2-dad1d-firebase-adminsdk-5wmli-9c686eda26.json';
// let adminKeyJson = require(adminKeyJsonPath)


describe('FirebaseMJS.spec.js', () => {
    
    it('FirebaseMJS.getMeetingInfo()',() => {
        firebase.initializeApp(firebaseConfig);
        // let taskInfo = new TaskInfo();
        // console.log(taskInfo)
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        return firebaseMJS.getMeetingInfo()
            // .then((newTask) => {
            //     return newOrder.newDocRef.get()
            // })
            .then((rtnMeetingInfo_list) => {
                console.log('-----rtnMeetingInfo_list--->', rtnMeetingInfo_list)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })
    it('FirebaseMJS.getArrayTaskInfo()',() => {
        firebase.initializeApp(firebaseConfig);
        // let taskInfo = new TaskInfo();
        // console.log(taskInfo)
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        return firebaseMJS.getArrayTaskInfo("wwww-wwwww")
            .then((rtnArrayTaskInfo) => {
                console.log('-----rtnArrayTaskInfo--->', rtnArrayTaskInfo)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })

    it('FirebaseMJS.addTaskInfo()',() => {
        let taskInfo = new TaskInfo();
        console.log(taskInfo)
        firebase.initializeApp(firebaseConfig);
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        return firebaseMJS.addTaskInfo(taskInfo)
            // .then((newTask) => {
            //     return newOrder.newDocRef.get()
            // })
            .then((fsTaskInfo) => {
                console.log('-----docSnapShot--->', fsTaskInfo)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })

    it('FirebaseMJS.batchUpdateTaskInfo()',() => {
        firebase.initializeApp(firebaseConfig);
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        let taskDocId1 = 'mY9peek4sNJTsUZYWFRJ'
        let arrayObj = [{docId:taskDocId1,isForAll:true}]
        //let taskDocId2 = 'mY9peek4sNJTsUZYWFRJ'
        return firebaseMJS.batchUpdateTaskInfo(arrayObj)
            // .then((newTask) => {
            //     return newOrder.newDocRef.get()
            // })
            .then((isSuccess) => {
                console.log('-----isSuccess--->', isSuccess)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })

    it('FirebaseMJS.deleteTaskInfo()',() => {
        firebase.initializeApp(firebaseConfig);
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        let docId = 'Eglp5o19o0Kp3GwHuwDu'
        return firebaseMJS.deleteTaskInfo(docId)
            // .then((newTask) => {
            //     return newOrder.newDocRef.get()
            // })
            .then((isSuccess) => {
                console.log('-----isSuccess--->', isSuccess)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })

    it('FirebaseMJS.deleteMeetingInfo()',() => {
        firebase.initializeApp(firebaseConfig);
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        let docId = 'iQQ8Xi5jK14mbcm5Af8A'
        return firebaseMJS.deleteMeetingInfo(docId)
            // .then((newTask) => {
            //     return newOrder.newDocRef.get()
            // })
            .then((isSuccess) => {
                console.log('-----isSuccess--->', isSuccess)
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    })

    
    
    
    it('getGroupedArray_ByTimes()', () => {
        //firebase.initializeApp(firebaseConfig);
        let TargetArray = [13,14,16,17,25,26,31,36,44,45,47,52,73,74]
        let newArray = FirebaseMJS.getGroupedArray_ByTimes(TargetArray, 4)
        let expect1 = [ 13, 14, 16, 17 ]
        let expect2 = [ 25, 26, 31, 36 ]
        let expect3 = [ 44, 45, 47, 52 ]
        let expect4 = [ 73, 74 ]

        let _ = require('lodash')

        
        chai.assert(_.isEqual(newArray[0] , expect1))
        chai.assert(_.isEqual(newArray[1] , expect2))
        chai.assert(_.isEqual(newArray[2] , expect3))
        chai.assert(_.isEqual(newArray[3] , expect4))
        
        console.log(newArray)
    })
})

