import React from 'react';
import {
    Create,
    SimpleForm,
    NumberInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    ImageInput,
    FileInput,
    ImageField,
    FileField,
    FormDataConsumer,
    Toolbar,
    SaveButton,
    CloneButton,
    ListButton,
    TextInput,
} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {
    // AudioPlayer, 
    VideoPlayer
} from './MediaPlayer';
// import {validateContent} from "./ContentEdit";
import {totalLangs, mTypes} from '../../lib/common';

export const styles = {
    inline_margin: { display: 'inline-block', marginRight: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <CloneButton />
        <ListButton />
        {/*<DeleteButton undoable={true} />*/}
    </Toolbar>
));

const ContentCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />} >
            <Grid container spacing={24}>
                {/*<Grid item xs={12} sm={2}>*/}
                    {/*<ReferenceInput*/}
                        {/*source="user_id"*/}
                        {/*reference="user"*/}
                        {/*perPage={10}*/}
                        {/*label="resources.content.fields.user_name"*/}
                        {/*sort={{ field: 'stat_login_total', order: 'DESC' }}*/}
                        {/*filter={{ role: { $ne: 'guest' } }}*/}
                    {/*>*/}
                        {/*<AutocompleteInput optionText="name" />*/}
                    {/*</ReferenceInput>*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm={2}>
                    <TextInput source="user_id" label="resources.content.fields.user_id"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="type" label="resources.content.fields.type" choices={mTypes} />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData && (formData.type === 'image' || formData.type === 'video') &&
                            <ReferenceInput
                                source="category_id"
                                reference="category"
                                perPage={100}
                                filter={{ parent_id: formData.type === 'video'?2:3 }}
                                label="resources.category.name"
                            >
                                <SelectInput optionText="name" />
                            </ReferenceInput>
                        }
                    </FormDataConsumer>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="lang" label="com.language" choices={totalLangs}/>
                </Grid>

                {/*<Grid item xs={12} sm={2}>*/}
                    {/*<ReferenceInput source="level" reference="vip" label="resources.content.fields.level">*/}
                        {/*<SelectInput optionText="name" />*/}
                    {/*</ReferenceInput>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} sm={4}>*/}
                    {/*<FormDataConsumer>*/}
                        {/*{({ formData, ...rest }) => formData && (formData.type === 'image' || formData.type === 'video') &&*/}
                            {/*<ReferenceArrayInput source="tags" reference="tag" label="resources.content.fields.tags" >*/}
                                {/*<SelectArrayInput optionText="name" />*/}
                            {/*</ReferenceArrayInput>*/}
                        {/*}*/}
                    {/*</FormDataConsumer>*/}
                {/*</Grid>*/}
            </Grid>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.type === 'image' &&
                    <ImageInput source="media" label="com.related_image" accept="image/*" multiple={true}>
                        <ImageField source="src" title="" />
                    </ImageInput>
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, record, ...rest }) => formData && formData.type === 'video' &&
                    <div>
                        <FileInput source="media" label="com.related_video" accept="video/*">
                            <FileField source="src" title="" />
                        </FileInput>
                        <VideoPlayer record={record}/>
                    </div>
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.type === 'audio' &&
                    <FileInput source="media" label="com.related_audio" accept="audio/*">
                        <FileField source="src" title="" />
                    </FileInput>
                }
            </FormDataConsumer>
            <TextInput source="text"  style={{ width: '85%' }} />

            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <DateInput source="from" defaultValue={new Date()} label="resources.content.fields.from"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DateInput source="to" defaultValue={new Date()} label="resources.content.fields.to"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="point" label="resources.content.fields.point" style={{width:100}} defaultValue={0}/>
                </Grid>
            </Grid>
            {/*<BooleanInput source="first_page" style={{marginTop:25}} label="resources.content.fields.first_page"/>*/}
            {/*<LongTextInput source="url"/>*/}
        </SimpleForm>
    </Create>
);

export default withStyles(styles)(ContentCreate);