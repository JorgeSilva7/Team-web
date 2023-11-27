<template>
    <q-dialog v-model="showAddSubscription" no-backdrop-dismiss class="subscriptions">
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Add Subscription type</div>
            </q-card-section>

            <q-card-section class="q-pt-none" id="subscription-form">
                <q-input v-model="subscription.name" autofocus @keyup.enter="addSubscription" label="Subscription name*" />
                <q-input class='q-mt-md' v-model="subscription.description" autofocus @keyup.enter="addSubscription"
                    label="Description*" />
                <q-input class='q-mt-md' type="number" v-model="subscription.price" autofocus @keyup.enter="addSubscription"
                    label="Subscription price*" />
            </q-card-section>

            <p v-if="error" class="text-negative text-center">{{ error.message }}</p>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup class="text-black" />
                <q-btn flat label="Add Subscription" @click="addSubscription" class="text-primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-card class="subscription-card q-mt-md" flat bordered>
        <q-card-section>
            <div class="row">
                <div class="col">
                    <div class="text-h6">Subscriptions Type</div>
                </div>
                <div class="col">
                    <div class="text-h6 text-right" for="add-subscription">
                        <q-btn color="secondary" icon="card_membership" label="Add subscription type"
                            @click="handlerShowAddSubscription" />
                    </div>
                </div>
            </div>
        </q-card-section>

        <q-markup-table id="subscriptions-table-container">
            <thead v-if="subscriptions?.length">
                <tr>
                    <th class="text-left" width="20%">Name</th>
                    <th class="text-left" width="50%">Description</th>
                    <th class="text-left" width="20%">Price</th>
                    <th class="text-left" width="10%">Members</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subscription in subscriptions" :key="subscription._id">
                    <td class="text-left">{{ subscription.name }}</td>
                    <td class="text-left">{{ subscription.description }}</td>
                    <td class="text-left">{{ subscription.price }}</td>
                    <td class="text-left">{{ subscription.members }}</td>
                </tr>
            </tbody>
            <p class="text-center text-body1" v-if="!subscriptions?.length">No subscriptions type configured yet</p>
        </q-markup-table>
        <q-inner-loading :showing="isLoading" color="green-12" />
    </q-card>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { addSubscription as addSubscriptionService } from '../services/club.services'
import useClubStore from '@/stores/club.store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const clubStore = useClubStore()

defineProps({
    subscriptions: {
        type: Array,
        default: []
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const initSubscription = {
    name: '',
    description: '',
    price: 0,
}

const showAddSubscription = ref(false)
const subscription = ref({ ...initSubscription })
const error = ref(null)

function handlerShowAddSubscription() {
    showAddSubscription.value = true;
    subscription.value = { ...initSubscription };
}

async function addSubscription() {
    error.value = null
    $q.loading.show();
    try {
        const { subscription: addedSubscription } = await addSubscriptionService({
            subscription: subscription.value,
            clubId: clubStore.active._id,
        });
        showAddSubscription.value = false;
        subscription.value = { ...initSubscription };
        clubStore.setAddedSubscription(addedSubscription);
        $q.loading.hide();
        $q.notify({ message: 'Subscription type created', type: 'positive' })
    } catch (err) {
        $q.loading.hide();
        error.value = err;
    }
}
</script>

<style>
.subscription-card {
    width: 100%;
    max-width: 700px;
}
</style>