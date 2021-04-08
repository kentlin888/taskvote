import React, { PureComponent } from 'react'
import {MeetingInfo} from '../dataDefine/index.js'
import {getPlainObject} from '../lib/dataKits.js'
export default class MeetingAdd extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            meetingId:'',
            meetingTitle:'',
            meetingDesc:''
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
    addMeetingInfo = ()=>{
        let newMeetingInfo = new MeetingInfo()
        newMeetingInfo.meetingId = this.state.meetingId
        newMeetingInfo.meetingTitle = this.state.meetingTitle
        newMeetingInfo.meetingDesc = this.state.meetingDesc
        newMeetingInfo.fill_fstsCreateDateTime_server();
        newMeetingInfo = getPlainObject(newMeetingInfo)
        
        
        window.firebaseMJS.addMeetingInfo(newMeetingInfo)
    }
    render() {
        return (
            <div>
                <div>
                    <label>Meeting ID</label>
                    <input data-bindstate='meetingId' onChange={this.handleInputChange.bind(this)}></input>
                </div>
                <div>
                    <label>Meeting Title</label>
                    <input data-bindstate='meetingTitle' onChange={this.handleInputChange.bind(this)}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea data-bindstate='meetingDesc' onChange={this.handleInputChange.bind(this)}></textarea>
                </div>
                <button onClick={this.addMeetingInfo}>ADD Meeting</button>
                {/* <div>{this.state.taskId}</div>
                <div>{this.state.taskTitle}</div>
                <div>{this.state.taskDesc}</div> */}
            </div>
        )
    }
}
