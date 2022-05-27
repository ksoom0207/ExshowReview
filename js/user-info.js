
function showPwdLayerPopup() {
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

    }


}


let target = document.getElementById('enctSertBtn');
target.addEventListener('click', showPwdLayerPopup());

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
