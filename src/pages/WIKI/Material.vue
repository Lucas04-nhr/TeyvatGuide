<template>
  <v-app-bar density="compact">
    <template #prepend>
      <div class="twm-title">
        <div class="twm-title-left">
          <img src="/source/UI/wikiGCG.webp" alt="icon" />
          <span>材料图鉴</span>
        </div>
        <v-select
          v-model="selectType"
          :items="materialTypes"
          item-title="type"
          :hide-details="true"
          :clearable="true"
          width="250px"
          label="材料类别"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #append>
                <v-chip>{{ item.raw.number }}</v-chip>
              </template>
            </v-list-item>
          </template>
        </v-select>
      </div>
    </template>
    <template #append>
      <v-text-field
        v-model="search"
        width="200px"
        append-icon="mdi-magnify"
        label="搜索"
        :single-line="true"
        :hide-details="true"
        @keydown.enter="searchMaterial()"
        @click:append="searchMaterial()"
      />
    </template>
  </v-app-bar>
  <div class="twm-box">
    <div
      class="twm-item"
      v-for="item in sortMaterialsData"
      :key="item.id"
      @click="toMaterial(item)"
      :title="item.name"
    >
      <div class="twm-item-left">
        <img class="twm-item-bg" :src="`/icon/bg/${item.star}-Star.webp`" alt="bg" />
        <img class="twm-item-icon" :src="`/icon/material/${item.id}.webp`" alt="icon" />
      </div>
      <div class="twm-item-right">{{ item.name }}</div>
      <div class="twm-item-id">{{ item.id }}</div>
    </div>
  </div>
  <TwoMaterial v-model="visible" :data="curMaterial" v-if="curMaterial">
    <template #left>
      <div class="card-arrow" @click="switchMaterial(false)">
        <img src="@/assets/icons/arrow-right.svg" alt="right" />
      </div>
    </template>
    <template #right>
      <div class="card-arrow" @click="switchMaterial(true)">
        <img src="@/assets/icons/arrow-right.svg" alt="right" />
      </div>
    </template>
  </TwoMaterial>
</template>
<script lang="ts" setup>
import showSnackbar from "@comp/func/snackbar.js";
import TwoMaterial from "@comp/pageWiki/two-material.vue";
import { onMounted, ref, shallowRef, watch } from "vue";

import { WikiMaterialData } from "@/data/index.js";

type MaterialType = { type: string; number: number };

const curIndex = ref<number>(0);
const total = ref<number>(0);
const visible = ref<boolean>(false);
const search = ref<string>();
const selectType = ref<string | null>(null);
const materialTypes = shallowRef<Array<MaterialType>>([]);
const curMaterial = shallowRef<TGApp.App.Material.WikiItem | undefined>();
const sortMaterialsData = shallowRef<Array<TGApp.App.Material.WikiItem>>([]);

onMounted(() => {
  const tmpData: Array<MaterialType> = [];
  for (const item of WikiMaterialData) {
    const typeFindIndex = tmpData.findIndex((itemT) => itemT.type === item.type);
    if (typeFindIndex === -1) {
      const itemN: MaterialType = { type: item.type, number: 1 };
      tmpData.push(itemN);
      continue;
    }
    tmpData[typeFindIndex].number++;
  }
  materialTypes.value = tmpData;
  sortData(WikiMaterialData);
  showSnackbar.success(`成功获取${sortMaterialsData.value.length}条数据`);
});

watch(
  () => selectType.value,
  () => sortData(getSelectMaterials()),
);

function getSelectMaterials(): Array<TGApp.App.Material.WikiItem> {
  if (selectType.value === null) return WikiMaterialData;
  else return WikiMaterialData.filter((item) => item.type === selectType.value);
}

function sortData(data: Array<TGApp.App.Material.WikiItem>): void {
  sortMaterialsData.value = data;
  curIndex.value = 0;
  total.value = sortMaterialsData.value.length;
  curMaterial.value = sortMaterialsData.value[curIndex.value];
}

function toMaterial(item: TGApp.App.Material.WikiItem): void {
  curMaterial.value = item;
  curIndex.value = sortMaterialsData.value.findIndex((i) => i.id === item.id);
  visible.value = true;
}

function switchMaterial(isNext: boolean): void {
  if (isNext) {
    if (curIndex.value === total.value - 1) return;
    curIndex.value++;
  } else {
    if (curIndex.value === 0) return;
    curIndex.value--;
  }
  curMaterial.value = sortMaterialsData.value[curIndex.value];
}

function searchMaterial(): void {
  let selectData = getSelectMaterials();
  if (search.value === undefined || search.value === "") {
    if (sortMaterialsData.value.length === selectData.length) {
      showSnackbar.warn("请输入搜索内容!");
      return;
    }
    sortData(selectData);
    showSnackbar.success("已重置!");
    return;
  }
  selectData = selectData.filter(
    (i) => i.name.includes(search.value!) || i.description.includes(search.value!),
  );
  if (selectData.length === 0) {
    showSnackbar.warn("未找到符合条件的材料!");
    return;
  }
  sortData(selectData);
  showSnackbar.success(`找到${selectData.length}条符合条件的材料`);
}
</script>
<style lang="css" scoped>
.twm-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 5px;
  column-gap: 10px;
}

.twm-title-left {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }

  span {
    font-family: var(--font-title);
    font-size: 18px;
  }
}

.twm-box {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.25fr));
}

.twm-item {
  position: relative;
  display: flex;
  height: 45px;
  align-items: center;
  justify-content: flex-start;
  padding-right: 5px;
  border: 1px solid var(--common-shadow-1);
  border-radius: 5px;
  background: var(--box-bg-1);
  column-gap: 5px;
  cursor: pointer;
}

.twm-item-left {
  position: relative;
  width: 45px;
  height: 45px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.twm-item-bg,
.twm-item-icon {
  position: absolute;
  top: 0;
  width: 45px;
  height: 45px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.twm-item-right {
  position: relative;
  overflow: hidden;
  max-width: calc(100% - 50px);
  color: var(--box-text-2);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}

.twm-item-id {
  position: absolute;
  right: 4px;
  bottom: 2px;
  font-size: 8px;
  opacity: 0.6;
}

.card-arrow {
  position: relative;
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 30px;
    aspect-ratio: 1;
  }

  &:first-child {
    transform: rotate(180deg);
  }
}

.dark .card-arrow {
  filter: invert(11%) sepia(73%) saturate(11%) hue-rotate(139deg) brightness(97%) contrast(81%);
}
</style>
