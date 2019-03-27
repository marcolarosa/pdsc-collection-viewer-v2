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
                        <render-item :item="item" class=".item"/>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import { flattenDeep, includes } from "lodash";
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
            list: [],
            renderList: [],
            itemsToPush: 10,
            showItems: true
        };
    },
    computed: {
        selectedFilter: function() {
            return this.$store.state.selectedFilter;
        }
    },
    watch: {
        selectedFilter: function() {
            this.list = this.$store.state.list;
            if (this.selectedFilter) {
                this.list = this.list.filter(item => {
                    let type = this.selectedFilter.type;
                    let value = this.selectedFilter.value;
                    return item[type] === value || includes(item[type], value);
                });
            }
            this.renderList = [];
            setTimeout(this.loadMore, 200);
        }
    },
    mounted() {
        (async () => {
            let { rawData, renderList, filters } = await loadData();
            this.list = renderList.map(d => {
                return [
                    {
                        ...d.images[0],
                        images: d.images
                    },
                    ...d.audio,
                    ...d.video
                ];
            });
            this.$store.commit("setData", rawData);
            this.$store.commit("setFilters", filters);
            this.$store.commit("setList", renderList);
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
    top: 80px;
}

.item {
    margin: 15px 0;
}
@media only screen and (min-width: 600px) {
    .item {
        margin: 15px;
    }
}
</style>


