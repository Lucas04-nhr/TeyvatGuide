/**
 * @file store modules user.ts
 * @description User store module
 * @author BTMuli <bt-muli@outlook.com>
 * @since Beta v0.3.0
 */

// vue
import { ref } from "vue";
// pinia
import { defineStore } from "pinia";
// sqlite
import TGSqlite from "../../plugins/Sqlite";

export const useUserStore = defineStore(
  "user",
  () => {
    const briefInfo = ref<TGApp.App.Account.BriefInfo>({
      nickname: "",
      avatar: "",
      uid: "",
      desc: "",
    });
    const account = ref<TGApp.Sqlite.Account.Game>({
      gameBiz: "",
      gameUid: "",
      isChosen: 0,
      isOfficial: 0,
      level: "",
      nickname: "",
      region: "",
      regionName: "",
    });
    const cookie = ref<Record<string, string>>({});

    function setBriefInfo(info: TGApp.App.Account.BriefInfo): void {
      briefInfo.value = info;
    }

    function getBriefInfo(): Record<string, string> {
      return briefInfo.value;
    }

    function setCurAccount(user: TGApp.Sqlite.Account.Game): void {
      account.value = user;
    }

    function getCurAccount(): TGApp.Sqlite.Account.Game {
      return account.value;
    }

    function getCookieItem(key: string): string {
      return cookie.value[key] || "";
    }

    function getCookieGroup1(): TGApp.BBS.Constant.CookieGroup1 {
      return {
        login_ticket: getCookieItem("login_ticket"),
        login_uid: getCookieItem("login_uid"),
      };
    }

    function getCookieGroup2(): TGApp.BBS.Constant.CookieGroup2 {
      return {
        account_id: getCookieItem("account_id"),
        cookie_token: getCookieItem("cookie_token"),
      };
    }

    function getCookieGroup3(): TGApp.BBS.Constant.CookieGroup3 {
      return {
        ltoken: getCookieItem("ltoken"),
        ltuid: getCookieItem("ltuid"),
      };
    }

    function getCookieGroup4(): TGApp.BBS.Constant.CookieGroup4 {
      return {
        account_id: getCookieItem("account_id"),
        cookie_token: getCookieItem("cookie_token"),
        ltoken: getCookieItem("ltoken"),
        ltuid: getCookieItem("ltuid"),
      };
    }

    async function saveCookie(type: string, val: string): Promise<void> {
      cookie.value[type] = val;
      await TGSqlite.saveAppData("cookie", JSON.stringify(cookie.value));
    }

    return {
      briefInfo,
      cookie,
      account,
      getBriefInfo,
      setBriefInfo,
      getCookieItem,
      setCurAccount,
      getCurAccount,
      getCookieGroup1,
      getCookieGroup2,
      getCookieGroup3,
      getCookieGroup4,
      saveCookie,
    };
  },
  {
    persist: [
      {
        key: "cookie",
        storage: window.localStorage,
        paths: ["cookie"],
      },
      {
        key: "briefInfo",
        storage: window.localStorage,
        paths: ["briefInfo"],
      },
      {
        key: "account",
        storage: window.localStorage,
        paths: ["account"],
      },
    ],
  },
);
