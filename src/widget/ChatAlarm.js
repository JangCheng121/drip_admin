import React, { Component } from 'react';
import { 
    MenuItemLink,
} from 'react-admin';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import service from '../view/service';
import Badge from '@material-ui/core/Badge';

import DataService from '../dataProvider/dataService';
import { withStyles } from '@material-ui/core/styles';

const ds = DataService.getInstance();
const styles = theme => ({
    link: {
        overflow: 'inherit',
        backgroundColor: "#283593",
        color: "white"
    },  
    badge: {
        backgroundColor: "#F664FB",
    },
});

class ChatAlarm extends Component {
    state = {
        cnt: 0,
    };

    componentDidMount() {
        ds.fetchServer('/api/message/service_stat').then((res) => {
            let cnt = 0
            for(let i = 0; i < res.length; i++) {
                cnt += res[i].count

            }
            this.setState({cnt:cnt})
        })
        ds.setChatAlarm = () => {
            this.setState({cnt:this.state.cnt + 1})
        }
    }

    render() {        
        const { classes } = this.props;
        const { cnt } = this.state;
        if(!cnt) return null
        return (
            <MenuItemLink to="/service" className={classes.link} primaryText={
                <Badge classes={{ badge: classes.badge }} badgeContent={cnt}>
                    <service.icon />
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

export default enhance(ChatAlarm);