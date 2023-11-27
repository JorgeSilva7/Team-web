<template>
    <q-dialog v-model="showAddMember" no-backdrop-dismiss>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Add member</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input v-model="member.name" autofocus @keyup.enter="addMember" label="Member name*" name="member-name" />
                <q-input class='q-mt-md' v-model="member.lastName" autofocus @keyup.enter="addMember"
                    label="Member lastName*" name="member-lastname" />
                <q-input class='q-mt-md' v-model="member.email" autofocus @keyup.enter="addMember" label="Member email*"
                    name="member-email" />
                <q-input class='q-mt-md' v-model="member.dni" autofocus @keyup.enter="addMember" label="Member DNI"
                    name="member-dni" />
                <q-input class='q-mt-md' v-model="member.nickname" autofocus @keyup.enter="addMember"
                    label="Member Nickname" name="member-nickname" />
            </q-card-section>

            <p v-if="error" class="text-negative text-center">{{ error.message }}</p>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup class="text-black" />
                <q-btn flat label="Add Member" @click="addMember" class="text-primary" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-card class="q-mt-md" flat bordered>
        <q-card-section>
            <div class="row">
                <div class="col">
                    <div class="text-h6">Members ({{ members.length }})</div>
                </div>
                <div class="col">
                    <div class="text-h6 text-right" for="add-member">
                        <q-btn color="secondary" icon="person_add_alt" label="New member" @click="handlerShowAddMember" />
                    </div>
                </div>
            </div>
        </q-card-section>

        <q-markup-table id="members-table-container">
            <thead v-if="members?.length">
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-right">Email</th>
                    <th class="text-right">Nickname</th>
                    <th class="text-right">DNI</th>
                    <th class="text-right">Since</th>
                    <th class="text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in members" :key="member._id">
                    <td class="text-left">{{ member.name }} {{ member.lastName }}</td>
                    <td class="text-right">{{ member.email }}</td>
                    <td class="text-right">{{ member.nickname }}</td>
                    <td class="text-right">{{ member.dni }}</td>
                    <td class="text-right">{{ DateTime.now().diff(DateTime.fromISO(member.createdAt), 'days').days.toFixed()
                    }} days
                    </td>
                    <td class="text-right" for="actions">
                        <q-btn icon="edit" dense flat rounded @click="editMember"></q-btn>
                        <q-btn icon="delete_forever" text-color="negative" dense flat rounded @click="deleteMember"></q-btn>
                    </td>
                </tr>
            </tbody>
            <p class="text-center text-body1" v-if="!members?.length">No members yet</p>
        </q-markup-table>
        <q-inner-loading :showing="isLoading" color="green-12" />
    </q-card>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { addMember as addMemberService } from '../services/club.services'
import useClubStore from '@/stores/club.store'
import { useQuasar } from 'quasar'
import { DateTime } from 'luxon';

const $q = useQuasar()
const clubStore = useClubStore()

defineProps({
    members: {
        type: Array,
        default: []
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const initMember = {
    name: '',
    lastName: '',
    dni: '',
    email: '',
    nickname: ''
}

const showAddMember = ref(false)
const member = ref({ ...initMember })
const error = ref(null)

function handlerShowAddMember() {
    showAddMember.value = true;
    member.value = { ...initMember };
}

async function addMember() {
    error.value = null
    $q.loading.show();
    try {
        const { member: addedMember } = await addMemberService({
            member: member.value,
            clubId: clubStore.active._id,
        });
        showAddMember.value = false;
        member.value = { ...initMember };
        clubStore.setAddedMember(addedMember)
        $q.loading.hide();
        $q.notify({ message: 'Member added successfully', type: 'positive' })
    } catch (err) {
        $q.loading.hide();
        error.value = err;
    }
}

function editMember() {
    $q.notify({ message: 'Unavailable' })
}

function deleteMember() {
    $q.notify({ message: 'Unavailable' })
}
</script>
