<script setup>
import { ref, computed } from 'vue'
const filler = 'Unknown';
const props = defineProps({
    name: {
        type: String,
        required: true,
        default: filler
    },
    description: {
        type: String,
        // default: 'blah blah blah'
        default: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
    },
    party: {
        type: String,
        default: "Party Unknown"
    },
    website: {
        type: String,
        default: null
    },
    imgSource: {
        type: String,
        default: "/src/assets/blueperson.png"
    },
    simScore: {
        type: Number,
        default: 0
    }
})

const simscore_display = computed(() => (
    props.simScore + "%"
))

const party = computed(() => {
    const p = props.party.charAt(0).toLowerCase();
    switch (p) {
        case 'r':
            return 'Republican'
        case 'd':
            return 'Democrat'
        default:
            return props.party
    }
})

const subtitleClass = computed(() => {
    return {
        'subtitle': true,
        'rep': party == 'Republican',
        'dem': party == 'Democrat',
        'others': !(party == 'Republican') && !(party == 'Democrat')
    }
})

const shortenedDescription = computed(() => {
    const MAX_CHAR = 300;
    if (props.description.length > MAX_CHAR)
        return props.description.slice(0, MAX_CHAR) + "..."
    else
        return props.description
})

const imgURL = computed(() => {
    if (props.imgSource == '')
        return "/src/assets/blueperson.png"
    else
        return props.imgSource
})

const officialWebsiteDisabled = ref(!props.website)

defineEmits(['redirectPage'])

</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-4 h-14rem">
            <div class="grid h-full">
                <div class="col-6 h-full flex justify-content-center align-items-center">
                    <img :src="imgURL" alt="Profile image 1">
                </div>
                <div class="col-6 h-full flex justify-content-center align-items-center">
                    <h1>{{ simscore_display }}</h1>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-8 h-14rem">
            <div class="text-container h-full">
                <div class="title">{{ name }}</div>
                <div :class="subtitleClass">{{ party }}</div>
                <div class="content my-3">
                    {{ shortenedDescription }}
                </div>
                <div class="footer">
                    <a class="mr-3" :href="website"><Button icon="pi pi-external-link" label="Official Website" :disabled="officialWebsiteDisabled"/></a>
                    <Button @click="$emit('redirectPage', name)" icon="pi pi-external-link" label="More details"
                        severity="info" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    max-height: 80%;
    width: auto;
}

h1 {
    font-family: 'Lato', sans-serif;
    font-size: 4rem;
}

.text-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
}

.subtitle {
    font-size: 1.2rem;
    font-weight: bold;
}

/* party colors */
.rep {
    color: #DE0100
}

.dem {
    color: #0015BC
}

.other {
    color: var(--text-secondary-color)
}


.footer {
    margin-top: auto;
}
</style>