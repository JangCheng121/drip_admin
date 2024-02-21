import React  from 'react';
import { 
    Create, 
    Datagrid, 
    translate, 
    Edit,
    SimpleForm,
    Pagination,
    Responsive,
    SelectInput,
    List, 
    NumberField,
    SelectField,
    ImageField,
    DisabledInput,
    NumberInput,
    TextInput,
    Toolbar,
    SaveButton,
    CloneButton,
    ListButton,
    DeleteButton,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import { required, number, minValue } from './validate';

import CashSetIcon from '@material-ui/icons/CollectionsBookmark';

const validatePositiveNumber = [required(), number(), minValue(0)];

const CashSetTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.cash_set.name')} / {record.name}
    </span>
));


const styles = {
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
    image: { maxHeight: '2rem' }
}

const CashSetPagination = props => <Pagination rowsPerPageOptions={[100,50,25]} {...props} />

export const CashSetList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'ASC' }}
        pagination={<CashSetPagination />}
    >
        <Responsive
            small={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <SelectField source="type" choices={[
                        { id: 1, name: 'resources.cash_history.type.in' },
                        { id: 2, name: 'resources.cash_history.type.out' },
                    ]} />
                    <NumberField source="cash" />
                    <NumberField source="money" />
                </Datagrid>
            }
            medium={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <ImageField classes={classes} source="img"/>
                    <SelectField source="type" choices={[
                        { id: 1, name: 'resources.cash_history.type.in' },
                        { id: 2, name: 'resources.cash_history.type.out' },
                    ]} />

                    <NumberField source="cash" />
                    <NumberField source="money" />
                    {/* <NumberField source="append" /> */}
                </Datagrid>
            }
        />
    </List>
));

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};
const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <CloneButton />
        <ListButton />
        <DeleteButton undoable={true} />
    </Toolbar>
));

export const CashSetEdit = props => (
    <Edit title={<CashSetTitle />} {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <DisabledInput source="id" />
            <TextInput source="img"/>
            <SelectInput source="type" choices={[
                { id: 1, name: 'resources.cash_history.type.in' },
                { id: 2, name: 'resources.cash_history.type.out' },
            ]} />
            <NumberInput source="cash" validate={validatePositiveNumber} />
            {/* <NumberInput source="append" validate={validatePositiveNumber}/> */}
        </SimpleForm>
    </Edit>
);

export const CashSetCreate = props => (
    <Create {...props}>
        <SimpleForm >
            <TextInput source="img"/>
            <SelectInput source="type" choices={[
                { id: 1, name: 'resources.cash_history.type.in' },
                { id: 2, name: 'resources.cash_history.type.out' },
            ]} />
            <NumberInput source="cash" validate={validatePositiveNumber}/>
            {/*<NumberInput source="money" validate={validatePositiveNumber}/>*/}
            {/* <NumberInput source="append" validate={validatePositiveNumber}/> */}
        </SimpleForm>
    </Create>
);

export default {
    list: CashSetList,
    edit: CashSetEdit,
    create: CashSetCreate,
    icon: CashSetIcon,
};