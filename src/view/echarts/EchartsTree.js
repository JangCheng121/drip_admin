
import React, { Component } from 'react';
import { 
    GET_LIST,
} from 'react-admin';

// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/tree';

import uploadCapableDataProvider from '../../dataProvider/dataProvider';

import DataService from '../../dataProvider/dataService';
const dataService = DataService.getInstance();

const find_children = (parent_id, arr) => {
    let ret = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent_id === parent_id)
            ret.push({name:arr[i].name, children:[], id:arr[i].id})
    }
    return ret
}

const proc_one = (one, arr) => {
    one.children = find_children(one.id, arr)
    for (let i = 0; i < one.children.length; i++) {
        proc_one(one.children[i], arr)
    }
}

const convert_data = (arr) => {
    let lang = dataService.lang
    let data = 
    {
        name: lang === 'ko'? "머리부":lang === 'en'? 'header':'页眉',
        children: [],
        id:1
    }
    proc_one(data, arr)
    return data;
}

var data =
{
    "name": "머리부",
    "children": [],
}

const option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',

            data: [data],

            top: '3%',
            left: '15%',
            bottom: '3%',
            right: '15%',

            symbolSize: 12,

            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 12
                }
            },

            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },

            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
}

let vm = null

class EchartsTree extends Component {
    echarts_instance = null
    componentDidMount() {
        vm = this
        uploadCapableDataProvider(GET_LIST, 'category', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
            lang: dataService.lang,
        })
        .then((ret) => {
            option.series[0].data = [convert_data(ret.data)]
            if (vm.echarts_instance) {
                vm.echarts_instance.setOption(option, true);
            }
        })
        .catch((e) => {
            console.log(e)
        });
        if(vm && vm.echarts_instance) {
            vm.echarts_instance.setOption(option, true);
        }
    }    
    getOption = () => {
        return option
    }

    render() {
        if(!vm ) return null;
        return (
            // <ReactEcharts 
            //     ref={(e) => { 
            //         if(e) {
            //             vm.echarts_instance = e.getEchartsInstance();
            //             vm.echarts_instance.on('click', function (params) {
            //                 vm.props.history.push('/category/' + params.data.info.id)
            //             });
            //         }
            //     }}
            //     option={option}
            //     style={{height: '500px', width: '100%'}}
            //     className={'react_for_echarts'}
            // />
            <ReactEchartsCore
                echarts={echarts}
                ref={(e) => { 
                    if(e) {
                        vm.echarts_instance = e.getEchartsInstance();
                        vm.echarts_instance.on('click', function (params) {
                            vm.props.history.push('/category/' + params.data.id)
                        });
                    }
                }}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
            />            
        );

    }
}

export default EchartsTree;
