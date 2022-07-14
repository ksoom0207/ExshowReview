import { DEFAULT_URL } from "../const_text.js";

function fetch_method(url, options) {

    fetch(url, options).then((response) => {
        if (response.status === 400) {
        }

        if (response.status === 200) {
            return response.json();
        };

    }).then((data) => {
        return data;
    }).catch((error) => { console.log(error); });
}

let content_section = document.getElementById("content-section");

sidebar.addEventListener("click", (e) => {

    Array.prototype.forEach.call(sidebar.children, (sidebar) => {
        sidebar.classList.remove("current-page");
    });


    while (content_section.hasChildNodes()) {
        content_section.removeChild(content_section.lastChild);
    }

    e.target.classList.add("current-page");
    if (e.target.id === "user_info") { //TODO: 다른 방법 찾아보기
        location.href = "./user-info.html"


    }
    if (e.target.id === "user_post") { //TODO: 다른 방법 찾아보기
        location.href = "./user-post.html"
    }
    if (e.target.id === "user_comment") { //TODO: 다른 방법 찾아보기
        let now_page = 1;
        post_render_content(now_page);
    }
})



async function get_page_info(now_page) {

    let url = DEFAULT_URL + "user_comment?" + "page=" + now_page;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": document.cookie
        }
    }
    const data = await fetch_method(url, options);

    return data;

}

let now_page = 1;
let page_start;
let page_end;
let page_total;
let total_page;
let content_page;
let post_content;

let comment_ul = document.getElementById("comment-list");


//댓글 나열하기
comment_json.forEach(item => {

    //
    let comment_li = document.createElement("li");
    let root_comment_div = document.createElement("div");
    root_comment_div.setAttribute('class', 'comment');
    root_comment_div.classList.add('root');
    root_comment_div.setAttribute('id', item.idx); //idx를 각 요소의 class로 추가

    //id
    let comment_id = document.createElement("a");
    comment_id.setAttribute('class', 'id');
    let id = document.createTextNode(item.user_id);
    comment_id.append(id);

    //content
    let comment_content = document.createElement("a");
    comment_content.setAttribute('class', 'content');
    let content = document.createTextNode(item.content);
    comment_content.append(content);

    //date
    let date_div = document.createElement("div");
    let comment_date = document.createElement("a");
    comment_date.setAttribute('class', 'date');
    let date = document.createTextNode(item.upload_date);
    comment_date.append(date);
    date_div.append(comment_date);

    let div = document.createElement("div");
    //댓글 버튼

    let modify_delete = document.createElement("div");
    modify_delete.setAttribute('class', 'sub');
    modify_delete.classList.add('modify-delete');

    let modify = document.createElement("div");
    modify.setAttribute("class", "modify");
    modify.innerHTML = "수정";
    modify_delete.append(modify);

    let deleted = document.createElement("div");
    deleted.setAttribute("class", "deleted");
    deleted.innerHTML = "삭제";
    modify_delete.append(deleted);
    div.append(modify_delete);

    //부모(root) 댓글
    root_comment_div.append(comment_id);
    root_comment_div.append(comment_content);
    root_comment_div.append(date_div);
    root_comment_div.append(div);
    //list생성
    comment_li.append(root_comment_div);
    comment_ul.append(comment_li);

    content_section.append(comment_ul);

});