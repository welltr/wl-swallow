<template>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
    <p>yData:{{ yData }}</p>

</template>

<script>
import * as echarts from "echarts";

export default {
    props: {
        xData: { default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, //横坐标
        yData: { default: [23, 24, 18, 25, 27, 28, 25, 50, 22, 29] } //人数数据

    },
    data() {
        return {
            myChart: {},
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
        };
    },
    mounted() {
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const option = {
                xAxis: {
                    data: this.xData
                },
                yAxis: {},
                series: [
                    {
                        data: this.yData,
                        type: "line" // 类型设置为折线图
                    }
                ]
            };
            this.myChart = echarts.init(document.getElementById("mychart"));
            this.myChart.setOption(option);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        }
    }
};
</script>