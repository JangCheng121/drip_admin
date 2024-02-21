import ChannelIcon from '@material-ui/icons/Duo';

import React from 'react';
import {
    Create,
    Edit,
    List,
    Filter,
    Toolbar,
    CloneButton,
    EditButton,
    ListButton,
    SaveButton,
    DeleteButton,
    translate,
    SimpleForm,
    DisabledInput,
    LongTextInput,
    AutocompleteInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    TextInput,
    BooleanInput,
    NullableBooleanInput,
    FormDataConsumer,
    TextField,
    DateField,
    ReferenceField,
} from 'react-admin';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RtmpPlayer from "./RtmpPlayer";
import {liveBlockReason} from "../../lib/common";
import UserAvatarField from '../../widget/UserAvatarField';


const ChannelTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.channel.name')} / {record.id}
    </span>
));

const ChannelFilter = (props) => (
    <Filter {...props}>
        <NullableBooleanInput label="resources.channel.fields.state" source="state" alwaysOn />
    </Filter>
);

const styles = {
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
}

const cardStyle = {
    width: 300,
    height: 200,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};
const LiveGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
        {ids.map(id =>
            <Card key={id} style={cardStyle}>
                <CardContent style={{ padding: 0, margin: 0}}>
                    <RtmpPlayer streamKey={data[id].streamKey}/>
                    <ReferenceField label="User" resource="user" record={data[id]} source="creator" reference="user" basePath={basePath}>
                        <UserAvatarField />
                    </ReferenceField>
                </CardContent>
                <CardActions style={{ textAlign: 'right' }}>
                    <EditButton resource="channel" basePath={basePath} record={data[id]} />
                </CardActions>
            </Card>
        )}
    </div>
);
LiveGrid.defaultProps = {
    data: {},
    ids: [],
};

export const ChannelList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props}
        filterDefaultValues={{ state: true }}
        filters={<ChannelFilter />}
    >
        <LiveGrid />
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

const ChannelEdit = props => (
    <Edit title={<ChannelTitle />} {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <DisabledInput source="id"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextInput source="name" label="resources.channel.fields.name" />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ReferenceInput
                        source="creator"
                        reference="user"
                        perPage={10}
                        filter={{ role: { $ne: 'virtual' } }}
                        label="resources.channel.fields.creator"
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="mode" defaultValue={0} choices={[
                        { id: true, name: 'resources.channel.info.private' },
                        { id: false, name: 'resources.channel.info.many' },
                    ]}  label="resources.channel.fields.mode"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <SelectInput source="type" defaultValue={0} choices={[
                        { id: 0, name: 'resources.channel.info.free_room' },
                        { id: 1, name: 'resources.channel.info.fix_room' },
                        { id: 2, name: 'resources.channel.info.time_room' },
                    ]}  label="resources.channel.fields.type"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ReferenceInput
                        source="category_id"
                        reference="category"
                        perPage={100}
                        filter={{ parent_id: 30}}
                        label="resources.channel.fields.category_id"
                    >
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="time" defaultValue={10} label="resources.channel.fields.time"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="point" defaultValue={100} label="resources.channel.fields.point"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="perPay" defaultValue={0} label="resources.channel.fields.perPay"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <NumberInput source="cnt" defaultValue={10} label="resources.channel.fields.cnt"/>
                </Grid>
            </Grid>
            <LongTextInput source="notification" />
            <Grid container spacing={24}>
                <Grid item xs={12} sm={2}>
                    <BooleanInput source="block" label="resources.user.fields.block.login" style={{marginTop: 30}}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData && formData.block &&
                            <SelectInput source="block_reason" label="resources.channel.fields.block_reason" choices={liveBlockReason}/>
                        }
                    </FormDataConsumer>
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
);

// const ChannelCreate = props => (
//     <Create title=" " {...props}>
//         <SimpleForm toolbar={<CustomToolbar />}>
//             <Grid container spacing={24}>
//                 <Grid item xs={12} sm={2}>
//                     <TextInput source="name" label="resources.channel.fields.name" />
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <ReferenceInput
//                         source="creator"
//                         reference="user"
//                         perPage={10}
//                         filter={{ role: { $ne: 'guest' } }}
//                         label="resources.channel.fields.creator"
//                     >
//                         <AutocompleteInput optionText="name" />
//                     </ReferenceInput>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <BooleanInput source="block" label="resources.user.fields.block" style={{marginTop: 30}}/>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={24}>
//                 <Grid item xs={12} sm={2}>
//                     <SelectInput source="private" defaultValue={false} choices={[
//                         { id: true, name: 'resources.channel.info.private' },
//                         { id: false, name: 'resources.channel.info.many' },
//                     ]}  label="resources.channel.fields.private"/>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <SelectInput source="type" defaultValue={0} choices={[
//                         { id: 0, name: 'resources.channel.info.free_room' },
//                         { id: 1, name: 'resources.channel.info.fix_room' },
//                         { id: 2, name: 'resources.channel.info.time_room' },
//                     ]}  label="resources.channel.fields.type"/>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <ReferenceInput
//                         source="category_id"
//                         reference="category"
//                         perPage={100}
//                         filter={{ parent_id: 30}}
//                         label="resources.channel.fields.category_id"
//                     >
//                         <SelectInput optionText="name" />
//                     </ReferenceInput>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={24}>
//                 <Grid item xs={12} sm={2}>
//                     <NumberInput source="time" defaultValue={10} label="resources.channel.fields.time"/>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <NumberInput source="point" defaultValue={100} label="resources.channel.fields.point"/>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <NumberInput source="perPay" defaultValue={0} label="resources.channel.fields.perPay"/>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                     <NumberInput source="cnt" defaultValue={10} label="resources.channel.fields.cnt"/>
//                 </Grid>
//             </Grid>
//             <LongTextInput source="notification" />
//         </SimpleForm>
//     </Create>
// );

export default {
    list: ChannelList,
    edit: ChannelEdit,
    // create: ChannelCreate,
    icon: ChannelIcon,
};