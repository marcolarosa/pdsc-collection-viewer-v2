<template>
    <div class="remove-padding">
        <navbar/>
        <div class="style-content" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
            <div v-masonry transition-duration="0s" item-selector=".item">
                <div v-masonry-tile class="item" v-for="(item, idx) in renderList" :key="idx">
                    <render-item :item="item" class=".item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { flattenDeep, includes, orderBy, debounce } from "lodash";
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
            itemsToPush: this.setItemsToLoad(),
            width: window.innerWidth,
            heigth: window.innerHeight
        };
    },
    computed: {
        selectedFilter: function() {
            return this.$store.state.selectedFilter;
        },
        items: function() {
            return this.$store.state.items;
        }
    },
    watch: {
        selectedFilter: function() {
            this.renderList = [];
            setTimeout(this.loadMore, 200);
        },
        items: function() {
            this.loadMore();
        }
    },
    mounted() {
        window.addEventListener(
            "resize",
            debounce(this.handleResize, 100, { trailing: true })
        );
        if (this.$store.state.items.length) {
            this.renderList = [];
            this.loadMore();
        }
    },
    beforeDestroy: function() {
        window.removeEventListener("resize", () => {});
    },
    methods: {
        setItemsToLoad() {
            return window.innerWidth > 800 || window.innerHeight > 800 ? 20 : 4;
        },
        handleResize() {
            setTimeout(this.$redrawVueMasonry, 200);
        },
        loadMore() {
            let items = this.$store.getters.itemsFlattened;
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


