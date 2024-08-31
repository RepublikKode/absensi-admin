<template>
  <div class="max-w-auto mx-auto">
    <h2 class="text-lg font-medium text-gray-900">Edit Jadwal</h2>
    <div class="w-1/2 pt-4">
      <form @submit.prevent="doStore(jadwal)">
        <div class="shadow overflow-hidden rounded-md">
          <div class="px-4 py-5 bg-white p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label
                  for="userID"
                  class="block text-xs font-medium text-gray-700"
                  >User ID</label
                >
                <input
                  type="text"
                  v-model="jadwal.user_id"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Kelas</label
                >
                <select
                  v-model="jadwal.kelas_id"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="kelas in kelas" :key="kelas.id" :value="kelas.id">
                    {{ kelas.kelas }} {{ kelas.jurusan.jurusan }} {{ kelas.alphabet }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="userID"
                  class="block text-xs font-medium text-gray-700"
                  >Hari</label
                >
                <select
                  v-model="jadwal.hari"
                  class="capitalize mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="hari in hari" :key="hari.hari" class="capitalize" :value="hari">
                    {{ hari }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="userID"
                  class="block text-xs font-medium text-gray-700"
                  >Metode Pembelajaran</label
                >
                <select
                  v-model="jadwal.metode_pembelajaran"
                  class="uppercase mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="metode in metode" :key="metode.id" :value="metode" class="uppercase">
                    {{ metode }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="userID"
                  class="block text-xs font-medium text-gray-700"
                  >Mata Pelajaran</label
                >
                <select
                  v-model="jadwal.mapel_id"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="mapel in mapel" :key="mapel.mapel" :value="mapel.id">
                    {{ mapel.mapel }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="jurusan"
                  class="block text-xs font-medium text-gray-700"
                  >Jurusan</label
                >
                <select
                  v-model="forms.jurusan_id"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id="jurusan"
                >
                  <option selected :value="jadwalJurusan.id">
                    {{ jadwalJurusan.jurusan }}
                  </option>
                  <option v-for="jurusan in jurusan" :key="jurusan.id" :value="jurusan.id">
                    {{ jurusan.jurusan }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50">
            <div class="flex justify-between">
              <div></div>
              <div class="flex">
                <router-link
                  :to="{ name: 'jadwals' }"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  <ChevronLeftIcon class="mr-2 h-4 w-4" aria-hidden="false" />
                  Kembali
                </router-link>
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ml-2"
                >
                  <PencilSquareIcon class="mr-2 h-4 w-4" aria-hidden="false" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { reactive, ref, onMounted } from "vue";
import useJadwal from "../../services/data/jadwal";
import useWaktu from '../../services/data/waktu'
import useMapel from '../../services/data/mapel'
import useKelas from "../../services/data/kelas";
import useJurusan from "../../services/data/jurusan";

const { jadwal, getJadwal, updateJadwal, jadwalJurusan } = useJadwal()
const { waktu, indexWaktu } = useWaktu()
const { mapel, indexMapel } = useMapel()
const { kelas, index } = useKelas()
const { jurusan, indexJurusan } = useJurusan()

const hari = [
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jumat'
]

const metode = [
    'plk',
    'pjj'
]

const forms = ref({
    user_id: '',
    waktu_id: '',
    hari: '',
    metode_pembelajaran: '',
    mapel_id: ''
})

onMounted(() => {
    getJadwal()
    indexWaktu()
    indexMapel()
    index()
    indexJurusan()
})

function doStore(jadwal) {
    updateJadwal({...jadwal})
}
</script>
