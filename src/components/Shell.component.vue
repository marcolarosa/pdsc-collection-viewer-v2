<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import { loadData } from "../data-loader.service";
import { flattenDeep, includes, orderBy, debounce } from "lodash";

export default {
    data() {
        return {};
    },
    mounted() {
        (async () => {
            this.setItemsToLoad();
            let { items, filters } = await loadData();
            this.$store.commit(
                "setItems",
                orderBy(items, ["collectionId", "itemId"])
            );
            this.$store.commit("setFilters", filters);
        })();
    },
    methods: {
        setItemsToLoad() {
            if (window.innerWidth > 800 || window.innerHeight > 800) {
                this.itemsToPush = 10;
            }
        }
    }
};
</script>

<style scoped lang="scss">
</style>
