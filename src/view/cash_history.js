import React from 'react';
import { 
    Create, 
    DateField, 
    SelectField, 
    Datagrid, 
    TextField, 
    NumberField,     
    CloneButton,
    AutocompleteInput,
    Edit, 
    SimpleForm, 
    LongTextInput,
    Filter, 
    TabbedForm,
    FormTab,
    Toolbar, 
    Responsive, 
    ListButton, 
    SaveButton, 
    DeleteButton, 
    ReferenceInput, 
    SelectInput, 
    DateTimeInput,
    NumberInput, 
    translate, 
    SimpleFormIterator,
    ArrayInput,
    List,
    ReferenceField,
} from 'react-admin';

import Chip from '@material-ui/core/Chip';
import CashHistoryIcon from '@material-ui/icons/MoneyOff';
import { withStyles } from '@material-ui/core/styles';
import UserAvatarField from '../widget/UserAvatarField';
import rowStyle from './content/rowStyle';
import {states} from '../lib/common';

const CashHistoryTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.cash_history.name')} / {record.id}
    </span>
));

const CashHistoryFilter = props => (
    <Filter {...props}>
        <ReferenceInput 
            source="user_id" 
            reference="user" 
            label="resources.user.fields.name"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }} allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        {/*<DateInput source="ctime"/>*/}
        {/*<DateInput source="utime"/>*/}
        <SelectInput allowEmpty alwaysOn
            source="state" label = "resources.cash_history.fields.state"
            choices={states}
        />
    </Filter>
);

const styles = {
    image: { 
        maxHeight: '2rem' 
    },
    content: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    headerRow: {
        borderLeftColor: 'white',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
}

const CashTypeView = translate(({ record, translate }) => (
    <Chip
        label={record.type === 1?translate('resources.cash_history.type.in'):translate('resources.cash_history.type.out')}
        style={{backgroundColor:record.type === 1?'#4ba236':'#cc455f', color:'white'}}
    />
));

const CashHistoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <div>
        <List
            {...props}
            filterDefaultValues={{ state: 'pending' }}
            sort={{ field: 'id', order: 'DESC' }}
            perPage={25}
            filters={<CashHistoryFilter />}
        >
            <Responsive
                small={
                    <Datagrid {...props} rowClick="edit"  classes={{ rowEven: classes.rowEven }}>
                        <ReferenceField source="user_id" reference="user" linkType={false}> 
                            <TextField source='name' />
                        </ReferenceField>
                        <NumberField source="cash" />
                        <DateField source="ctime"/>
                    </Datagrid>
                }
                medium={
                    <Datagrid
                        {...props}
                        rowClick="edit"
                        rowStyle={rowStyle}
                        classes={{ headerRow: classes.headerRow, rowEven: classes.rowEven }}
                    >
                        <ReferenceField source="user_id" reference="user" linkType={true}>
                            <UserAvatarField />
                        </ReferenceField>
                        {/*<CashTypeView source="type"/>*/}
                        <NumberField source="cash" />
                        <NumberField source="money" />
                        <DateField source="ctime" />
                        <DateField source="utime" />
                        <SelectField source="state"  choices={states} />
                    </Datagrid>
                }
            />
        </List>
    </div>
))

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

const CashHistoryCreate = props => (
    <Create {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <ReferenceInput 
                source="user_id" 
                reference="user" 
                perPage={10}
                filter={{ role: { $ne: 'virtual' } }}
                label="resources.user.fields.name" >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <SelectInput source="type" choices={[
                { id: 1, name: 'resources.cash_history.type.in' },
                { id: 2, name: 'resources.cash_history.type.out' },
            ]} />
            <NumberInput source="cash" step={50} defaultValue={100} />
            <NumberInput source="money" step={50} defaultValue={100} />
            <SelectInput source="state" choices={states} />
            <DateTimeInput source="utime" defaultValue = {Date.now}/>
        </SimpleForm>
    </Create>
);

const CashHistoryEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<CashHistoryTitle />}  undoable={true} {...props}>
        <TabbedForm toolbar={<CustomToolbar />}>
            <FormTab label="resources.cash_history.state.content"  >
                <ReferenceInput 
                    source="user_id" 
                    reference="user" 
                    perPage={100}
                    filter={{ role: { $ne: 'virtual' } }}
                    label="resources.user.fields.name" >
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <SelectInput source="type" choices={[
                    { id: 1, name: 'resources.cash_history.type.in' },
                    { id: 2, name: 'resources.cash_history.type.out' },
                ]} />
                <NumberInput source="cash" step={50} defaultValue={100} />
                <NumberInput source="money" step={50}/>
                <DateTimeInput source="utime" defaultValue = {Date.now}/>
                <SelectInput source="state" choices={states} />
            </FormTab>
            <FormTab label="resources.cash_history.fields.messages">
                <ArrayInput source="messages" style={{ width: '50%' }}>
                    <SimpleFormIterator>
                        <LongTextInput source="msg" label="resources.cash_history.fields.messages"/>
                        <DateTimeInput source="ctime" label="resources.cash_history.fields.ctime" defaultValue = {Date.now}/>
                    </SimpleFormIterator>
                </ArrayInput>            
            </FormTab>
        </TabbedForm>
    </Edit>
))

export default {
    list: CashHistoryList,
    edit: CashHistoryEdit,
    create: CashHistoryCreate,
    icon: CashHistoryIcon,
    CashTypeView,
};