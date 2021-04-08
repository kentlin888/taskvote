import {
    ADD_meetingInfo,
    DELETE_meetingInfo,
    UPDATE_meetingInfo,
    RELOAD_arrayMeetingInfo,
    SELECT_meetingInfo,
} from '../actionTypes'
import * as dataDefine from '../../dataDefine/index.js'

//productList:
const initState = [] //meetingInfo

// Reducer
export default function reducer(state = initState, action = {}) {
    let newState = [] //[...state]//Object.assign({}, state);
    switch (action.type) {
        case ADD_meetingInfo:

            newState = window._.cloneDeep(state)
            newState = [action.meetingInfo, ...newState]
            //newState = [...state,action.meetingInfo]
            //newState.push(action.productList)//dataDefine.fakeProductInfo1
            return newState;
        case DELETE_meetingInfo:

            newState = window._.cloneDeep(state)
            let findIndex = newState.findIndex((item) => {
                if (item.meetingId === action.meetingId) {
                    return item
                }
            })

            if (findIndex >= 0) {
                newState.splice(findIndex, 1);
            }
            return newState;
        case UPDATE_meetingInfo:
            newState = window._.cloneDeep(state)
            let findIndex2 = -1
            let findMeeting = newState.find((item, index) => {
                if (item.meetingId === action.meetingInfo.meetingId) {
                    findIndex2 = index
                }
            })
            if (findIndex2 > -1) {
                newState[findIndex2] = null //action.meetingInfo
                newState[findIndex2] = action.meetingInfo
            }
            return newState;
        case SELECT_meetingInfo:
            newState = window._.cloneDeep(state)
            newState = newState.map((item) => {
                if (item.isSelected === true)
                    item.isSelected = false
                if (item.meetingId === action.meetingId)
                    item.isSelected = true
                return item
            })
            return newState
        case RELOAD_arrayMeetingInfo:
            newState = action.arrayMeetingInfo
            newState.forEach(item => {
                item.enumMeetingCardStatus = dataDefine.ENUM_MeetingCardStatus.onlyView;
            });
            if(newState.length>0)
                newState[0].isSelected = true
            return newState
        // do reducer stuff
        default:
            return state;
    }
}

// Action Creators


// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
//     return (dispatch) =>
//         get("/widget").then((widget) => dispatch(updateWidget(widget)));
// }