import React from 'react';
import {
    Toolbar,
    SaveButton,
    CloneButton,
    DeleteButton,
    ListButton,
    Create,
    SelectInput,
    LongTextInput,
    SelectArrayInput,
    NumberInput,
    TextInput,
    ReferenceInput,
    TabbedForm,
    FormTab,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import {langs, mTypes} from '../../lib/common';

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

const styles = {
    inline_margin: { display: 'inline-block', marginRight: 32 },
};

const CategoryCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm toolbar={<CustomToolbar />}>
            <FormTab label="resources.category.tab.detail"  >
                <ArrayInput source="trans"  style={{ width: '40%' }}>
                    <SimpleFormIterator>
                        <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="resources.category.trans.lang" choices={langs} />
                        <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.category.trans.str" />
                    </SimpleFormIterator>
                </ArrayInput>
                <ReferenceInput source="parent_id" reference="category">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <SelectInput source="type" label="resources.content.fields.type" choices={mTypes} />
                <ReferenceInput source="enter_level" reference="vip">
                    <SelectInput optionText="level" />
                </ReferenceInput>
                <NumberInput source="enter_point" />
                <SelectArrayInput source="allow_funcs" choices={[
                    { id: 'write', name: 'resources.category.allow.write' },
                    { id: 'review', name: 'resources.category.allow.review' },
                    { id: 'view', name: 'resources.category.allow.view' },
                ]} />
                <LongTextInput source="description" />
            </FormTab>
            <FormTab label="resources.category.tab.enter_points">
                <ArrayInput source="enter_points"  style={{ width: '40%' }}>
                    <SimpleFormIterator>
                        <SelectInput source="days" formClassName={classes.inline_margin} style={{ width: 50 }} label="resources.category.enter_points.days" choices={[
                            { id: 1, name: 'resources.category.enter_points.day1' },
                            { id: 7, name: 'resources.category.enter_points.day7' },
                            { id: 15, name: 'resources.category.enter_points.day15' },
                            { id: 30, name: 'resources.category.enter_points.day30' },
                        ]} />
                        <NumberInput source="point"  formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.category.tab.enter_points" />
                    </SimpleFormIterator>
                </ArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export default withStyles(styles)(CategoryCreate)
