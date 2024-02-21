import React, { Component } from 'react';
import { 
    fetchUtils,     
    MenuItemLink,
} from 'react-admin';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import cash_history from '../view/cash_history';
import Badge from '@material-ui/core/Badge';

import DataService from '../dataProvider/dataService';
import { withStyles } from '@material-ui/core/styles';
import { stringify } from 'query-string';

const config = require('../config')

const dataService = DataService.getInstance();
const styles = theme => ({
    link: {
        // margin: theme.spacing.unit * 2,
        overflow: 'inherit',
        backgroundColor: "#283593",
        color: "white"
    },  
    badge: {
        backgroundColor: "#cc455f",
    },
});

class CashAlarm extends Component {
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
            const query = {
                filter: JSON.stringify({state:{ $ne: "done" }}),
            };
            const url = config.baseUrl + '/api/cash_history/cnt?' + stringify(query);
            fetchJson(url, options).then((ret) => {
                this.setState({cnt:Number(ret.json)})
            })
        }    

        dataService.setCashAlarm = () => {
            this.setState({cnt:this.state.cnt + 1})
        }
    }

    render() {        
        const { classes } = this.props;
        const { cnt } = this.state;
        if(!cnt) return null
        return (
            <MenuItemLink to="/cash_history" className={classes.link} primaryText={
                <Badge classes={{ badge: classes.badge }} badgeContent={cnt}>
                    <cash_history.icon />
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

export default enhance(CashAlarm);