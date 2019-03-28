<template>
    <div>
        <div class="controls-underlay"></div>
        <div class="controls-overlay">
            <div class="row">
                <div class="col">
                    <span @click="toggleControls" class="px-5 float-right style-controls">
                        <i class="fal fa-times"></i>
                    </span>
                </div>
            </div>
            <div class="row text-center my-4">
                <div class="col">
                    <span class="style-title">{{image.title}}</span>
                    <span class="style-image-name">{{image.name}}</span>
                </div>
            </div>

            <div class="row my-5 text-center style-controls">
                <div class="col-4 my-5 py-5">
                    <span @click="back">
                        <i class="fal fa-chevron-circle-left"></i>
                    </span>
                </div>
                <div class="col-4 my-5 py-5">
                    <span @click="up">
                        <i class="fal fa-level-up"></i>
                    </span>
                </div>
                <div class="col-4 my-5 py-5">
                    <span @click="forward">
                        <i class="fal fa-chevron-circle-right"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: Object
    },
    data() {
        return {};
    },
    methods: {
        toggleControls() {
            this.$emit("toggle-controls");
        },
        back() {
            this.$emit("previous-image");
        },
        up() {
            this.$emit("image-list");
        },
        forward() {
            this.$emit("next-image");
        }
    }
};
</script>

<style lang="scss" scoped>
.controls-underlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.7;
    background-color: #000;
}

.controls-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #fff;
}

.style-title {
    display: block;
    font-size: 3em;
}

.style-image-name {
    display: block;
    font-size: 1.5em;
}

.style-controls {
    font-size: 4em;
}
</style>

