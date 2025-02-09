<template>
    <div class="containbig">
        <div class="biaoti">吞咽微动作起止时间</div>

        <div class="recog">
            <div v-for="(elem, index) in time_info" :key="index" class="recog-cls">
                <div class="title kaiti cuti">{{ elem.name }}</div>

                <div class="period">
                    <input :class="['dis', 'kaiti', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedKou].start" />
                    <div class="kaiti cuti">~</div>
                    <input :class="['dis', 'kaiti', { 'no-border': !isEditable }]" :readonly="!isEditable"
                        v-model="elem.period[selectedKou].end"></input>
                    <div class="kaiti">s</div>
                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { usePhaseStore } from '@/stores/phase';
const { time_info } = storeToRefs(usePhaseStore())

import { useStateStore, useKongzhiStore} from '@/stores/state'
const { selectedKou } = storeToRefs(useStateStore())
const { isEditable } = storeToRefs(useKongzhiStore())

</script>



<style scoped>
.biaoti{
    /* background-color: aliceblue; */
    font-family: 'STKaiti';
    font-size: 20px;
    font-weight: bold;
}
.containbig {
    /* background-color: aquamarine; */
    /* margin: auto 5%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.flex-container-middle {
    flex: 1;
    /* background-color: aqua; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.anniu {
    /* flex:1; */
    padding: 0 5%;
}


.phase-report {
    background: black;
    padding: 1% 5%;
    /* margin-bottom: 20px; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'STKaiti';

}

.flex-container-right {
    display: flex;
    justify-content: flex-end;
}


.kaiti {
    font-family: 'STKaiti';
    font-size: 18px;
}
.cuti{
    font-weight: bold
}

.recog {
    /* flex: 8; */
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.recog-cls {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 5px;
}

.title {
    /* background-color: aliceblue; */
    /* font-weight: bold; */
    flex: 1;
}

.period {
    /* background-color: lightgray; */
    flex: 1;

    display: flex;
    justify-content: space-between;

}

.dis {
    /* background-color: aqua; */
    width: 30%;
    margin: 0 5%;
    text-align: center;
    flex: 1;
}

.no-border {
    border: none;
    /* 定义无边框的样式 */
}
</style>
