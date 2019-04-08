<template>
    <div class="remove-padding">
        <navbar/>
        <div
            class="style-content"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="10"
        >
            <span v-show="showItems">
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
import { flattenDeep, includes, orderBy, debounce } from "lodash";
import { loadData, flattenItemList } from "../data-loader.service";
import RenderItem from "./RenderItem.component.vue";
import Navbar from "./Navbar.component.vue";

export default {
    components: {
        RenderItem,
        Navbar
    },
    data() {
        return {
            renderList: [],
            itemsToPush: 4,
            showItems: true,
            width: window.innerWidth,
            heigth: window.innerHeight
        };
    },
    computed: {
        selectedFilter: function() {
            return this.$store.state.selectedFilter;
        }
    },
    watch: {
        selectedFilter: function() {
            this.renderList = [];
            setTimeout(this.loadMore, 200);
        }
    },
    mounted() {
        window.addEventListener(
            "resize",
            debounce(this.handleResize, 100, { trailing: true })
        );
        (async () => {
            this.setItemsToLoad();
            let { items, filters } = await loadData();
            this.$store.commit(
                "setItems",
                orderBy(items, ["collectionId", "itemId"])
            );
            this.$store.commit("setFilters", filters);
            this.handleResize();
            this.loadMore();
        })();
    },
    beforeDestroy: function() {
        window.removeEventListener("resize", () => {});
    },
    methods: {
        setItemsToLoad() {
            if (window.innerWidth > 800 || window.innerHeight > 800) {
                this.itemsToPush = 10;
            }
        },
        handleResize() {
            setTimeout(this.$redrawVueMasonry, 200);
        },
        loadMore() {
            let items = flattenItemList(this.$store.state.items);
            if (this.selectedFilter) {
                items = items.filter(item => {
                    let type = this.selectedFilter.type;
                    let value = this.selectedFilter.value;
                    return item[type] === value || includes(item[type], value);
                });
            }
            if (this.renderList.length === items.length) return;

            this.renderList = flattenDeep([
                ...this.renderList,
                items.slice(
                    this.renderList.length,
                    this.renderList.length + this.itemsToPush
                )
            ]);
            setTimeout(this.$redrawVueMasonry, 500);
            console.log(this.renderList.length, items.length);
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


