<template>
    <div>
        <div class="controls-underlay"></div>
        <div class="controls-overlay">
            <div class="row">
                <div class="col">
                    <span @click="toggleControls" class="p-2 px-4 float-right style-close">
                        <i class="fal fa-times"></i>
                    </span>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <span class="style-title">{{image.title}}</span>
                    <span class="style-image-name">{{image.name}}</span>
                </div>
            </div>

            <div class="center-controls">
                <div class="row text-center style-controls mx-auto">
                    <div class="col-4">
                        <span @click="back" class="style-control">
                            <i class="fal fa-chevron-circle-left"></i>
                            <span class="style-control-text">previous image</span>
                        </span>
                    </div>
                    <div class="col-4">
                        <span @click="up" class="style-control">
                            <i class="fal fa-level-up"></i>
                            <span class="style-control-text">up to image list</span>
                        </span>
                    </div>
                    <div class="col-4">
                        <span @click="forward" class="style-control">
                            <i class="fal fa-chevron-circle-right"></i>
                            <span class="style-control-text">next image</span>
                        </span>
                    </div>
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

.style-control {
    cursor: pointer;
}

.center-controls > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 100vw;
}

.style-title {
    display: block;
    font-size: 1em;
}

.style-image-name {
    display: block;
    font-size: 1em;
}

.style-controls {
    font-size: 1.5em;
}

.style-control-text {
    display: block;
    font-size: 15px;
}

.style-close {
    font-size: 2.8em;
}

@media only screen and (min-width: 600px) and (min-height: 500px) {
    .style-title {
        display: block;
        font-size: 2em;
    }

    .style-image-name {
        display: block;
        font-size: 2em;
    }

    .style-controls {
        font-size: 2em;
    }

    .style-control-text {
        display: block;
        font-size: 20px;
    }
}
@media only screen and (min-width: 900px) {
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

    .style-control-text {
        display: block;
        font-size: 20px;
    }
}
</style>


