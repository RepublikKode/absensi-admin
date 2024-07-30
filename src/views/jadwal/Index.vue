<template>
  <div class="w-full flex justify-center flex-col gap-12 items-center">
    <div class="w-full my-12 flex flex-col justify-center items-center">
      <h3 class="uppercase font-bold text-xl text-center">
        Jadwal Kelas {{ kelas.kelas }}
      </h3>
      <button @click="exportPDF" class="mt-5 bg-red-500 text-white px-12 py-4">
        Export PDF
      </button>
      <table ref="tableToExport" class="border border-black w-2/3 mt-12">
        <thead>
          <th class="border-l border-t border-b border-black">Hari</th>
          <th class="border border-black capitalize w-44" v-for="item in 8" :key="item">{{ item }}</th>
        </thead>
        <tbody>
          <tr>
            <td class="uppercase border border-black text-center w-32">Senin</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamSatu.nama != null">{{ seninJamSatu.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamDua.nama != null">{{ seninJamDua.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamTiga.nama != null">{{ seninJamTiga.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamEmpat.nama != null">{{ seninJamEmpat.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamLima.nama != null">{{ seninJamLima.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamEnam.nama != null">{{ seninJamEnam.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamTujuh.nama != null">{{ seninJamTujuh.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="seninJamDelapan.nama != null">{{ seninJamDelapan.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
          </tr>
          <tr>
            <td class="uppercase border border-black text-center w-32">Selasa</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamSatu.nama != null">{{ selasaJamSatu.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamDua.nama != null">{{ selasaJamDua.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamTiga.nama != null">{{ selasaJamTiga.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamEmpat.nama != null">{{ selasaJamEmpat.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamLima.nama != null">{{ selasaJamLima.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamEnam.nama != null">{{ selasaJamEnam.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamTujuh.nama != null">{{ selasaJamTujuh.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="selasaJamDelapan.nama != null">{{ selasaJamDelapan.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
          </tr>
          <tr>
            <td class="uppercase border border-black text-center w-32">Rabu</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamSatu.nama != null">{{ rabuJamSatu.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamDua.nama != null">{{ rabuJamDua.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamTiga.nama != null">{{ rabuJamTiga.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamEmpat.nama != null">{{ rabuJamEmpat.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamLima.nama != null">{{ rabuJamLima.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamEnam.nama != null">{{ rabuJamEnam.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamTujuh.nama != null">{{ rabuJamTujuh.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="rabuJamDelapan.nama != null">{{ rabuJamDelapan.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
          </tr>
          <tr>
            <td class="uppercase border border-black text-center w-32">Kamis</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamSatu.nama != null">{{ kamisJamSatu.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamDua.nama != null">{{ kamisJamDua.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamTiga.nama != null">{{ kamisJamTiga.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamEmpat.nama != null">{{ kamisJamEmpat.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamLima.nama != null">{{ kamisJamLima.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamEnam.nama != null">{{ kamisJamEnam.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamTujuh.nama != null">{{ kamisJamTujuh.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="kamisJamDelapan.nama != null">{{ kamisJamDelapan.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
          </tr>
          <tr>
            <td class="uppercase border border-black text-center w-32">Jumat</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamSatu.nama != null">{{ jumatJamSatu.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamDua.nama != null">{{ jumatJamDua.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamTiga.nama != null">{{ jumatJamTiga.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamEmpat.nama != null">{{ jumatJamEmpat.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamLima.nama != null">{{ jumatJamLima.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamEnam.nama != null">{{ jumatJamEnam.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamTujuh.nama != null">{{ jumatJamTujuh.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
            <td class="border border-black text-center bg-sky-500 text-white font-medium h-20" v-if="jumatJamDelapan.nama != null">{{ jumatJamDelapan.nama }}</td>
            <td class="border border-black text-center bg-red-500 text-white font-medium h-20" v-else>Kosong</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useKelas from "../../services/data/kelas";
import useJadwal from "../../services/data/jadwal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const { show, kelas } = useKelas()
const { 
  jadwal,
  jadwalSenin, jadwalSelasa, jadwalRabu, jadwalKamis, jadwalJumat,
  seninJamSatu, seninJamDua, seninJamTiga, seninJamEmpat, seninJamLima, seninJamEnam, seninJamTujuh, seninJamDelapan,
  selasaJamSatu, selasaJamDua, selasaJamTiga, selasaJamEmpat, selasaJamLima, selasaJamEnam, selasaJamTujuh, selasaJamDelapan,
  rabuJamSatu, rabuJamDua, rabuJamTiga, rabuJamEmpat, rabuJamLima, rabuJamEnam, rabuJamTujuh, rabuJamDelapan,
  kamisJamSatu, kamisJamDua, kamisJamTiga, kamisJamEmpat, kamisJamLima, kamisJamEnam, kamisJamTujuh, kamisJamDelapan,
  jumatJamSatu, jumatJamDua, jumatJamTiga, jumatJamEmpat, jumatJamLima, jumatJamEnam, jumatJamTujuh, jumatJamDelapan,
} = useJadwal()

const hari = [
  'senin',
  'selasa',
  'rabu',
  'kamis',
  'jumat'
]

onMounted(() => {
  show()
  jadwalSenin()
  jadwalSelasa()
  jadwalRabu()
  jadwalKamis()
  jadwalJumat()
})

const tableToExport = ref(null);

async function exportPDF() {
  const table = tableToExport.value;

  // Use html2canvas to capture the table as an image
  const canvas = await html2canvas(table);

  // Initialize jsPDF
  const pdf = new jsPDF("p", "mm", "a4");

  // Add the captured image to the PDF
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

  // Save or open the PDF
  pdf.save("table-export.pdf");
}

</script>