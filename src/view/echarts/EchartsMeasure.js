/**
 * Created by SEELE on 2017/8/23.
 */
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

const option = {
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    title : {
        text: '체계자원',
        x:'center'
    },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    series : [
        {
            name:'CPU',
            type:'gauge',
            z: 3,
            min:0,
            max:100,
            splitNumber:5,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                }
            },
            detail : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 40, name: 'CPU(%)'}]
        },
        {
            name:'CPU',
            type:'gauge',
            z: 3,
            min:0,
            max:100,
            splitNumber:5,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                }
            },
            detail : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 40, name: 'CPU(%)'}]
        },
        {
            name:'CPU',
            type:'gauge',
            z: 3,
            min:0,
            max:100,
            splitNumber:5,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                }
            },
            detail : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 40, name: 'CPU(%)'}]
        },
    ]
};

let vm = null

class EchartsMeasure extends Component {
    echarts_react = null
    echarts_instance = null
    timeTicket = null
    componentDidMount() {
        vm = this
        vm.timeTicket = setInterval(function (){
            option.series[0].data[0].value = (Math.random()*2).toFixed(2) - 0;
            // option.series[1].data[0].value = (Math.random()*2).toFixed(2) - 0;
            // if(vm.echarts_instance)
            //     vm.echarts_instance.setOption(option, true);
        },2000);

    }
    render() {
        if(!vm ) return null;
        return (
            <ReactEcharts
                // ref={(e) => {
                //     vm.echarts_react = e;
                //     vm.echarts_instance = vm.echarts_react.getEchartsInstance();
                // }}
                option={option}
                // style={{height: '800px', width: '800px'}}
                className={'react_for_echarts'}
            />
        )
    }
}

export default EchartsMeasure;