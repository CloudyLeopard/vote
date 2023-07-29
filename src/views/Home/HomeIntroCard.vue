<script setup>
defineProps({
    'heading': String,
    'subtext': String,
    'icon': String,
    'to': {
        type: String,
        default() {
            return '/'
        }
    }
})
</script>

<template>
    <div class="option-card">
        <i :class="icon" style="font-size: 2rem"></i>
        <router-link :to="to">
            <h1 class="heading">{{ heading }}</h1>
        </router-link>
        <p class="subtext">{{ subtext }}</p>
    </div>
</template>

<style scoped>
.option-card>* {
    margin: 0;
    text-align: center;
}

.option-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    padding-top: 5rem;
    padding-bottom: 5rem;

    background-color: aqua;
    border: solid;
}

@media screen and (max-width: 600px) {

    /* For screens with width up to 600px (e.g., phone size) */
    .option-card {
        border: none;
    }
}
</style>