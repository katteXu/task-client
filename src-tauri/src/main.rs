// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use task_client::model::{Todo, TodoApp};
use tauri::{async_runtime::Mutex, Result, State};

struct AppState {
    app: Mutex<TodoApp>,
}
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn get_todos(state: State<'_, AppState>) -> Result<Vec<Todo>> {
    let conn = state.app.lock().await;
    let data = conn.get_todos().expect("获取数据错误");
    Ok(data)
}

#[tauri::command]
async fn add_todo(todo: Todo, state: State<'_, AppState>) -> Result<bool> {
    let conn = state.app.lock().await;
    let result = conn.new_todo(todo);
    Ok(result)
}

#[tokio::main]
async fn main() {
    let app_dir = tauri::api::path::app_data_dir(&tauri::Config::default()).unwrap();

    // 包名要一致
    let app = TodoApp::new(app_dir.join("com.task-client.dev")).unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_todos, add_todo])
        .manage(AppState {
            app: Mutex::from(app),
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
