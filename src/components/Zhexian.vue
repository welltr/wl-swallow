<template>
    <div ref="echart" class="back"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'ECharts',
    props: {
        xData: { default: [[1, 2]] }, //系列一
        yData: { default: [[23, 24]] }, //系列二
        title: { default: "" }
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            const chart = echarts.init(this.$refs.echart);
            const option = {
                title: {
                    text: this.title
                },
                tooltip: {},
                grid: {
                    top: '15%',
                    bottom: '8%',
                    left: '10%',
                    right: '10%'
                },
                xAxis: {
                    name: "时间/s",
                    min: "dataMin",
                    max: "dataMax"
                },
                yAxis: { name: "舌骨位置/mm" ,
                    min:10
                },
                legend: {
                    data: ['X轴坐标', 'Y轴坐标'],
                    // orient: 'vertical',
                    // bottom: 10,
                    // top: 20
                },
                series: [{
                    name: "X轴坐标",
                    type: 'line',
                    data: this.xData
                },
                {
                    name: "Y轴坐标",
                    type: 'line',
                    data: this.yData
                }
                ]
            };
            chart.setOption(option);
        }
    }
};
</script>

<style scoped>
.back {
    /* background-color: antiquewhite; */
    flex: 1;
    width: 100%;
    height: 250px;
}
</style>