<template>
  <div class="w-full flex justify-center flex-col gap-12 items-center">
    <div class="w-full my-12 flex flex-col justify-center items-center">
      <h3 class="uppercase font-bold text-xl text-center">
        Jadwal Kelas {{ kelas.kelas }} {{ kelas.jurusan }} {{ kelas.alphabet }}
      </h3>
      <button @click="exportPDF" class="mt-5 bg-red-500 text-white px-12 py-4">
        Export PDF
      </button>
      <div class="w-full" ref="tableToExport">
        <h5>Jadwal Kelas {{ kelas.fix_kelas }}</h5>
        <table
          v-for="(group, minggu) in jadwal"
          :key="minggu"
          class="border border-black w-2/3 mt-12"
        >
          <caption class="text-left font-bold mt-4">
            Hari {{
              minggu
            }}
          </caption>
          <thead>
            <th class="border-l border-t border-b border-black py-2">Minggu</th>
            <th
              class="border border-black capitalize"
              v-for="item in 15"
              :key="item"
            >
              {{ item }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(dayGroup, day) in group" :key="day">
              <td class="border border-black px-2 py-1 capitalize">
                {{ day }}
              </td>
              <td
                v-for="(subject, index) in dayGroup"
                :key="index"
                :class="getBgColor(subject.mapel.mapel)"
                class="border border-black text-white"
              >
                <div class="w-full flex flex-col items-center justify-center">
                  <span class="text-xs h-4 w-28 text-center">
                    {{ subject.mapel.mapel || "-" }}
                  </span>
                  <span class="text-xs h-14 text-center">
                    {{ subject.user.nama || "-" }}
                  </span>
                  <span class="text-xs h-14 text-center">
                    {{ subject.ruang || "-" }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import useKelas from "../../services/data/kelas";
import useJadwal from "../../services/data/jadwal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const route = useRoute();
const { show, kelas } = useKelas();
const { jadwal, getDetail } = useJadwal();

const hari = ["senin", "selasa", "rabu", "kamis", "jumat"];

function getBgColor(mapel) {
  if (!mapel) {
    return "bg-gray-200";
  }

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  // Use a hash function to select a color based on the subject name
  let hash = 0;
  for (let i = 0; i < mapel.length; i++) {
    hash = mapel.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;

  return colors[colorIndex];
}

onMounted(() => {
  show();
  getDetail();
});

const tableToExport = ref(null);

async function exportPDF() {
  await nextTick(); // Menunggu DOM selesai dirender

  const table = tableToExport.value;

  if (!table) {
    console.error("Table not found!");
    return;
  }

  try {
    // Gunakan html2canvas untuk menangkap gambar tabel
    const canvas = await html2canvas(table, {
      scale: 2, // meningkatkan resolusi canvas
      useCORS: true, // menangani sumber daya lintas domain jika diperlukan
    });

    // Ambil data gambar dari canvas
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape", // Ubah orientasi menjadi landscape untuk tabel yang lebar
      unit: "mm",
      format: "a4", // format A4 standar
    });

    // Ukuran halaman PDF A4 dalam mm
    const pageWidth = 297; // Lebar PDF A4 dalam mm (landscape)
    const pageHeight = 210; // Tinggi PDF A4 dalam mm (landscape)
    const imgWidth = canvas.width > canvas.height ? pageWidth : pageHeight;
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Sesuaikan tinggi sesuai rasio lebar

    // Tambahkan gambar ke PDF, mengecilkan gambar agar sesuai dengan lebar halaman
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Simpan file PDF
    pdf.save("table-export.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

</script>
