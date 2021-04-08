import React, { PureComponent } from 'react'
import TaskInfoCard from './TaskInfoCard.jsx'
import {TaskInfo} from '../dataDefine/index'

let taskinfo = new TaskInfo();

export default class TaskEvaluation extends PureComponent {
    render() {
        return (
            <div>
                <TaskInfoCard taskinfo={taskinfo}></TaskInfoCard>
            </div>
        )
    }
}
