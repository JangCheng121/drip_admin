import RoomIcon from '@material-ui/icons/Input';

import React from 'react';
import { 
    Create, 
    Datagrid, 
    TextField, 
    NumberField, 
    ImageField, 
    BooleanField, 
    ReferenceField, 
    DateField,
    CloneButton, 
    translate, 
    Edit, 
    SimpleForm, 
    DisabledInput, 
    Filter, 
    Toolbar, 
    Responsive, 
    ListButton, 
    SaveButton, 
    DeleteButton, 
    ReferenceInput, 
    SelectInput, 
    BooleanInput, 
    NumberInput, 
    TextInput, 
    List 
} from 'react-admin';
import { 
    // required, 
    // number, 
    maxLength, 
    minValue 
} from './validate';
import { withStyles } from '@material-ui/core/styles';

const RoomTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.room.name')} / {record.id}
    </span>
));

const RoomFilter = (props) => (
    <Filter {...props}>
        <TextInput label="resources.room.filter.money" source="money" alwaysOn />
        <ReferenceInput label="resources.game.name" source="game_id" reference="game" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);


const validatePassword = [maxLength(15)];
const validateMoney = [minValue(0)];

const styles = {
    image: { 
        maxHeight: '2rem' 
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
}

export const RoomList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} filters={<RoomFilter />}>
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="game_id" reference="game">
                        <ImageField classes={{ image: classes.image }} source="thumb"/>
                    </ReferenceField>
                    <NumberField source="money" />
                    <NumberField source="cnt" />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <TextField source="id" />
                    <ReferenceField source="game_id" reference="game" label="resources.game.fields.name">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField source="game_id" reference="game" label="resources.game.fields.thumb">
                        <ImageField classes={{ image: classes.image }} source="thumb"/>
                    </ReferenceField>
                    <BooleanField source="block"/>
                    <NumberField source="money" />
                    <TextField source="password" />
                    <NumberField source="cnt" />
                    <DateField source="ctime" />
                </Datagrid>
            }
        />
    </List>
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

export const RoomEdit = props => (
    <Edit title={<RoomTitle />} {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <DisabledInput source="id" />
            <ReferenceInput 
                source="game_id" 
                reference="game" 
                sort={{ field: 'name', order: 'ASC' }}   
                label="resources.game.fields.name"
            >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="block"/>
            <NumberInput source="money" step={50}/>
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);

const RoomCreate = props => (
    <Create title=" " {...props}>
        <SimpleForm>
            <ReferenceInput source="game_id" reference="game" label="resources.game.fields.name" >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="block" defaultValue={true}/>
            <NumberInput source="money"  defaultValue={200} validate={validateMoney}/>
            <TextInput source="password"  validate={validatePassword}/>
        </SimpleForm>
    </Create>
);

export default {
    list: RoomList,
    edit: RoomEdit,
    create: RoomCreate,
    icon: RoomIcon,
};