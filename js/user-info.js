import { DEFAULT_URL } from "../const_text.js";

let user_id;
let user_name;
let user_email;
let user_photo;

let content_section = document.getElementById("content-section");

//TODO: 로컬 이외 다른 방법 찾아보기
let user_idx = parseInt(localStorage.getItem("user_idx"));


async function fetch_method(url, options) {

    const result = fetch(url, options).then((response) => {
        if (response.status === 400) {
        }

        if (response.status === 401) {
            alert("로그인이 필요합니다.");
            location.href = "./login.html"
        }


        if (response.status === 403) {
            alert("접근 권한이 없습니다.");
            location.href = "../post_main.html"
        }


        if (response.status === 200) {
            return response.json();
        };

    }).then((data) => {
        return data;
    }).catch((error) => { console.log(error); });
    return result;
}

let str = `  <div class="content-left">
<div class="content-left-title">
  <span class="text-bold">회원 정보</span>
</div>

<div class="content-section">
  <ul class="basic-info">기본 정보
    <li>
      <span>아이디</span>
      <input class="user_id" disabled>
    </li>
    <li>
      <span>이름</span>
      <input class="name" disabled>
    </li>
    <li>
      <span>이메일</span>
      <input class="email" disabled>
      <button id="email-modify" style="display: none;">변경</button>
    </li>

  </ul>
  <div class="button_area">
    <button id="user-info-modify">회원정보 수정</button>
    <button id="password-modify">
      <a class="btn_type01 c02" id="password-modify-button">비밀번호 변경 </a>
    </button>
  </div>
</div>
</div>

<div class="content-right">
<div class="user-photo" id="user-photo">
  <a>프로필 사진</a>
  <div class="image-show" id="image-show">
  </div>
  <button id="upload-profile">프로필 사진 업로드 </button>
</div>
</div>
`
async function user_info_load() {

    while (content_section.hasChildNodes()) {
        content_section.removeChild(content_section.lastChild);
    }

    let user_info_url = DEFAULT_URL + user_idx + '/info';
    let options = {
        method: "GET",
        headers: {
            "x-access-token": document.cookie
        }
    };
    content_section.innerHTML = str;
    let result = await fetch_method(user_info_url, options);
    console.log(result);
    document.getElementsByClassName('user_id')[0].value = result.id;
    document.getElementsByClassName('name')[0].value = result.name;
    document.getElementsByClassName('email')[0].value = result.email;
    let img_div = document.getElementById('image-show');
    let img = document.createElement('img');
    img.setAttribute("class", 'img');
    img.src = user_photo;
    img.style.width = "15rem";
    img.style.height = "15.5rem";
    img_div.appendChild(img);


}

let modify_btn = document.getElementById("user-info-modify");

//버튼 클릭시 활성, 비활성화
modify_btn.addEventListener("click", input_box_info);

function input_box_info() {

    let email_info = document.getElementsByClassName('email')[0];
    let email_button = document.getElementById("email-modify");

    switch (email_info.disabled) {
        case true: {
            email_info.disabled = false;
            email_button.style.display = "block";
            modify_btn.innerHTML = "확인";
            email_info.style.width = "150px";
        } break;
        case false: {
            //이메일이 바뀌었을 경우 변경버튼을 누르지 않았을 경우 반영안됨
            //새로 인증 하도록 유도
            modify_btn.innerHTML = "회원정보 수정";
            email_button.style.display = "none";
            email_info.disabled = true;
            email_info.style.width = "200px";

        } break;
    }
}



//이미지 팝업
let upload_pro = document.getElementById("upload-profile");
let popup_container = document.getElementById('IMG-POPUP');
upload_pro.addEventListener("click", upload_pop);

function upload_pop() {
    popup_container.classList.add('visible');
    popup_container.setAttribute('style', 'display:block');
}

const real_input = document.querySelector('#real-input');
const upload = document.querySelector('.choose-photo');
let file_info;
let new_image = document.getElementsByClassName("img")[0];
let file;
function load_file(input) {
    file = input.currentTarget.files[0];

    let name = document.getElementById('file_name');
    name.textContent = file.name;
    // new_image.style.display = "none";   //버튼을 누르기 전까지는 이미지를 숨긴다
    // new_image.style.objectFit = "contain";

}

real_input.addEventListener('change', load_file);

let submit = document.getElementById('submit_button');
submit.addEventListener('click', show_image);     //Submit 버튼 클릭시 이미지 저장

function show_image() {

    let container = document.getElementById('image-show');
    //jsondata
    new_image.src = URL.createObjectURL(file);
    let user_photo = new_image.src;

    let user_photo_url = "http://localhost:3000/user/" + user_idx + '/user_photo';
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user_photo)

    };

    let result = fetch_method(user_photo_url, options);
    if (result) { //TODO: 응답 값 오면 수정
        container.appendChild(new_image);

        let new_image_chlid = document.getElementById('image-show').lastElementChild;

        //이미지는 화면에 나타나고
        new_image_chlid.style.display = "block";
        //이미지 업로드 영역 및 버튼은 숨겨진다
        popup_container.classList.remove('visible');
        popup_container.setAttribute('style', 'display:none');
        document.getElementById('file_name').textContent = null;     //기존 파일 이름 지우기
    }
}

//이미지 팝업 숨기기
function popuphide_img() {
    let popup_section = document.getElementById('IMG-POPUP');
    let input_section = document.getElementById('file_name');
    popup_container.classList.remove('visible');
    popup_section.setAttribute('style', 'display:none');
    input_section.innerHTML = "";

}

let img_exit = document.querySelector('.img_exit');
img_exit.addEventListener("click", popuphide_img);


//비밀번호 팝업
function show_pass_layer_pop() {
    let popup_section = document.getElementById('COMMON_POPUP_SECTION');
    popup_section.setAttribute('isshowing', 'ture');
    popup_section.setAttribute('class', 'popup_container visible');
    popup_section.setAttribute('style', '');

}

let pwd_modify = document.getElementById('password-modify-button');
pwd_modify.addEventListener("click", show_pass_layer_pop);

//비밀번호 팝업 숨기기
function popuphide() {
    let popup_section = document.getElementById('COMMON_POPUP_SECTION');
    let input_section = document.getElementsByTagName('input');
    popup_section.setAttribute('isshowing', 'false');
    popup_section.setAttribute('class', 'popup_container');
    popup_section.setAttribute('style', 'display:none');

    for (let i = 0; i < input_section.length; i++) {
        input_section[i].value = null;
    }

}

// let pwd_cancel = document.getElementsByClassName('c02')[0];
// pwd_cancel.addEventListener("click", popuphide);

//비일번호 팝업 
function pwd_change_layout() {
    let new_pwd = document.getElementById('new_password').value;
    let new_pwd_confirm = document.getElementById('new_password_confirm').value;

    if (new_pwd !== new_pwd_confirm) {
        document.getElementById('case_id2').style.display = 'none';
        document.getElementById('new_password_confirm').style.borderColor = "";

        let text = document.getElementById('case_id2');
        text.setAttribute("style", "display:block");

        let user_pwd_url = "http://localhost:3000/user/" + user_idx + '/password';

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": document.cookie
            },
            body: JSON.stringify(new_pwd)

        };

        let result = fetch_method(user_pwd_url, options);
        if (result) {
            alert('비밀번호가 변경되었습니다.');
            return popuphide();
        }

    }
    //일치할경우
    if (new_pwd === new_pwd_confirm) {
        document.getElementById('case_id2').style.display = 'block';
        document.getElementById('new_password_confirm').style.borderColor = "red";
        return false;
    }
}

// let pwd_confirm = document.getElementsByClassName('c01')[0];
// pwd_cancel.addEventListener("click", pwd_change_layout);


//공통모듈
let sidebar = document.getElementById("sidebar-menu");

sidebar.addEventListener("click", (e) => {

    Array.prototype.forEach.call(sidebar.children, (sidebar) => {
        sidebar.classList.remove("current-page");
    });


    while (content_section.hasChildNodes()) {
        content_section.removeChild(content_section.lastChild);
    }

    e.target.classList.add("current-page");
    console.log(e.target);
    if (e.target.id === "user_info") { //TODO: 다른 방법 찾아보기
        console.log(document.cookie);
        render_content();
    }
    if (e.target.id === "user_post") { //TODO: 다른 방법 찾아보기
        console.log('render');
        let now_page = 1;
        post_render_content(now_page);
    }
})


///////////////////////////////레이어 팝업
//회원정보에 데이터 넣기

const render_content = () => {
    user_info_load();

}

render_content();


// //////////////////


// let now_page = 1;
// let page_start = user_data.user_post.page_nation_start;
// let page_end = user_data.user_post.page_nation_end;
// let page_total = user_data.user_post.page_nation_total;
// let total_page = user_data.user_post.total_page;
// let content_page = user_data.user_post.content_page;  //노출갯수



let div = document.createElement("div");
//테이블 정렬? 그냥 그리드?
let post_list_div = document.createElement("div");

const move_side_menu = (page) => {

    post_list_div.setAttribute("class", "user-post-list");

    while (post_list_div.hasChildNodes()) {
        post_list_div.removeChild(post_list_div.lastChild);
    }


    let th = document.createElement("th");
    let user_post = "http://localhost:3000/user/" + user_idx + '/post_list';

    let options = {
        method: "GET",
        headers: { "x-access-token": document.cookie }
    };

    let result = fetch_method(user_post, options);
    //Array.from

    result.content.forEach((item) => {
        let tr = document.createElement("tr");

        let td_idx = document.createElement("td");
        td_idx.append(item.idx);

        let td_title = document.createElement("td");
        td_title.setAttribute('class', 'post-title');

        let a_post_link = document.createElement('a');
        a_post_link.setAttribute('herf', "./post_detail.html");
        let text_title = item.title + " [" + item.comment_count + "]";
        a_post_link.append(text_title);
        td_title.append(a_post_link);

        let td_upload_time = document.createElement("td");
        //json 키값 통일...
        let text_upload_time = document.createTextNode(item.upload_date);
        td_upload_time.append(text_upload_time);

        let td_view = document.createElement("td");
        let text_view = document.createTextNode(item.view_post_count);
        td_view.append(text_view);

        let td_like = document.createElement("td");
        let text_like = document.createTextNode(item.like_post_count);
        td_like.append(text_like);

        tr.append(td_idx);
        tr.append(td_title);

        tr.append(td_upload_time);
        tr.append(td_view);
        tr.append(td_like);

        th.append(tr);

    });
    post_list_div.append(th);
    div.append(post_list_div);
    content_section.append(div);
}


const go_prev_page = () => {
    now_page -= content_page;
    postlist_render(now_page);
};

const go_next_page = () => {
    now_page += content_page;
    postlist_render(now_page);
};


const go_first_page = () => {
    postlist_render(page_start);
};

const go_last_page = () => {
    postlist_render(page_end);
};


let allpreli = document.createElement('li');
let text_allprev = document.createElement('a');
text_allprev.setAttribute('href', '#js-bottom');
text_allprev.setAttribute('class', 'first');
text_allprev.setAttribute('id', 'first');
text_allprev.innerHTML = '처음 페이지';
text_allprev.addEventListener("click", go_first_page);
allpreli.append(text_allprev);

let preli = document.createElement('li');
let text_prev = document.createElement('a');
text_prev.setAttribute('href', '#js-bottom');
text_allprev.setAttribute('class', 'prev');
text_prev.setAttribute('id', 'prev');
text_prev.innerHTML = '이전 페이지';
preli.append(text_prev);
text_prev.addEventListener("click", go_prev_page);

let allendli = document.createElement('li');
let text_li = document.createElement('a');
text_li.setAttribute('href', '#js-bottom');
text_li.setAttribute('id', 'end');
text_li.setAttribute('class', 'end');
text_li.innerHTML = '마지막페이지';
text_li.addEventListener("click", go_last_page);
allendli.append(text_li);

let endli = document.createElement('li');
let next = document.createElement('a');
next.setAttribute('href', '#js-bottom');
next.setAttribute('id', 'next');
next.setAttribute('class', 'next');
next.addEventListener("click", go_next_page);
next.innerHTML = '다음 페이지';
endli.append(next);



/*페이징 버튼 생성 처음페이지 마지막 페이지  */
const page_render = (now_page) => {

    const fragmentPage = document.createElement('div');

    fragmentPage.setAttribute('id', 'page_nation');

    while (fragmentPage.hasChildNodes()) {
        fragmentPage.removeChild(fragmentPage.lastChild);
    }

    for (let i = (now_page - 1) * content_page + 1; i <= now_page * content_page && i <= page_total; i++) {
        fragmentPage.appendChild(make_button(i));
    }

    fragmentPage.children[0].classList.add("active");

    fragmentPage.prepend(allpreli);
    fragmentPage.prepend(preli);

    fragmentPage.append(endli);
    fragmentPage.append(allendli);


    //이전페이지 등이 존재 할경우
    if (now_page === 1 || (now_page - content_page < 1)) {
        fragmentPage.removeChild(allpreli);
        fragmentPage.removeChild(preli);
    }

    if ((now_page + content_page > page_total) || (now_page === page_end)) {
        fragmentPage.removeChild(endli);
        fragmentPage.removeChild(allendli);
    }

    div.append(fragmentPage);

}


const make_button = (i) => {

    let li = document.createElement("li");
    li.setAttribute('href', '#js-bottom');
    li.setAttribute('id', `page-${i}`);
    li.setAttribute('data-num', `${i}`);
    li.setAttribute('class', 'page_num');
    li.innerHTML = `${i}`;

    // li.addEventListener('click', (e) => {
    //     //선택한 페이지만 활성화 되도록 구현 
    //     Array.prototype.forEach.call(li.children, (li) => {
    //         if (li.dataset.num) li.classList.remove("active");
    //     });

    //     e.target.classList.add("active");

    // });
    // postlist_render(parseInt(e.target.dataset.num));

    return li;
}


const post_render_content = (now_page) => {

    //페이지가 노출된다
    move_side_menu(now_page);
    //버튼이 바뀐다
    page_render(now_page);
}



