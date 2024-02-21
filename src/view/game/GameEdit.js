import React from 'react';
import {
    translate,
    NumberInput,
    Create,
    Edit,
    BooleanInput,
    SimpleForm,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

import { 
    // ColorField, 
    ColorInput 
} from 'react-admin-color-input';

import { 
    required, 
    // maxLength, 
    number, 
    minValue 
} from '../validate';

const GameTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.game.name')} / {record.name}
    </span>
));
const validatePositiveNumber = [required(), number(), minValue(0)];
const styles = {
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
};

export const GameEdit = withStyles(styles)(({ classes, ...props }) => (
    <Edit title={<GameTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="thumb"/>
            <ColorInput source="thumb_bkcolor" picker="Photoshop" />
            <NumberInput source="cnt"  validate={validatePositiveNumber} defaultValue={2} />
            <TextInput source="addr"  formClassName={classes.inlineBlock}/>
            <TextInput source="file"  formClassName={classes.inlineBlock}/>
            <NumberInput source="pValue"  validate={validatePositiveNumber} defaultValue={100}/>
            <BooleanInput source="orient" defaultValue={false}  formClassName={classes.inlineBlock} />     
            <BooleanInput source="type"  defaultValue={true}  formClassName={classes.inlineBlock}/>
            <BooleanInput source="needDown" defaultValue={false}  formClassName={classes.inlineBlock}/>
            <BooleanInput source="state" defaultValue={true}  formClassName={classes.inlineBlock}/>
        </SimpleForm>
    </Edit>
))

export const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="thumb" />
            <ColorInput source="thumb_bkcolor" picker="Photoshop"/>
            <NumberInput source="cnt"  validate={validatePositiveNumber} defaultValue={2}/>
            <NumberInput source="pValue"  validate={validatePositiveNumber} defaultValue={100}/>
            <TextInput source="addr" />
            <TextInput source="file" />
            <BooleanInput source="orient" defaultValue={false} />     
            <BooleanInput source="type"  defaultValue={true}/>
            <BooleanInput source="needDown" defaultValue={false} />
            <BooleanInput source="state" defaultValue={true} />
        </SimpleForm>
    </Create>
);


