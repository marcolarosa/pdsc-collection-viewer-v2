<template>
    <el-card class="box-card">
        <div class>
            <div class="style-headline text-center my-2" v-if="item.title">
                <a href v-on:click.prevent="filterByTitle">{{item.title}}</a>
                <div class="row">
                    <div class="col style-item-id">
                        <a href v-on:click.prevent="filterByCollection">{{item.collectionId}}</a> /
                        <a href v-on:click.prevent="filterByItem">{{item.itemId}}</a> /
                        <item-information :item="item"/>
                    </div>
                </div>
            </div>
            <render-image :image="item" v-if="item.type === 'image'"/>
            <render-audio :audio="item" v-if="item.type === 'audio'"/>
            <render-video :video="item" v-if="item.type === 'video'"/>
        </div>
    </el-card>
</template>

<script>
import ItemInformation from "./ItemInformation.component.vue";
import RenderImage from "./RenderImage.component.vue";
import RenderAudio from "./RenderAudio.component.vue";
import RenderVideo from "./RenderVideo.component.vue";

export default {
    props: {
        item: Object
    },
    components: {
        ItemInformation,
        RenderImage,
        RenderAudio,
        RenderVideo
    },
    data() {
        return {
            itemData: {}
        };
    },
    mounted() {},
    methods: {
        filterByTitle() {
            this.$store.commit("setSelectedFilter", {
                type: "title",
                value: this.item.title
            });
        },
        filterByCollection() {
            this.$store.commit("setSelectedFilter", {
                type: "collectionId",
                value: this.item.collectionId
            });
        },
        filterByItem() {
            this.$store.commit("setSelectedFilter", {
                type: "itemId",
                value: this.item.itemId
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

.box-card {
    border: 1px solid #22313f;
    box-shadow: unset;
    max-width: calc(100vw - 30px);
}
</style>


