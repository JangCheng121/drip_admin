import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import content from '../view/content';
import Badge from '@material-ui/core/Badge';

import DataService from '../dataProvider/dataService';
import { withStyles } from '@material-ui/core/styles';

import { fetchUtils, MenuItemLink } from 'react-admin';
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
        backgroundColor: "#4ba236",
    },
});

class ContentAlarm extends Component {
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
            const url = config.baseUrl + '/api/content/cnt?' + stringify(query);
            fetchJson(url, options).then((ret) => {
                this.setState({cnt:Number(ret.json)})
                // localStorage.setItem('contentAlarm', new Date());
            })
        }          

        dataService.setContentAlarm = () => {
            this.setState({cnt:this.state.cnt + 1})
        }
    }

    render() {
        const { classes } = this.props;
        const { cnt } = this.state;
        if (!cnt) return null

        return (
            <MenuItemLink to="/content" className={classes.link} primaryText={
                <Badge classes={{ badge: classes.badge }} badgeContent={cnt}>
                    <content.icon />
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

export default enhance(ContentAlarm);