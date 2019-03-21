<template>
    <div class="style-navbar px-4">
        <div :class="{ 'style-dropdown px-4': showLinks }">
            <div class="row py-2">
                <div class="col">
                    <span class="float-right d-sm-none py-2">
                        <span @click="showLinks = !showLinks">
                            <i class="fas fa-bars style-hamburger"></i>
                        </span>
                    </span>
                    <span class="d-none d-sm-block">
                        <content-filter/>
                        <!-- <span class="style-link">
                            <router-link to="/features">features</router-link>
                        </span>
                        <span class="style-link">
                            <router-link to="/pricing">pricing</router-link>
                        </span>
                        <span class="style-link">
                            <router-link to="/login">login</router-link>
                        </span>-->
                    </span>
                </div>
            </div>
            <span v-if="showLinks">
                <div class="row">
                    <div class="col">
                        <content-filter/>
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
            showLinks: false
        };
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

