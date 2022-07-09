
let title = document.getElementById("title");
let content = document.getElementById("content");
let post_write_button = document.getElementById("post_write_button");

import { DEFAULT_POST_URL } from "../const_text.js";


//수정일 경우 데이터 불러오기
function post_data() {

    let url = DEFAULT_POST_URL + post_idx;
    let item;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then((response) => {
        if (response.status === 400) {
            console.log("fail");
        }

        if (response.status === 200) {
            response.json().then((data) => {
                title.value = data.title;
                content.value = data.content;
            })

        };
    }).catch((error) => { console.log(error); });

}