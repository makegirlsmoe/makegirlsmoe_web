import React, { Component } from 'react';
import echarts from 'echarts';
import Config from '../Config';
import Utils from '../utils/Utils';
import StatUtils from '../utils/Stat';
import './Stat.css';

class Stat extends Component {

    constructor() {
        super();
        this.state = {
            visit: {
                interval: 'hour'
            }
        };
        this.charts = {};
        this.data = {};
    }

    drawVisitChart() {
        var defaultRange = {hour: 24, day: 7};
        var visitChart = echarts.init(this.charts.visit);
        var data = this.data.visit[this.state.visit.interval];
        visitChart.setOption({
            grid: {
                left: 50,
                bottom: 80
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data:['VV','UV','IP'],
                left: 0
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    startValue: data.length - defaultRange[this.state.visit.interval],
                    endValue: data.length - 1
                },
                {
                    type: 'inside',
                    show: true,
                    realtime: true
                }
            ],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    data : data.map(item => item._id)
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name:'VV',
                    type:'line',
                    smooth: true,
                    data: data.map(item => item.vv)
                },
                {
                    name:'UV',
                    type:'line',
                    smooth: true,
                    data: data.map(item => item.uv)
                },
                {
                    name:'IP',
                    type:'line',
                    smooth: true,
                    data: data.map(item => item.ip)
                }
            ]
        });
    }

    componentDidMount() {
        StatUtils.getSummary().then(data => {
            this.setState({summary: data});
        });

        StatUtils.getVisit().then(data => {
            this.data.visit = data;
            this.drawVisitChart();
        });

        var accessChart = echarts.init(this.charts.access);
        StatUtils.getAccess().then(data => {
            accessChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'Successful',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data.map(item => ({
                            value: Utils.sum(Object.values(item.location)),
                            name: item.successful ? 'Successful' : 'Failed'
                        }))
                    },
                    {
                        name:'Location',
                        type:'pie',
                        radius: ['50%', '70%'],

                        data: Utils.flatMap(data, item => Object.keys(item.location).map(key => ({
                            value: item.location[key],
                            name: (item.successful ? 'Successful' : 'Failed') + '_' + key
                        })))
                    }
                ]
            });
        });

        var amountChart = echarts.init(this.charts.amount);
        var amountMin = 1;
        var amountMax = 100;
        StatUtils.getAmount().then(data => {
            data = data.sort((a, b) => b._id - a._id);
            var tmp = {};
            var j = 0;
            for (var i = amountMax; i >= amountMin; i--) {
                tmp[i] = tmp[i + 1] || 0;
                for (; (!data[j] || data[j]._id >= i) && j < data.length; j++) {
                    tmp[i] += data[j].count;
                }
            }
            amountChart.setOption({
                grid: {
                    left: 50
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        return params.value[1] + ' user(s) generated ' + params.name + ' image(s)';
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'value',
                    min: amountMin,
                    max: amountMax,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    max: tmp[amountMin]
                },
                series: [{
                    name: 'User Count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: Object.keys(tmp).map(key => ({
                        name: key + '+',
                        value: [key, tmp[key]]
                    }))
                }]
            });
        });

        var labelsChart = echarts.init(this.charts.labels);
        var options = Config.options.map(item => item.key);
        var values = [
            {name:'brown',color:'#825e53'},
            {name:'red',color:'#da3f3d'},
            {name:'orange',color:'#f9b949'},
            {name:'yellow',color:'#faf585'},
            {name:'green',color:'#60c15a'},
            {name:'blue',color:'#3967ac'},
            {name:'purple',color:'#8363c6'},
            {name:'pink',color:'#fbc2b6'},
            {name:'aqua',color:'#a2d5f4'},
            {name:'blonde',color:'#fae9bd'},
            {name:'white',color:'#dddddd'},
            {name:'silver',color:'#c4ccd3'},
            {name:'grey',color:'#aaaaaa'},
            {name:'black',color:'#546570'},
            {name:'long_hair',color:'#da3f3d'},
            {name:'short_hair',color:'#f9b949'},
            {name:'twin_tail',color:'#60c15a'},
            {name:'drill_hair',color:'#3967ac'},
            {name:'ponytail',color:'#8363c6'},
            {name:'off',color:'#f8b3a4'},
            {name:'random',color:'#a2d5f4'},
            {name:'on',color:'#88dd8f'}
        ];
        StatUtils.getLabels().then(data => {
            labelsChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        return [params[0].axisValueLabel].concat(params.filter(param => param.data).map(param => {
                            return param.marker + '<span>' + param.seriesName + ':' + param.data + '</span>';
                        })).join('<br>')
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    max: Utils.sum(Object.values(Object.values(data)[0]))
                },
                yAxis: {
                    type: 'category',
                    data: options.map(Utils.keyToString).reverse(),
                },
                series: values.map(value => ({
                    name: Utils.keyToString(value.name),
                    itemStyle: {
                        normal: {
                            color: value.color
                        }
                    },
                    type: 'bar',
                    stack: 'Total',
                    data: options.map(option => data[option] && data[option][value.name] ? data[option][value.name].toFixed(2) : null).reverse()
                }))
            });
        });
    }

    onVisitIntervalChange(value) {
        this.setState({visit: Object.assign({}, this.state.visit,  {interval: value})}, () => this.drawVisitChart());
    }

    renderVisitOptions() {
        return (
            <div className="dropdown multiple-selector">
                <button className="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="dropdown-toggle">
                        <div>{Utils.keyToString(this.state.visit.interval)}</div>
                        <div className="caret" />
                    </div>

                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a onClick={() => this.onVisitIntervalChange('hour')}>{Utils.keyToString('hour')}</a></li>
                    <li><a onClick={() => this.onVisitIntervalChange('day')}>{Utils.keyToString('day')}</a></li>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div className="stat">
                <h3 style={{color: Config.colors.theme}}>Statistics</h3>

                {this.state.summary &&
                <div>
                    <p>VV: {this.state.summary.vv}</p>
                    <p>UV: {this.state.summary.uv}</p>
                    <p>IP: {this.state.summary.ip}</p>
                    <p>Share: {this.state.summary.share}</p>
                </div>
                }

                {this.renderVisitOptions()}
                <div className="chart chart-visit" ref={obj => this.charts.visit = obj} />

                <span>Statistics of last 30000 sessions:</span>
                <div className="chart chart-access" ref={obj => this.charts.access = obj} />
                <div className="chart chart-amount" ref={obj => this.charts.amount = obj} />
                <div className="chart chart-labels" ref={obj => this.charts.labels = obj} />

            </div>
        );
    }
}

export default Stat;
