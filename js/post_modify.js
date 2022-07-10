
let title = document.getElementById("title");
let content = document.getElementById("content");
let post_modify_button = document.getElementById("post_modify_button");

import { DEFAULT_POST_URL } from "../const_text.js";


//수정일 경우 데이터 불러오기
function post_data() {

    let url = DEFAULT_POST_URL + post_idx;
    let item;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": document.cookie
        },

    }).then((response) => {
        if (response.status === 400) {
            console.log("fail");
            //페이지 이동
        }

        if (response.status === 200) {
            response.json().then((data) => {
                title.value = data.title;
                content.value = data.content;
            })

        };
    }).catch((error) => { console.log(error); });

}

post_data();

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

    let url = DEFAULT_POST_URL + `write`
    fetch(url, {
        method: "PATCH",
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
            alert("게시글 수정 완료");
            location.href = "post_main.html";
        };

        return response.json().then((data) => {
            console.log(data);
        });

    }).catch((error) => {
        console.log(error);

    })

}

post_modify_button.addEventListener("click", post_check);
