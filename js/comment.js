import comment_data from "../json_data/comment.json"  assert { type: "json" }
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

async function get_comments_info() {

    let url = DEFAULT_POST_URL + post_idx + '/comment';
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

let result = await get_comments_info();



let comment_json = JSON.parse(JSON.stringify(comment_data));

let comment_ul = document.getElementById("comment-list");
//li 생성

//댓글 나열하기
comment_json.forEach(item => {

    //댓글
    if (result.comment_parent_idx === 0) {
        let comment_li = document.createElement("li");
        let root_comment_div = document.createElement("div");
        root_comment_div.setAttribute('class', 'comment');
        root_comment_div.classList.add('root');
        root_comment_div.setAttribute('id', result.idx); //idx를 각 요소의 class로 추가


        //id
        let comment_id = document.createElement("a");
        comment_id.setAttribute('class', 'id');
        let id = document.createTextNode(result.user_id);
        comment_id.append(id);

        //content
        let comment_content = document.createElement("a");
        comment_content.setAttribute('class', 'content' + `${result.idx}`);
        reply_div.setAttribute('data-content', `${result.idx}`);
        let content = document.createTextNode(result.content);
        comment_content.append(content);

        //date
        let date_div = document.createElement("div");
        let comment_date = document.createElement("a");
        comment_date.setAttribute('class', 'date');
        let date = document.createTextNode(result.created_at);
        comment_date.append(date);
        date_div.append(comment_date);

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
        deleted.setAttribute("class", "deleted");
        deleted.innerHTML = "삭제";
        modify_delete.append(deleted);
        div.append(reply_div);
        div.append(modify_delete);

        //부모(root) 댓글
        root_comment_div.append(comment_id);
        root_comment_div.append(comment_content);
        root_comment_div.append(date_div);
        root_comment_div.append(div);

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
        comment_li.append(root_comment_div);
        comment_li.append(reply_input_div);
        comment_ul.append(comment_li);
    }

    //대댓글
    if (result.comment_parent_idx !== 0) {

        let comment_li = document.createElement("li");
        let sub_comment_div = document.createElement("div");
        sub_comment_div.setAttribute('class', 'comment');
        sub_comment_div.classList.add('sub');
        sub_comment_div.setAttribute('id', result.idx); //idx를 각 요소의 class로 추가

        //id
        let comment_id = document.createElement("a");
        comment_id.setAttribute('class', 'id');
        comment_id.innerHTML = "ㄴ";
        let id = document.createTextNode(result.user_id);
        comment_id.append(id);

        //content
        let comment_content = document.createElement("a");
        comment_content.setAttribute('class', 'content');
        let content = document.createTextNode(result.content);
        comment_content.append(content);

        //date
        let date_div = document.createElement("div");
        let comment_date = document.createElement("a");
        comment_date.setAttribute('class', 'date');
        let date = document.createTextNode(result.upload_date);
        comment_date.append(date);
        date_div.append(comment_date);

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
        sub_comment_div.append(comment_id);
        sub_comment_div.append(comment_content);
        sub_comment_div.append(date_div);
        sub_comment_div.append(div);
        //list생성
        comment_li.append(sub_comment_div);

        comment_ul.append(comment_li);

    }


});
//텍스트를 클릭할경우 상위 영역의 id 값을 갖고와서 그 하단 답글 버튼 활서오하?


//클릭한 요소의 id를 갖고온다.
//id의 숫자부부만 똑! 떼서 input 영역을 찾아서 활성화 시킨다

// let reply_input_section = document.getElementsByClassName("reply-input-section");

// comment_ul.addEventListener('click', (e) => {
//     let idx_num;
//     //input 영역의 dataset과 e.target의 dataset을 비교하여 일치할경우 활성화?
//     Array.prototype.forEach.call(reply_input_section, (el) => {
//         console.log(e.target.dataset.num);
//         console.log(el);
//         if (el.dataset.reply == e.target.dataset.num) {
//             idx_num = el.dataset.reply;

//             el.setAttribute("style", "display:block");
//         }
//         //document.getElementsById('reply-input' + e.target.dataset.num).setAttribute("display", "block");
//     });

//     if (idx_num == e.taget.dataset.button) {
//         let reply_input = document.getElementsByClassName("input" + idx_num)[0];
//         reply_submit(reply_input.value);
//         comment_idx++;
//         //이게 과연 맞는 로직일..까?

//     }
//     //답글 등록 버튼을 누르면 해당하는
// })



