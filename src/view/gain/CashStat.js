import React, { Component } from 'react';
import { 
    fetchUtils,
    Responsive,
    withDataProvider
} from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import CustomizedTable from './CustomizedTable'

const config = require('../../config')

class CashStat extends Component {
    state = {};

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.version !== prevProps.version) {
            this.fetchData();
        }
    }

    fetchData() {
        const { fetchJson } = fetchUtils;
        let options = {}
        options.headers = new Headers({ Accept: 'application/json' });
        const token = localStorage.getItem('token');
        if(token) {
            options.headers.set('authorization', `${token}`);
        }    
        let url = config.baseUrl + '/api/cash_history/stat'
        return fetchJson(url, options)
        .then((response) => {
            //모바일표시용 자료
            const small = []
            for (let i = 3; i < response.json.stats.length; i++) {
                small.push(response.json.stats[i])
            }
            this.setState({
                small: small,
                stats: response.json.stats,
                days: response.json.days,
            });
        });
    }

    render() {
        const {
            stats,
            days,
            small,
        } = this.state;
        if(!stats) return null;
        return (
            <Responsive
                small={
                    <div>
                        <CustomizedTable stats={small} days={days}/>
                    </div>

                }
                medium={
                    <div>
                        <CustomizedTable stats={stats} days={days}/>
                    </div>

                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(CashStat);