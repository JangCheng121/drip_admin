import React from 'react';
import compose from 'recompose/compose';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import { linkToRecord } from 'ra-core';
import SettingAdvertView from './SettingAdvertView';
import SettingAlarmView from './SettingAlarmView';
import SettingCashView from './SettingCashView';
import SettingVirtualView from './SettingVirtualView';
import SettingPointView from './SettingPointView';
import SettingSystemView from './SettingSystemView';

const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
    graph: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between'},
    graph2: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'left'},
    titlebar: {height: 570, background:'#fcfcfc'},
};

const LoadedGridList = ({ classes, ids, data, basePath, width }) => (
    <div className={classes.root}>
        <MuiGridList
            cellHeight={570}
            cols={1}
            className={classes.gridList}
            titlePosition="top"
        >        
            {ids.map(id => (
                <GridListTile
                    component={Link}
                    key={id}
                    to={linkToRecord(basePath, data[id].id)}
                    record={data[id]}
                >
                    <GridListTileBar className={classes.titlebar}
                        title={
                            <div>
                            <div style={styles.graph}>
                                <SettingCashView value={data[id]}/>
                                <SettingSystemView value={data[id]} />
                                <SettingAdvertView value={data[id]} />
                                <SettingVirtualView value={data[id]} />
                            </div>
                            <div style={styles.graph2}>
                                <SettingAlarmView value={data[id]}/>
                                <SettingPointView value={data[id]} />
                            </div>
                            </div>
                    }
                    />         
                    {/*<div style={{height:550, width:'90%'}}></div>*/}
                </GridListTile>
            ))}
        </MuiGridList>
    </div>
);


const GridList = ({ loadedOnce, ...props }) =>
    <LoadedGridList {...props} />

const enhance = compose(
    withWidth(),
    withStyles(styles)
);

export default enhance(GridList);