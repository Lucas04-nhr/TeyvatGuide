<template>
  <ToLoading v-model="loading" :title="loadT" />
  <v-app-bar>
    <template #prepend>
      <div class="hta-top-prepend">
        <img src="/source/UI/wikiAbyss.webp" alt="icon" />
        <span>深渊统计</span>
        <v-select
          v-model="tab"
          :items="abyssList"
          item-title="label"
          item-value="value"
          density="compact"
          variant="outlined"
        />
      </div>
    </template>
    <template #append>
      <div class="hta-top-append">
        <span @click="show()" v-if="overview">
          更新于 {{ timestampToDate(overview.cur.Timestamp) }}
        </span>
      </div>
    </template>
  </v-app-bar>
  <div class="hta-box">
    <v-window v-model="tab" class="hta-tab-item">
      <v-window-item value="use">
        <HtaTabUse v-if="abyssData.use !== null" :data="abyssData.use" />
      </v-window-item>
      <v-window-item value="up">
        <HtaTabUp v-if="abyssData.up !== null" :data="abyssData.up" />
      </v-window-item>
      <v-window-item value="team">
        <HtaTabTeam v-if="abyssData.team !== null" :model-value="abyssData.team" />
      </v-window-item>
      <v-window-item value="hold">
        <HtaTabHold v-if="abyssData.hold !== null" :data="abyssData.hold" />
      </v-window-item>
    </v-window>
  </div>
  <HtaOverlayOverview v-if="overview" v-model="showDialog" :data="overview" />
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import HtaOverlayOverview from "../../components/hutaoAbyss/hta-overlay-overview.vue";
import HtaTabHold from "../../components/hutaoAbyss/hta-tab-hold.vue";
import HtaTabTeam from "../../components/hutaoAbyss/hta-tab-team.vue";
import HtaTabUp from "../../components/hutaoAbyss/hta-tab-up.vue";
import HtaTabUse from "../../components/hutaoAbyss/hta-tab-use.vue";
import ToLoading from "../../components/overlay/to-loading.vue";
import Hutao from "../../plugins/Hutao/index.js";
import { timestampToDate } from "../../utils/toolFunc.js";

enum AbyssTabEnum {
  use = "角色使用",
  up = "角色出场",
  team = "队伍出场",
  hold = "角色持有",
}

type AbyssTab = keyof typeof AbyssTabEnum;
type AbyssList = Array<{ label: AbyssTabEnum; value: AbyssTab }>;
export type AbyssDataItem<T> = { cur: T; last: T };
export type AbyssDataItemType<T extends AbyssTab> = T extends "use"
  ? AbyssDataItem<TGApp.Plugins.Hutao.Abyss.AvatarUse[]>
  : T extends "up"
    ? AbyssDataItem<TGApp.Plugins.Hutao.Abyss.AvatarUp[]>
    : T extends "team"
      ? TGApp.Plugins.Hutao.Abyss.TeamCombination[]
      : T extends "hold"
        ? AbyssDataItem<TGApp.Plugins.Hutao.Abyss.AvatarHold[]>
        : null;
type AbyssData = {
  [key in AbyssTab]: AbyssDataItemType<key> | null;
};

const abyssList: AbyssList = [
  { label: AbyssTabEnum.use, value: "use" },
  { label: AbyssTabEnum.up, value: "up" },
  { label: AbyssTabEnum.team, value: "team" },
  { label: AbyssTabEnum.hold, value: "hold" },
];

const loading = ref<boolean>(false);
const loadT = ref<string>("");
const showDialog = ref<boolean>(false);

// data
const overview = ref<AbyssDataItem<TGApp.Plugins.Hutao.Abyss.OverviewData>>();
const tab = ref<AbyssTab>("use");
const abyssData = ref<AbyssData>({ use: null, up: null, team: null, hold: null });

watch(
  () => tab.value,
  async () => await refreshData(tab.value),
);

onMounted(async () => {
  loadT.value = "正在获取深渊数据";
  loading.value = true;
  loadT.value = "正在获取深渊概览";
  overview.value = {
    cur: await Hutao.Abyss.getOverview(),
    last: await Hutao.Abyss.getOverview(true),
  };
  loadT.value = "正在获取深渊数据";
  const useData = <AbyssDataItem<TGApp.Plugins.Hutao.Abyss.AvatarUse[]>>await getData("use");
  abyssData.value = { use: useData, up: null, team: null, hold: null };
  loading.value = false;
});

function show(): void {
  showDialog.value = !showDialog.value;
}

async function refreshData(type: AbyssTab): Promise<void> {
  if (abyssData.value && abyssData.value[type] !== null) return;
  if (loading.value) return;
  loading.value = true;
  loadT.value = `正在获取 ${AbyssTabEnum[type]} 数据`;
  const data = await getData(type);
  switch (type) {
    case "use":
      abyssData.value.use = <AbyssDataItemType<"use">>data;
      break;
    case "up":
      abyssData.value.up = <AbyssDataItemType<"up">>data;
      break;
    case "team":
      abyssData.value.team = <AbyssDataItemType<"team">>data;
      break;
    case "hold":
      abyssData.value.hold = <AbyssDataItemType<"hold">>data;
      break;
  }
  loading.value = false;
}

async function getData(type: AbyssTab): Promise<AbyssDataItemType<AbyssTab>> {
  switch (type) {
    case "use":
      return {
        cur: await Hutao.Abyss.avatar.getUseRate(),
        last: await Hutao.Abyss.avatar.getUseRate(true),
      };
    case "up":
      return {
        cur: await Hutao.Abyss.avatar.getUpRate(),
        last: await Hutao.Abyss.avatar.getUpRate(true),
      };
    case "team":
      return await Hutao.Abyss.getTeamCollect();
    case "hold":
      return {
        cur: await Hutao.Abyss.avatar.getHoldRate(),
        last: await Hutao.Abyss.avatar.getHoldRate(true),
      };
  }
}
</script>
<style lang="css" scoped>
.hta-top-prepend {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    color: var(--common-text-title);
    font-family: var(--font-title);
    font-size: 20px;
  }

  :last-child {
    height: 50px;
    margin-top: 20px;
  }
}

.hta-top-append {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  font-family: var(--font-title);
}

.hta-box {
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 10px var(--common-shadow-4);
}

.hta-tab-item {
  width: 100%;
  height: 100%;
}
</style>
