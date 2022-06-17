
let title = document.getElementById("title");
let content = document.getElementById("content");
let post_write_button = document.getElementById("post_write_button");

function post_check() {
    const post_write_data = {
        title: title.value,
        content: content.value
    };
    if (title.value.trim() == "" || title.value.replace(/^\s+|\s+$/gm, '') == "") {
        alert("제목을 입력해주세요");
        return false;
    }

    if (content.value.trim() == "" || content.value.replace(/^\s+|\s+$/gm, '') == "") {
        alert("내용을 입력해주세요");
        return false;
    }

    alert("게시글 작성 완료");

    fetch("http://localhost:3000/post/wirte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_write_data)

    }).then((response) => {
        if (response.status === 400) {

        }

        if (response.status === 201) {
            alert("게시글 작성 완료");
            location.href = "post_main.html";
        };

    }).catch((error) => {
        console.log(error);

    })
}

post_write_button.addEventListener("click", post_check);