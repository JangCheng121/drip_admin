import React from 'react';
import {
    Edit,
    translate,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    BooleanInput,
    FileField,
    FormDataConsumer,
    FileInput,
    ImageInput,
    DateInput,
    ImageField,
} from 'react-admin';


import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { CustomToolbar, styles as createStyles } from './ContentCreate';
import { AudioPlayer, VideoPlayer } from './MediaPlayer';
import { cStates, mTypes, point_units, totalLangs } from '../../lib/common';

const ContentTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.content.name')} / {record.id}
    </span>
));

const styles = {
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const validateContent = (values, props) => {
    const errors = {};
    if (values.state === 'delete' && (!values.delete_reason || !values.delete_reason.length)) {
        errors.delete_reason = props.translate('resources.content.err.')
    }
    return errors
}

const ContentEdit = ({ classes, record, ...props }) => (
    <Edit {...props} actions={false}  undoable={true} title={<ContentTitle />}>
        <SimpleForm toolbar={<CustomToolbar />} >
            <Grid container spacing={24}>
                {/*<Grid item xs={12} sm={2}>*/}
                    {/*<ReferenceInput*/}
                        {/*source="user_id"*/}
                        {/*reference="user"*/}
                        {/*perPage={30}*/}
                        {/*sort={{ field: 'stat_login_total', order: 'DESC' }}*/}
                        {/*filter={{ role: { $ne: 'guest' } }}*/}
                        {/*label="resources.content.fields.user_name"*/}
                        {/*allowEmpty*/}
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


                {/*<Grid item xs={12} sm={4}>*/}
                    {/*<FormDataConsumer>*/}
                        {/*{({ formData, ...rest }) => formData && (formData.type === 'image' || formData.type === 'video') &&*/}
                            {/*<ReferenceArrayInput source="tags" reference="tag" label="resources.content.fields.tags" style={{marginTop:1}}>*/}
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
                {({ formData, record, ...rest }) => formData && formData.type === 'audio' &&
                    <div>
                        <FileInput source="media" label="com.related_audio" accept="audio/*">
                            <FileField source="src" title="" />
                        </FileInput>
                        <AudioPlayer record={record}/>
                    </div>
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
                <Grid item xs={12} sm={2}>
                    <NumberInput source="rviews" label="resources.content.fields.rviews" style={{width:100}} defaultValue={0}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="vviews" label="resources.content.fields.vviews" style={{width:100}} defaultValue={0}/>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="state" label="resources.content.fields.state" choices={cStates}/>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData && formData.state === 'delete' &&
                            <TextInput source="delete_reason" label="resources.content.fields.delete_reason"/>
                        }
                    </FormDataConsumer>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData && formData.state === 'delete' &&
                            <NumberInput  label="resources.content.fields.delete_point" source="delete_point" style={{width:100}} defaultValue={0}/>
                        }
                    </FormDataConsumer>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <NumberInput source="select.amount" label="resources.content.select.amount" style={{width: 120 }} />
                    <SelectInput source="select.unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                    <BooleanInput source="select.is_note" label="resources.content.select.is_note" style={{display: 'inline-block', marginTop: 30}} defaultValue={false} />
                </Grid>
            </Grid>
            {/*<BooleanInput source="first_page" style={{marginTop:25}} label="resources.content.fields.first_page"/>*/}
            {/*<LongTextInput source="url"/>*/}
        </SimpleForm>
    </Edit>
);

export default withStyles(styles)(ContentEdit);