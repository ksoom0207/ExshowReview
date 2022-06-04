let comment_write_button = document.getElementsByClassName("comment-write");
let comment_input = document.getElementById("comment-input");

//TODO: 댓글 생성하면 db에서 idx 값 보내주는거 고려하기
let comment_idx = 4;

function submit() {

    let comment_ul = document.getElementById("comment-list");

    //댓글
    let comment_li = document.createElement("li");
    let root_comment_div = document.createElement("div");
    root_comment_div.setAttribute('class', 'comment');
    root_comment_div.classList.add('root');
    root_comment_div.setAttribute('id', comment_idx);
    //id
    let comment_id = document.createElement("a");
    comment_id.setAttribute('class', 'id');
    let id = document.createTextNode("test"); //임시데이터
    comment_id.append(id);

    //content
    let comment_content = document.createElement("a");
    comment_content.setAttribute('class', 'content');
    let content = document.createTextNode(comment_input.value);
    comment_content.append(content);

    //date
    let date_div = document.createElement("div");
    let comment_date = document.createElement("a");
    comment_date.setAttribute('class', 'date');
    let date = document.createTextNode("2022.06.02"); //임시데이터
    comment_date.append(date);
    date_div.append(comment_date);

    let div = document.createElement("div");
    //댓글 버튼
    let reply_div = document.createElement("div");
    reply_div.setAttribute('class', 'sub');
    reply_div.classList.add('reply');
    reply_div.setAttribute('data-num', comment_idx); // 임시데이터 
    reply_div.innerHTML = "답글";

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
    reply_input_div.setAttribute('data-reply', comment_idx);
    let reply_input = document.createElement("input");
    reply_input.setAttribute('class', `input${comment_idx}`);
    reply_input_div.append(reply_input);


    //등록버튼
    let reply_button = document.createElement("button");
    reply_button.setAttribute("class", "reply-button");
    reply_button.setAttribute('data-button', comment_idx);
    reply_button.innerHTML = "등록";
    reply_input_div.append(reply_button);


    //list생성
    comment_li.append(root_comment_div);
    comment_li.append(reply_input_div);
    comment_ul.append(comment_li);

}


//대댓글
function reply_submit(value) {
    let comment_ul = document.getElementById("comment-list");

    let comment_li = document.createElement("li");
    let sub_comment_div = document.createElement("div");
    sub_comment_div.setAttribute('class', 'comment');
    sub_comment_div.classList.add('sub');
    sub_comment_div.setAttribute('id', comment_idx);
    //id
    let comment_id = document.createElement("a");
    comment_id.setAttribute('class', 'id');
    comment_id.innerHTML = "ㄴ";
    let id = document.createTextNode('test');
    comment_id.append(id);

    //content
    let comment_content = document.createElement("a");
    comment_content.setAttribute('class', 'content');
    let content = document.createTextNode(value);
    comment_content.append(content);

    //date
    let date_div = document.createElement("div");
    let comment_date = document.createElement("a");
    comment_date.setAttribute('class', 'date');
    let date = document.createTextNode("2022.06.02");
    comment_date.append(date);
    date_div.append(comment_date);

    let div = document.createElement("div");

    //댓글 버튼
    let reply_div = document.createElement("div");
    reply_div.setAttribute('class', 'sub');
    reply_div.classList.add('reply');
    reply_div.setAttribute('data-num', comment_idx);
    reply_div.innerHTML = "답글";


    //수정 삭제 버튼
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

    //자식(sub) 댓글
    sub_comment_div.append(comment_id);
    sub_comment_div.append(comment_content);
    sub_comment_div.append(date_div);
    //sub_comment_div.append(reply_div);
    sub_comment_div.append(div);

    //답글 영역 정의 하기
    let reply_input_div = document.createElement("div");
    reply_input_div.setAttribute("class", "reply-input");
    reply_input_div.setAttribute("display", "none");
    reply_input_div.setAttribute('data-reply', comment_idx);
    let reply_input = document.createElement("input");
    reply_input.setAttribute('class', `input${comment_idx}`);
    reply_input_div.append(reply_input);

    //등록버튼
    let reply_button = document.createElement("button");
    reply_button.setAttribute("class", "reply-button");
    reply_button.setAttribute('data-button', comment_idx);
    reply_button.innerHTML = "등록";
    reply_input_div.append(reply_button);

    //list생성
    comment_li.append(sub_comment_div);
    comment_li.append(reply_input_div);
    comment_ul.append(comment_li);
}


//댓글 등록버튼
comment_write_button[0].addEventListener("click", (event) => {
    console.log('inputtest');
    comment_idx++;
    submit();
    comment_input.value = "";
});


//Enter 눌렀을 경우
comment_input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        console.log('submittest');
        submit();
        comment_input.value = "";
    }

})


//답글 등록버튼


let reply_input_section = document.getElementsByClassName("reply-input-section");

let comment_ul = document.getElementById("comment-list");
let idx_num;
let reply_style;
comment_ul.addEventListener('click', (e) => {

    //input 영역의 dataset과 e.target의 dataset을 비교하여 일치할경우 활성화?
    Array.prototype.forEach.call(reply_input_section, (el) => {
        //e.target == class : reply 인 '답글' 영역

        if (el.dataset.reply === e.target.dataset.num) {
            console.log(el.dataset.reply + '  ' + e.target.dataset.num);
            console.log(reply_style);
            idx_num = el.dataset.reply; //해당하는 답글의 번호
            el.style.display = "block";
            // el.setAttribute("style", "display:block");
            reply_style = el.style.display; // dis
        }
        //document.getElementsById('reply-input' + e.target.dataset.num).setAttribute("display", "block");
    });

    if (idx_num == parseInt(e.target.dataset.button)) {

        reply_style = "none";
        let reply_input = document.getElementsByClassName(`input${idx_num}`)[0];
        comment_idx++;
        reply_submit(reply_input.value);
        reply_input.value = "";
    }
    //답글 등록 버튼을 누르면 해당하는 

})

