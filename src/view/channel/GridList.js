import React from 'react';
import {
    ImageField,
    ReferenceField,
    SelectField,
} from 'react-admin';


import compose from 'recompose/compose';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { linkToRecord } from 'ra-core';
import { Link } from 'react-router-dom';
import RtmpPlayer from "./RtmpPlayer";
import UserAvatarField from '../../widget/UserAvatarField';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
    tileBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 15%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    live: {
        backgroundColor: "#239000",
        marginTop:13,
    },
    block: {
        backgroundColor: "#BE1919",
        marginTop:13,
    },
    spanDirection: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingRight: 15
    }
});

const getColsForWidth = width => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = ({ width, classes, nbItems = 10 }) => (
    <div className={classes.root}>
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key} >
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    </div>
);

const LoadedGridList = ({ classes, ids, data, basePath, width }) => (
    <div className={classes.root}>
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}

            className={classes.gridList}
        >
            {ids.map(id => (
                <GridListTile
                    component={Link}
                    key={id}
                    to={linkToRecord(basePath, data[id].id)}
                >
                    {data[id].state?<RtmpPlayer streamKey={data[id].streamKey}/>:<ImageField source="image" record={data[id]}/>}

                    <GridListTileBar
                        className={classes.tileBar}
                        title={
                            <span className={classes.spanDirection}>
                                <ReferenceField source="creator" reference="user" record={data[id]} linkType={false}  basePath={basePath}>
                                    <UserAvatarField showName={false}/>
                                </ReferenceField>
                                {data[id].state?<Badge classes={{ badge: classes.live }}/>:null}
                                {data[id].block?<Badge classes={{ badge: classes.block }}/>:null}
                            </span>
                        }
                        // subtitle={
                        //     <span>
                        //         <ReferenceField source="creator" reference="user" record={data[id]} linkType={false}  basePath={basePath}>
                        //             <UserAvatarField />
                        //         </ReferenceField>
                        //
                        //         {/*{data[id].creator}*/}
                        //         {/*<NumberField*/}
                        //             {/*className={classes.price}*/}
                        //             {/*source="point"*/}
                        //             {/*record={data[id]}*/}
                        //             {/*color="inherit"*/}
                        //             {/*options={{*/}
                        //                 {/*style: 'currency',*/}
                        //                 {/*currency: 'USD',*/}
                        //             {/*}}*/}
                        //         {/*/>*/}
                        //     </span>
                        // }
                    />
                </GridListTile>
            ))}
        </MuiGridList>
    </div>
);

const GridList = ({ loadedOnce, ...props }) =>
    loadedOnce ? <LoadedGridList {...props} /> : <LoadingGridList {...props} />;

const enhance = compose(
    withWidth(),
    withStyles(styles)
);

export default enhance(GridList);