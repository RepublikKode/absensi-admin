<template>
  <div class="max-w-auto mx-auto">
    <h2 class="text-lg font-medium text-gray-900">Edit Kelas</h2>
    <div class="w-1/2 pt-4">
      <form @submit.prevent="save()">
        <div class="shadow overflow-hidden rounded-md">
          <div class="px-4 py-5 bg-white p-6">
            <div class="grid grid-cols-6 gap-6">
              <!-- <div class="col-span-6 col-span-6">
                                <label for="kategori" class="block text-xs font-medium text-gray-700">Kategori</label>
                                <select id="kategori" name="kategori"
                                    class="capitalize mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs">
                                    <option v-for="item in mitra_kategori" :value="item.id">
                                        {{ item.nama }}
                                    </option>
                                </select>
                            </div> -->
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Nama Kelas</label
                >
                <input
                  type="text"
                  v-model="form.kelas"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Jurusan</label
                >
                <select
                  v-model="form.jurusan_id"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="jurusan in jurusan" :key="jurusan.id" :value="jurusan.id">
                    {{ jurusan.jurusan }}
                  </option>
                </select>
              </div>
              <div class="col-span-6">
                <label
                  for="kelas"
                  class="block text-xs font-medium text-gray-700"
                  >Alfabet</label
                >
                <select
                  v-model="form.alphabet"
                  class="mt-1 p-2 font-medium bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-base border-gray-300 rounded-md"
                  name=""
                  id=""
                >
                  <option v-for="letters in letters" :key="letters" :value="letters">
                    {{ letters }}
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
                  :to="{ name: 'kelas' }"
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
import { onMounted, reactive, setDevtoolsHook, watch } from "vue";
import useKelas from "../../services/data/kelas";
import { useRoute } from "vue-router";

const letters = []
for(let i = 65; i <= 90; i++) {
  letters.push(String.fromCharCode(i))
}

const { show, update, kelas, jurusan, getJurusan } = useKelas();
const router = useRoute();

const form = reactive({
  kelas: "",
  jurusan_id: "",
  alphabet: ""
});

watch(kelas, (item) => {
  form.kelas = item.kelas;
  form.jurusan_id = item.jurusan_id;
  form.alphabet = item.alphabet;
});

const save = async () => {
  update({ ...form }, router.params.id);
};

onMounted(() => {
  show(router.params.id);
  getJurusan()
});
</script>
