<script setup>
import CustomInput from '@/components/CustomInput.vue'
defineProps(['modelValue'])
defineEmits(['update:modelValue', 'submitForm'])

</script>

<template>
    <div class="address-space">
        <div class="flex flex-column gap-2 mb-3">
            <h3>Enter your address</h3>

            <!-- enter zip code-->
            <CustomInput id="address" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                placeholder="Enter address/zipcode here">
            </CustomInput>
        </div>
        <Button label="See Result" @click="$emit('submitForm')" rounded />
    </div>
</template>

<style scoped>
.address-space {
    border: solid;
    padding: 1rem
}

.address-space h3 {
    text-transform: uppercase;
}


</style>