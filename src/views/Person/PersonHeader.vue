<script setup>
defineProps({
    name: {
        type: String,
        default: "Unknown Profile"
    },
    p_type: String,
    bio:  {
        type: String,
    },
    party: {
        type: String,
    },
    state: {
        type: String,
    },
    imgSource: {
        type: String,
        default: "/src/assets/blueperson.png"
    }
})
</script>

<template>
    <div class="py-5 px-5">
            <div class="grid p-1">
                <div class="col-12 md:col-4">
                    <div class="flex w-full h-full">
                        <img class="profile-img vertical-align-middle w-10rem m-auto block"
                            :src="imgSource">
                    </div>

                </div>
                <div class="col-12 md:col-6">
                    <div class="profile-info">
                        <h2 class="profile-name">
                            {{ name }}
                        </h2>
                        <p class="profile-subtext">
                            {{ party }}
                            <br>
                            {{ state }}
                        </p>
                        <p class="profile-description">
                            {{ bio }}
                        </p>
                        <div class="flex column-gap-3">
                            <i class="pi pi-facebook"></i>
                            <i class="pi pi-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>