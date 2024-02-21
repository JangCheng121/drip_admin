import React from 'react';
import {
    Create,
    BooleanInput,
    SaveButton,
    Toolbar,
    SimpleForm,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {
    stock: { width: '5em' },
    good: { width: '5em' },
    name: { width: '5em' },
    width: { width: '5em' },
    widthFormGroup: { display: 'inline-block' },
    height: { width: '5em' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};
const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};
const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
));

const SettingCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <BooleanInput source="alarm_public" defaultValue={false} />
            <BooleanInput source="alarm_review" defaultValue={false} />
            <BooleanInput source="alarm_cash_in" defaultValue={false} />
            <BooleanInput source="alarm_cash_out" defaultValue={false} />
        </SimpleForm>
    </Create>
);

export default withStyles(styles)(SettingCreate);