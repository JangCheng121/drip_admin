import React from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    LongTextInput,
    DateInput,
    ImageInput,
    FileInput,
    AutocompleteInput,
    ImageField,
    FileField,
    FormDataConsumer,
    Toolbar,
    SaveButton,
    CloneButton,
    ListButton,
    DeleteButton,
    ReferenceArrayInput,
    SelectArrayInput,
    
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import {mTypes2, totalLangs} from '../../lib/common';
import Grid from '@material-ui/core/Grid';

export const styles = {
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
        <DeleteButton undoable={true} />
    </Toolbar>
));

const AdvertCreate = ({ classes, ...props }) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <TextInput autoFocus source="name" label="resources.advert.fields.name"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ReferenceInput
                        source="user_id"
                        reference="user"
                        perPage={10}
                        filter={{ role: { $ne: 'virtual' } }}
                        label="resources.advert.fields.user_id"
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="lang" label="com.language" choices={totalLangs}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="type" choices={mTypes2}  label="resources.advert.fields.type"/>
                </Grid>
            </Grid>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.type === 'image' &&
                    <ImageInput source="media" label="com.related_image" accept="image/*" multiple={true}>
                        <ImageField source="src" title="" />
                    </ImageInput>
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.type === 'video' &&
                    <FileInput source="media" label="com.related_video" accept="video/*">
                        <FileField source="src" title="" />
                    </FileInput>
                }
            </FormDataConsumer>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="point" defaultValue={0} label="resources.advert.fields.point"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="guarantee" defaultValue={0} label="resources.advert.fields.guarantee"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DateInput source="etime" defaultValue={new Date()} label="resources.advert.fields.etime"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="views" defaultValue={0} label="resources.advert.fields.views"/>
                </Grid>
            </Grid>
            <ReferenceArrayInput source="positions" reference="category" style={{width:'50%'}}>
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <LongTextInput source="url"/>
            <LongTextInput source="text"/>
        </SimpleForm>
    </Create>
    
);

export default withStyles(styles)(AdvertCreate);