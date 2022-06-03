import comment_data from "../json_data/comment.json"  assert { type: "json" }

let comment_json = JSON.parse(JSON.stringify(comment_data));

let comment_ul = document.getElementById("comment-list");
//li 생성

//댓글 나열하기
comment_json.forEach(item => {

    //댓글
    if (item.comment_parent_idx === 0) {
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
        let reply_div = document.createElement("div");
        reply_div.setAttribute('class', 'sub');
        reply_div.classList.add('reply');
        reply_div.addEventListener("click", reply_input_display);//setAttribute("onClick", "reply_input_display()");
        reply_div.innerHTML = "답글";

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
        let reply_input = document.createElement("input");
        reply_input.setAttribute("class", "reply-input");
        //reply_input.setAttribute("style", "display:none;");
        reply_input_div.appendChild(reply_input);

        //등록버튼
        let reply_button = document.createElement("button");
        reply_button.setAttribute("class", "reply-button");
        reply_button.innerHTML = "등록";
        reply_input_div.append(reply_button);

        //list생성
        comment_li.append(root_comment_div);
        comment_li.append(reply_input_div);
        comment_ul.append(comment_li);
    }

    //대댓글
    if (item.comment_parent_idx !== 0) {

        let comment_li = document.createElement("li");
        let sub_comment_div = document.createElement("div");
        sub_comment_div.setAttribute('class', 'comment');
        sub_comment_div.classList.add('sub');
        //id
        let comment_id = document.createElement("a");
        comment_id.setAttribute('class', 'id');
        comment_id.innerHTML = "ㄴ";
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

function reply_input_display() {
    document.getElementsByClassName('reply-input-section')[0].setAttribute("style", "display:block;");
}