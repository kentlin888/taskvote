import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
    },
    // margin: {
    //     height: theme.spacing(3),
    // },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

let marks = []
for (let i = 0; i < 11; i++) {
    marks.push({
        value: i * 8,
        label: `${i}天`,
    })
}

const IOSSlider = withStyles({
    root: {
        color: 'yellow',
        height: 2,
        padding: '15px 0',
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -14,
        marginLeft: -14,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: 'white',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 0.5,
        backgroundColor: 'currentColor',
        // color:'#FFFFFF',
    },
    markLabel: {
        color: '#FFFFFF',
    }

})(Slider);

const getDisplayDayHours = (allHours) => {
    let hours = allHours % 8
    let days = Math.floor(allHours / 8)
    return `${days}天 ${hours}小時`
}
function CustomizedSlider(props) {
    let updateEvalWorkingHours = props.updateEvalWorkingHours
    let evalWorkingHours = props.evalWorkingHours
    if(!props.evalWorkingHours)
        evalWorkingHours=0

    const classes = useStyles();
    const [value, setValue] = React.useState(40);
    //setValue(evalWorkingHours)
    useEffect(() => {
        if(evalWorkingHours)
            setValue(evalWorkingHours)
        // return () => {
        //     cleanup
        // }
    }, [])
    return (
        <div className="bd13">
            <div className={classes.root}>
                <Typography gutterBottom>預估工時 - {getDisplayDayHours(value)}</Typography>
                <IOSSlider aria-label="預估工時"
                    defaultValue={evalWorkingHours}
                    max={80}
                    marks={marks}
                    valueLabelDisplay="off"
                    // valueLabelFormat={(value,index) => {
                    //     let hours = value%8
                    //     let days = value/8
                    //     return `${days}d ${hours}hr` 
                    // }}
                    onChange={(event, newValue) => {
                        updateEvalWorkingHours(newValue)
                        setValue(newValue);
                    }}
                />
                <div className={classes.margin} />

            </div>
        </div>

    );
}
CustomizedSlider.propTypes = {
    // children: PropTypes.element.isRequired,
    // open: PropTypes.bool.isRequired,
    // value: PropTypes.number.isRequired,
    updateEvalWorkingHours: PropTypes.func,
};
export default CustomizedSlider;