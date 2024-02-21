/**
 * Created by hao.cheng on 2017/4/17.
 */
import React from 'react';
import compose from 'recompose/compose';
import { fetchUtils, translate } from 'react-admin';

// import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';

// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

const config = require('../../config')
const date = [], data = []

const option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '가입자통계',
    },
    // toolbox: {
    //     feature: {
    //         dataZoom: {
    //             yAxisIndex: 'none',
    //             title: {
    //                 dataZoom: '  ',
    //                 dataZoomReset: '  ',
    //             }
    //         },
    //         restore: {
    //             title: ' ',
    //         },
    //         saveAsImage: {
    //             title: ' ',
    //         }
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        // end: 10
    }, {
        start: 0,
        // end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name:'模拟数据',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(255, 70, 131)'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },
            data: data,
        },
    ]
};

const find_info = (arr, y, m, d) => {
    let count = 0, comp
    for (let i = 0; i < arr.length; i++) {
        let one = arr[i]
        if (!one) continue
        comp = new Date(one._id.d)
        if (comp.getDate() === d && comp.getFullYear() === y && (comp.getMonth()+1) === m) {
            count = arr[i].count
            delete arr[i]
        }        
    }
    return count
}

class EchartsArea extends React.Component {
    echarts_react = null
    echarts_instance = null
    componentDidMount() {
    }
    async fetchData() {
        const { fetchJson } = fetchUtils;
        let options = {}
        options.headers = new Headers({ Accept: 'application/json' });
        const token = localStorage.getItem('token');
        if(token) {
            options.headers.set('authorization', `${token}`);
        }    
        let days = 365
        let url = config.baseUrl + '/api/login_history/stat?days=' + days
        let fetch_json = await fetchJson(url, options)
        let fetch_data = fetch_json.json

        let from = new Date()
        from.setDate(from.getDate() - days)
        let base = +new Date(from)
        let oneDay = 24 * 3600 * 1000;
        
        for (var i = 0; i < days; i++) {
            var now = new Date(base += oneDay);
            var y = now.getFullYear(), m = now.getMonth()+1, d = now.getDate()
            date[i] = [y, m, d].join('-')
            data[i] = find_info(fetch_data, y, m, d)
        }
        date.reverse()
        data.reverse()

        if (this.echarts_instance) {
            // this.echarts_instance.hideLoading()
            this.echarts_instance.setOption(option, true)
        }

    }
    getOption = () => {
        const { translate } = this.props;
        option.title.text = translate('com.dashboard.login_cnt_history')
        option.series[0].name = translate('com.dashboard.login_cnt')
        return option
    }

    render() {
        return (
            // <ReactEcharts
            //     ref={(e) => { 
            //         if(e) {
            //             vm.echarts_react = e; 
            //             vm.echarts_instance = vm.echarts_react.getEchartsInstance();
            //         }
            //     }}
            //     option={option}
            //     // style={{height: '300px'}}
            //     className={'react_for_echarts'}
            // />
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                // style={{height: '300px'}}
                // opts={} 
                ref={(e) => { 
                    if(e) {
                        this.echarts_instance = e.getEchartsInstance();
                        // this.echarts_instance.showLoading()
                        this.fetchData();
                    }
                }}
            />            
        )
    }
}

const enhance = compose(
    translate,
);

export default enhance(EchartsArea);