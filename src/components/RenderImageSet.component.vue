<template>
    <div>
        <navbar ref="top"/>
        <div class="style-content">
            <div class="row mt-2 mb-4" v-if="images.length">
                <div class="col">
                    <div class="style-headline text-center my-2">
                        {{images[0].title}}
                        <div class="row">
                            <div class="col style-item-id">
                                {{images[0].collectionId}} /
                                {{images[0].itemId}} /
                                <item-information
                                    :collectionId="images[0].collectionId"
                                    :itemId="images[0].itemId"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-masonry transition-duration="0s" item-selector=".item">
                <div v-masonry-tile class="item" v-for="(item, idx) in images" :key="idx">
                    <render-image :image="item" v-if="item.type === 'image'" class="style-tile"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemInformation from "./ItemInformation.component.vue";
import RenderImage from "./RenderImage.component.vue";
import Navbar from "./Navbar.component.vue";
import VueScrollTo from "vue-scrollto";

export default {
    components: {
        RenderImage,
        Navbar,
        ItemInformation
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
    },
    mounted() {
        setTimeout(() => {
            VueScrollTo.scrollTo(this.$refs["top"], 100, {});
        }, 500);
    }
};
</script>

<style lang="scss" scoped>
.style-content {
    position: relative;
    top: 80px;
}

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



