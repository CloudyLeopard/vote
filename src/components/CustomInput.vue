<script setup>
defineProps(['value', 'placeholder'])
defineEmits(['update:value'])
</script>
<template>
    <input :value="value" @input="$emit('update:value', $event.target.value)"
        class="transparent-input" type="text" :placeholder="placeholder">
</template>

<style scoped>
input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 5px;

    border-bottom: solid;

}
</style>