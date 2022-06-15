let login_button = document.getElementById("login_button");
let submit_data;

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

    fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)

    }).then((response) => {
        if (response.status === 400) {
            alert("아이디와 비밀번호를 다시 확인해주세요");
        }

        if (response.status === 200) {
            alert("로그인성공");
            location.href = "post_main.html";
        };

    }).catch((error) => {
        console.log(error);

    })


}


login_button.addEventListener("click", login_check);

//https://velog.io/@m1njae/Node.js-%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-02
//https://velog.io/@___/javascripthtml-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84