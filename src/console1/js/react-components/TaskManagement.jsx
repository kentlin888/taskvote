import React, { PureComponent, Component } from 'react'
import MeetingAdd from './MeetingAdd.jsx'
import MeetingInfoCard from './MeetingInfoCard.jsx'
import TaskInfoCard from './TaskInfoCard.jsx'
import { MeetingInfo, TaskInfo } from '../dataDefine/index.js'
import { getPlainObject } from '../lib/dataKits.js'
// import update from 'react-addons-update'
// import Immutable from 'immutable'
//import _ from 'lodash'
import fakeProject from '../../../../adminData/fakeProject.js'
import RatingStars from './RatingStars.jsx'
//=========REDUX
import { connect } from "react-redux";
import { countAllItems_Price } from '../redux/reducers/shopCart.js'
import { load_productListAsync as load_productListAsync_act } from '../redux/actions/productList.js'
import { load_arrayMeetingInfo_Async } from '../redux/actions/tmMeetingInfo.js'
import { Add_meetingInfo, Update_meetingInfo, Delete_meetingInfo, Select_meetingInfo } from '../redux/actions/tmMeetingInfo.js'
import { getRandomString, getDateTimeFormat } from '../lib/dataKits.js'

class TaskManagement extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            arrayMeetingInfo: [],
            arrayMeetingInfoCard: [],
            arrayTaskInfo: [],
            arrayProjectInfo: fakeProject,
            selectProjectId: '',
            selectMeetingId: '',
            idxMeetingInfoCard: 0,
            arrayPreserveMeetingInfo: [],
        }

    }
    reloadMeetingInfo = (e) => {
        let self = this
        this.props.load_arrayMeetingInfo_Async()
            .then(() => {
                let selectMeetingInfo = this.props.arrayMeetingInfo.find((item) => {
                    if (item.isSelected === true)
                        return item
                })
                if (selectMeetingInfo)
                    self.reloadArrayTaskInfo(selectMeetingInfo.meetingId);
                //console.log('-----22--------', selectMeetingInfo.meetingId)
            })

        // window.firebaseMJS.getMeetingInfo()

        //     .then((rtnMeetingInfo_list) => {
        //         console.log('-----rtnMeetingInfo_list--->', rtnMeetingInfo_list)
        //         this.setState({ arrayMeetingInfo: rtnMeetingInfo_list })
        //         // let docData = docSnapShot.data()
        //         // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
        //     })

    }

    addMeetingCard = (e) => {
        let meetingInfo = new MeetingInfo();
        meetingInfo.clearData();
        let today = new Date()
        let sDate = getDateTimeFormat(1, today)
        meetingInfo.meetingId = `${sDate}-${getRandomString(3)}`

        this.props.addMeetingInfo(meetingInfo)
    }
    saveTaskInfo = (taskInfo, saveType = 2) => {
        //----saveType
        // 1=first save
        // 2=update

        let newTaskInfo = taskInfo//this.props.taskinfo

        newTaskInfo.fill_fstsCreateDateTime_server();
        newTaskInfo = getPlainObject(newTaskInfo)
        let self = this
        return window.firebaseMJS.addTaskInfo(newTaskInfo)
            .then((fsTaskInfo) => {
                switch (saveType) {
                    case 1:

                        break;
                    case 2:
                        window.Swal.fire({
                            title: '成功',
                            text: `資料已儲存`,
                            icon: 'success',
                        })
                        break;

                    default:
                        break;
                }
                return fsTaskInfo
            })
            .catch((err) => {
                window.Swal.fire({
                    title: '失敗',
                    text: err,
                    icon: 'error',
                })
            })
    }
    addTask = (e) => {
        let findSelectMeetingInfo = this.props.arrayMeetingInfo.find((item) => {
            if (item.isSelected === true)
                return item
        })

        if (findSelectMeetingInfo) {
            let taskInfo = new TaskInfo();
            taskInfo.projectId = findSelectMeetingInfo.projectId
            taskInfo.meetingId = findSelectMeetingInfo.meetingId
            taskInfo.taskId = getRandomString(5);
            taskInfo.taskTitle=""
            taskInfo.taskDesc=""
            //let arrayTask = [taskInfo, ...this.state.arrayTaskInfo];
            //let arrayTask = [taskInfo]
            // let arrayTask = [...this.state.arrayTaskInfo]
            //arrayTask.push(...this.state.arrayTaskInfo)
            let arrayTask = [...this.state.arrayTaskInfo, taskInfo];
            // console.table(arrayTask)
            this.saveTaskInfo(taskInfo, 1)//first save
                .then((fsTaskInfo) => {
                    taskInfo = Object.assign(taskInfo, fsTaskInfo)
                    return taskInfo
                })
                .then((task2) => {
                    //arrayTask.splice(1, 0, taskInfo);
                    this.setState({ arrayTaskInfo: arrayTask })
                })


        }
        else {
            window.Swal.fire({
                title: '提示',
                text: "請先選擇一個Meeting",
                icon: 'warning',
            })
        }
    }
    reloadArrayTaskInfo(meetingId) {
        this.state.arrayTaskInfo = []
        firebaseMJS.getArrayTaskInfo(meetingId)
            .then((rtnArrayTaskInfo) => {
                //console.log('-----rtnArrayTaskInfo--->', rtnArrayTaskInfo)
                this.setState({ arrayTaskInfo: rtnArrayTaskInfo })
                // let docData = docSnapShot.data()
                // console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })
    }
    preserveMeetingInfo = (meetingInfo) => {
        let idxFind = this.state.arrayPreserveMeetingInfo.findIndex((item) => {
            if (item.meetingId === meetingInfo.meetingId)
                return item
        })
        if (idxFind >= 0)
            this.state.arrayPreserveMeetingInfo.splice(idxFind, 1)//delete element
        //push new meetingInfo
        this.state.arrayPreserveMeetingInfo.push(meetingInfo)
    }
    getPreserveMeetingInfo = (meetingId) => {
        let find = this.state.arrayPreserveMeetingInfo.find((item) => {
            if (item.meetingId === meetingId)
                return item
        })
        console.log("LOG: ~ file: TaskManagement.jsx ~ line 85 ~ TaskManagement ~ find ~ find", find)

        return find
    }
    selectMeetingInfo = (meetingId) => {
        this.props.selectMeetingInfo(meetingId)
        this.reloadArrayTaskInfo(meetingId)
    }
    handleChangeSelectProject = (e) => {
        this.setState({ selectProjectId: e.target.value })
    }
    handleChangeSelectMeeting = (e) => {
        //function findParentElement
        let findParentElement_clickedDivMeeting = e.target.closest('[data-meetingid]')
        if (findParentElement_clickedDivMeeting) {
            let meetingId = findParentElement_clickedDivMeeting.getAttribute('data-meetingid')
            console.log("LOG: ~ file: TaskManagement.jsx ~ line 80 ~ TaskManagement ~ meetingId", meetingId)

            // let idx = this.state.arrayMeetingInfoCard.findIndex((item) => {
            //     clg
            //     return item['data-meetinginfo'].meetingId === meetingId
            // })
            // console.log(idx)
            // const newData = update(myData, {
            //     x: { y: { z: { $set: 7 } } },
            //     a: { b: { $push: [9] } }
            // });
            //const addOrRemove = (arr, item) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];
        }

        //console.log(e.target.parentElement)
    }
    deleteTaskCard = (taskId) => {
        console.log(this.state.arrayTaskInfo);
        let idxFindTask = this.state.arrayTaskInfo.findIndex((item, index) => {
            console.log('taskid-->', item.taskId)
            if (item.taskId === taskId)
                return item
        })
        if (idxFindTask >= 0) {
            let newArray = window._.cloneDeep(this.state.arrayTaskInfo)
            newArray.splice(idxFindTask, 1)
            this.setState((state, props) => { return { arrayTaskInfo: [] } }, () => {
                this.setState((state, props) => { return { arrayTaskInfo: newArray } }, () => {
                    console.log(this.state.arrayTaskInfo);
                })
            })



        }
    }
    do_deleteTaskCard = () => {
        this.deleteTaskCard('yu7eq')
    }
    // updateTaskStars = (taskId, starNumbers) => {
    //     let idxFindTask = this.state.arrayTaskInfo.findIndex((item,index) => {
    //         console.log('taskid-->', item.taskId)
    //         if(item.taskId === taskId)
    //             return item
    //     })
    //     if(idxFindTask>=0){
    //         let newArray = window._.cloneDeep(this.state.arrayTaskInfo)
    //         newArray[idxFindTask].starNumbers = starNumbers
    //         this.setState((state, props) => { return { arrayTaskInfo:newArray }})

    //     }
    // }
    // exec_updateTaskStars = () => {
    //     this.updateTaskStars('yu7eq',4)
    //     setTimeout(() => {
    //         this.updateTaskStars('bynbj',1)
    //     }, 1000);
    //     //this.updateTaskStars('bynbj',1)
    // }
    render() {
        let { arrayMeetingInfoCard, arrayTaskInfo, arrayProjectInfo } = this.state
        let { arrayMeetingInfo } = this.props
        // console.table(arrayTaskInfo)
        // let datalistProjects = arrayProjectInfo.map((item) => {
        //     return {
        //         label:item.projectTitle,
        //         value:item.projectId,
        //     }
        // })
        //console.table(arrayMeetingInfo)
        return (
            <div className='subContentBox bd11'>
                <div className='leftMenu bd12'>

                    <div>Meeting</div>
                    {/* <RatingStars starNumbers={3}></RatingStars> */}
                    {/* <div>
                        <label >Project ID</label>
                        <input type="text" list="projectIds" onChange={this.handleChangeSelectProject} /><br />
                        <datalist id="projectIds">
                            {arrayProjectInfo.map((item, index) => {
                                return <option key={index} label={item.projectTitle} value={item.projectId}></option>
                            })}
                        </datalist>
                    </div> */}
                    <button onClick={this.addMeetingCard}>Add Meeting</button>
                    <button onClick={this.reloadMeetingInfo}>Reload</button>
                    <button onClick={this.do_deleteTaskCard}>Delete Task</button>

                    {/* <button onClick={this.exec_updateTaskStars}>Update Star</button> */}
                    <div>
                        {arrayMeetingInfo.map((item, index) => {
                            return <MeetingInfoCard key={index} data-meetinginfo={item}
                                arrayTaskInfo={arrayTaskInfo}
                                arrayProjectInfo={this.state.arrayProjectInfo}
                                updateMeetingInfo={this.props.updateMeetingInfo}
                                deleteMeetingInfo={this.props.deleteMeetingInfo}
                                selectMeetingInfo={this.selectMeetingInfo}
                                preserveMeetingInfo={this.preserveMeetingInfo}
                                getPreserveMeetingInfo={this.getPreserveMeetingInfo}
                                isSelected={false} ></MeetingInfoCard>
                        })}

                    </div>
                </div>
                <div className='centerBox bd13'>
                    <div>Tasks</div>
                    <div>
                        <button onClick={this.addTask}>Add Task</button>
                    </div>
                    <div className="taskCardContainer">
                        {arrayTaskInfo.map((/**@type {any}*/item, /**@type {Number}*/index) => (
                            <TaskInfoCard key={index} data-taskinfo={item}
                                taskinfo={item}
                                // updateTaskStars={this.updateTaskStars}
                                saveTaskInfo={this.saveTaskInfo}
                            ></TaskInfoCard>
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (/**@type {any}*/state) => {
    let { sumPrice, totalItemCount } = countAllItems_Price(state.shopCart.shopItemList)
    //console.log('state-> ',state)
    return {
        arrayMeetingInfo: state.tmMeetingInfo,
        // App_redux: state.App_redux,
        // productList: state.productList,
        // AllItems_Price: sumPrice,//countAllItems_Price(state.shopCart.shopItemList),
        // totalItemCount: totalItemCount,
    };
};

const mapDispatchToProps = (/**@type {any}*/dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return {
        dispatch: dispatch,
        addMeetingInfo: (meetingInfo) => {

            dispatch(Add_meetingInfo(meetingInfo))
        },
        updateMeetingInfo: (meetingInfo) => {
            dispatch(Update_meetingInfo(meetingInfo))
        },
        selectMeetingInfo: (meetingId) => {
            dispatch(Select_meetingInfo(meetingId))
        },
        deleteMeetingInfo: (meetingId) => {
            dispatch(Delete_meetingInfo(meetingId))
        },
        load_arrayMeetingInfo_Async: () => {
            return dispatch(load_arrayMeetingInfo_Async())
        },
        act_loadProducts: () => {
            dispatch(load_productListAsync_act())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskManagement);