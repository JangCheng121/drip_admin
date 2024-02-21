import React from 'react';
import {
    List,
    Responsive,
} from 'react-admin';
import GridList from './GridList';
import MobileGridList from './MobileGridList';

const SettingList = props => (
    <List 
        {...props}
        exporter={false}
        pagination={false}
    >
        <Responsive        
            small={
                <MobileGridList />
            }
            medium={
                <GridList />
            }
        />

    </List>
);

export default SettingList;