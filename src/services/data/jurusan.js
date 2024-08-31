import { ref } from "vue";
import axios from "../axios";

export default function useJurusan() {
  const jurusan = ref([]);

  async function indexJurusan() {
    const response = await axios.get("/api/v1/admin/jurusan");
    jurusan.value = response.data;
    console.log('jurusan:', jurusan.value);
  }

  return {
    jurusan,
    indexJurusan,
  };
}
