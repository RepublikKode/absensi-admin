import axios from "../axios";
import { ref } from "vue";
import useSwal from "../swal";
import router from "../../router";
import { useRouter, useRoute } from 'vue-router'

export default function useKelas() {
  const kelas = ref([]);
  const jurusan = ref([])
  const { accepted, confirm, rejected } = useSwal();
  const route = useRoute()

  async function index() {
    const response = await axios.get("/api/v1/kelas");
    kelas.value = response.data.kelas;
  }

  async function getJurusan() {
    const response = await axios.get('/api/v1/admin/jurusan');
    jurusan.value = response.data
  }

  async function store(payload) {
    try {
      const response = await axios.post("/api/v1/kelas", payload);
      console.log(response.data);
      accepted(response.data.message);
      router.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        rejected(error.response?.data);
      }
    }
  }

  async function show() {
    const response = await axios.get(`/api/v1/kelas/${route.params.id}`);
    kelas.value = response.data.kelas;
  }

  async function update(payload, id) {
    const response = await confirm("Update data?");

    if (response.isConfirmed) {
      try {
        const response = await axios.put(`/api/v1/kelas/${id}`, payload);
        console.log(payload);
        console.log(response.data);
        accepted(response.data.message);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          rejected(error.response?.data);
        }
      }
    }
  }

  async function destroy(id) {
    const response = await confirm("Hapus data ini?");

    if (response.isConfirmed) {
      try {
        const response = await axios.delete(`/api/v1/kelas/${id}`);
        console.log(response.data);
        accepted(response.data.message);
        router.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          rejected(error.response?.data);
        }
      }
    }
  }

  return {
    index,
    store,
    show,
    update,
    destroy,
    kelas,
    jurusan,
    getJurusan
  };
}
