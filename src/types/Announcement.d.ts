/**
 * @file core types TGAnnouncement.d.ts
 * @description 类型定义，用于定义原神游戏内公告相关类型
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.1.2
 */
declare namespace BTMuli.Genshin {
  /**
   * @description 公告
   * @since Alpha v0.1.2
   * @interface Announcement
   * @property {AnnoListItem[]} list 公告列表
   * @property {number} type_id 类型 ID
   * @property {string} type_label 类型标签
   * @returns {Announcement}
   */
  export interface Announcement {
    list: ListItem[]
    type_id: number
    type_label: string
  }
  /**
   * @file core types TGAnnouncement.d.ts
   * @description 类型定义，用于定义原神游戏内公告相关类型
   * @author BTMuli<bt-muli@outlook.com>
   * @since Alpha v0.1.2
   */

  export namespace Announcement {
    /**
     * @description 原神游戏内公告列表返回
     * @since Alpha v0.1.2
     * @see TGApi.GameAnnoList
     * @interface AnnoListResponse
     * @extends TGBase.BaseResponse
     * @property {AnnoListData} data 公告数据
     * @returns {ListResponse}
     */
    export interface ListResponse extends Base.Response {
      data: ListData
    }

    /**
     * @description 原神游戏内公告内容返回
     * @since Alpha v0.1.2
     * @see TGApi.GameAnnoContent
     * @interface AnnoContentResponse
     * @extends Hk4eResponse
     * @property {AnnoContentData} data 公告数据
     * @returns {ContentResponse}
     */
    export interface ContentResponse extends Hk4eResponse {
      data: ContentData
    }

    /**
     * @description 公告列表数据
     * @since Alpha v0.1.2
     * @interface AnnoListData
     * @property {Announcement[]} list 公告列表
     * @property {number} total 公告总数
     * @property {AnnoTypeList[]} type_list 公告类型列表
     * @property {boolean} alert 是否有紧急公告
     * @property {number} alert_id 紧急公告 ID
     * @property {number} time_zone 时区
     * @property {string} t 系统时间
     * @property {unknown[]} pic_list 图片列表
     * @property {number} pic_total 图片总数
     * @property {unknown[]} pic_type_list 图片类型列表
     * @property {boolean} pic_alert 是否有紧急图片
     * @property {number} pic_alert_id 紧急图片 ID
     * @property {unknown} static_sign 静态签名
     * @returns {ListData}
     */
    export interface ListData {
      list: Announcement[]
      total: number
      type_list: TypeList[]
      alert: boolean
      alert_id: number
      time_zone: number
      t: string
      pic_list: unknown[]
      pic_total: number
      pic_type_list: unknown[]
      pic_alert: boolean
      pic_alert_id: number
      static_sign: unknown
    }

    /**
     * @description 公告内容数据
     * @since Alpha v0.1.2
     * @interface AnnoContentData
     * @property {AnnoContentItem[]} list 公告列表
     * @property {number} total 公告总数
     * @property {unknown[]} pic_list 图片列表
     * @property {number} pic_total 图片总数
     * @returns {ContentData}
     */
    export interface ContentData {
      list: ContentItem[]
      total: number
      pic_list: unknown[]
      pic_total: number
    }

    /**
     * @description 公告类型列表
     * @since Alpha v0.1.2
     * @interface AnnoTypeList
     * @property {number} id 类型 ID
     * @property {string} name 类型名称
     * @property {string} mi18n_name 类型名称
     * @returns {TypeList}
     */
    export interface TypeList {
      id: number
      name: string
      mi18n_name: string
    }

    /**
     * @description 公告列表项
     * @since Alpha v0.1.2
     * @interface AnnoListItem
     * @property {number} ann_id 公告 ID
     * @property {string} title 公告标题
     * @property {string} subtitle 公告副标题
     * @property {string} banner 公告图片
     * @property {unknown} content 公告内容
     * @property {string} type_label 公告类型标签
     * @property {string} tag_label 公告标签
     * @property {string} tag_icon 公告标签图标
     * @property {number} login_alert 是否登录提示
     * @property {string} lang 公告语言
     * @property {string} start_time 公告开始时间 // "2023-03-01 07:00:00"
     * @property {string} end_time 公告结束时间 // "2023-04-12 06:00:00"
     * @property {number} type 公告类型
     * @property {number} remind 公告提醒
     * @property {number} alert 公告紧急
     * @property {string} tag_start_time 公告标签开始时间 // "2000-01-02 15:04:05"
     * @property {string} tag_end_time 公告标签结束时间 // "2030-01-02 15:04:05"
     * @property {number} remind_ver 公告提醒版本
     * @property {boolean} has_content 是否有内容
     * @property {boolean} extra_remind 是否有额外提醒
     * @returns {ListItem}
     */
    export interface ListItem {
      ann_id: number
      title: string
      subtitle: string
      banner: string
      content: unknown
      type_label: string
      tag_label: string
      tag_icon: string
      login_alert: number
      lang: string
      start_time: string
      end_time: string
      type: number
      remind: number
      alert: number
      tag_start_time: string
      tag_end_time: string
      remind_ver: number
      has_content: boolean
      extra_remind: boolean
    }

    /**
     * @description 公告内容列表
     * @since Alpha v0.1.2
     * @interface AnnoContentItem
     * @property {number} ann_id 公告 ID
     * @property {string} title 公告标题
     * @property {string} subtitle 公告副标题
     * @property {string} banner 公告图片
     * @property {string} content 公告内容为 HTML
     * @property {string} lang 公告语言
     * @returns {ContentItem}
     */
    export interface ContentItem {
      ann_id: number
      title: string
      subtitle: string
      banner: string
      content: string
      lang: string
    }

    /**
     * @description 渲染用公告列表数据
     * @since Alpha v0.1.2
     * @interface AnnoListCard
     * @property {number} id 公告 ID
     * @property {string} title 公告标题
     * @property {string} subtitle 公告副标题
     * @property {string} banner 公告图片
     * @property {string} typeLabel 公告类型标签
     * @property {string} tagIcon 公告标签图标
     * @property {string} startTime 公告开始时间
     * @property {string} endTime 公告结束时间
     * @returns {ListCard}
     */
    export interface ListCard {
      id: number
      title: string
      subtitle: string
      banner: string
      typeLabel: string
      tagIcon: string
      startTime: string
      endTime: string
    }

  }
}
