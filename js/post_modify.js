
let title = document.getElementById("title");
let content = document.getElementById("content");
let post_modify_button = document.getElementById("post_modify_button");

import { DEFAULT_POST_URL } from "../const_text.js";



let url_str = window.location.href;
const local_url = new URL(url_str);
const urlParams = local_url.searchParams;
const post_idx = urlParams.get('post_idx');


async function fetch_method(url, options) {

    const result = await fetch(url, options).then((response) => {

        if (response.status === 400) {
        }

        if (response.status === 200) {
            return response.json()
            //reject된 값을 받으려면 await나 then을 써야
            /* response.json().then((data) => {
 
                 return data
             })*/
        };

    }).then(data => {
        return data
    }).catch((error) => { console.log(error); });

    return result;

}


async function get_post() {


    let url = DEFAULT_POST_URL + post_idx;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": document.cookie
        }
    }

    const data = await fetch_method(url, options);
    return data

}

let data = await get_post();
title.value = data.title;
content.value = data.content;


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
    const options =
    {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "x-access-token": document.cookie
        },
        body: JSON.stringify(post_write_data)
    }

    fetch(url, options).then((response) => {

        if (response.status === 400) {
            console.log(response.json);
        }

        if (response.status === 200) {
            alert("게시글 수정 완료");
            //const data = await response.json()
            location.href = "post_detail.html?post_idx=" + post_idx;
        };

    }).catch((error) => {
        console.log(error);

    })

}

post_modify_button.addEventListener("click", post_check);

/*


    let url = DEFAULT_POST_URL + `write`
    const options =
    {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "x-access-token": document.cookie
        },
        body: JSON.stringify(post_write_data)
    }


    const data = await fetch_method(url, options);
    return data


*/