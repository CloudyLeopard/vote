<script setup>
const filler = 'Unknown';
defineProps({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: filler
    },
    party: {
        type: String,
        default: filler
    },
    website: String,
    imgSource: {
        type: String,
        default: "/src/assets/blueperson.png"
    },
    simScore: null
})

defineEmits(['redirectPage'])

</script>

<template>
    <Card class="shadow-2 border-round" style="height: 34em">
        <template #header>
            <div style="height: 15em; overflow: hidden">
                <img class="cropped-image" alt="politician image" :src="imgSource" />
            </div>
        </template>
        <template #title> {{ name }} </template>
        <template #subtitle> {{ party }} </template>
        <template #content>
            <p class="m-0 overflow-auto" style="height: 7em">
                {{ description }}
            </p>
        </template>
        <template #footer>
            <a class="mr-3" :href="website"><Button icon="pi pi-external-link" label="Official Website" /></a>
            <Button @click="$emit('redirectPage', name)" icon="pi pi-external-link" label="More details" severity="info" />
        </template>
    </Card>
</template>

<style scoped>
.cropped-image {
  width: 100%; /* Make the image fill the container horizontally */
  height: 100%; /* Make the image fill the container vertically */
  object-fit: cover; /* Maintain aspect ratio and cover the container */
}

</style>