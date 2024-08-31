<template>
  <div class="w-full flex justify-center flex-col gap-12 items-center">
    <div class="w-full my-12 flex flex-col justify-center items-center">
      <h3 class="uppercase font-bold text-xl text-center">
        Jadwal SMKN 2 Banjarmasin
      </h3>
      <button @click="exportPDF" class="mt-5 bg-red-500 text-white px-12 py-4">
        Export PDF
      </button>
      
      <!-- Loop untuk setiap kelas -->
      <div ref="tableToExport" v-for="(jadwalHari, kelas) in tableJadwal" :key="kelas" class="w-full my-6">
        <div class="flex justify-center">
          <h5 class="font-bold text-lg">{{ kelas }}</h5>
        </div>

        <!-- Tabel untuk menampilkan jadwal -->
        <table  class="border border-black w-2/3 mt-4 mx-auto">
          <thead>
            <tr>
              <th class="border-l border-t border-b border-black py-2">Hari</th>
              <th class="border border-black capitalize w-44" v-for="index in 15" :key="index">
                {{ index }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop untuk setiap hari -->
            <tr v-for="day in hari" :key="day">
              <td class="border border-black px-2 py-1 capitalize">{{ day }}</td>
              <!-- Loop untuk setiap jam di hari tersebut -->
              <td
                v-for="(subject, index) in jadwalHari[day]"
                :key="index"
                :class="getBgColor(subject?.mapel?.mapel)"
                class="border border-black px-2 py-1 text-white"
              >
                <div class="flex justify-between">
                  <span class="text-sm w-32 h-14">
                    {{ subject?.mapel?.mapel || "-" }}
                  </span>
                  <div class="flex items-end">
                    <span class="text-xs">
                      {{ subject?.user?.nama || "-" }}
                    </span>
                  </div>
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
const { tableJadwal, getAllJadwal } = useJadwal();

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
  // show();
  // getDetail();
  getAllJadwal();
  // tableJadwal();
});

const tableToExport = ref(null);

async function exportPDF() {
  await nextTick(); // Pastikan DOM telah diperbarui

  const tables = tableToExport.value; // Mengambil semua elemen dengan ref "tableToExport"

  if (tables && tables.length) {
    try {
      const pdf = new jsPDF();
      let pageHeight = pdf.internal.pageSize.height;

      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const canvas = await html2canvas(table);
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = (pdfWidth * imgHeight) / imgWidth; // Menghitung tinggi PDF berdasarkan lebar

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Jika tinggi gambar lebih tinggi dari halaman PDF, tambahkan halaman baru
        if (imgHeight > pageHeight) {
          const pages = Math.ceil(imgHeight / pageHeight);
          for (let j = 1; j < pages; j++) {
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, -pageHeight * j, pdfWidth, pdfHeight);
          }
        }
      }

      pdf.save("table-export.pdf");
    } catch (error) {
      console.error("Error capturing the tables:", error);
    }
  } else {
    console.error("Tables not found");
  }
}


</script>
