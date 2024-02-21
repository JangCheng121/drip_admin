import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

const rowStyle = (record, index, defaultStyle = {}) => {
    if (record.state === 'accepted' || record.state === 'accept' || record.state === true)
        return {
            ...defaultStyle,
            borderLeftColor: green[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.state === 'done')
        return {
            ...defaultStyle,
            borderLeftColor: green[400],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.state === 'pending')
        return {
            ...defaultStyle,
            borderLeftColor: orange[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.state === 'rejected' || record.state === 'delete' || record.state === false)
        return {
            ...defaultStyle,
            borderLeftColor: red[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    return defaultStyle;
};

export default rowStyle;