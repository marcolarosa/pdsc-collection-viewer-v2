<template>
    <div class="my-2">
        <div class="row">
            <div class="col text-center">{{video.name}}</div>
        </div>
        <div class="row" @click="dialogVisible = !dialogVisible">
            <div class="col text-center">
                <video controls class="style-video mx-auto video-ignore-events">
                    <source :src="item" v-for="(item, idx) of video.item" :key="idx">Your browser does not support the
                    <code>video</code> element.
                </video>
            </div>
        </div>

        <el-dialog
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :before-close="beforeClose"
            @open="play"
        >
            <div class="my-2 text-center">
                <div class="style-headline text-center style-tile-title">{{video.title}}</div>
                <div class="row my-2">
                    <div class="col style-item-id">
                        {{video.collectionId}} /
                        {{video.itemId}}
                    </div>
                </div>
                <div class="row">
                    <div class="col">{{video.name}}</div>
                </div>
                <div class="row">
                    <div class="col">
                        <video controls autoplay class="style-video mx-auto" ref="videoElement">
                            <source :src="item" v-for="(item, idx) of video.item" :key="idx">Your browser does not support the
                            <code>video</code> element.
                        </video>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        video: Object
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        beforeClose() {
            this.$refs["videoElement"].pause();
            this.dialogVisible = false;
        },
        play() {
            setTimeout(() => {
                this.$refs["videoElement"].play();
            }, 500);
        }
    }
};
</script>

<style lang="scss" scoped>
.video-ignore-events {
    pointer-events: none;
}

.style-video {
    cursor: pointer;
    max-width: 90%;
}
</style>



