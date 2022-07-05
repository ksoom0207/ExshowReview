//import Cookies from '/path/to/js.cookie.mjs';
import { DEFAULT_URL } from "../const_text.js";


let login_button = document.getElementById("login_button");
let submit_data;

function login_status() {
    if (sessionStorage.getItem("isLogin")) {
        alert("접근이 불가능 합니다.");
        return false;
    }
}
login_status();

function login_check() {
    let id = document.getElementById("id_login");
    let password = document.getElementById("pw_login");

    if (id.value == "") {
        alert("아이디를 입력해주세요");
        id.focus();
        return false;
    }

    if (password.value == "") {
        alert("비밀번호를 입력해주세요");
        password.focus();
        return false;
    }

    const request = {
        id: id.value,
        password: password.value
    }

    fetch(DEFAULT_URL + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)

    }).then((response) => {
        if (response.status === 400) {
            alert("아이디와 비밀번호를 다시 확인해주세요");
            return false;
        }

        if (response.status === 200) {

            response.json().then((data) => {
                console.log(data);
                document.cookie = data.access_token;
                sessionStorage.setItem('user_idx', data.user_idx);
                sessionStorage.setItem('isLogin', true);
                alert("로그인성공");
                location.href = "../post/post_main.html"
            })
            //TODO: 로그인 후에는 로그인 페이지에 접속 안되도록 해야함
        };

    }).catch((error) => {
        console.log(error);

    })


}


login_button.addEventListener("click", login_check);

/*
function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y);
            // unescape로 디코딩 후 값 리턴
        }
    }
}
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
    var cookie_value = escape(value) + ((days == null) ? '' : ';
    expires = ' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}
function addCookie(id) {
    var items = getCookie('productItems');
    // 이미 저장된 값을 쿠키에서 가져오기
    var maxItemNum = 5;
    // 최대 저장 가능한 아이템개수
    var expire = 7;
    // 쿠키값을 저장할 기간
    if (items) {
        var itemArray = items.split(',');
        if (itemArray.indexOf(id) != -1) {
            // 이미 존재하는 경우 종료
            console.log('Already exists.');
        } else {
            // 새로운 값 저장 및 최대 개수 유지하기
            itemArray.unshift(id);
            if (itemArray.length > maxItemNum) itemArray.length = 5;
            items = itemArray.join(',');
            setCookie('productItems', items, expire);
        }
    } else {
        // 신규 id값 저장하기
        setCookie('productItems', id, expire);
    }
}*/
//https://velog.io/@m1njae/Node.js-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-02
//https://velog.io/@___/javascripthtml-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84