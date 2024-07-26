import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import router from '../../router'
import useSwal from '../swal'

export default function useJadwal() {
    const jadwal = ref([])
    const { accepted, confirm, rejected } = useSwal();
    const route = useRoute()
    const router = useRouter()

    async function index() {
        const response = await axios.get('/api/v1/admin/jadwal')
        jadwal.value = response.data.data
    }

    async function storeJadwal(payload) {
        try {
            const response = await axios.post('/api/v1/admin/jadwal', payload)
            accepted(response.data.message);
            router.back()
        } catch (error) {
            rejected(error.response?.data.message)
        }
    }

    async function getJadwal() {
        const response = await axios.get(`/api/v1/admin/jadwal/${route.params.id}`)
        jadwal.value = response.data.data
    }

    async function updateJadwal(payload) {
        const response = await confirm('update data?')

        if(response.isConfirmed) {
            try {
                const response = await axios.put(`/api/v1/admin/jadwal/${route.params.id}`, payload)
                accepted(response.data.message)
                router.back()
            } catch (error) {
                rejected(error.response?.data.message)
            }
        }
    }

    async function destroyJadwal(id) {
        const response = await confirm('Hapus data ini?')

        if(response.isConfirmed) {
            try {
                const response = await axios.delete(`/api/v1/admin/jadwal/${id}`)
                accepted(response.data.message)
                window.location.reload()
            } catch (error) {
                rejected(error.response?.data.message)
            }
        }
    }

    return {
        jadwal,
        index,
        storeJadwal,
        getJadwal,
        updateJadwal,
        destroyJadwal
    }
}