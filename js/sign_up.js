import fs from "fs";
// let sign_up_button = document.getElementById("sign_up_button");

function signup_check() {
    let id = document.getElementById("id");
    let password = document.getElementById("password");
    let password_check = document.getElementById("password-check");
    let email = document.getElementById("email");
    let name = document.getElementById("name");
    //let service = document.getElementsByClassName("service-check")[0].checked;
    let service = document.querySelector("input[name=service-info1]").checked;


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

    let password_text = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!password_text.test(password)) {
        alert("비밀번호 영문자+숫자_특수문자 조합 8자리 이상 입력해주세요");
        password.focus();
        return false;
    }

    if (password.value !== password_check.value) {
        alert("비밀번호가 일치하지 않습니다.");
        password_check.focus();
        return false;
    }


    let email_text = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (email.value == "") {
        alert("이메일을 입력하세요");
        email.focus();
        return false;
    }

    if (!email_text.test(email)) {
        alert("이메일 형식을 확인해 주세요");
        email.focus();
        return false;
    }


    if (name.value == "") {
        alert("이름을 입력하세요");
        password_check.focus();
        return false;
    }

    if (!service) {
        alert("약관동의에 체크해주세요");
        return false;
    }

    const submit_data = {
        id: id.value,
        password: password.value,
        email: email.value,
        name: name.value
    }

    //TODO: 상수화 필요한것 상수화 하기(상태코드, port)
    //
    fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submit_data)

    }).then((response) => {
        if (response.status === 400) {
            if (response.json === "duplicated_id") {
                alert("id가 중복입니다.");
            }
            else {
                alert("회원가입에 실패하였습니다.");
            }

        }

        if (response.status === 201) {
            console.log(response.json); //회원가입한 회원읜 인덱스 몇번인지
            alert("회원가입 성공");
            location.href = "login.html";
        };

    }).catch((error) => {
        console.log(error);
    })



    function user_id_check() {
        let id = document.getElementById("id");

        // id.value 값이 전송되어 갔다온다.

        let login_flag = true;
        if (login_flag) {
            userid_msg.innerHTML = '사용할 수 있는 아이디입니다.';
            userid_msg.style.color = 'green';
        } else {
            userid_msg.innerHTML = '이미 존재하는 아이디입니다.';
            userid_msg.style.color = 'red';
        }

    }

//sign_up_button.addEventListener("click", signup_check);