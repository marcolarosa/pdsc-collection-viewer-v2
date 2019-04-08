<template>
    <div class="my-2">
        <div class="row">
            <div class="col text-center">{{video.name}}</div>
        </div>
        <div class="row">
            <div class="col text-center">
                <!-- <router-link :to="{ name: 'viewVideo', params: { video: video }}"> -->
                <video class="style-video mx-auto">
                    <source :src="item" v-for="(item, idx) of video.item" :key="idx">Your browser does not support the
                    <code>video</code> element.
                </video>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        video: Object
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.style-video {
    max-width: 90%;
}
</style>



