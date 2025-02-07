<template>
    <div ref="echart" class="back"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'ECharts',
    props: {
        xData: { default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, //横坐标
        yData: { default: [23, 24, 18, 25, 27, 28, 25, 50, 22, 29] }, //人数数据
        yName: { default: "坐标" },
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
                xAxis: {
                },
                yAxis: {},
                series: [{
                    name: this.yName,
                    type: 'line',
                    data: [
                        [0, 20],
                        [10, 23],
                        [20, 22],
                        [30, 20],
                        [40, 30]]
                },
                {
                    name: "Y坐标",
                    type: 'line',
                    data: [
                        [0, 10],
                        [10, 13],
                        [20, 12],
                        [30, 10],
                        [40, 10]]
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
    flex:1;
    width: 100%;
    height: 300px;
}
</style>