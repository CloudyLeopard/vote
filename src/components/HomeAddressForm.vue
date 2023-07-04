<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue', 'submitForm'])
</script>

<template>
    <div class="card">
        <div class="flex flex-column gap-2">
            <h3>ENTER YOUR ADDRESS</h3>
            <label for="address">Address</label>
            <InputText id="address" placeholder="4600 SILVER HILL RD, WASHINGTON, DC, 20233" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Turpis nunc eget lorem dolor sed viverra. Quis imperdiet massa tincidunt nunc pulvinar sapien.
                Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. </p>
        </div>
        <div class="flex flex-row-reverse gap-2">
            <Button label="Submit" @click="$emit('submitForm')" />
        </div>
    </div>
</template>