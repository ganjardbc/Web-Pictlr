<template>
    <div class="width width-800px width-center padding-30px">
        <h1 class="txt-site txt-big txt-center txt-main txt-extra-bold">
            Results for 
            <span class="txt-site txt-big txt-main txt-extra-bold txt-capital">
                {{ ctrSearch }}
            </span>
        </h1>
    </div>
</template>
<script>

export default {
    data () {
        return {
            ctrSearch: this.$route.params.ctr.replace('+', ' '),
        }
    }
}
</script>

