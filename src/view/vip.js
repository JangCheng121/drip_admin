import VipIcon from '@material-ui/icons/Face';


import React from 'react';
import { 
    Create, 
    Datagrid, 
    TextField, 
    Edit, 
    TextInput,
    SimpleForm, 
    translate,
    Responsive, 
    NumberField, 
    List, 
    NumberInput,
    SimpleList 
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { 
    // required, 
    number, 
    minValue 
} from './validate';

const validatePositiveNumber = [number(), minValue(0)];

const VipTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.vip.fields.level')} / {record.level}
    </span>
));

const styles = {
    image: { maxHeight: '2rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

export const VipList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} sort={{ field: 'level', order: 'ASC' }}>
        <Responsive
            small={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="level" />
                    <TextField source="name" />
                    <NumberField source="money" />
                    <NumberField source="discount" />
                </Datagrid>
            }
            medium={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <NumberField source="level" />
                    <TextField source="name" />
                    <NumberField source="money" />
                    <NumberField source="discount" />
                    <NumberField source="take_cash_cnt" />
                    <NumberField source="free_room_cnt" />
                </Datagrid>
            }
        />
    </List>
));

export const VipEdit = props => (
    <Edit title={<VipTitle />} {...props}>
        <SimpleForm>
            <NumberInput source="level" validate={validatePositiveNumber}/>
            <TextInput source="name"/>
            <NumberInput source="money" validate={validatePositiveNumber}/>
            <NumberInput source="discount" validate={validatePositiveNumber}/>
            <NumberInput source="take_cash_cnt" validate={validatePositiveNumber}/>
            <NumberInput source="free_room_cnt" validate={validatePositiveNumber}/>
        </SimpleForm>
    </Edit>
);

export const VipCreate = props => (
    <Create {...props}>
        <SimpleForm >
            <NumberInput source="level" validate={validatePositiveNumber}/>
            <TextInput source="name"/>
            <NumberInput source="money" validate={validatePositiveNumber}/>
            <NumberInput source="discount" validate={validatePositiveNumber}/>
            <NumberInput source="take_cash_cnt" validate={validatePositiveNumber}/>
            <NumberInput source="free_room_cnt" validate={validatePositiveNumber}/>
        </SimpleForm>
    </Create>
);



export default {
    list: VipList,
    edit: VipEdit,
    create: VipCreate,
    icon: VipIcon,
};