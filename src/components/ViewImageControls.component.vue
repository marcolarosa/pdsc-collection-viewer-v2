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
                <div class="col-2">
                    <el-button @click="start" :disabled="disablePrevious" circle>
                        <i class="fas fa-chevron-double-left fa-fw"></i>
                    </el-button>
                </div>
                <div class="col-2">
                    <el-button @click="back" :disabled="disablePrevious" circle>
                        <i class="fas fa-chevron-left fa-fw"></i>
                    </el-button>
                </div>
                <div class="col-2">
                    <el-button @click="up" circle>
                        <i class="fas fa-long-arrow-alt-up fa-fw"></i>
                    </el-button>
                </div>
                <div class="col-2">
                    <el-button @click="home" circle>
                        <i class="fas fa-home fa-fw"></i>
                    </el-button>
                </div>
                <div class="col-2">
                    <el-button @click="forward" :disabled="disableNext" circle>
                        <i class="fas fa-chevron-right fa-fw"></i>
                    </el-button>
                </div>
                <div class="col-2">
                    <el-button @click="end" :disabled="disableNext" circle>
                        <i class="fas fa-chevron-double-right fa-fw"></i>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { findIndex } from "lodash";

export default {
    props: {
        image: Object
    },
    data() {
        return {
            disablePrevious: true,
            disableNext: true
        };
    },
    watch: {
        "image.name": function() {
            this.toggleControls();
        }
    },
    mounted() {
        this.toggleControls();
    },
    methods: {
        toggleControls() {
            let item = this.$store.getters.item({
                collectionId: this.image.collectionId,
                itemId: this.image.itemId
            });
            let imageIndex = findIndex(item.images, { name: this.image.name });
            this.disablePrevious = imageIndex === 0 ? true : false;
            this.disableNext =
                imageIndex < item.images.length - 1 ? false : true;
        },
        closeControls() {
            this.$emit("toggle-controls");
        },
        start() {
            this.$emit("jump-to-start");
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
        },
        end() {
            this.$emit("jump-to-end");
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



