<template>
    <img :src="image">
</template>

<script>
export default {
    data() {
        return {
            image: undefined
        };
    },
    mounted() {
        this.image = this.$route.params.image;
    }
};
</script>

<style lang="scss" scoped>
</style>


