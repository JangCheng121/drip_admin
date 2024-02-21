import React from 'react';
import {
    translate,
    Show,
    NumberField,
    SelectField,
    SimpleShowLayout,
    ReferenceField,
    TextField,
    ImageField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,

} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles as createStyles } from './AdvertCreate';
import { VideoPlayer} from '../content/MediaPlayer';
import {mTypes} from "../../lib/common";

const AdvertTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.advert.name')} / {record.name}
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
    inBlock: { display: 'inline-block' },
    inBlockNext: { display: 'inline-block', marginLeft: 32, width: 100 },
};

const AdvertShow = ({ data, classes, ...props }) => (
    <Show {...props} title={<AdvertTitle />}>
        <SimpleShowLayout>
            {props.record.type === 'image'? <ImageField source="media" src="src" title="desc" />:null}            
            <VideoPlayer />         
            <TextField source="text" />
            <TextField source="name" className ={classes.inBlock} />
            <ReferenceField source="user_id" reference="user"> 
                <TextField source='name' />
            </ReferenceField>
            <SelectField source="type" className ={classes.inBlockNext} choices={mTypes}/>
            <NumberField source="money" defaultValue={0} className ={classes.inBlockNext}/>
            <NumberField source="views" defaultValue={0} className ={classes.inBlockNext}/>
            <ReferenceArrayField source="positions" reference="category" className ={classes.inBlock} >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>
);


export default withStyles(styles)(AdvertShow);