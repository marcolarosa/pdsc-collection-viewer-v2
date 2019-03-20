<template>
    <div class="my-4">
        <div class="style-headline text-center my-2" v-if="itemData.data">
            <!-- {{item.collectionId}}
            /
            {{item.itemId}}
            :-->
            {{itemData.data.title}}
        </div>
        <render-image :image="item" v-if="item.type === 'image'"/>
    </div>
</template>

<script>
import RenderImage from "./RenderImage.component.vue";
export default {
    props: {
        item: Object,
        data: Array
    },
    components: {
        RenderImage
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
    }
};
</script>

<style lang="scss" scoped>
.style-headline {
    font-size: 16px;
    letter-spacing: 1px;
}
</style>


