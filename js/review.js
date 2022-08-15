import comment_data from "../json_data/comment.json"  assert { type: "json" }
import { DEFAULT_CULTURE_URL } from "../const_text.js";


let url_str = window.location.href;
const local_url = new URL(url_str);
const urlParams = local_url.searchParams;
const culture_idx = urlParams.get('culture_idx');

async function fetch_method(url, options) {

    const result = await fetch(url, options).then((response) => {

        if (response.status === 400) {

            console.log(response);
        }
        if (response.status === 404) {

            alert("찾을수 없는 페이지 입니다")
        }

        if (response.status === 204) {
            return "deleted"
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

async function get_reviews_info() {

    let url = DEFAULT_CULTURE_URL + culture_idx + '/review';
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

let result = await get_reviews_info();


let review_json = JSON.parse(JSON.stringify(result));

let review_ul = document.getElementById("review-list");
//li 생성

//댓글 나열하기
review_json.forEach(item => {

    //댓글
    if (result.review_parent_idx === 0) {
        let review_li = document.createElement("li");
        let root_review_div = document.createElement("div");
        root_review_div.setAttribute('class', 'review');
        root_review_div.classList.add('root');
        root_review_div.setAttribute('id', result.idx); //idx를 각 요소의 class로 추가


        //id
        let review_id = document.createElement("a");
        review_id.setAttribute('class', 'id');
        let id = document.createTextNode(result.user_id);
        review_id.append(id);

        //content
        let review_content = document.createElement("a");
        review_content.setAttribute('class', 'content' + `${result.idx}`);
        reply_div.setAttribute('data-content', `${result.idx}`);
        let content = document.createTextNode(result.content);
        review_content.append(content);

        //date
        let date_div = document.createElement("div");
        let review_date = document.createElement("a");
        review_date.setAttribute('class', 'date');
        let date = document.createTextNode(result.created_at);
        review_date.append(date);
        date_div.append(review_date);

        let div = document.createElement("div");
        //댓글 버튼
        let reply_div = document.createElement("div");
        reply_div.setAttribute('class', 'sub');
        reply_div.classList.add('reply');
        reply_div.setAttribute('data-num', `${result.idx}`);
        reply_div.innerHTML = "답글";

        let modify_delete = document.createElement("div");
        modify_delete.setAttribute('class', 'sub');
        modify_delete.classList.add('modify-delete');

        let modify = document.createElement("div");
        modify.setAttribute("class", "modify" + `${result.idx}`);
        modify.innerHTML = "수정";
        modify_delete.append(modify);

        let deleted = document.createElement("div");
        deleted.setAttribute("class", "deleted" + `${result.idx}`);
        deleted.innerHTML = "삭제";
        modify_delete.append(deleted);
        div.append(reply_div);
        div.append(modify_delete);

        //부모(root) 댓글
        root_review_div.append(review_id);
        root_review_div.append(review_content);
        root_review_div.append(date_div);
        root_review_div.append(div);

        //답글 영역 정의 하기
        let reply_input_div = document.createElement("div");
        reply_input_div.setAttribute("class", "reply-input-section");
        reply_input_div.setAttribute("style", "display:none;");
        reply_input_div.setAttribute('data-reply', result.idx);
        let reply_input = document.createElement("input");
        reply_input_div.appendChild(reply_input);

        //등록버튼
        let reply_button = document.createElement("button");
        reply_button.setAttribute("class", "reply-button");
        reply_button.setAttribute('data-button', result.idx);
        reply_button.innerHTML = "등록";
        reply_input_div.append(reply_button);

        //list생성
        review_li.append(root_review_div);
        review_li.append(reply_input_div);
        review_ul.append(review_li);
    }

    //대댓글
    if (result.review_parent_idx !== 0) {

        let review_li = document.createElement("li");
        let sub_review_div = document.createElement("div");
        sub_review_div.setAttribute('class', 'review');
        sub_review_div.classList.add('sub');
        sub_review_div.setAttribute('id', result.idx); //idx를 각 요소의 class로 추가

        //id
        let review_id = document.createElement("a");
        review_id.setAttribute('class', 'id');
        review_id.innerHTML = "ㄴ";
        let id = document.createTextNode(result.user_id);
        review_id.append(id);

        //content
        let review_content = document.createElement("a");
        review_content.setAttribute('class', 'content');
        let content = document.createTextNode(result.content);
        review_content.append(content);

        //date
        let date_div = document.createElement("div");
        let review_date = document.createElement("a");
        review_date.setAttribute('class', 'date');
        let date = document.createTextNode(result.upload_date);
        review_date.append(date);
        date_div.append(review_date);

        let div = document.createElement("div");
        //수정삭제 버튼
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

        //자식(sub) 댓글
        sub_review_div.append(review_id);
        sub_review_div.append(review_content);
        sub_review_div.append(date_div);
        sub_review_div.append(div);
        //list생성
        review_li.append(sub_review_div);

        review_ul.append(review_li);

    }


});



