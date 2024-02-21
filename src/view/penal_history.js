import React from 'react';
import { 
    Datagrid, 
    Responsive, 
    List, 
    TextField,
    DateField,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import PenalHistoryIcon from '@material-ui/icons/Warning';

const styles = {
    image: { maxHeight: '2rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const PenalHistoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} sort={{ field: 'ctime', order: 'DESC' }}>
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <TextField source="user_id" />
                    <TextField source="ip" />                    
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <TextField source="user_id" />
                    <TextField source="ip" />
                    <TextField source="phone_type" />
                </Datagrid>
            }
        />
    </List>
));


export default {
    list: PenalHistoryList,
    icon: PenalHistoryIcon,
};