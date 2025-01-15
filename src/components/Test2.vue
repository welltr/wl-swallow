<template>
    <div class="flex-container-heng">
        <button>上一帧</button>
        <button>下一帧</button>

        <span>帧: {{ frame }} / {{ totalFrames }}</span>
        <span>时间: {{ time }} / {{ totalTime }}</span>
        <input type="text" value="0">
        <button>跳转</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            frame: 0,
            totalFrames: 10, // 假设总共有10帧
            time: '0:00.00',
            totalTime: '0:00.00'
        };
    }
}
</script>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
    /* 两端对齐 */
    flex-direction: column;

}

.flex-container-heng {
    display: flex;
    justify-content: space-between;
    /* 两端对齐 */
}

.flex-container button,
.flex-container input,
.flex-container span {
    margin: 5px;
    /* 设置内外边距 */
}
</style>