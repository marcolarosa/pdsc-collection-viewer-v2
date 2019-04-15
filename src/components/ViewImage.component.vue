<template>
    <div>
        <div class="style-image-container">
            <img :src="image.item.path" class="style-image" v-if="image.item">
        </div>

        <view-image-controls
            v-if="dialogVisible"
            :image="image"
            v-on:toggle-controls="toggleControls"
            v-on:previous-image="goToPreviousImage"
            v-on:image-list="goToImageList"
            v-on:homepage="goToHomePage"
            v-on:next-image="goToNextImage"
            v-on:jump-to-start="goToFirstImage"
            v-on:jump-to-end="goToLastImage"
        />
    </div>
</template>

<script>
import { findIndex } from "lodash";
import ViewImageControls from "./ViewImageControls.component.vue";
import { FullScreenViewer } from "iv-viewer";
import Hammer from "hammerjs";

export default {
    components: {
        ViewImageControls
    },
    data() {
        return {
            viewer: this.setupViewer(),
            image: {},
            images: [],
            dialogVisible: false
        };
    },
    mounted() {
        this.loadImage();
    },
    beforeDestroy() {
        if (this.viewer) {
            this.viewer.hide();
            this.viewer.destroy();
        }
    },
    watch: {
        $route(to, from) {
            this.loadImage();
        }
    },
    methods: {
        setupViewer() {
            const element = document.getElementsByClassName("iv-fullscreen")[0];
            if (element) {
                element.parentNode.removeChild(element);
            }
            return new FullScreenViewer();
        },
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
            this.toggleZoom();
        },
        toggleControls() {
            this.dialogVisible = !this.dialogVisible;
        },
        toggleZoom() {
            this.viewer.show(this.image.item.path);
            setTimeout(() => {
                const element = document.getElementsByClassName(
                    "iv-fullscreen"
                );

                var hammertime = new Hammer(element[0], {});
                hammertime.on("tap", () => {
                    this.dialogVisible = !this.dialogVisible;
                });
            }, 100);
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
        goToFirstImage() {
            this.$router.push({
                path: `/image/${this.image.collectionId}/${this.image.itemId}/${
                    this.images[0].name.split(".")[0]
                }`
            });
        },
        goToLastImage() {
            this.$router.push({
                path: `/image/${this.image.collectionId}/${this.image.itemId}/${
                    this.images[this.images.length - 1].name.split(".")[0]
                }`
            });
        },
        goToImageList() {
            this.$router.push({
                path: `/images/${this.image.collectionId}/${this.image.itemId}`
            });
        },
        goToHomePage() {
            this.$router.push({ name: "viewList" });
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

<style lang="scss">
.iv-fullscreen-close {
    display: none;
}
</style>



