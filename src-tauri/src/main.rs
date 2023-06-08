// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_data() -> String {
    // let path = "./my_db.db3";
    // let conn = Connection::open(path).unwrap();

    // let mut stmt = conn.prepare("SELECT * FROM person").unwrap();
    // let person_iter = stmt
    //     .query_map([], |row| {
    //         Ok(Person {
    //             id: row.get(0)?,
    //             name: row.get(1)?,
    //             data: row.get(2)?,
    //         })
    //     })
    //     .unwrap();
    // let mut result = String::from("");
    // for person in person_iter {
    //     result = format!("Found person {:?}", person.unwrap());
    // }
    let result = String::from("test");
    result
}

// use rusqlite::{params, Connection, Result};

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // Ok(())
}
