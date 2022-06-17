
import { get_post_idx } from "./post_main.js"

let post_idx;
let url = "http://localhost:3000/post/" + post_idx;
let item;

fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }

}).then((response) => {
    if (response.status === 400) {
        console.log("fail");
    }

    if (response.status === 200) {
        response.json();
    };

}).then((data) => {
    item = data;
}).catch((error) => { console.log(error); });




//제목
let title_section = document.getElementById("title");

let title_span = document.createElement("span");
title_span.setAttribute('class', 'category');
let text_title = document.createTextNode(item.title);
title_span.append(text_title);
title_section.append(title_span);
//TODO: url에 idx 넘기는 방법 찾아보기

//서브 정보(인덱스, 날짜, 아이디, 조회수)
let sub_item = document.getElementsByClassName('sub');
console.log(sub_item);
let idx = document.createTextNode(item.idx);
sub_item[0].append(idx);

let date = document.createTextNode(item.upload_date);
sub_item[1].append(date);

let user_id = document.createTextNode(item.user_id);
sub_item[2].append(user_id);

let view_count = document.createTextNode(item.view_post_count);
sub_item[3].append(view_count);


//내용
let content = document.getElementById("content");
let content_p = document.createElement("p");
let content_text = document.createTextNode(item.content);
content_p.append(content_text);
content.append(content_p);

// 수정삭제 버튼 있다없다 유무 => json 데이터에서 유무 판단하는 데이터 보내기
// 유저가 게시글을 작성한 유저라면?
// 아니라면?

//삭제 버튼 클릭시 이벤트
const delete_post = () => {

    //삭제 팝업을 띄운다
    if (/* 확인클릭시 */) {
        let url = "http://localhost:3000/post/" + post_idx;
        let item;

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        }).then((response) => {
            if (response.status === 400) {
                console.log("fail");
            }

            if (response.status === 204) {
                //삭제되었습니다 팝업을 띄운다
                // postmain 페이지로 돌아간다. 
                location.href = "post_main.html";
            };
        }).catch((error) => { console.log(error); });

    }


}

//수정 버튼 클릭시 이벤트
const modify_post = () => {
    //삭제 팝업을 띄운다.
    //확인 클릭시 api 요청을 보낸다.

    location.href = "post_write.html"


}

//목록 버튼 클릭시 이벤트
//이전 목록 상태를 불러온다.