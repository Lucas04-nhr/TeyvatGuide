/**
 * @file web constant TGConstant.ts
 * @description 常量
 * @author BTMuli <bt-muli@outlook.com>
 * @since Beta v0.3.0
 */

import { BBS_VERSION, BBS_HEADER_AGENT, BBS_APP_ID } from "./bbs";
import SALT from "./salt";
import SERVER from "./server";
import { GAME_BIZ } from "./utils";

const TGConstant = {
  BBS: {
    VERSION: BBS_VERSION,
    USER_AGENT: BBS_HEADER_AGENT,
    APP_ID: BBS_APP_ID,
  },
  Salt: SALT,
  Server: SERVER,
  Utils: {
    GAME_BIZ,
  },
};

export default TGConstant;
