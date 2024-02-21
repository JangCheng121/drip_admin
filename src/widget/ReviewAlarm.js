import React, { Component } from 'react';
import { fetchUtils, MenuItemLink } from 'react-admin';

import { connect } from 'react-redux';
import compose from 'recompose/compose';

import review from '../view/review';
import Badge from '@material-ui/core/Badge';

import DataService from '../dataProvider/dataService';
import { withStyles } from '@material-ui/core/styles';
import { stringify } from 'query-string';

const dataService = DataService.getInstance();

const styles = theme => ({
    link: {
        // margin: theme.spacing.unit * 2,
        overflow: 'inherit',
        backgroundColor: "#283593",
        color: "white"
    },  
    badge: {
        backgroundColor: "#7743e0",
    },
});

class AlarmLink extends Component {
    state = {
        cnt: 0,
    };

    componentDidMount() {
        const { fetchJson } = fetchUtils;
        let options = {}
        options.headers = new Headers({ Accept: 'application/json' });
        const token = localStorage.getItem('token');
        if(token) {
            options.headers.set('authorization', `${token}`);
            const config = require('../config')
            const query = {
                filter: JSON.stringify({state:'pending'}),
            };
            const url = config.baseUrl + '/api/review/cnt?' + stringify(query);
            fetchJson(url, options).then((ret) => {
                let cnt = Number(ret.json)
                localStorage.setItem('reviewAlarm', new Date());
                this.setState({cnt:cnt})
            })
        }          

        dataService.setReviewAlarm = () => {
            this.setState({cnt:this.state.cnt + 1})
        }
    }

    render() {
        const { classes } = this.props;
        const { cnt } = this.state;
        if (!cnt) return null
        return (
            <MenuItemLink to="/review" className={classes.link} primaryText={
                <Badge classes={{ badge: classes.badge }} badgeContent={cnt}>
                    <review.icon />
                </Badge>
            } />            
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
});


const enhance = compose(
    connect(
        mapStateToProps,
        {
        }
    ),
    withStyles(styles)
);

export default enhance(AlarmLink);