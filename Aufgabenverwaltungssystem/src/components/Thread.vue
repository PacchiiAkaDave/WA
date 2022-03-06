<template>
    <div >
    <h2>{{title}}</h2>
    <h4>{{desc}}</h4>
    <q-list>
        <template v-for="answer in answers">
            <br>
            <q-item>
                {{answer}}
            </q-item>
        </template>
    </q-list>

    <AnswerForm/>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import AnswerForm from "./AnswerForm.vue"

export default defineComponent({
    name: 'Thread',
    components:{
        AnswerForm
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            default: () => []
        }
    },
    setup() {


        return{

        }
    }
})
</script>
