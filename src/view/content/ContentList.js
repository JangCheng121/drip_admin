import React, {Fragment} from 'react';
import {
    Filter,
    List,
    ReferenceInput,
    Pagination,
    SelectInput,
    AutocompleteInput,
    Responsive,
    Datagrid,
    ReferenceField,
    TextField,
    NumberField,
    SelectField,
    DateField,
    BooleanField,
    BulkDeleteButton,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import {totalLangs, cStates, mTypes} from '../../lib/common';
import rowStyle from './rowStyle';
import UserAvatarField from '../../widget/UserAvatarField';
import ResetStateButton from '../../widget/ResetStateButton';
// import ContentShow from './ContentShow';
// import GridList from './GridList';


export const ContentFilter = props => (
    <Filter {...props}>        
        <ReferenceInput
            source="category_id"
            reference="category"
            filter={{ id: { $gt: 1 } }}
            sort={{ field: 'parent_id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
        <ReferenceInput
            source="user_id"
            reference="user"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <SelectInput source="type" label="resources.content.fields.type" choices={mTypes} />

    </Filter>
);

const styles = {
    image: { 
        maxHeight: '3rem'
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

const PostBulkActionButtons = props => (
    <Fragment>
        <ResetStateButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const ContentPagination = props => <Pagination rowsPerPageOptions={[100,50,25,10]} {...props} />
const ContentList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props}
        filters={<ContentFilter />}
        perPage={25}
        sort={{ field: 'id', order: 'DESC' }}
        pagination={<ContentPagination />}
        bulkActionButtons={<PostBulkActionButtons />}
    >
        {/* <GridList /> */}
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    {/*<ImageField classes={{ image: classes.image }} source="media" src="thumb" />*/}
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <TextField  source='name' />
                    </ReferenceField>
                    <ReferenceField source="category_id" reference="category" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                </Datagrid>
            }
            medium={
                <Datagrid
                    rowClick="edit"
                    rowStyle={rowStyle}
                    classes={{ headerRow: classes.headerRow, rowEven: classes.rowEven }}
                >
                    <NumberField source='id' />
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>

                    <ReferenceField source="category_id" reference="category">
                        <TextField source='name' />
                    </ReferenceField>
                    <SelectField source="type" choices={mTypes}/>
                    <SelectField source="lang" label="com.language" choices={totalLangs}/>
                    {/*<ReferenceField source="level" reference="vip" linkType={false}>*/}
                        {/*<TextField source='name' />*/}
                    {/*</ReferenceField>*/}
                    <NumberField source="point"/>
                    <NumberField source="rviews" />
                    <NumberField source="vviews" />
                    <NumberField source="review_cnt" />
                    <BooleanField source="first_page"/>
                    <ReferenceField source="agent_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>

                    <SelectField source="state" choices={cStates}/>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
));

export default ContentList;