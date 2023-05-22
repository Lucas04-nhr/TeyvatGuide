/**
 * @file types Sqlite NameCard.d.ts
 * @description Sqlite 名片类型定义文件
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.1.5
 */

declare namespace TGApp.Sqlite.NameCard {
  /**
   * @description 名片数据
   * @since Alpha v0.1.5
   * @interface Item
   * @property {string} name - 名片名称
   * @property {string} desc - 名片描述
   * @property {string} icon - 名片图标
   * @property {string} bg - 名片背景图
   * @property {string} profile - 名片 Profile 图
   * @description 0: 其他，1: 成就，2：角色，3：纪行，4：活动 // todo: 后续用枚举替换
   * @property {number} type - 名片类型
   * @property {string} source - 名片来源
   * @property {string} updated - 数据库更新时间
   * @return Item
   */
  export interface Item {
    name: string
    desc: string
    icon: string
    bg: string
    profile: string
    type: number
    source: string
    updated: string
  }
}
