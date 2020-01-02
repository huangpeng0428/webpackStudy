<template>
    <div class="container">
        <p class="textdemo">hehe</p>
        <h1>{{initData}}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            initData: '测试Vue开发环境运行成功'
        }
    }
}
</script>

<style scoped>
.textdemo{
    color:#000;
}
</style>