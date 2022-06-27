//import Cookies from '/path/to/js.cookie.mjs';
import { DEFAULT_URL } from "../const_text.js";


let find_id_button = document.getElementById("find_id_button");
let submit_data;

//TODO: localStrage로 하는게 맞는지?
function user_check() {
    if (localStorage.getItem("isLogin")) {
        alert("접근이 불가능 합니다.");
        return false;
    }
}
function find_id_check() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    const request = {
        name: name.value,
        email: email.value
    }
    if (name.value == "") {
        alert("이름을 입력해주세요");
        name.focus();
        return false;
    }

    if (email.value == "") {
        alert("이메일을 입력해주세요");
        email.focus();
        return false;
    }


    let url = DEFAULT_URL + "find_user_id"
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)

    }).then((response) => {
        if (response.status === 400) {
            response.json().then((data) => {

                if (data === "write_name") {

                    alert("이름을 입력해주세요");
                    name.focus();
                    return false;

                }
                if (data === "write_email") {
                    alert("이메일을 입력해주세요");
                    email.focus();
                    return false;
                }
                if (data === "incorrect_email") {
                    alert("잘못된 이메일 형식 입니다.");
                    email.focus();
                    return false;
                }
                if (data === "cannot_use_text") {
                    alert("이름과 이메일을 다시 확인해주세요");
                    return false;
                }
                if (data === "does_not_exist") {
                    alert("이름과 이메일을 다시 확인해주세요");
                    return false;
                }
            })
        }

        if (response.status === 200) {

            response.json().then((data) => {
                alert("당신의 id는" + data.your_id + "입니다.");
            })
        };

    }).catch((error) => {
        console.log(error);

    })


}
user_check();
find_id_button.addEventListener("click", find_id_check);

//https://velog.io/@m1njae/Node.js-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-02
//https://velog.io/@___/javascripthtml-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84