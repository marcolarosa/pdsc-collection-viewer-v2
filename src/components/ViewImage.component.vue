<template>
    <div class="style-image-container">
        <img :src="image" class="style-image">
    </div>
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
.style-image-container {
    position: fixed;
    overflow: scroll;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}

.style-image {
}
</style>


