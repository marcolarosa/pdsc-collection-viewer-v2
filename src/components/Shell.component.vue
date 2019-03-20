<template>
    <div class="remove-padding">
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="10"
        >
            <render-item v-for="(item, idx) of renderList" :key="idx" :item="item" :data="data"/>
        </div>
    </div>
</template>

<script>
import { flattenDeep } from "lodash";
import { loadData } from "../data-loader.service";
import RenderItem from "./RenderItem.component.vue";

export default {
    components: {
        RenderItem
    },
    data() {
        return {
            data: [],
            list: [],
            renderList: [],
            itemsToPush: 2
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
    methods: {
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

<style scoped lang="scss">
.remove-padding {
    padding: 0;
}
</style>
