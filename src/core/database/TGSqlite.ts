/**
 * @file core database TGSqlite.ts
 * @description SQLite 数据库相关
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.1.4
 */

import { initDatabase } from "./init";
import { checkAchievement, checkAchievementSeries } from "./update";
import { deleteDatabase, checkDatabase } from "./utils";

const TGSqlite = {
  clearDB: deleteDatabase,
  initDB: initDatabase,
  checkDB: checkDatabase,
  update: {
    achievement: checkAchievement,
    achievementSeries: checkAchievementSeries,
  },
};

export default TGSqlite;
