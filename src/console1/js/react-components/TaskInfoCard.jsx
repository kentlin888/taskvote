import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TaskInfo, TaskEvaluation, ENUM_AssignTaskType, ProjectInfo, ENUM_MeetingCardStatus } from '../dataDefine/index.js'
import SliderDayHours from './SliderDayHours.jsx'
import RatingStars from './RatingStars.jsx'
import Rating from 'react-rating'
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { intersectionMergeObj } from '../lib/dataKits.js'
import {ENUM_taskCardSectionPanel, ENUM_showAcceptionIcon, 
    ENUM_evaluationStage, ENUM_taskProcessLifeCycle} from '../dataDefine/index.js'
// let ENUM_taskCardSectionPanel = {
//     taskInfoPanel: "taskInfoPanel",
//     taskEvaluationPanel: "taskEvaluationPanel",
//     taskAcceptionPanel: "taskAcceptionPanel",
// }
// let ENUM_showAcceptionIcon = {
//     showHand: "showHand",
//     showCalendar: "showCalendar",
//     showAll: "showAll",
//     hideAll: "hideAll",
// }
// let ENUM_evaluationStage = {
//     neverVote: "neverVote",
//     voted: "voted",
//     evaluteClose: "evaluteClose",
//     evaluteReOpen: "evaluteReOpen",
//     DemoAll: "DemoAll",
// }
// let ENUM_taskProcessLifeCycle = {
//     taskEditing: "taskEditing",
//     taskEvaluting: "taskEvaluting",
//     closeEvaluting: "closeEvaluting",
//     startAcceptTask: "startAcceptTask",
//     DemoAll: "DemoAll",
// }

//var Rating = require('react-rating');
const MUCheckbox = withStyles({
    root: {
        color: 'yellow',
        height: 2,
        padding: '15px 0',
    },
    checked: {
        color: 'yellow',
        height: 2,
        padding: '15px 0',
    },
    colorPrimary: {
        color: 'yellow',
    },
    colorSecondary: {
        color: 'yellow',
    }


})(Checkbox);

export default class TaskInfoCard extends PureComponent {
    static propTypes = {
        taskinfo: PropTypes.instanceOf(TaskInfo).isRequired,
        // arrayProjectInfo: PropTypes.arrayOf(PropTypes.instanceOf(ProjectInfo)).isRequired,
        // // meetingCardId:PropTypes.string.isRequired,
        saveTaskInfo: PropTypes.func,
        //updateTaskStars: PropTypes.func,
        // selectMeetingInfo: PropTypes.func,

    }
    constructor(props) {
        super(props) //taskinfo
        let { taskinfo } = props
        this.state = {
            // stars:new RatingStars(),
            projectId: taskinfo.projectId,
            meetingId: taskinfo.meetingId,
            taskId: taskinfo.taskId,
            taskTitle: taskinfo.taskTitle,
            taskDesc: taskinfo.taskDesc,
            targetWorkingHours: taskinfo.targetWorkingHours,
            docId: taskinfo.docId,
            starNumbers: taskinfo.starNumbers,
            evalWorkingHours: taskinfo.evalWorkingHours,
            isDoneBefore: taskinfo.isDoneBefore,

            isForFront: taskinfo.isForFront,
            isForBack: taskinfo.isForBack,
            isForAll: taskinfo.isForAll,
            //-----Assign
            assignUserId: taskinfo.assignUserId, // not assigned
            assignUserEmail: taskinfo.assignUserEmail, //not assigned
            assignType: taskinfo.assignType,   //ENUM_AssignTaskType.volunteer //ENUM_AssignTaskType
            assignStarNumber: taskinfo.assignStarNumber,

            //-----taskCardStatus
            enumTaskCardSectionPanel: taskinfo.enumTaskCardSectionPanel,
            enumShowAcceptionIcon: taskinfo.enumShowAcceptionIcon,
            enumEvaluationStage: taskinfo.enumEvaluationStage,
            enumTaskProcessLifeCycle: taskinfo.enumTaskProcessLifeCycle,

            //other details
            isShowPanel_taskInfo: taskinfo.isShowPanel_taskInfo,
            isShowPanel_taskEvaluation: taskinfo.isShowPanel_taskEvaluation,
            isShowPanel_taskAcception: taskinfo.isShowPanel_taskAcception,
            isShowIcon_acceptHand: taskinfo.isShowIcon_acceptHand,
            isShowIcon_acceptCalendar: taskinfo.isShowIcon_acceptCalendar,
            isSavedEvaluation: taskinfo.isSavedEvaluation,
            isBtnEvaluationDisabled: taskinfo.isBtnEvaluationDisabled,
        }

    }

    changeUI_ByCheckState() {
        //taskCardSection
        // There are 3 panels in 3 color (ENUM_taskCardSectionPanel)
        // panel attribute = data-enum-taskcard-section-panel
        // orange  taskInfoPanel
        // cyan taskEvaluationPanel
        // #b312c2 taskAcceptionPanel
        switch (this.state.enumTaskProcessLifeCycle) {
            //taskEditing  //only orange taskInfoPanel - forever
            case ENUM_taskProcessLifeCycle.taskEditing:
                this.setState({
                    isShowPanel_taskInfo: true,
                    isShowPanel_taskEvaluation: false,
                    isShowPanel_taskAcception: false
                })
                break;
            //taskEvaluting// show cyan taskEvaluationPanel
            case ENUM_taskProcessLifeCycle.taskEvaluting:
                this.setState({
                    isShowPanel_taskInfo: true,
                    isShowPanel_taskEvaluation: true,
                    isShowPanel_taskAcception: false
                })
                break;
            //closeEvaluting //hide cyan taskEvaluationPanel
            case ENUM_taskProcessLifeCycle.closeEvaluting:
                this.setState({
                    isShowPanel_taskInfo: true,
                    isShowPanel_taskEvaluation: false,
                    isShowPanel_taskAcception: false
                })
                break;
            //startAcceptTask //show #b312c2 taskAcceptionPanel
            case ENUM_taskProcessLifeCycle.startAcceptTask:
                this.setState({
                    isShowPanel_taskInfo: true,
                    isShowPanel_taskEvaluation: false,
                    isShowPanel_taskAcception: true
                })
                break;
            //DemoAll  // show all panels
            case ENUM_taskProcessLifeCycle.DemoAll:
                this.setState({
                    isShowPanel_taskInfo: true,
                    isShowPanel_taskEvaluation: true,
                    isShowPanel_taskAcception: true
                })
                break;
            default:
                break;
        }

        //=========== taskAcceptionPanel #b312c2 icon show time 
        // showHand showCalendar showAll hideAll
        //只顯示手手 只顯示日曆勾勾 兩者都顯示 ENUM_showAcceptionIcon
        //------assignTaskStatus_ToMe  
        switch (this.state.enumShowAcceptionIcon) {//notyetStart hideAll
            case ENUM_showAcceptionIcon.notyetStart:
                this.setState({
                    isShowIcon_acceptHand: false,
                    isShowIcon_acceptCalendar: false
                })
                break;
            case ENUM_showAcceptionIcon.startAccept://startAccept showHand
                this.setState({
                    isShowIcon_acceptHand: true,
                    isShowIcon_acceptCalendar: false
                })
                break;
            case ENUM_showAcceptionIcon.assigned://assigned showCalendar
                this.setState({
                    isShowIcon_acceptHand: false,
                    isShowIcon_acceptCalendar: true
                })
                break;
            case ENUM_showAcceptionIcon.notMyBusiness://notMyBusiness hideAll
                this.setState({
                    isShowIcon_acceptHand: false,
                    isShowIcon_acceptCalendar: false
                })
                break;
            case ENUM_showAcceptionIcon.DemoAll://DemoAll showAll
                this.setState({
                    isShowIcon_acceptHand: true,
                    isShowIcon_acceptCalendar: true
                })
                break;
            default:
                break;
        }

        //------EvaluationStage_ToMe  cyan saveEvalButton ENUM_evaluationStage
        switch (this.state.enumEvaluationStage) {
            case ENUM_evaluationStage.neverVote://neverVote readyToSave cyan color
                this.setState({
                    isSavedEvaluation: false,//button cyan color
                    isBtnEvaluationDisabled: false//enable btn
                })
                break;
            case ENUM_evaluationStage.voted://voted stillCanSave gray color
                this.setState({
                    isSavedEvaluation: true,//button gray color
                    isBtnEvaluationDisabled: false//enable btn
                })
                break;
            case ENUM_evaluationStage.evaluteClose://evaluteClose disableSave hidden color(button)
                this.setState({
                    isSavedEvaluation: true,//button gray color
                    isBtnEvaluationDisabled: true//disable btn
                })
                break;
            case ENUM_evaluationStage.evaluteReOpen://evaluteReOpen stillCanSave gray color
                this.setState({
                    isSavedEvaluation: true,//button gray color
                    isBtnEvaluationDisabled: false//enable btn
                })
                break;
            case ENUM_evaluationStage.DemoAll://DemoAll//是否可存檔 readyToSave cyan color
                this.setState({
                    isSavedEvaluation: false,//button cyan color
                    isBtnEvaluationDisabled: false//enable btn
                })
                break;
            default:
                break;
        }
    }
    componentDidMount(){
        this.changeUI_ByCheckState();
    }
    componentDidUpdate(prevProps, prevState) {
        this.changeUI_ByCheckState();
    }
    
    updateEvalWorkingHours = (value) => {
        this.setState((state, props) => { return { evalWorkingHours: value } })
    }
    handleInputChange = (e) => {
        //let meetingInfo = this.props.taskinfo
        let propName = e.target.getAttribute('data-bindstate')
        this.setState((state, props) => { return { [propName]: e.target.value } })
    }
    saveTaskInfo = () => {
        let newTaskInfo = new TaskInfo()//this.props.taskinfo
        newTaskInfo = Object.assign(newTaskInfo, this.state)
        //console.log("LOG: ~ file: TaskInfoCard.jsx ~ line 59 ~ TaskInfoCard ~ newTaskInfo", newTaskInfo)
        this.props.saveTaskInfo(newTaskInfo)
    }
    acceptTask = () => {
        let acceptDetailInfo = {
            taskId: this.state.taskId,
            //-----Assign
            assignUserId: window.app.userData.uid,
            assignUserEmail: window.app.userData.email,
            assignType: ENUM_AssignTaskType.volunteer, //ENUM_AssignTaskType
            assignStarNumber: this.state,
        }
        this.props.saveTaskInfo(acceptDetailInfo)//newTaskInfo) + alert

    }
    saveTaskEvaluation = () => {
        let taskEvaluation = new TaskEvaluation()
        taskEvaluation.userEmail = window.app.userData.email
        taskEvaluation.userId = window.app.userData.uid
        taskEvaluation = intersectionMergeObj(taskEvaluation, this.state, window._)
        //console.log('userData------>',window.app.userData)
        //window.Swal.fire(window.app.userData)
        window.Swal.fire(JSON.stringify(taskEvaluation, null, 4))
    }

    render() {
        let {
            projectId,
            meetingId,
            taskId,
            taskTitle,
            taskDesc,
            targetWorkingHours,
            docId,

            isShowPanel_taskInfo,
            isShowPanel_taskEvaluation,
            isShowPanel_taskAcception,
            isShowIcon_acceptHand,
            isShowIcon_acceptCalendar,
            isSavedEvaluation,
            isBtnEvaluationDisabled,
        } = this.state
        
        console.log('starNumbers-------->', this.props.taskinfo.starNumbers)
        return (
            <div className="taskInfoCard mx-3 my-3 bd5">
                {this.state.enumTaskProcessLifeCycle}
                {/* ======test panel====== */}
                {/* <div>
                    <button onClick={() => { this.setState({ isShowPanel_taskInfo: !isShowPanel_taskInfo }) }}>
                        show panel taskInfo</button>
                    <button onClick={() => { this.setState({ isShowPanel_taskEvaluation: !isShowPanel_taskEvaluation }) }}>
                        show panel eval</button>
                    <button onClick={() => { this.setState({ isShowPanel_taskAcception: !isShowPanel_taskAcception }) }}>
                        show panel accept</button>
                </div>
                <div>
                    <button onClick={() => { this.setState({ isShowIcon_acceptHand: !isShowIcon_acceptHand }) }}>
                        show icon hand</button>
                    <button onClick={() => { this.setState({ isShowIcon_acceptCalendar: !isShowIcon_acceptCalendar }) }}>
                        show icon calandar</button>
                </div>
                <div>
                    <button onClick={() => { this.setState({ isSavedEvaluation: !isSavedEvaluation }) }}>
                        saved Eval</button>
                    <button onClick={() => { this.setState({ isBtnEvaluationDisabled: !isBtnEvaluationDisabled }) }}>
                        disable btn Eval</button>
                </div> */}
                {/* =========== TASK MANAGEMENT Panel============= */}
                <div data-enum-taskcard-section-panel={ENUM_taskCardSectionPanel.taskInfoPanel}>
                    <div>
                        <div>{projectId}</div>
                        <div>{meetingId}</div>
                        <div>{docId}</div>
                    </div>
                    <div>
                        <label>Task ID</label>
                        <input data-bindstate='taskId' value={taskId} onChange={this.handleInputChange.bind(this)}></input>
                    </div>
                    <div>
                        <label>Task Title</label>
                        <input data-bindstate='taskTitle' value={taskTitle} onChange={this.handleInputChange.bind(this)}></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea data-bindstate='taskDesc' value={taskDesc} onChange={this.handleInputChange.bind(this)}></textarea>
                    </div>
                    <div className="targetHours">
                        <label>目標工時</label>
                        <input data-bindstate='targetWorkingHours' value={targetWorkingHours} onChange={this.handleInputChange.bind(this)}></input>
                    </div>
                    {/* =========== Task屬性 前端/後端/所有============== */}
                    <div className="bd16">
                        <span className="mx-3">
                            <span>前端RD</span>
                            <MUCheckbox
                                // color="yellow"
                                checked={this.state.isForFront}
                                //color="secondary"
                                size="medium"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={(e, value) => {
                                    this.setState((state, props) => { return { isForFront: value } })
                                }}
                            />
                        </span>
                        <span className="mx-3">
                            <span>後端RD</span>
                            <MUCheckbox
                                // color="yellow"
                                checked={this.state.isForBack}
                                //color="secondary"
                                size="medium"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={(e, value) => {
                                    this.setState((state, props) => { return { isForBack: value } })
                                }}
                            />
                        </span>
                        <span className="mx-3">
                            <span>所有人</span>
                            <MUCheckbox
                                // color="yellow"
                                checked={this.state.isForAll}
                                //color="secondary"
                                size="medium"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={(e, value) => {
                                    this.setState((state, props) => { return { isForAll: value } })
                                }}
                            />
                        </span>
                    </div>
                    <div>
                        <div>
                            <i className="fas fa-save mx-2 my-1" onClick={this.saveTaskInfo}></i>
                            <i className="fas fa-trash-alt mx-2 my-1"></i>
                        </div>
                        {/* =========== TASK Acception Panel============= */}
                        <div data-enum-taskcard-section-panel={ENUM_taskCardSectionPanel.taskAcceptionPanel}
                            className={(isShowPanel_taskAcception ? '' : 'd-none')}>
                            {/* hand icon */}
                            <i className={((isShowIcon_acceptHand) ? '' : 'd-none') + " fas fa-hand-point-up mx-2 my-1"}
                                onClick={this.acceptTask}></i>
                            {/* calendar icon */}
                            <i className={((isShowIcon_acceptCalendar) ? '' : 'd-none') + " fas fa-calendar-check mx-2 my-1"}></i>
                        </div>

                    </div>
                </div>
                {/* ========== Evaluation Panel ============== */}
                <div data-enum-taskcard-section-panel={ENUM_taskCardSectionPanel.taskEvaluationPanel}
                    className={(isShowPanel_taskEvaluation ? '' : 'd-none') + ' bd7'}>
                    <div className="my-3">
                        <SliderDayHours updateEvalWorkingHours={this.updateEvalWorkingHours}
                            evalWorkingHours={this.props.taskinfo.evalWorkingHours}
                        ></SliderDayHours>
                    </div>
                    <div className="my-3">
                        <span className="ml-3">困難程度</span>
                        <Rating fullSymbol="fas fa-star fa-2x colorRed"
                            emptySymbol="far fa-star fa-2x colorRed"
                            initialRating={this.props.taskinfo.starNumbers}
                            onChange={(value) => {
                                this.setState((state, props) => { return { starNumbers: value } })
                            }}
                        ></Rating>
                    </div>

                    <div>
                        <span className="ml-3">以前有無做過類似功能?</span>
                        <span className="ml-2">
                            <MUCheckbox
                                // color="yellow"
                                checked={this.state.isDoneBefore}
                                //color="secondary"
                                size="medium"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onChange={(e, value) => {
                                    this.setState((state, props) => { return { isDoneBefore: value } })
                                }}
                            />
                        </span>
                    </div>
                    <div>
                        <i className={ `fas fa-save mx-2 my-1 ${((isSavedEvaluation===true)?' iconGray':' iconLightBlue')} ${((isBtnEvaluationDisabled)?' d-none':'')}` }
                            onClick={this.saveTaskEvaluation}></i>
                    </div>
                </div>
            </div>
        )
    }
}
