//! @file src/client.rs
//! @desc 客户端模块，负责操作米游社客户端
//! @since Beta v0.3.8

use tauri::{AppHandle, CustomMenuItem, Manager, Menu, WindowBuilder, WindowUrl};
use url::Url;

// 创建米游社客户端菜单
fn create_mhy_menu() -> Menu {
  let top = CustomMenuItem::new("top".to_string(), "置顶");
  let cancel_top = CustomMenuItem::new("cancel_top".to_string(), "取消置顶");
  let open_post = CustomMenuItem::new("open_post".to_string(), "打开帖子");
  return Menu::new().add_item(top).add_item(cancel_top).add_item(open_post);
}

// 获取米游社客户端入口地址
fn get_mhy_client_url(func: String) -> WindowUrl {
  let mut url_res: Url = "https://bbs.mihoyo.com/ys/".parse().unwrap();
  if func == "sign_in" {
    url_res = "https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?act_id=e202009291139501"
      .parse()
      .unwrap();
  } else if func == "game_record" {
    url_res =
      "https://webstatic.mihoyo.com/app/community-game-records/index.html?bbs_presentation_style=fullscreen".parse().unwrap();
  } else if func == "birthday" {
    url_res = "https://webstatic.mihoyo.com/ys/event/e20220303-birthday/index.html?activity_id=20220301153521"
        .parse()
        .unwrap();
  }
  return WindowUrl::External(url_res);
}

// 操作米游社客户端
#[tauri::command]
pub async fn create_mhy_client(handle: AppHandle, func: String, url: String) {
  let mut mhy_window_config = handle.config().tauri.windows.get(1).unwrap().clone();
  // 如果没有传入 url 参数，则使用默认的米游社客户端入口地址
  if url != "" {
    mhy_window_config.url = WindowUrl::External(url.parse().unwrap());
  } else {
    mhy_window_config.url = get_mhy_client_url(func.clone());
  }
  if func == "birthday"
    || func == "web_act"
    || url.starts_with("https://webstatic.mihoyo.com/ys/event/e20220303-birthday/index.html")
  {
    mhy_window_config.width = 1280.0;
    mhy_window_config.height = 720.0;
  }
  let has_mhy_client = handle.get_window("mhy_client").is_some();
  if has_mhy_client {
    dbg!("mhy_client exists");
    return;
  }
  WindowBuilder::from_config(&handle, mhy_window_config)
    .menu(create_mhy_menu())
    .build()
    .expect("failed to create mhy_client")
    .on_menu_event(move |event| match event.menu_item_id() {
      "top" => {
        let window = handle.get_window("mhy_client").unwrap();
        window.set_always_on_top(true).unwrap();
      }
      "cancel_top" => {
        let window = handle.get_window("mhy_client").unwrap();
        window.set_always_on_top(false).unwrap();
      }
      "open_post" => {
        let window = handle.get_window("mhy_client").unwrap();
        let execute_js = r#"javascript:(async function(){
          let url = window.location.href;
          let arg = {
           method: 'teyvat_open',
           payload: url,
          }
          await window.__TAURI__.event.emit('post_mhy_client',JSON.stringify(arg));
        })()"#;
        window.eval(&execute_js).ok().unwrap();
      }
      _ => {}
    });
}
