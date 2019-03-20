<template>
    <div>
        <el-select v-model="value" placeholder="Filter by..." class="style-select">
            <el-option-group v-for="group in filters" :key="group.label" :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.label"
                    :label="item.value"
                    :value="item.value"
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
            value: undefined
        };
    },
    computed: {
        filters: function() {
            return this.$store.state.filters;
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
