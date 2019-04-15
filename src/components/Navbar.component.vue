<template>
    <div class="style-navbar px-4">
        <div :class="{ 'style-dropdown px-4': showLinks }">
            <div class="row py-2">
                <div class="col">
                    <!-- <span class="float-right d-sm-none py-2" v-if="menuItems.contentFilter">
                        <span @click="showLinks = !showLinks">
                            <i class="fas fa-bars style-hamburger"></i>
                        </span>
                    </span>-->
                    <!-- <span class="d-none d-sm-block"> -->
                    <content-filter v-if="menuItems.contentFilter"/>
                    <!-- </span> -->
                    <router-link :to="{ path: '/'}">
                        <el-button type v-if="menuItems.home">
                            <i class="fas fa-home"></i>
                        </el-button>
                    </router-link>
                </div>
            </div>
            <span v-if="showLinks">
                <div class="row">
                    <div class="col">
                        <content-filter v-if="menuItems.contentFilter"/>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import ContentFilter from "./ContentFilter.component.vue";

export default {
    components: {
        ContentFilter
    },
    data() {
        return {
            menuItems: {
                contentFilter: true,
                home: false
            },
            showLinks: false
        };
    },
    mounted() {
        switch (this.$route.name) {
            case "viewList":
                this.menuItems = {
                    contentFilter: true,
                    home: false
                };
                break;
            default: {
                this.menuItems = {
                    contentFilter: false,
                    home: true
                };
                break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.style-navbar {
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 2;
    background-color: #013243;
}

.style-hamburger {
    font-size: 20px;
}

.style-dropdown {
    // margin: 15px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 120px;
    z-index: 2;
    overflow: hidden;
    background-color: #013243;
    overflow: hidden;
}

.style-dropdown a:hover {
    color: #fff;
}
</style>

