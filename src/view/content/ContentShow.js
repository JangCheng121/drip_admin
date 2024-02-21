import React from 'react';
import {
    Show,
    NumberField,
    DateField,
    SimpleShowLayout,
    TextField,
    Responsive,

} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles as createStyles } from './ContentCreate';
import {ImagePlayer, AudioPlayer, VideoPlayer} from './MediaPlayer';

const styles = {
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    inBlock: { display: 'inline-block' },
    inBlockNext: { display: 'inline-block', marginRight: 32, width: 200 },
    image: {width: 100}
};

const ContentShow = ( { classes, permissions, record, ...props } ) => (
    <Show {...props} >
    <Responsive
    small={
        <SimpleShowLayout>
            <ImagePlayer />         
            <VideoPlayer />         
            <AudioPlayer />         
            <TextField source="name" />
            <DateField source="from"/>
            <DateField source="to"  />
            <TextField source="delete_reason" label="resources.review.fields.delete_reason" />
            <NumberField  label="resources.review.fields.delete_point" source="delete_point" defaultValue={0} />
        </SimpleShowLayout>
    }
    medium={
        <SimpleShowLayout>
            <TextField source="name" />
            <ImagePlayer />         
            <VideoPlayer />         
            <AudioPlayer />         
            <DateField source="from"  className ={classes.inBlockNext}/>
            <DateField source="to"  className ={classes.inBlockNext}/>
            <TextField source="delete_reason" label="resources.review.fields.delete_reason" className ={classes.inBlockNext}/>
            <NumberField  label="resources.review.fields.delete_point" source="delete_point" defaultValue={0} className ={classes.inBlockNext}/>
        </SimpleShowLayout>

    }
    />
    </Show>
);


export default withStyles(styles)(ContentShow);