<template>
    <div>
        <div class="row">
            <div class="col text-center">{{image.name}}</div>
        </div>
        <div class="row mx-2">
            <div class="col text-center">
                <router-link :to="to">
                    <!-- <span v-if="image.item.thumbnail">
                        <img :src="image.item.thumbnail" class="style-image">
                    </span>-->
                    <!-- <span v-if="!image.item.thumbnail"> -->
                    <img :src="image.item.path" class="style-image">
                    <!-- </span> -->
                </router-link>
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
        return {
            to: {}
        };
    },
    mounted() {
        if (this.$route.name === "viewList") {
            this.to = {
                path: `/images/${this.image.collectionId}/${this.image.itemId}`
            };
        } else if (this.$route.name === "images") {
            this.to = {
                path: `/image/${this.image.collectionId}/${this.image.itemId}/${
                    this.image.item.name.split(".")[0]
                }`
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.style-image {
    max-width: 70vw;
    min-width: 70vw;
}
@media only screen and (min-width: 600px) {
    .style-image {
        max-width: 300px;
        min-width: 300px;
    }
}
@media only screen and (min-width: 1200px) {
    .style-image {
        max-width: 350px;
        min-width: 350px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 400px;
        min-width: 400px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 500px;
        min-width: 500px;
    }
}

.style-image-placeholder {
    font-size: 10em;
}
</style>



