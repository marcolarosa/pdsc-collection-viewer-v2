<template>
    <div class="my-2">
        <div class="row">
            <div class="col text-center">{{audio.name}}</div>
        </div>
        <div class="row">
            <div class="col text-center style-audio-icon">
                <!-- <router-link :to="{ name: 'viewAudio', params: { audio: audio }}"> -->
                <i class="fal fa-volume-up"></i>
                <!-- </router-link> -->
            </div>
        </div>
        <div class="row mx-2">
            <div class="col text-center">
                <audio class>
                    <source :src="item" v-for="(item, idx) of audio.item" :key="idx">Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        audio: Object
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.style-audio-icon {
    font-size: 6em;
}
</style>



