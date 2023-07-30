<script setup>
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>
<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
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