import { DEFAULT_URL } from "../const_text.js";

let user_id;
let user_name;
let user_email;
let user_photo;

let content_section = document.getElementById("content-section");

//TODO: 로컬/세션 스토리지 외 다른 방법 찾아보기
let user_idx = parseInt(sessionStorage.getItem("user_idx"));

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

async function user_info_load() {

  // while (content_section.hasChildNodes()) {
  //     content_section.removeChild(content_section.lastChild);
  // }

  let user_info_url = DEFAULT_URL + user_idx + '/info';
  let options = {
    method: "GET",
    headers: {
      "x-access-token": document.cookie
    }
  };
  content_section.innerHTML = str; //+ img_pop_html + pass_pop_html;
  let result = await fetch_method(user_info_url, options);
  console.log(result);

  Wdocument.getElementsByClassName('user_id')[0].value = result.id;
  document.getElementsByClassName('name')[0].value = result.name;
  document.getElementsByClassName('email')[0].value = result.email;
  let img_div = document.getElementById('image-show');
  let img = document.createElement('img');
  img.setAttribute("class", 'img-section');

  img.src = result.user_photo;
  img.style.width = "15rem";
  img.style.height = "15.5rem";
  img_div.appendChild(img);
}

let modify_btn = document.getElementById("user-info-modify");

//버튼 클릭시 활성, 비활성화
modify_btn.addEventListener("click", input_box_info);

let email_button = document.getElementById("email-modify");

function input_box_info() {

  let email_info = document.getElementsByClassName('email')[0];

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

//이메일 수정 버튼 클릭시
email_button.addEventListener("click", user_email_modify);

async function user_email_modify() {

  if (document.getElementsByClassName('email')[0].value === null) {
    alert("email을 입력해주세요");
  }

  if (email_button.style.display === "block" && modify_btn.innerHTML === "회원정보 수정") {
    let user_info_url = DEFAULT_URL + user_idx + '/info';
    let options = {
      method: "PATCH",
      headers: {
        "x-access-token": document.cookie
      },
      body: {
        "email": document.getElementsByClassName('email')[0].value
      }
    };

    await fetch_method(user_info_url, options);
    alert("변경완료");
  }
  else return false;
}


//이미지 팝업
let upload_pro = document.getElementById("upload-profile");
let popup_container = document.getElementById('IMG-POPUP');

function upload_pop() {

  popup_container.classList.add('visible');
  popup_container.setAttribute('style', 'display:block');
}
upload_pro.addEventListener("click", upload_pop);

const real_input = document.querySelector('#real-input');
const upload = document.querySelector('.choose-photo');
let file_info;

let new_image = document.getElementsByClassName("img-section")[0];
console.log(new_image)
let file;

function load_file(input) {
  file = input.currentTarget.files[0];
  let name = document.getElementById('file_name');
  name.textContent = file.name;
  new_image.src = window.URL.createObjectURL(file);
  //  new_image.style.display = "none";   //버튼을 누르기 전까지는 이미지를 숨긴다

}

real_input.addEventListener('change', load_file);

let submit = document.getElementById('submit_button');

async function show_image() {

  let container = document.getElementById('image-show');
  //jsondata
  window.URL.revokeObjectURL(file);

  //new_image.srcObject = file;
  // new_image.src = URL.createObjectURL(file);
  //  new_image.style.display = "none";   //버튼을 누르기 전까지는 이미지를 숨긴다
  //new_image.style.objectFit = "contain";

  let user_photo = new_image.src;

  let user_photo_url = DEFAULT_URL + user_idx + '/user_photo';
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": document.cookie
    },
    body: JSON.stringify(user_photo)

  };


  let result = await fetch_method(user_photo_url, options);

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

submit.addEventListener('click', show_image);     //Submit 버튼 클릭시 이미지 저장


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

let img_exit = document.querySelector('.img_exit');
img_exit.addEventListener("click", popuphide_img);

let pwd_cancel = document.getElementsByClassName('cancel');
console.log(pwd_cancel);
for (var i = 0; i < pwd_cancel.length; i++) {

  pwd_cancel.addEventListener("click", popuphide);

}

//비일번호 팝업 
function pwd_change_layout() {
  let new_pwd = document.getElementById('new_password').value;
  let new_pwd_confirm = document.getElementById('new_password_confirm').value;

  if (new_pwd !== new_pwd_confirm) {
    document.getElementById('case_id2').style.display = 'none';
    document.getElementById('new_password_confirm').style.borderColor = "";

    let text = document.getElementById('case_id2');
    text.setAttribute("style", "display:block");

    let user_pwd_url = DEFAULT_URL + user_idx + '/password';

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

let pwd_confirm = document.getElementsByClassName('c01')[0];
pwd_confirm.addEventListener("click", pwd_change_layout);


//공통모듈
let sidebar = document.getElementById("sidebar-menu");

sidebar.addEventListener("click", (e) => {
  console.log(e);
  Array.prototype.forEach.call(sidebar.children, (sidebar) => {
    sidebar.classList.remove("current-page");
  });

  while (content_section.hasChildNodes()) {
    content_section.removeChild(content_section.lastChild);
  }

  e.target.classList.add("current-page");
  console.log(e.target);
  if (e.target.id === "user_info") { //TODO: 다른 방법 찾아보기
    location.href = "./user-info.html"
  }
  if (e.target.id === "user_post") { //TODO: 다른 방법 찾아보기
    location.href = "./user-post.html"
  }

})
