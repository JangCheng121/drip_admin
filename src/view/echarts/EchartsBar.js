import React from 'react';
import compose from 'recompose/compose';
import { fetchUtils, translate } from 'react-admin';
// import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';

const config = require('../../config')
let date = []

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
    //         restore: {title: ' '},
    //         saveAsImage: {title: '  '}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: true,
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
            name:'bar',
            type:'bar',
            color: 'rgb(100, 50, 100)',
            data: [],
        },
        {
            name:'bar2',
            type:'bar',
            color: 'rgb(50, 100, 100)',
            data: [],
        },
        {
            name:'bar3',
            color: 'rgb(50, 150, 50)',
            type:'bar',
            data: [],
        },
        {
            name:'bar4',
            type:'bar',
            color: 'rgb(200, 20, 20)',
            data: [],
        },
    ]
};

const find_info = (arr, y, m) => {
    let comp
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            comp = new Date(arr[i]._id.d)
            if (comp.getFullYear() === y && (comp.getMonth()+1) === m) {
                return arr[i].count
            }
        }
    }
    return 0
}

const fetchMonthlyData = async(module, month) => {
    const ret = []
    const { fetchJson } = fetchUtils;
    let options = {}
    options.headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('token');
    if(token) {
        options.headers.set('authorization', `${token}`);
    }    
    let url = config.baseUrl + '/api/dashboard/stat_monthly?month=' + month + '&module='+ module
    let fetch_json = await fetchJson(url, options)
    let fetch_data = fetch_json.json
    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    for (let i = 0; i < month; i++) {
        if (!m) { m = 12; y-- }
        ret.push(find_info(fetch_data, y, m))
        m--
    }
    return ret
} 

class EchartsBar extends React.Component {
    state = {option:{}}
    componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        //지난 3달간의 통계자료를 얻는다
        let month = 6
        let now = new Date()
        let y = now.getFullYear()
        let m = now.getMonth() + 1

        for (let i = 0; i < month; i++) {
            if (!m) {
                m = 12
                y--
            }
            date[i] = [y, m].join('-')
            m--
        }

        //월별 가입자등록리력
        option.series[0].data = await fetchMonthlyData('user', month)

        //월별 콘텐트등록리력
        option.series[1].data = await fetchMonthlyData('content', month)

        //월별 댓글등록리력
        option.series[2].data = await fetchMonthlyData('review', month)

        //월별 광고등록리력
        option.series[3].data = await fetchMonthlyData('advert', month)


        // if(vm && vm.echarts_instance)
        //     vm.echarts_instance.setOption(option, true);
        const { translate } = this.props;
        option.title.text = translate('com.dashboard.monthly_history')
        option.series[0].name = translate('com.dashboard.register_cnt')
        option.series[1].name = translate('com.dashboard.content_cnt')
        option.series[2].name = translate('com.dashboard.review_cnt')
        option.series[3].name = translate('com.dashboard.advert_cnt')

        this.setState({option:option})
    }

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.state.option}
                notMerge={true}
                lazyUpdate={true}
                ref={(e) => {
                    if(e) {
                        this.echarts_instance = e.getEchartsInstance();
                        // this.echarts_instance.showLoading();

                    }
                }}
            />
        )
    }
}

const enhance = compose(
    translate,
);

export default enhance(EchartsBar);