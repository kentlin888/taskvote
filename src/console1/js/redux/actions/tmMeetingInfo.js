import {
    ADD_meetingInfo,
    DELETE_meetingInfo,
    UPDATE_meetingInfo,
    RELOAD_arrayMeetingInfo,
    SELECT_meetingInfo,
} from '../actionTypes/index.js'
import * as dataDefine from '../../dataDefine/index.js'

export function Reload_arrayMeetingInfo(arrayMeetingInfo) {
    return {
        type: RELOAD_arrayMeetingInfo,
        //productId: productId,
        arrayMeetingInfo: arrayMeetingInfo,
        //productInfo: productInfo
    };
}
export function load_arrayMeetingInfo_Async() {
    //let db_data = dataDefine.fakeProductInfo1;
    //return Refresh_productList(db_data)   this line is replaced to as below...
    return ( /**@type {any}*/ dispatch, /**@type {any}*/ getState) => {
        return window.firebaseMJS.getMeetingInfo()
            .then((rtnMeetingInfo_list) => {
                dispatch(Reload_arrayMeetingInfo(rtnMeetingInfo_list));
                return rtnMeetingInfo_list
            })
    };
}


export function Add_meetingInfo(meetingInfo) {
    return {
        type: ADD_meetingInfo,
        //productId: productId,
        meetingInfo: meetingInfo,
        //productInfo: productInfo
    };
}
export function Update_meetingInfo(meetingInfo) {
    return {
        type: UPDATE_meetingInfo,
        //productId: productId,
        meetingInfo: meetingInfo,
        //productInfo: productInfo
    };
}
export function Select_meetingInfo(meetingId) {
    return {
        type: SELECT_meetingInfo,
        //productId: productId,
        meetingId: meetingId,
        //productInfo: productInfo
    };
}


export function Delete_meetingInfo(meetingId) {
    return {
        type: DELETE_meetingInfo,
        //productId: productId,
        meetingId: meetingId,
        //productInfo: productInfo
    };
}


export function load_productListAsync() {

    let db_data = dataDefine.fakeProductInfo1;

    //return Refresh_productList(db_data)   this line is replaced to as below...
    return ( /**@type {any}*/ dispatch, /**@type {any}*/ getState) => {

        window.FirebaseMJS.getProductInfo()
            .then(( /**@type {any}*/ productList) => {
                //console.log('--- ',)
                dispatch(Refresh_productList(productList));
                //console.log(productList)
            })
        //dispatch(Refresh_productList(data2));

        //console.log('getState', getState())
        //dispatch(Refresh_productList(db_data));        
        // console.log(data2[0])
        // console.log(db_data)
    };
}
export function Refresh_productList(productList) {
    return {
        type: REFRESH_productList,
        //productId: productId,
        productList: productList,
        //productInfo: productInfo
    };
}