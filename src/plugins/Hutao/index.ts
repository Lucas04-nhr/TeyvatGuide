/**
 * @file plugins Hutao index.ts
 * @description Hutao 插件入口
 * @author BTMuli <bt-muli@outlook.com>
 * @since Beta v0.3.0
 */

import getAvatarCollect from "./request/getAvatarCollect.js";
import getAvatarHoldRate from "./request/getAvatarHoldRate.js";
import getAvatarUpRate from "./request/getAvatarUpRate.js";
import getAvatarUseRate from "./request/getAvatarUseRate.js";
import getOverview from "./request/getOverview.js";
import getTeamCollect from "./request/getTeamCollect.js";
import getWeaponCollect from "./request/getWeaponCollect.js";
import uploadData from "./request/uploadData.js";
import { transAvatars, transLocal } from "./utils/transLocal.js";

const Hutao = {
  Abyss: {
    avatar: {
      getCollect: getAvatarCollect,
      getHoldRate: getAvatarHoldRate,
      getUpRate: getAvatarUpRate,
      getUseRate: getAvatarUseRate,
    },
    getOverview,
    getTeamCollect,
    getWeaponCollect,
    postData: uploadData,
    utils: {
      transData: transLocal,
      transAvatars,
    },
  },
};

export default Hutao;
