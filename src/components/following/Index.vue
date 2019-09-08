<template>
    <div class="col-full">
        <div class="width width-700px width-center padding-20px">
            <h1 class="txt-site txt-small txt-center txt-main txt-extra-bold">
                Discover Your Following and Watchs
            </h1>
            <p class="txt-site txt-11 txt-primary txt-center">
                Only you can see this page
            </p>
        </div>
        <div class="padding-5px"></div>
    </div>
</template>
<script>
export default {
    beforeCreate: function () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/welcome');
        }
    }
}
</script>
