<template>
    <div>
        <div class="row mt-2 mb-4" v-if="images.length">
            <div class="col-3">
                <router-link :to="{ path: '/'}">
                    <i class="fal fa-level-up"></i>
                    <span class="style-control-text">back to index</span>
                </router-link>
            </div>
            <div class="col">
                <div class="style-headline text-center my-2">
                    {{images[0].title}}
                    <div class="row">
                        <div class="col style-item-id">
                            {{images[0].collectionId}} /
                            {{images[0].itemId}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
        <div v-masonry transition-duration="0s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(item, idx) in images" :key="idx">
                <render-image :image="item" v-if="item.type === 'image'"/>
            </div>
        </div>
    </div>
</template>

<script>
import RenderImage from "./RenderImage.component.vue";
export default {
    components: {
        RenderImage
    },
    props: {},
    data() {
        return {
            images: []
        };
    },
    beforeMount() {
        let { collectionId, itemId } = this.$route.params;
        if (!this.$store.state.items.length) {
            this.$router.push({ name: "viewList" });
            return;
        }
        this.images = this.$store.state.items.filter(item => {
            return item.collectionId === collectionId && item.itemId === itemId;
        })[0].images;
        if (!this.images.length) this.$router.push({ name: "viewList" });
    }
};
</script>

<style lang="scss" scoped>
.style-image {
    max-width: 70vw;
    min-width: 70vw;
}
@media only screen and (min-width: 600px) {
    .style-image {
        max-width: 300px;
        min-width: 300px;
    }
}
@media only screen and (min-width: 1200px) {
    .style-image {
        max-width: 350px;
        min-width: 350px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 400px;
        min-width: 400px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 500px;
        min-width: 500px;
    }
}

.style-image-placeholder {
    font-size: 10em;
}

.style-control {
    cursor: pointer;
}
</style>



