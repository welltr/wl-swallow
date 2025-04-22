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
                    bottom: '10%',
                    left: '10%',
                    right: '10%'
                },
                xAxis: {
                    name: "time/s",
                    min: "dataMin",
                    max: "dataMax"
                },
                yAxis: { name: "Hyoid position/mm" ,
                    min:10
                },
                legend: {
                    data: ['X-axis coordinate', 'Y-axis coordinate'],
                    // orient: 'vertical',
                    // bottom: 10,
                    // top: 20
                },
                series: [{
                    name: "X-axis coordinate",
                    type: 'line',
                    data: this.xData
                },
                {
                    name: "Y-axis coordinate",
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
    height: 200px;
}
</style>