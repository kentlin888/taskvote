import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import {
    MeetingInfo, ProjectInfo, TaskInfo, ENUM_MeetingCardStatus,
    ENUM_taskCardSectionPanel, ENUM_showAcceptionIcon,
    ENUM_evaluationStage, ENUM_taskProcessLifeCycle
} from '../dataDefine/index.js'
import { getPlainObject } from '../lib/dataKits.js'


export default class MeetingInfoCard extends PureComponent {
    static propTypes = {
        arrayTaskInfo: PropTypes.arrayOf(PropTypes.instanceOf(TaskInfo)).isRequired,
        arrayProjectInfo: PropTypes.arrayOf(PropTypes.instanceOf(ProjectInfo)).isRequired,
        // meetingCardId:PropTypes.string.isRequired,
        updateMeetingInfo: PropTypes.func,
        deleteMeetingInfo: PropTypes.func,
        selectMeetingInfo: PropTypes.func,
        preserveMeetingInfo: PropTypes.func,
        getPreserveMeetingInfo: PropTypes.func,
        isSelected: PropTypes.bool.isRequired,
        // projectId:PropTypes.string.isRequired,
        ['data-meetinginfo']: PropTypes.instanceOf(MeetingInfo).isRequired,
        //dispatch: PropTypes.any.isRequired
        // userData:PropTypes.instanceOf(OrderInfo),
        // orderAddress:PropTypes.string,
        // totalPrice:PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            //selectProjectId: "",
            projectReadOnly: false,
            meetingTitleReadOnly: false,
            meetingDescReadOnly: false,
        }

    }

    // constructor(props) {
    //     super(props)
    //     //console.log('1111->',props['data-meetinginfo'].meetingId)
    //     let meetingInfo = props['data-meetinginfo'];
    //     //this.state = {}
    //     this.state = {
    //         projectId: meetingInfo.projectId,
    //         meetingId: meetingInfo.meetingId,
    //         meetingTitle: meetingInfo.meetingTitle,
    //         meetingDesc: meetingInfo.meetingDesc,

    //         meetingInfo: meetingInfo,
    //         // meetingTitle:'',
    //         // meetingDesc:'',
    //         //isSelected:props.isSelected,
    //     }
    //     //console.log('----',meetingInfo.meetingId)
    //     //this.setState({meetingId:meetingInfo.meetingId})
    // }

    componentDidMount() {
        this.controlReadOnly();
        // let meetingInfo = this.props['data-meetinginfo']
        // console.log('componentDidMount-->', meetingInfo.meetingId)
        // this.setState({meetingId:props.meetingId})
        // console.log("LOG: ~ file: MeetingInfoCard.jsx ~ line 32 ~ MeetingInfoCard ~ componentDidMount ~ props", props)

        // let meetingInfo = this.props['data-meetinginfo']
        // console.log("LOG: ~ file: MeetingInfoCard.jsx ~ line 23 ~ MeetingInfoCard ~ componentDidMount ~ props", meetingInfo.meetingId)


        // let props2 = this.props['data-meetinginfo']
        // this.setState({meetingId:props2.meetingId})
        // console.log('mount----', props2.meetingId)
    }
    // componentDidUpdate(previousProps, previousState) {

    //     if (previousProps['data-meetinginfo'] !== this.props['data-meetinginfo']) {
    //         let props2 = this.props['data-meetinginfo']
    //         this.setState({ meetingId: props2.meetingId })
    //         console.log('update----', props2.meetingId)
    //     }

    // }

    handleInputChange = (e) => {
        let meetingInfo = this.props['data-meetinginfo'];
        meetingInfo = window._.cloneDeep(meetingInfo);
        // event.target 是當前的 DOM elment
        // 從 event.target.value 取得 user 剛輸入的值
        // 將 user 輸入的值更新回 state
        let propName = e.target.getAttribute('data-bindstate')
        //let newKeyValue = { [propName]: e.target.value }
        meetingInfo[propName] = e.target.value
        //meetingInfo = Object.assign(meetingInfo, ...newKeyValue)
        // meetingInfo.meetingTitle = this.state.meetingTitle
        // meetingInfo.meetingDesc = this.state.meetingDesc
        console.log('state------ss--->', e.target.value)
        this.props.updateMeetingInfo(meetingInfo)
        // this.state.meetingInfo[propName] = e.target.value

        // this.props.updateMeetingInfo(this.state.meetingInfo)
        // this.setState(newKeyValue, () => {

        //     meetingInfo.meetingTitle = this.state.meetingTitle
        //     meetingInfo.meetingDesc = this.state.meetingDesc
        //     console.log('state------ss--->',this.state)
        //     this.props.updateMeetingInfo(meetingInfo)
        // });

    }
    clickCard = (e) => {
        let meetingInfo = this.props['data-meetinginfo'];
        this.props.selectMeetingInfo(meetingInfo.meetingId)
        // meetingInfo = window._.cloneDeep(meetingInfo);
        // meetingInfo.enumMeetingCardStatus = ENUM_MeetingCardStatus.initial
        // this.props.updateMeetingInfo(meetingInfo)

        //console.log(this.props['data-meetinginfo'])
    }
    // test=(e) => {
    //     let props = this.props['data-meetinginfo']
    //     this.setState({meetingId:props.meetingId})
    // }
    saveMeetingInfo = () => {
        e.preventDefault()
        e.stopPropagation();
        let newMeetingInfo = this.props['data-meetinginfo']
        let inputProjectId = newMeetingInfo.projectId
        //Project ID
        let idx = this.props.arrayProjectInfo.findIndex((item) => {
            if (item.projectId === inputProjectId)
                return item
        })
        if (idx < 0) {
            window.Swal.fire({
                title: '提示',
                text: "請輸入正確的Project ID",
                icon: 'warning',
            })
            return;
        }
        //Meeting Title
        let inputMeetingTitle = newMeetingInfo.meetingTitle;
        if (inputMeetingTitle.trim() == "") {
            window.Swal.fire({
                title: '提示',
                text: "請填寫Meeting Title",
                icon: 'warning',
            })
            return;
        }


        newMeetingInfo.fill_fstsCreateDateTime_server();
        newMeetingInfo = getPlainObject(newMeetingInfo)
        let self = this
        window.firebaseMJS.addMeetingInfo(newMeetingInfo)
            .then(() => {
                window.Swal.fire({
                    title: '成功',
                    text: `資料已儲存`,
                    icon: 'success',
                })
                self.changeMeetingCardStatus(ENUM_MeetingCardStatus.onlyView)
            })
            .catch((err) => {
                window.Swal.fire({
                    title: '失敗',
                    text: err,
                    icon: 'error',
                })
            })
    }

    change1 = (e) => {
        let meetingInfo = this.props['data-meetinginfo'];
        meetingInfo = window._.cloneDeep(meetingInfo);
        meetingInfo.enumMeetingCardStatus = ENUM_MeetingCardStatus.initial
        this.props.updateMeetingInfo(meetingInfo)



    }
    changeMeetingCardStatus = (enumMeetingCardStatus) => {
        let meetingInfo = this.props['data-meetinginfo'];
        meetingInfo = window._.cloneDeep(meetingInfo);
        meetingInfo.enumMeetingCardStatus = enumMeetingCardStatus
        this.props.updateMeetingInfo(meetingInfo)
    }
    change1 = (e) => {
        this.changeMeetingCardStatus(ENUM_MeetingCardStatus.initial)
    }
    change2 = (e) => {
        this.changeMeetingCardStatus(ENUM_MeetingCardStatus.onlyView)
    }
    change3 = (e) => {
        this.changeMeetingCardStatus(ENUM_MeetingCardStatus.editLockIds)
    }

    openEdit = () => {
        e.preventDefault()
        e.stopPropagation();
        let meetingInfo = this.props['data-meetinginfo'];
        this.props.preserveMeetingInfo(meetingInfo)//preserve meetingInfo
        this.changeMeetingCardStatus(ENUM_MeetingCardStatus.editLockIds)
    }
    undoCard = () => {
        e.preventDefault()
        e.stopPropagation();
        let meetingInfo = this.props['data-meetinginfo'];
        console.log("LOG: ~ file: MeetingInfoCard.jsx ~ line 184 ~ MeetingInfoCard ~ meetingInfo", meetingInfo)
        switch (meetingInfo.enumMeetingCardStatus) {
            case ENUM_MeetingCardStatus.editLockIds:
                //editLockIds ->  undo -> data recovery -> onlyView
                let beforeMeetingInfo = this.props.getPreserveMeetingInfo(meetingInfo.meetingId)
                this.props.updateMeetingInfo(beforeMeetingInfo)//data recovery
                this.changeMeetingCardStatus(ENUM_MeetingCardStatus.onlyView)
                break;
            case ENUM_MeetingCardStatus.initial:
                //initial -> undo -> remove card
                this.props.deleteMeetingInfo(meetingInfo.meetingId)
                break;
            default:
                break;
        }
    }
    deleteCard = () => {
        //onlyView -> delete

        //remove card
    }
    controlReadOnly = () => {
        let meetingInfo = this.props['data-meetinginfo'];
        let { enumMeetingCardStatus } = meetingInfo;
        switch (enumMeetingCardStatus) {
            case ENUM_MeetingCardStatus.initial:
                //meetingid readonly  1 3 4顯示
                this.setState((state, props) => {
                    return {
                        projectReadOnly: false,
                        meetingTitleReadOnly: false,
                        meetingDescReadOnly: false,
                    }
                })
                break;
            case ENUM_MeetingCardStatus.editLockIds:
                //2 id readonly 1 3 4顯示    
                this.setState((state, props) => {
                    return {
                        projectReadOnly: true,
                        meetingTitleReadOnly: false,
                        meetingDescReadOnly: false,
                    }
                })
                break;
            case ENUM_MeetingCardStatus.onlyView:
                //全都readonly 2 4顯示    
                this.setState((state, props) => {
                    return {
                        projectReadOnly: true,
                        meetingTitleReadOnly: true,
                        meetingDescReadOnly: true,
                    }
                })
                break;
            default:
                break;
        }
    }
    saveMeetingLifecycle = () => {
        e.preventDefault()
        e.stopPropagation();
        let meetingInfo = this.props['data-meetinginfo'];
        let { arrayTaskInfo } = this.props;
        let arrayUpdateTaskInfo = arrayTaskInfo.map((taskInfo) => {
            return {
                docId: taskInfo.docId,
                enumTaskProcessLifeCycle: meetingInfo.enumTaskProcessLifeCycle
            }
        })
        window.firebaseMJS.updateMeetingInfo(meetingInfo.docId, { enumTaskProcessLifeCycle: meetingInfo.enumTaskProcessLifeCycle })
            .then(() => {
                return window.firebaseMJS.batchUpdateTaskInfo(arrayUpdateTaskInfo)
            })
            .then(() => {
                window.Swal.fire({
                    title: '成功',
                    text: `資料已儲存`,
                    icon: 'success',
                })
                //self.changeMeetingCardStatus(ENUM_MeetingCardStatus.onlyView)
            })
            .catch((err) => {
                window.Swal.fire({
                    title: '失敗',
                    text: err,
                    icon: 'error',
                })
            })

    }
    componentDidUpdate(prevProps, prevState) {
        this.controlReadOnly();
    }
    stopPropagation = (e) => {
        e.preventDefault()
        e.stopPropagation();
    }
    render() {
        //let meetingInfo = this.props['data-meetinginfo']//this.state//.meetingId
        //console.log(this.state.projectId)

        let meetingInfo = this.props['data-meetinginfo'];
        let { enumMeetingCardStatus } = meetingInfo;

        let sClass_IconSave1 = ''
        let sClass_IconEdit2 = ''
        let sClass_IconUndo3 = ''
        let sClass_IconTrashCan4 = ''
        switch (enumMeetingCardStatus) {
            case ENUM_MeetingCardStatus.initial:
                //meetingid readonly  1 3 4顯示
                //this.setState((state, props) => { return { projectReadOnly:false }})
                sClass_IconEdit2 = ' d-none'
                break;
            case ENUM_MeetingCardStatus.editLockIds:
                //this.setState((state, props) => { return { projectReadOnly:true }})
                //2 id readonly 1 3 4顯示
                sClass_IconEdit2 = ' d-none'
                break;
            case ENUM_MeetingCardStatus.onlyView:
                //this.setState((state, props) => { return { projectReadOnly:true }})
                //全都readonly 2 4顯示
                sClass_IconSave1 = ' d-none'
                sClass_IconUndo3 = ' d-none'
                break;
            default:
                break;
        }

        return (
            <div className={`meetingCard bd9 my-4 mx-1 ${meetingInfo.isSelected ? 'selected' : ''}`} 
            data-meetingid={meetingInfo.meetingId} 
            onClick={this.clickCard}>
                {/* <div>
                    <button onClick={this.change1}>CH 1</button>
                    <button onClick={this.change2}>CH 2</button>
                    <button onClick={this.change3}>CH 3</button>
                    <div>{meetingInfo.enumMeetingCardStatus}</div>
                </div> */}
                <div>
                    <label >Project ID</label>
                    <input type="text" list="projectIds" defaultValue={meetingInfo.projectId}
                        data-bindstate='projectId'
                        onChange={this.handleInputChange.bind(this)}
                        onClick={this.stopPropagation}
                        readOnly={this.state.projectReadOnly}
                    /><br />
                    <datalist id="projectIds">
                        {this.props.arrayProjectInfo.map((item, index) => {
                            return <option key={index} label={item.projectTitle} value={item.projectId}></option>
                        })}
                    </datalist>
                    {/* <label >{meetingInfo.projectId}</label> */}
                </div>
                <div>{meetingInfo.docId}</div>
                <div>
                    <label>Meeting ID</label>
                    <input data-bindstate='meetingId' value={meetingInfo.meetingId}
                        onChange={this.handleInputChange.bind(this)} 
                        onClick={this.stopPropagation}
                        readOnly></input>
                </div>
                <div>
                    <label>Meeting Title</label>
                    <input data-bindstate='meetingTitle' value={meetingInfo.meetingTitle}
                        onChange={this.handleInputChange.bind(this)}
                        onClick={this.stopPropagation}
                        readOnly={this.state.meetingTitleReadOnly}
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea data-bindstate='meetingDesc' value={meetingInfo.meetingDesc}
                        onChange={this.handleInputChange.bind(this)}
                        onClick={this.stopPropagation}
                        readOnly={this.state.meetingDescReadOnly}
                    ></textarea>
                </div>
                <div>
                    <label >Meeting Lifecycle</label>
                    <select data-bindstate='enumTaskProcessLifeCycle'
                        value={meetingInfo.enumTaskProcessLifeCycle}
                        onChange={this.handleInputChange.bind(this)}
                        onClick={this.stopPropagation}
                    >
                        <option key={0} label='taskEditing' value={ENUM_taskProcessLifeCycle.taskEditing} />
                        <option key={1} label='taskEvaluting' value={ENUM_taskProcessLifeCycle.taskEvaluting} />
                        <option key={2} label='closeEvaluting' value={ENUM_taskProcessLifeCycle.closeEvaluting} />
                        <option key={3} label='startAcceptTask' value={ENUM_taskProcessLifeCycle.startAcceptTask} />
                        <option key={4} label='DemoAll' value={ENUM_taskProcessLifeCycle.DemoAll} />
                    </select>
                    <i className="fas fa-arrow-circle-right" onClick={this.saveMeetingLifecycle}></i>

                    {/* <label >{meetingInfo.projectId}</label> */}
                </div>
                <div>
                    <i className={`fas fa-save mx-2 my-1 ${sClass_IconSave1}`} onClick={this.saveMeetingInfo}></i>
                    <i className={`fas fa-edit mx-2 my-1 ${sClass_IconEdit2}`} onClick={this.openEdit}></i>
                    <i className={`fas fa-undo mx-2 my-1 ${sClass_IconUndo3}`} onClick={this.undoCard}></i>
                    <i className={`fas fa-trash-alt mx-2 my-1 ${sClass_IconTrashCan4}`}></i>
                </div>
            </div>
        )
    }
}
