<template>
    <div>
        <div class="row">
            <div class="col text-center">{{imageName}}</div>
        </div>
        <div class="row mx-2">
            <div class="col text-center">
                <router-link :to="{ name: 'viewImage', params: { image: image.item }}">
                    <img :src="image.item" class="style-image">
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
        return {};
    },
    computed: {
        imageName: function() {
            return this.image.item.split("/")[4];
        }
    }
};
</script>

<style lang="scss" scoped>
.style-image {
    max-width: 80vw;
}
@media only screen and (min-width: 600px) {
    .style-image {
        max-width: 300px;
    }
}
@media only screen and (min-width: 1200px) {
    .style-image {
        max-width: 350px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 400px;
    }
}
@media only screen and (min-width: 1500px) {
    .style-image {
        max-width: 500px;
    }
}
</style>



