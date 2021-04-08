import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import PropTypes from 'prop-types'

export default class RatingStars extends Component {
    static propTypes = {
        taskId: PropTypes.string,
        starNumbers: PropTypes.number,
        updateTaskStars:PropTypes.func,
        // arrayProjectInfo: PropTypes.arrayOf(PropTypes.instanceOf(ProjectInfo)).isRequired,
        // // meetingCardId:PropTypes.string.isRequired,
        
    }
    constructor(props) {
        super(props)
        // this.state = {
        //     value: 2
        // }
    }
    render() {
        return (
            <Rating
                        name="simple-controlled"
                        value={this.props.starNumbers}
                        // defaultValue={2.5}
                        // precision={0.5}
                        size="large"
                        // onChange={(event,newValue) => {
                        //     event.stopPropagation()
                        //     console.log("LOG: ~ file: RatingStars.jsx ~ line 69 ~ RatingStars ~ render ~ event", event)
                        //     let {taskId,updateTaskStars} = this.props
                        //     updateTaskStars(taskId,newValue)
                        // }}
                        onClick={(e,e2) => {
                            // console.log('e----->',e)
                            // console.log('E2====>,',e.target.value)
                            let {taskId,updateTaskStars} = this.props
                            if(e.target.value)
                                updateTaskStars(taskId,e.target.value)
                        }}
                        // onRateChange={(event,newValue) => {
                        //     let {taskId,updateTaskStars} = this.props
                        //     updateTaskStars(taskId,newValue)
                        // }}
                        // onChange={(event, newValue) => {
                        //     //setValue(newValue);
                        //     this.setState((state, props) => { return { value: newValue } })

                        // }}
                    />
        )
    }
}

// export default function SimpleRating() {
//     const [value, setValue] = React.useState(2);

//     return (
//         <div className="bd11">
//             <Box component="fieldset" borderColor="transparent">
//                 <Typography component="legend">困難度 {value}</Typography>
//                 <Rating
//                     name="simple-controlled"
//                     value={value}

//                     size="large"
//                     onChange={(event, newValue) => {
                        
//                         setValue(newValue);
//                     }}
//                 />
//             </Box>

//         </div>
//     );
// }
