
let title = document.getElementById("title");
let content = document.getElementById("content");
let post_write_button = document.getElementById("post_write_button");

import { DEFAULT_POST_URL } from "../const_text.js";

function post_check() {
    const post_write_data = {
        title: title.value,
        content: content.value
    };
    if (title.value.trim() == "" || title.value.replace(/^\s+|\s+$/gm, '') == "") {
        alert("제목을 입력해주세요");
        return false;
    }

    if (content.value.trim() == "" || content.value.replace(/^\s+|\s+$/gm, '') == "") {
        alert("내용을 입력해주세요");
        return false;
    }

    console.log(post_write_data);

    let url = DEFAULT_POST_URL + `write`
    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "x-access-token": document.cookie
        },
        body: JSON.stringify(post_write_data)

    }).then((response) => {

        if (response.status === 400) {
            console.log(response.json);
        }

        if (response.status === 201) {
            alert("게시글 작성 완료");
            location.href = "post_main.html";
        };
        console.log(response);
        return response.json().then((data) => {
            console.log(data);
        });

    }).catch((error) => {
        console.log(error);

    })

}

post_write_button.addEventListener("click", post_check);