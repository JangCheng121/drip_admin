import RobotIcon from '@material-ui/icons/Android';

import React from 'react';
import { 
    Create, 
    Datagrid, 
    Edit, 
    SimpleForm, 
    Filter, 
    Responsive, 
    List, 
    // SimpleList ,
    TextField, 
    NumberField, 
    ImageField, 
    DateField, 
    FunctionField,
    SelectField,
    DisabledInput, 
    RadioButtonGroupInput, 
    SelectInput, 
    translate, 
    TextInput, 
    DateInput
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

const RobotTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.robot.name')} / {record.name}
    </span>
));

const RobotFilter = (props) => (
    <Filter {...props}>
        <TextInput label="resources.user.filter.name" source="name" alwaysOn />
    </Filter>
);

const styles = {
    name: { 
        padding: '0 12px 0 25px' 
    },
    image: { 
        maxHeight: '2rem' 
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
};

const RobotList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} filters={<RobotFilter />} sort={{ field: 'name', order: 'ASC' }}>
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ImageField classes={classes} source="picture"/>
                    <TextField source="name" />
                    <SelectField source="country" choices={[
                        { id: 'CHN', name: <i class="flag-icon flag-icon-cn"/> },
                        { id: 'RUS', name: <i class="flag-icon flag-icon-ru"/> },
                        { id: 'KOR', name: <i class="flag-icon flag-icon-ko"/> },
                        { id: 'JPN', name: <i class="flag-icon flag-icon-jp"/> },
                    ]} />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <ImageField classes={classes} source="picture"/>
                    <TextField source="name" />
                    <FunctionField source="sex" render={record =>  record.sex?  <i className="fa fa-mars fa-lg"/>:<i className="fa fa-venus fa-lg"/>} />
                    <DateField source="birthday" />
                    <SelectField source="country" choices={[
                        { id: 'CHN', name: <i class="flag-icon flag-icon-cn"/> },
                        { id: 'RUS', name: <i class="flag-icon flag-icon-ru"/> },
                        { id: 'KOR', name: <i class="flag-icon flag-icon-ko"/> },
                        { id: 'JPN', name: <i class="flag-icon flag-icon-jp"/> },
                    ]} />
                    <DateField source="ctime" />
                </Datagrid>
            }
        />
    </List>
));

const RobotEdit = props => (
    <Edit title={<RobotTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="picture"/>
            <RadioButtonGroupInput source="sex" choices={[
                { id: '1', name: 'resources.user.sex.male' },
                { id: '0', name: 'resources.user.sex.female' },
            ]} />
            <DateInput source="birthday" defaultValue={new Date()}/>
            <SelectInput source="country" choices={[
                { id: 'CHN', name: 'resources.user.country.CHN' },
                { id: 'KOR', name: 'resources.user.country.KOR' },
                { id: 'RUS', name: 'resources.user.country.RUS' },
                { id: 'JPN', name: 'resources.user.country.JPN' },
            ]} />     
        </SimpleForm>
    </Edit>
);

const RobotCreate = props => (
    <Create {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <TextInput source="picture"/>
            <RadioButtonGroupInput source="sex" choices={[
                { id: '1', name: 'resources.user.sex.male' },
                { id: '0', name: 'resources.user.sex.female' },
            ]} />
            <DateInput source="birthday" defaultValue={new Date()}/>
            <SelectInput source="country" choices={[
                { id: 'CHN', name: 'resources.user.country.CHN' },
                { id: 'KOR', name: 'resources.user.country.KOR' },
                { id: 'RUS', name: 'resources.user.country.RUS' },
                { id: 'JPN', name: 'resources.user.country.JPN' },
            ]} />     
        </SimpleForm>
    </Create>
);

export default {
    list: RobotList,
    edit: RobotEdit,
    create: RobotCreate,
    icon: RobotIcon,
};