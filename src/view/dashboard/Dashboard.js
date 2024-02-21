import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive, fetchUtils, withDataProvider  } from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import TotalUsers from './TotalUsers';
import TotalContents from './TotalContents';
import TotalAdverts from './TotalAdverts';

import PendingCash from './PendingCash';
import PendingService from './PendingService';
import Card from '@material-ui/core/Card';
import EchartsArea from '../echarts/EchartsArea';
import EchartsPie from '../echarts/EchartsPie';
import EchartsBar from '../echarts/EchartsBar';
// import EchartsMeasure from '../echarts/EchartsMeasure';

const config = require('../../config')
const styles = {
    flex: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'},
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
    graph: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between'},
};


class Dashboard extends Component {
    state = {};

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
            // this.fetchData();
        }
    }

    async fetchData() {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('no token')

            //결제통계, 가입자수, 광고수, 게시물수
            const { fetchJson } = fetchUtils;
            let options = {}
            options.headers = new Headers({ Accept: 'application/json' });
            options.headers.set('authorization', `${token}`);
            let url = config.baseUrl + '/api/cash_history/stat?days=30'
            let data = await fetchJson(url, options)
            this.setState({
                revenue: data.json
            });
            url = config.baseUrl + '/api/dashboard/stat'
            data = await fetchJson(url, options)
            this.setState({
                user_cnt: data.json.user,
                content_cnt: data.json.content,
                advert_cnt: data.json.advert,
            });

            //대기중인 현금결제
            const { dataProvider } = this.props;
            const { data: cash } = await dataProvider(GET_LIST, 'cash_history', {
                filter: { state: 'pending' },
                sort: { field: 'ctime', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            });
            const pendingCash = cash.slice(0, Math.min(5, cash.length));
            const { data: users } = await dataProvider(GET_MANY, 'user', {
                ids: pendingCash.map(one => one.user_id),
            });
            this.setState({
                pendingCash,
                pendingCashUsers: users.reduce((prev, user) => {
                    prev[user.id] = user; // eslint-disable-line no-param-reassign
                    return prev;
                }, {}),
            });

            //고객상담
            url = config.baseUrl + '/api/message/service_stat'
            fetchJson(url, options).then((res) => {
                this.setState({ pendingService:res.json});
            });
        }
        catch(e) {
            this.props.history.push('/login') //로그인페지로
        }

    }

    render() {
        const {
            pendingCash,
            pendingCashUsers,
            pendingService,
            user_cnt,
            content_cnt,
            advert_cnt,
            revenue,
        } = this.state;
        return (
            <Responsive
                // xsmall={
                //     <div>
                //         <div style={styles.flexColumn}>
                //             <div style={{ marginBottom: '2em' }}>
                //                 <Welcome />
                //             </div>
                //             <div style={styles.flex}>
                //                 <MonthlyRevenue value={revenue} />
                //                 <NbNewOrders value={nbNewOrders} />
                //             </div>
                //             <div style={styles.singleCol}>
                //                 <PendingOrders
                //                     orders={pendingOrders}
                //                     customers={pendingOrdersCustomers}
                //                 />
                //             </div>
                //         </div>
                //     </div>
                // }
                small={
                        <div>
                            <div style={styles.flex}>
                                <MonthlyRevenue value={revenue} style={{padding:10}}/>
                            </div>
                            <div style={styles.flex}>
                                <TotalUsers value={user_cnt}  style={{paddingTop:10}}/>
                            </div>
                            <div style={styles.flex}>
                                <TotalContents value={content_cnt} style={{paddingTop:10}} />
                            </div>
                            <div style={styles.flex}>
                                <TotalAdverts value={advert_cnt} style={{paddingTop:10}} />
                            </div>
                            <div style={styles.flex} >
                                <Card style={{margin:'1em', width:'95%'}}>
                                    <EchartsArea  {...this.props} />
                                </Card>
                            </div>
                            <div style={styles.flex} >
                                <Card style={{margin:'1em', width:'95%'}}>
                                    <EchartsPie />
                                </Card>
                            </div>
                            <div style={styles.flex} >
                                <Card style={{margin:'1em', width:'95%'}}>
                                    <EchartsBar />
                                </Card>
                            </div>
                            <div style={styles.flex}>
                                <PendingService style={{width:'95%'}} ps={pendingService} />
                            </div>
                            <div style={styles.flex}>
                                <PendingCash style={{width:'95%'}} cash={pendingCash} users={pendingCashUsers} />
                            </div>
                        </div>
                    }
                medium={
                    <div>
                        <div style={styles.graph}>
                            <MonthlyRevenue value={revenue} />
                            <TotalUsers value={user_cnt} />
                            <TotalContents value={content_cnt} />
                            <TotalAdverts value={advert_cnt} />
                        </div>
                        <div style={styles.graph}>
                            <Welcome />
                            <PendingCash
                                cash={pendingCash}
                                users={pendingCashUsers}
                            />
                            <PendingService
                                ps={pendingService}
                            />
                        </div>
                        <div style={styles.graph}>
                            <Card style={{width:550, margin:'1em'}}>
                                <EchartsArea  {...this.props}/>
                            </Card>
                            <Card style={{width:550, margin:'1em'}}><EchartsBar /></Card>
                            {/*<Card style={{width:300, height:300, margin:'1em'}}><EchartsMeasure /></Card>*/}
                            <Card style={{width:400, margin:'1em'}}><EchartsPie /></Card>
                        </div>
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
)(Dashboard);