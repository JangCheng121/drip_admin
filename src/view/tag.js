import TagIcon from '@material-ui/icons/Class';

import React from 'react';
import { 
    Create, 
    Edit, 
    List,
    SimpleForm, 
    Toolbar, 
    Filter, 
    Datagrid, 
    Responsive,
    SearchInput,
    DateField,
    NumberField,
    SaveButton,
    ListButton, 
    TextInput,
    translate,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    ArrayField,
    SingleFieldList,
    ChipField,
    Pagination,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import {langs} from "../lib/common";

const TagTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.tag.name')} / {record.id}
    </span>
));

const TagFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const styles = {
    content: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
    inline_margin: { display: 'inline-block', marginRight: 32 },
}

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <ListButton />
    </Toolbar>
));

const TagHistoryPagination = props => <Pagination rowsPerPageOptions={[200,100,50]} {...props} />

export const TagList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props} 
        filters={<TagFilter />}
        sort={{ field: 'id', order: 'DESC' }}
        pagination={<TagHistoryPagination />}
    >
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <ArrayField source="trans">
                        <SingleFieldList>
                            <ChipField source="str" />
                        </SingleFieldList>
                    </ArrayField>
                </Datagrid>
            }
            medium={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <ArrayField source="trans" linkType={false}>
                        <SingleFieldList>
                            <ChipField source="str" />
                        </SingleFieldList>
                    </ArrayField>
                    <DateField source="ctime" />
                </Datagrid>
            }
        />
    </List>
))

const TagEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
            <ArrayInput source="trans"  style={{ width: 600 }}>
                <SimpleFormIterator>
                    <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                    <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 200 }} label="resources.category.trans.str" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
))

const TagCreate = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ArrayInput source="trans"  style={{ width: 600 }}>
                <SimpleFormIterator>
                    <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                    <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 200 }} label="resources.category.trans.str" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
))

export default {
    list: TagList,
    edit: TagEdit,
    create: TagCreate,
    icon: TagIcon,
};