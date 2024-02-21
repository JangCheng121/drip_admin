import React from 'react';
import { 
    Create, 
    Datagrid, 
    TextField, 
    Edit, 
    SimpleList,
    SimpleForm, 
    LongTextInput,
    Filter, 
    Responsive, 
    SearchInput, 
    DateField,
    translate,
    List, 
} from 'react-admin';

import NoticeIcon from '@material-ui/icons/RecordVoiceOver';
import { withStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

const NoticeTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.notice.name')} / {record.id}
    </span>
));

const NoticeFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
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
    },
    content: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },    
};

const NoticeList = withStyles(styles) (( { classes, permissions, ...props } ) => (        
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        filters={<NoticeFilter />}
    >
         <Responsive
             small={
                 <SimpleList
                     primaryText={record => record.title}
                     secondaryText={record => `${record.content}`}
                     tertiaryText={record => new Date(record.ctime).toLocaleDateString()}
                 />
             }
             medium={
                 <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                     <TextField source="title"/>
                     <TextField source="content"/>
                     <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                 </Datagrid>
             }
         />
    </List>
));

const NoticeEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<NoticeTitle />} {...props}>
        <SimpleForm >
            <LongTextInput source="title"/>
            {/*<LongTextInput source="content"/>*/}
            <RichTextInput source="content" />
        </SimpleForm>
    </Edit>
))

const NoticeCreate = props => (
    <Create {...props}>
        <SimpleForm >
            <LongTextInput source="title"/>
            {/*<LongTextInput source="content"/>*/}
            <RichTextInput source="content" />
        </SimpleForm>
    </Create>
);

export default {
    list: NoticeList,
    edit: NoticeEdit,
    create: NoticeCreate,
    icon: NoticeIcon,
};