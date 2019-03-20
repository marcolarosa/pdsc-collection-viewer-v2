<template>
    <div class="remove-padding">
        <navbar/>
        <div
            class="style-content"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="10"
        >
            <span v-if="showItems">
                <div v-masonry transition-duration="0s" item-selector=".item">
                    <div v-masonry-tile class="item" v-for="(item, idx) in renderList" :key="idx">
                        <render-item :item="item" :data="data" class=".item"/>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { flattenDeep } from "lodash";
import { loadData } from "../data-loader.service";
import RenderItem from "./RenderItem.component.vue";
import Navbar from "./Navbar.component.vue";

export default {
    components: {
        RenderItem,
        Navbar
    },
    data() {
        return {
            data: [],
            list: [],
            renderList: [],
            itemsToPush: 10,
            showItems: true
        };
    },
    mounted() {
        (async () => {
            let { data, asList } = await loadData();
            this.data = data;
            this.list = asList;
            this.loadMore();
        })();
    },
    ready: function() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy: function() {
        window.removeEventListener("resize", () => {});
    },
    methods: {
        handleResize() {
            this.showItems = false;
            this.renderList = [];
            this.loadMore();
            setTimeout(() => {
                this.showItems = true;
            }, 200);
        },
        loadMore() {
            if (this.renderList.length === this.list.length) return;
            this.renderList = flattenDeep([
                ...this.renderList,
                this.list.slice(
                    this.renderList.length,
                    this.renderList.length + this.itemsToPush
                )
            ]);
            console.log(this.renderList.length, this.list.length);
        }
    }
};
</script>

<style lang="scss" scoped>
.remove-padding {
    padding: 0;
}

.style-content {
    position: relative;
    top: 60px;
}
</style>


