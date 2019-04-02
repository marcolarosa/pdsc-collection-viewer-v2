<template>
    <div>
        <div class="style-image-container" @click="toggleControls">
            <img :src="image.item.path" class="style-image" v-if="image.item">
        </div>

        <view-image-controls
            v-if="dialogVisible"
            :image="image"
            v-on:toggle-controls="toggleControls"
            v-on:previous-image="goToPreviousImage"
            v-on:image-list="goToImageList"
            v-on:next-image="goToNextImage"
            v-on:enable-zoom="toggleZoom"
        />
    </div>
</template>

<script>
import { findIndex } from "lodash";
import ViewImageControls from "./ViewImageControls.component.vue";

export default {
    components: {
        ViewImageControls
    },
    data() {
        return {
            image: {},
            images: [],
            dialogVisible: false
        };
    },
    mounted() {
        this.loadImage();
    },
    watch: {
        $route(to, from) {
            this.loadImage();
        }
    },
    methods: {
        loadImage() {
            let { collectionId, itemId, image } = this.$route.params;
            if (!this.$store.state.items.length) {
                this.$router.push({ name: "viewList" });
                return;
            }
            this.images = this.$store.state.items.filter(item => {
                return (
                    item.collectionId === collectionId && item.itemId === itemId
                );
            })[0].images;
            if (!this.images.length) {
                this.$router.push({ name: "viewList" });
                return;
            }
            this.image = this.images.filter(i => i.name.match(image))[0];
        },
        toggleControls() {
            this.dialogVisible = !this.dialogVisible;
        },
        toggleZoom() {
            this.toggleControls();
            const viewer = ImageViewer();
            viewer.show(this.image.item.path);
        },
        goToPreviousImage() {
            let itemIndex = findIndex(this.images, { name: this.image.name });
            if (itemIndex > 0) {
                let previous = this.images[itemIndex - 1];
                this.$router.push({
                    path: `/image/${this.image.collectionId}/${
                        this.image.itemId
                    }/${previous.name.split(".")[0]}`
                });
            }
            this.loadImage();
        },
        goToNextImage() {
            let itemIndex = findIndex(this.images, { name: this.image.name });
            if (itemIndex < this.images.length - 1) {
                let next = this.images[itemIndex + 1];
                this.$router.push({
                    path: `/image/${this.image.collectionId}/${
                        this.image.itemId
                    }/${next.name.split(".")[0]}`
                });
            }
            this.loadImage();
        },
        goToImageList() {
            this.$router.push({
                path: `/images/${this.image.collectionId}/${this.image.itemId}`
            });
        }
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
    width: 100%;
}
</style>


