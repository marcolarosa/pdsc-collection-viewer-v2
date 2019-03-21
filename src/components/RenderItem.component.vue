<template>
    <div class="my-4">
        <div class="style-headline text-center my-2" v-if="itemData.data">
            <!-- {{item.collectionId}}
            /
            {{item.itemId}}
            :-->
            <a href v-on:click.prevent="filterByTitle">{{itemData.data.title}}</a>
            <div class="row">
                <div class="col style-item-id">
                    <a href v-on:click.prevent="filterByCollection">{{item.collectionId}}</a> /
                    <a href v-on:click.prevent="filterByItem">{{item.itemId}}</a>
                </div>
            </div>
        </div>
        <render-image :image="item" v-if="item.type === 'image'"/>
        <render-audio :audio="item" v-if="item.type === 'audio'"/>
        <render-video :video="item" v-if="item.type === 'video'"/>
    </div>
</template>

<script>
import RenderImage from "./RenderImage.component.vue";
import RenderAudio from "./RenderAudio.component.vue";
import RenderVideo from "./RenderVideo.component.vue";

export default {
    props: {
        item: Object,
        data: Array
    },
    components: {
        RenderImage,
        RenderAudio,
        RenderVideo
    },
    data() {
        return {
            itemData: {}
        };
    },
    mounted() {
        let collectionItems = this.data.filter(
            d => d.collectionId === this.item.collectionId
        );
        this.itemData = collectionItems.filter(
            i => i.itemId === this.item.itemId
        )[0];
    },
    methods: {
        filterByTitle() {
            this.$store.commit("setSelectedFilter", {
                type: "title",
                value: this.itemData.data.title
            });
        },
        filterByCollection() {
            this.$store.commit("setSelectedFilter", {
                type: "collectionId",
                value: this.itemData.collectionId
            });
        },
        filterByItem() {
            this.$store.commit("setSelectedFilter", {
                type: "itemId",
                value: this.itemData.itemId
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.style-headline {
    font-size: 18px;
    letter-spacing: 1px;
}

.style-item-id {
    font-size: 12px;
}
</style>


