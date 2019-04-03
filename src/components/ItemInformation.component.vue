<template>
    <span>
        <el-button
            type="text"
            @click="dialogVisible = !dialogVisible"
            size="small"
            class="style-information-button"
        >
            info
            <i class="fas fa-caret-down"></i>
        </el-button>
        <el-dialog
            title="Item Information"
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :modal="false"
        >
            <div class="row">
                <div class="col">{{info.title}}</div>
            </div>
            <div class="row">
                <div class="col">{{info.collectionId}} / {{info.itemId}}</div>
            </div>
            <div class="row my-5">
                <div class="col">What else here?</div>
            </div>
        </el-dialog>
    </span>
</template>

<script>
import { loadData, flattenItemList } from "../data-loader.service";

export default {
    props: {
        item: Object
    },
    computed: {
        info: function() {
            let items = flattenItemList(this.$store.state.items);
            let item = items.filter(item => {
                return (
                    item.collectionId === this.item.collectionId &&
                    item.itemId === this.item.itemId
                );
            })[0];
            return item;
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "assets/variables.scss";

.style-information-button {
    color: $background-color-dark;
}
</style>


