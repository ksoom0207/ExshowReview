import user_data from "../json_data/user_data.json"  assert { type: "json" }


//회원정보에 데이터 넣기
document.getElementsByClassName('user_id')[0].value = user_data.user_info.user_id;
document.getElementsByClassName('name')[0].value = user_data.user_info.name;
document.getElementsByClassName('email')[0].value = user_data.user_info.email;
let img_div = document.getElementById('image-show');
let img = document.createElement('img');
img.setAttribute("class", 'img');
img.src = user_data.user_info.user_photo;
img.style.width = "15rem";
img.style.height = "15.5rem";
img_div.appendChild(img);

let email_info = document.getElementsByClassName('email')[0];
let email_button = document.getElementById("email-modify");
let modify_btn = document.getElementById("user-info-modify");

//버튼 클릭시 활성, 비활성화
modify_btn.addEventListener("click", input_box_info);

function input_box_info() {
    switch (email_info.disabled) {
        case true: {
            email_info.disabled = false;
            email_button.style.display = "block";
            modify_btn.innerHTML = "확인";
        } break;
        case false: {
            //이메일이 바뀌었을 경우 변경버튼을 누르지 않았을 경우 반영안됨
            //새로 인증 하도록 유도
            modify_btn.innerHTML = "회원정보 수정";
            email_button.style.display = "none";
            email_info.disabled = true;
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

function load_file(input) {
    let file = input.currentTarget.files[0];
    console.log(file);

    let name = document.getElementById('file_name');
    name.textContent = file.name;

    new_image.src = URL.createObjectURL(file);

    new_image.style.display = "none";   //버튼을 누르기 전까지는 이미지를 숨긴다
    new_image.style.objectFit = "contain";

}

real_input.addEventListener('change', load_file);
//real_input.onchange = load_file(this);

let submit = document.getElementById('submit_button');
submit.addEventListener('click', show_image);     //Submit 버튼 클릭시 이미지 저장
//onclick
function show_image() {

    let container = document.getElementById('image-show');
    container.appendChild(new_image);

    let new_image_chlid = document.getElementById('image-show').lastElementChild;

    //이미지는 화면에 나타나고
    new_image_chlid.style.display = "block";
    //이미지 업로드 영역 및 버튼은 숨겨진다
    popup_container.classList.remove('visible');
    popup_container.setAttribute('style', 'display:none');

    document.getElementById('file_name').textContent = null;     //기존 파일 이름 지우기
}

function popuphide_img() {
    let popup_section = document.getElementById('IMG-POPUP');
    let input_section = document.getElementById('file_name');
    popup_container.classList.remove('visible');
    popup_section.setAttribute('style', 'display:none');

    input_section.innerHTML = "";

}
let img_exit = document.querySelector('.img_exit');
img_exit.addEventListener("click", popuphide_img);

function show_pass_layer_pop() {
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

    for (let i = 0; i < input_section.length; i++) {
        input_section[i].value = null;
    }

}
function pwdChangeLayout() {
    let new_pwd = document.getElementById('newPassword').value;
    let new_pwd_confirm = document.getElementById('newPasswordConfirm').value;

    //일치할경우
    if (new_pwd === new_pwd_confirm) {
        document.getElementById('case_id2').style.display = 'block';
        console.log(new_pwd + new_pwd_confirm);
    }


}


// let target = document.getElementById('enctSertBtn');
// target.addEventListener('click', showPwdLayerPopup());

/*
let password_section = document.createElement('section');
password_section.setAttribute('class','popup_container visible')
password_section.setAttribute('style','display:block')
popup_section.appendChild(password_section);

let password_inner = document.createElement('div');
let password_head = document.createElement('header');
let password_h1 = document.createElement('h1');
let password_body = document.createElement('div');

let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('body').appendChild(table);
*/
