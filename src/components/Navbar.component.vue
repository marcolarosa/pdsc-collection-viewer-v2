<template>
    <div class="style-navbar px-4">
        <div class="style-header" :class="{ 'style-dropdown px-4': showLinks }">
            <div class="row py-4">
                <div class="col">
                    <span class="float-right d-sm-none">
                        <span @click="showLinks = !showLinks">
                            <i class="fas fa-bars style-hamburger"></i>
                        </span>
                    </span>
                    <span class="float-right d-none d-sm-block">
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
            <span v-if="showLinks" class="style-dropdown">
                <!-- <div class="row">
                    <div class="col">
                        <span class="style-link">
                            <router-link to="/features">features</router-link>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span class="style-link">
                            <router-link to="/pricing">pricing</router-link>
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span class="style-link">
                            <router-link to="/login">login</router-link>
                        </span>
                    </div>
                </div>-->
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showLinks: false
        };
    }
};
</script>

<style lang="scss" scoped>
/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.style-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 2;
    background-color: red;
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
    overflow: hidden;
    background-color: red;
}

.style-dropdown a:hover {
    color: #fff;
}
</style>

