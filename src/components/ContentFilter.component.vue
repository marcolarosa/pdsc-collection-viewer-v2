<template>
    <div>
        <el-select
            v-model="selectedFilter"
            placeholder="Filter by..."
            class="style-select"
            @change="setSelectedFilter"
            clearable
            filterable
        >
            <el-option-group v-for="group in filters" :key="group.label" :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.label"
                    :label="item.value.label"
                    :value="item.value"
                    :value-key="item.value.value"
                >
                    <span>{{ item.label }}</span>
                </el-option>
            </el-option-group>
        </el-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFilter: undefined
        };
    },
    computed: {
        filters: function() {
            return this.$store.state.filters;
        }
    },
    methods: {
        setSelectedFilter() {
            this.$store.commit(
                "setSelectedFilter",
                this.selectedFilter || undefined
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.style-select {
    width: 100%;
}
@media only screen and (min-width: 600px) {
    .style-select {
        max-width: 500px;
    }
}
</style>
