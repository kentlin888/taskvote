import React, { PureComponent } from 'react'
import {TaskInfo} from '../dataDefine/index.js'
import {getPlainObject} from '../lib/dataKits.js'
export default class TaskManagement extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            taskId:'',
            taskTitle:'',
            taskDesc:''
        }
    }
    handleInputChange = (e) => {
        // event.target 是當前的 DOM elment
        // 從 event.target.value 取得 user 剛輸入的值
        // 將 user 輸入的值更新回 state
        let propName = e.target.getAttribute('data-bindstate')
        let newKeyValue = {[propName]:e.target.value}
        this.setState(newKeyValue);
    }
    addTaskInfo = ()=>{
        let newTaskInfo = new TaskInfo()
        newTaskInfo.taskId = this.state.taskId
        newTaskInfo.taskTitle = this.state.taskTitle
        newTaskInfo.taskDesc = this.state.taskDesc
        newTaskInfo.fill_fstsCreateDateTime_server();
        newTaskInfo = getPlainObject(newTaskInfo)
        
        
        window.firebaseMJS.addTaskInfo(newTaskInfo)
    }
    render() {
        return (
            <div>
                <div>
                    <label>Task ID</label>
                    <input data-bindstate='taskId' onChange={this.handleInputChange.bind(this)}></input>
                </div>
                <div>
                    <label>Task Title</label>
                    <input data-bindstate='taskTitle' onChange={this.handleInputChange.bind(this)}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea data-bindstate='taskDesc' onChange={this.handleInputChange.bind(this)}></textarea>
                </div>
                <button onClick={this.addTaskInfo}>ADD Task</button>
                {/* <div>{this.state.taskId}</div>
                <div>{this.state.taskTitle}</div>
                <div>{this.state.taskDesc}</div> */}
            </div>
        )
    }
}
