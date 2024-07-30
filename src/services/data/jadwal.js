import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import router from '../../router'
import useSwal from '../swal'

export default function useJadwal() {
    const jadwal = ref([])

    // menampung semua jadwal hari senin
    const seninJamSatu = ref([])
    const seninJamDua = ref([])
    const seninJamTiga = ref([])
    const seninJamEmpat = ref([])
    const seninJamLima = ref([])
    const seninJamEnam = ref([])
    const seninJamTujuh = ref([])
    const seninJamDelapan = ref([])

    // menampung semua jadwal hari selasa
    const selasaJamSatu = ref([])
    const selasaJamDua = ref([])
    const selasaJamTiga = ref([])
    const selasaJamEmpat = ref([])
    const selasaJamLima = ref([])
    const selasaJamEnam = ref([])
    const selasaJamTujuh = ref([])
    const selasaJamDelapan = ref([])

    // menampung semua jadwal hari rabu
    const rabuJamSatu = ref([])
    const rabuJamDua = ref([])
    const rabuJamTiga = ref([])
    const rabuJamEmpat = ref([])
    const rabuJamLima = ref([])
    const rabuJamEnam = ref([])
    const rabuJamTujuh = ref([])
    const rabuJamDelapan = ref([])

    // menampung semua jadwal hari kamis
    const kamisJamSatu = ref([])
    const kamisJamDua = ref([])
    const kamisJamTiga = ref([])
    const kamisJamEmpat = ref([])
    const kamisJamLima = ref([])
    const kamisJamEnam = ref([])
    const kamisJamTujuh = ref([])
    const kamisJamDelapan = ref([])

    // menampung semua jadwal hari jumat
    const jumatJamSatu = ref([])
    const jumatJamDua = ref([])
    const jumatJamTiga = ref([])
    const jumatJamEmpat = ref([])
    const jumatJamLima = ref([])
    const jumatJamEnam = ref([])
    const jumatJamTujuh = ref([])
    const jumatJamDelapan = ref([])

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

    async function jadwalSenin() {
        // jadwal hari senin
        const responseSeninSatu = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/1/senin`)
        const responseSeninDua = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/2/senin`)
        const responseSeninTiga = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/3/senin`)
        const responseSeninEmpat = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/4/senin`)
        const responseSeninLima = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/5/senin`)
        const responseSeninEnam = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/6/senin`)
        const responseSeninTujuh = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/7/senin`)
        const responseSeninDelapan = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/8/senin`)
        seninJamSatu.value = responseSeninSatu.data.data.user || null
        seninJamDua.value = responseSeninDua.data.data.user || null
        seninJamTiga.value = responseSeninTiga.data.data.user || null
        seninJamEmpat.value = responseSeninEmpat.data.data.user || null
        seninJamLima.value = responseSeninLima.data.data.user || null
        seninJamEnam.value = responseSeninEnam.data.data.user || null
        seninJamTujuh.value = responseSeninTujuh.data.data.user || null
        seninJamDelapan.value = responseSeninDelapan.data.data.user || null
    }

    async function jadwalSelasa() {
        // jadwal hari selasa
        const responseSelasaSatu = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/1/selasa`)
        const responseSelasaDua = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/2/selasa`)
        const responseSelasaTiga = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/3/selasa`)
        const responseSelasaEmpat = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/4/selasa`)
        const responseSelasaLima = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/5/selasa`)
        const responseSelasaEnam = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/6/selasa`)
        const responseSelasaTujuh = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/7/selasa`)
        const responseSelasaDelapan = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/8/selasa`)
        selasaJamSatu.value = responseSelasaSatu.data.data.user || null
        selasaJamDua.value = responseSelasaDua.data.data.user || null
        selasaJamTiga.value = responseSelasaTiga.data.data.user || null
        selasaJamEmpat.value = responseSelasaEmpat.data.data.user || null
        selasaJamLima.value = responseSelasaLima.data.data.user || null
        selasaJamEnam.value = responseSelasaEnam.data.data.user || null
        selasaJamTujuh.value = responseSelasaTujuh.data.data.user || null
        selasaJamDelapan.value = responseSelasaDelapan.data.data.user || null
    }

    async function jadwalRabu() {
        // jadwal hari rabu
        const responseRabuSatu = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/1/rabu`)
        const responseRabuDua = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/2/rabu`)
        const responseRabuTiga = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/3/rabu`)
        const responseRabuEmpat = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/4/rabu`)
        const responseRabuLima = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/5/rabu`)
        const responseRabuEnam = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/6/rabu`)
        const responseRabuTujuh = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/7/rabu`)
        const responseRabuDelapan = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/8/rabu`)
        rabuJamSatu.value = responseRabuSatu.data.data.user || null
        rabuJamDua.value = responseRabuDua.data.data.user || null
        rabuJamTiga.value = responseRabuTiga.data.data.user || null
        rabuJamEmpat.value = responseRabuEmpat.data.data.user || null
        rabuJamLima.value = responseRabuLima.data.data.user || null
        rabuJamEnam.value = responseRabuEnam.data.data.user || null
        rabuJamTujuh.value = responseRabuTujuh.data.data.user || null
        rabuJamDelapan.value = responseRabuDelapan.data.data.user || null
    }

    async function jadwalKamis() {
        // jadwal hari kamis
        const responseKamisSatu = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/1/kamis`)
        const responseKamisDua = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/2/kamis`)
        const responseKamisTiga = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/3/kamis`)
        const responseKamisEmpat = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/4/kamis`)
        const responseKamisLima = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/5/kamis`)
        const responseKamisEnam = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/6/kamis`)
        const responseKamisTujuh = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/7/kamis`)
        const responseKamisDelapan = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/8/kamis`)
        kamisJamSatu.value = responseKamisSatu.data.data.user || null
        kamisJamDua.value = responseKamisDua.data.data.user || null
        kamisJamTiga.value = responseKamisTiga.data.data.user || null
        kamisJamEmpat.value = responseKamisEmpat.data.data.user || null
        kamisJamLima.value = responseKamisLima.data.data.user || null
        kamisJamEnam.value = responseKamisEnam.data.data.user || null
        kamisJamTujuh.value = responseKamisTujuh.data.data.user || null
        kamisJamDelapan.value = responseKamisDelapan.data.data.user || null
    }

    async function jadwalJumat() {
        // jadwal hari jumat
        const responseJumatSatu = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/1/jumat`)
        const responseJumatDua = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/2/jumat`)
        const responseJumatTiga = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/3/jumat`)
        const responseJumatEmpat = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/4/jumat`)
        const responseJumatLima = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/5/jumat`)
        const responseJumatEnam = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/6/jumat`)
        const responseJumatTujuh = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/7/jumat`)
        const responseJumatDelapan = await axios.get(`/api/v1/admin/jadwal/detail/${route.params.id}/8/jumat`)
        jumatJamSatu.value = responseJumatSatu.data.data.user || null
        jumatJamDua.value = responseJumatDua.data.data.user || null
        jumatJamTiga.value = responseJumatTiga.data.data.user || null
        jumatJamEmpat.value = responseJumatEmpat.data.data.user || null
        jumatJamLima.value = responseJumatLima.data.data.user || null
        jumatJamEnam.value = responseJumatEnam.data.data.user || null
        jumatJamTujuh.value = responseJumatTujuh.data.data.user || null
        jumatJamDelapan.value = responseJumatDelapan.data.data.user || null
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
        destroyJadwal,
        jadwalSenin, jadwalSelasa, jadwalRabu, jadwalKamis, jadwalJumat,
        seninJamSatu, seninJamDua, seninJamTiga, seninJamEmpat, seninJamLima, seninJamEnam, seninJamTujuh, seninJamDelapan,
        selasaJamSatu, selasaJamDua, selasaJamTiga, selasaJamEmpat, selasaJamLima, selasaJamEnam, selasaJamTujuh, selasaJamDelapan,
        rabuJamSatu, rabuJamDua, rabuJamTiga, rabuJamEmpat, rabuJamLima, rabuJamEnam, rabuJamTujuh, rabuJamDelapan,
        kamisJamSatu, kamisJamDua, kamisJamTiga, kamisJamEmpat, kamisJamLima, kamisJamEnam, kamisJamTujuh, kamisJamDelapan,
        jumatJamSatu, jumatJamDua, jumatJamTiga, jumatJamEmpat, jumatJamLima, jumatJamEnam, jumatJamTujuh, jumatJamDelapan,
    }
}