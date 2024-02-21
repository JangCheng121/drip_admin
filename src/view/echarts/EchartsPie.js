import React from 'react';
import compose from 'recompose/compose';

import { fetchUtils, translate } from 'react-admin';
// import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/pie';

import {resolveLocale} from '../../lib/common';

const config = require('../../config')

var data = {}

function genData(res) {
    var legendData = [];
    var seriesData = [];
    var selected = {};
    var name
    for (var i = 0; i < res.length; i++) {
        name = res[i].name
        legendData.push(name);
        seriesData.push({
            name: name,
            value: res[i].count
        });
        // selected[name] = i < 6;
    }    

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}

const option = {
    title : {
        text: '접속페지통계',
        // subtext: '콘텐트',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 50,
        bottom: 20,
        data: data.legendData,
        selected: data.selected
    },
    series : [
        {
            name: '페지명',
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            color: ['rgb(131,249,103)', 'rgb(31,149,153)', '#5BFE27', '#FE5050', '#1DB7E5', '#FBFE27','rgb(11,228,96)'],
            data: data.seriesData,
            label: {
                normal: {
                    formatter: ['{c|{c}회}', '{b|{b}}'].join('\n'),
                    rich: {
                        c: {
                            color: 'rgb(141,146,104)',
                            fontSize: 10,
                            fontWeight:'bold',
                            lineHeight: 5
                        },
                        b: {
                            color: 'rgb(98,137,169)',
                            fontSize: 10,
                            height: 20
                        },
                    },
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgb(98,137,169)',
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20,    
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(0, 0, 0, 0.8)',
                    shadowBlur: 30,
                }
            }
        }
    ]
};


class EchartsPie extends React.Component {
    componentDidMount() {

    }
    async fetchData() {
        try {
            const { fetchJson } = fetchUtils;
            let options = {}
            options.headers = new Headers({ Accept: 'application/json' });
            const token = localStorage.getItem('token');
            if(token) {
                options.headers.set('authorization', `${token}`);
                let url = config.baseUrl + '/api/content/view_stat?type=1&days=30&lang=' + resolveLocale() //한달동안 열람회수를 카테고리별로 구한다
                let fetch_json = await fetchJson(url, options)
                const gd = genData(fetch_json.json)

                option.legend.data = gd.legendData
                option.series[0].data = gd.seriesData

                if (this.echarts_instance) {
                    // this.echarts_instance.hideLoading()
                    this.echarts_instance.setOption(option, true);
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    getOption = () => {
        const { translate } = this.props;
        option.title.text = translate('com.dashboard.category_portion')
        option.series[0].name = translate('com.dashboard.category_name')

        return option
    }

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
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

export default enhance(EchartsPie);