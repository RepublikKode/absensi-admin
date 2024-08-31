<template>
  <div class="w-full flex justify-center flex-col gap-12 items-center">
    <div class="w-full my-12 flex flex-col justify-center items-center">
      <h3 class="uppercase font-bold text-xl text-center">
        Jadwal Kelas {{ kelas.kelas }} {{ kelas.jurusan }} {{ kelas.alphabet }}
      </h3>
      <button @click="exportPDF" class="mt-5 bg-red-500 text-white px-12 py-4">
        Export PDF
      </button>
      <table ref="tableToExport" class="border border-black w-2/3 mt-12">
        <thead>
          <th class="border-l border-t border-b border-black py-2">Hari</th>
          <th
            class="border border-black capitalize w-44"
            v-for="item in 15"
            :key="item"
          >
            {{ item }}
          </th>
        </thead>
        <tbody>
          <tr v-for="day in hari" :key="day">
            <td class="border border-black px-2 py-1 capitalize">{{ day }}</td>
            <td
              v-for="(subject, index) in jadwal[day]"
              :key="index"
              :class="getBgColor(subject.mapel.mapel)"
              class="border border-black text-white px-2 py-2"
            >
              <div
                class="flex justify-between"
              >
                <span class="text-sm w-32 h-14">
                  {{ subject.mapel.mapel || "-" }}
                </span>
                <div class="flex items-end">
                  <span class="text-xs">
                    {{ subject.user.nama || "-" }}
                  </span>
                </div>
              </div>
              <!-- <div
                v-if="subject && Number(subject.user_id) == Number(route.params.id)"
                class="flex justify-between"
              >
                <span class="text-sm w-32 h-14">
                  {{ subject.mapel.mapel || "-" }}
                </span>
                <div class="flex items-end">
                  <span class="text-xs">
                    {{ subject.user.nama || "-" }}
                  </span>
                </div>
              </div>
              <div v-else>
                <span class="text-sm w-32 h-14">a</span>
                <div class="flex items-end">
                  <span class="text-xs">a</span>
                </div>
              </div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
  const table = tableToExport.value;

  // Use html2canvas to capture the table as an image
  const canvas = await html2canvas(table);

  // Get canvas dimensions in pixels
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Initialize jsPDF with custom dimensions in pixels
  const pdf = new jsPDF({
    orientation: imgWidth > imgHeight ? "l" : "p",
    unit: "px",
    format: [imgWidth, imgHeight],
  });

  // Optional: Adjust the position if needed
  const marginTop = 0; // Change this value to adjust vertical position
  const marginLeft = 0; // Change this value to adjust horizontal position

  // Add the captured image to the PDF
  pdf.addImage(imgData, "PNG", marginLeft, marginTop, imgWidth, imgHeight);

  // Save or open the PDF
  pdf.save("table-export.pdf");
}
</script>
