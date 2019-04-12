<template>
    <div>
        <div class="controls-overlay fixed-bottom py-2">
            <div class="row">
                <div class="col">
                    <span @click="closeControls" class="p-2 px-4 float-right style-close">
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

            <div class="row text-center style-controls py-4">
                <div class="col-3">
                    <span @click="back" class="style-control">
                        <i class="fas fa-chevron-left"></i>
                        <!-- <span class="style-control-text">previous image</span> -->
                    </span>
                </div>
                <div class="col-3">
                    <span @click="up" class="style-control">
                        <i class="fas fa-long-arrow-alt-up"></i>
                        <!-- <span class="style-control-text">up to image list</span> -->
                    </span>
                </div>
                <div class="col-3">
                    <span @click="home" class="style-control">
                        <i class="fas fa-home"></i>
                        <!-- <span class="style-control-text">up to image list</span> -->
                    </span>
                </div>
                <div class="col-3">
                    <span @click="forward" class="style-control">
                        <i class="fas fa-chevron-right"></i>
                        <!-- <span class="style-control-text">next image</span> -->
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
        closeControls() {
            this.$emit("toggle-controls");
        },
        back() {
            this.$emit("previous-image");
        },
        up() {
            this.$emit("image-list");
        },
        home() {
            this.$emit("homepage");
        },
        forward() {
            this.$emit("next-image");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/global-styles.scss";

.controls-overlay {
    // position: fixed;
    // top: 0;
    // left: 0;
    // margin-bottom: 20px;
    width: 100vw;
    z-index: 10000;
    background-color: #ececec;
    color: $background-color-dark;
}

.style-control {
    cursor: pointer;
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
    font-size: 2em;
}

// @media only screen and (min-width: 600px) and (min-height: 500px) {
//     .style-title {
//         display: block;
//         font-size: 2em;
//     }

//     .style-image-name {
//         display: block;
//         font-size: 1.5em;
//     }

//     .style-controls {
//         font-size: 2em;
//     }

//     .style-control-text {
//         display: block;
//         font-size: 20px;
//     }
// }
// @media only screen and (min-width: 900px) {
//     .style-title {
//         display: block;
//         font-size: 2em;
//     }

//     .style-image-name {
//         display: block;
//         font-size: 1.5em;
//     }

//     .style-controls {
//         font-size: 2em;
//     }

//     .style-control-text {
//         display: block;
//         font-size: 20px;
//     }
// }
</style>



