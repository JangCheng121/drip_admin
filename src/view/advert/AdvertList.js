import React from 'react';
import {
    Filter,
    List,
    ReferenceArrayField,
    SingleFieldList,
    TextInput,
    ChipField,
    Responsive,
    ReferenceField,
    Datagrid,
    TextField,
    ImageField,
    NumberField,
    SelectField,
    DateField,
    BooleanField,
    UrlField,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
// import AdvertShow from './AdvertShow';
// import GridList from './GridList';
import rowStyle from '../content/rowStyle';
import {totalLangs, mTypes} from '../../lib/common';

export const AdvertFilter = props => (
    <Filter {...props}>
        <TextInput source="name" alwaysOn />
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

const AdvertList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props}
        filters={<AdvertFilter />}
        perPage={25}
        sort={{ field: 'id', order: 'DESC' }}
    >
        {/*<GridList />*/}
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <TextField source='name' />
                    <NumberField source="coin"/>
                    <DateField source="ctime"/>
                </Datagrid>
            }
            medium={
                <Datagrid
                    {...props}
                    rowClick="edit"
                    rowStyle={rowStyle}
                    classes={{ headerRow: classes.headerRow, rowEven: classes.rowEven }}
                >
                    <NumberField source='id' />
                    <ImageField classes={{ image: classes.image }} source="media" src="thumb" />
                    <TextField source='name' />
                    <ReferenceField source="user_id" reference="user">
                        <TextField source='name' />
                    </ReferenceField>
                    <SelectField source="type" choices={mTypes}/>
                    <SelectField source="lang" label="com.language" choices={totalLangs}/>
                    <NumberField source="views"/>
                    <NumberField source="coin"/>
                    <NumberField source="point"/>
                    <NumberField source="guarantee"/>
                    <UrlField source="url"/>
                    <ReferenceArrayField source="positions" reference="category">
                        <SingleFieldList>
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <BooleanField source="state"/>
                    <DateField source="ctime" />
                    <DateField source="etime" />
                </Datagrid>
            }
        />
    </List>
));

export default AdvertList;