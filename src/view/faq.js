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
    ImageInput,
    ImageField,
    DateField,
    translate,
    List, 
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';
import FaqIcon from '@material-ui/icons/QuestionAnswer';
import { withStyles } from '@material-ui/core/styles';

const FaqTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.faq.name')} / {record.id}
    </span>
));

const FaqFilter = props => (
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

const FaqList = withStyles(styles) (( { classes, permissions, ...props } ) => (        
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        filters={<FaqFilter />}
    >
         <Responsive
             small={
                 <SimpleList
                     primaryText={record => record.question}
                     secondaryText={record => `${record.answer}`}
                     tertiaryText={record => new Date(record.ctime).toLocaleDateString()}
                 />
             }
             medium={
                 <Datagrid  expand = {<FaqEdit/>} rowClick="expand" classes={{ rowEven: classes.rowEven }}>
                     <TextField source="question"/>
                     <TextField source="answer"/>
                     <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                 </Datagrid>
             }
         />
    </List>
));

const FaqEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<FaqTitle />} {...props}>
        <SimpleForm >
            <LongTextInput source="question"/>
            <RichTextInput source="answer" />
            <ImageInput source="media" label="com.related_image" accept="image/*" multiple={true}>
                <ImageField source="src" title="" />
            </ImageInput>
        </SimpleForm>
    </Edit>
))

const FaqCreate = props => (
    <Create {...props}>
        <SimpleForm >
            <LongTextInput source="question"/>
            <RichTextInput source="answer" />
            <ImageInput source="media" label="com.related_image" accept="image/*" multiple={true}>
                <ImageField source="src" title="" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export default {
    list: FaqList,
    edit: FaqEdit,
    create: FaqCreate,
    icon: FaqIcon,
};