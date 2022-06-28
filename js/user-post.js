


function fetch_method(url, options) {

    fetch(url, options).then((response) => {
        if (response.status === 400) {
        }

        if (response.status === 200) {
            return response.json();
        };

    }).then((data) => {
        return data;
    }).catch((error) => { console.log(error); });
}

let content_section = document.getElementById("content-section");

sidebar.addEventListener("click", (e) => {

    Array.prototype.forEach.call(sidebar.children, (sidebar) => {
        sidebar.classList.remove("current-page");
    });


    while (content_section.hasChildNodes()) {
        content_section.removeChild(content_section.lastChild);
    }

    e.target.classList.add("current-page");
    if (e.target.id === "user_info") { //TODO: 다른 방법 찾아보기
        location.href = "./user-info.html"


    }
    if (e.target.id === "user_post") { //TODO: 다른 방법 찾아보기
        let now_page = 1;
        post_render_content(now_page);
    }
})

let div = document.createElement("div");
//테이블 정렬? 그냥 그리드?
let post_list_div = document.createElement("div");



async function get_page_info(now_page) {

    let url = DEFAULT_URL + "list?" + "page=" + now_page;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": document.cookie
        }
    }
    const data = await fetch_method(url, options);

    return data;

}

let now_page = 1;
let page_start;
let page_end;
let page_total;
let total_page;
let content_page;
let post_content;



const move_side_menu = (page) => {

    post_list_div.setAttribute("class", "user-post-list");

    while (post_list_div.hasChildNodes()) {
        post_list_div.removeChild(post_list_div.lastChild);
    }

    console.log('render');
    let th = document.createElement("th");

    //Array.from

    user_data.user_post.content.forEach((item) => {
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
    post_content = await get_page_info(now_page);

    page_start = post_content.page_list.page_nation_start;
    page_end = post_content.page_list.page_nation_end;
    page_total = post_content.page_list.page_nation_total;
    total_page = post_content.total_count;
    content_page = post_content.page_content_size;

    console.log('render');
    //페이지가 노출된다
    move_side_menu(now_page);
    //버튼이 바뀐다
    page_render(now_page);
}

post_render_content(now_page);

/*페이징 클릭 이벤트 */
const my_div = document.getElementById('page_nation');

my_div.addEventListener('click', (e) => {
    //선택한 페이지만 활성화 되도록 구현
    Array.prototype.forEach.call(my_div.children, (my_div) => {
        if (my_div.dataset.num) my_div.classList.remove("active");
    });

    if (e.target.id === "first") {
        document.getElementById(`page-${1}`).classList.add("active");
    }
    if (e.target.id === "prev") {
        document.getElementById(`page-${(now_page - 1) * content_page + 1}`).classList.add("active");
    }
    if (e.target.id === "end") {
        document.getElementById(`page-${page_total}`).classList.add("active");
    }
    if (e.target.id === "next") {
        document.getElementById(`page-${now_page += content_page}`).classList.add("active");
    }
    if (e.target.dataset.num) {

        e.target.classList.add("active");
        postlist_render(parseInt(e.target.dataset.num));
        url = url + e.target.dataset.num;
    }

})

