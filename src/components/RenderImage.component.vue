<template>
    <div class="row">
        <div class="col text-center">
            <router-link :to="{ name: 'viewImage', params: { image: image }}">
                <img :src="image" class="style-image">
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.style-image {
    max-width: 90vw;
}
</style>



