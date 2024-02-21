import React from 'react';
import { Datagrid, 
    BooleanField,
    NumberField, 
    // EditButton, 
    ImageField, 
    Responsive, 
    // SimpleList,
    List, 
    TextField } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import { ColorField } from 'react-admin-color-input';

const styles = {
    name: { 
        padding: '0 12px 0 25px' 
    },
    image: { 
        maxHeight: '2rem' 
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
};

const GameList = ({ classes, ...props }) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ImageField classes={{ image: classes.image }} source="thumb"/>
                    <TextField source="name" />
                    <NumberField source="cnt" />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <ImageField classes={{ image: classes.image }} source="thumb"/>
                    <TextField source="name" />
                    <ColorField source="thumb_bkcolor" />
                    <NumberField source="cnt" />
                    <NumberField source="pValue" />
                    <TextField source="addr" />
                    <TextField source="file" />
                    <BooleanField source="orient"/>
                    <BooleanField source="type" />
                    <BooleanField source="state" />
                    <BooleanField source="needDown" />
                </Datagrid>
            }
        />
    </List>
);

export default withStyles(styles)(GameList);