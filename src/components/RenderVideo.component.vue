<template>
    <div class="my-2">
        <div class="row">
            <div class="col text-center">{{video.name}}</div>
        </div>
        <div class="row mx-2">
            <div class="col text-center">
                <!-- <router-link :to="{ name: 'viewVideo', params: { video: video }}"> -->
                <video controls class="style-video">
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
    max-width: 80vw;
}
@media only screen and (min-width: 600px) {
    .style-video {
        max-width: 300px;
    }
}
@media only screen and (min-width: 1200px) {
    .style-video {
        max-width: 350px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-video {
        max-width: 400px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-video {
        max-width: 500px;
    }
}
</style>



