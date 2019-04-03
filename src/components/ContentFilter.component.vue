<template>
    <div>
        <el-select
            v-model="selectedFilter"
            placeholder="Filter by..."
            class="style-select"
            clearable
            filterable
            v-if="type === 'select'"
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

        <span v-if="type === 'overlay'">
            <el-button @click="dialogVisible = !dialogVisible">
                <i class="fas fa-search"></i>
            </el-button>
            <el-button @click="resetFilter">
                <i class="fas fa-redo" data-fa-transform="flip-h"></i>
            </el-button>
        </span>
        <el-dialog
            title="Filter by..."
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :modal="false"
        >
            <div
                v-for="group in filters"
                :key="group.label"
                :label="group.label"
                class="style-selections"
            >
                <div class="style-group-heading">{{group.label}}</div>
                <div v-for="item in group.options" :key="item.label">
                    <span @click="handleSelection(item.value)">{{ item.label }}</span>
                </div>
                <br>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "select",
            dialogVisible: false
        };
    },
    computed: {
        filters: function() {
            return this.$store.state.filters;
        },
        selectedFilter: {
            get: function() {
                return this.$store.state.selectedFilter;
            },
            set: function(value) {
                this.$store.commit("setSelectedFilter", value || undefined);
            }
        }
    },
    beforeMount() {
        window.addEventListener("resize", this.setType);
        this.setType();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setType);
    },
    methods: {
        setType() {
            this.type = window.innerWidth < 700 ? "overlay" : "select";
        },
        handleSelection(item) {
            this.$store.commit("setSelectedFilter", item || undefined);
            this.dialogVisible = false;
        },
        resetFilter() {
            this.$store.commit("setSelectedFilter", undefined);
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

.style-group-heading {
    padding: 0 0 5px 0;
    font-size: 1.2em;
    border-bottom: 1px solid #ccc;
}

.style-selections {
    cursor: pointer;
}
</style>
