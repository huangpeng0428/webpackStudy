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
            initData: 'Vue开发环境运行成功1'
        }
    }
}
</script>

<style scoped>
.textdemo{
    color:#000;
}
</style>