
import { DEFAULT_POST_URL } from "../const_text.js";

let url_str = window.location.href;
const local_url = new URL(url_str);
const urlParams = local_url.searchParams;
const post_idx = urlParams.get('post_idx');


async function fetch_method(url, options) {

    const result = await fetch(url, options).then((response) => {

        if (response.status === 400) {

            console.log(response);
        }
        if (response.status === 404) {

            alert("찾을수 없는 페이지 입니다")
        }


        if (response.status === 200) {
            console.log(response);
            return response.json()

        };

    }).then(data => {
        console.log(data);
        return data
    }).catch((error) => {
        console.log(error);
    });

    return result;

}

async function get_post_info() {

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

let result = await get_post_info();


//제목
let title_section = document.getElementById("title");

let title_span = document.createElement("span");
title_span.setAttribute('class', 'category');
let text_title = document.createTextNode(result.title);
title_span.append(text_title);
title_section.append(title_span);

//서브 정보(인덱스, 날짜, 아이디, 조회수)
let sub_item = document.getElementsByClassName('sub');
console.log(sub_item);
let idx = document.createTextNode(result.idx);
sub_item[0].append(idx);

let date = document.createTextNode(result.created_at);
sub_item[1].append(date);

let user_id = document.createTextNode(result.user_id);
sub_item[2].append(user_id);

let view_count = document.createTextNode(result.view_count);
sub_item[3].append(view_count);


//내용
let content = document.getElementById("content");
let content_p = document.createElement("p");
let content_text = document.createTextNode(result.content);
content_p.append(content_text);
content.append(content_p);

// 수정삭제 버튼 있다없다 유무 => json 데이터에서 유무 판단하는 데이터 보내기
// 유저가 게시글을 작성한 유저라면?
// 아니라면?

//삭제 버튼 클릭시 이벤트
const show_delete_post_pop = () => {
    let popup_section = document.getElementById('COMMON_POPUP_SECTION');
    popup_section.setAttribute('isshowing', 'ture');
    popup_section.setAttribute('class', 'popup_container visible');
    popup_section.setAttribute('style', '');

}

function popuphide() {
    let popup_section = document.getElementById('COMMON_POPUP_SECTION');
    let input_section = document.getElementsByTagName('input');
    popup_section.setAttribute('isshowing', 'false');
    popup_section.setAttribute('class', 'popup_container');
    popup_section.setAttribute('style', 'display:none');

}

function delete_post_confirm() {

    let url = DEFAULT_POST_URL + post_idx;
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": document.cookie
        }
    };

    let result = fetch_method(url, options);
    if (result) {
        alert('게시글이 삭제되었습니다.');
        location.href = "post_main.html";
        return popuphide();
    }

}

let delete_confirm = document.getElementsByClassName('c01')[0];
delete_confirm.addEventListener("click", delete_post_confirm);




//수정 버튼 클릭시 이벤트
const modify_post = () => {

    location.href = "post_write.html"


}

//목록 버튼 클릭시 이벤트
//이전 목록 상태를 불러온다.