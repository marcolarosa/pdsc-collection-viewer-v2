<template>
    <div class="style-image-container">
        <img :src="image.item.path" class="style-image" v-if="image.item">
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: {}
        };
    },
    mounted() {
        let { collectionId, itemId, image } = this.$route.params;
        if (!this.$store.state.list.length) {
            this.$router.push({ name: "viewList" });
            return;
        }
        let images = this.$store.state.list.filter(item => {
            return item.collectionId === collectionId && item.itemId === itemId;
        })[0].images;
        if (!images.length) {
            this.$router.push({ name: "viewList" });
            return;
        }
        this.image = images.filter(i => i.name.match(image))[0];
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


