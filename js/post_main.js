//let post_data = require("../json_data/post_main_data.json");
import post_data from "../json_data/post_main_data.json"  assert { type: "json" }
//https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules/

let json = JSON.parse(JSON.stringify(post_data));

let pagetnation_section = document.getElementById("pagenavi_type01");

let now_page = json.page_number;
let page_start = json.page_nation_start;
let page_end = json.page_nation_end;
let page_total = json.page_nation_total;

//초기 셋팅


const fragmentPage = document.createElement('ul');
fragmentPage.setAttribute('id', 'page_nation');

let allpreli = document.createElement('li');
let text_allprev = document.createElement('a');
text_allprev.setAttribute('href', '#js-bottom');
text_allprev.setAttribute('class', 'first');
text_allprev.setAttribute('id', 'first');
text_allprev.innerHTML = '처음 페이지';
allpreli.append(text_allprev);

let preli = document.createElement('li');
let text_prev = document.createElement('a');
text_prev.setAttribute('href', '#js-bottom');
text_allprev.setAttribute('class', 'prev');
text_prev.setAttribute('id', 'prev');
text_prev.innerHTML = '이전 페이지';
preli.append(text_prev);


if (now_page !== 1) {

    fragmentPage.prepend(allpreli);
    fragmentPage.prepend(preli);
}

for (let i = page_start; i <= page_end; i++) {
    let li = document.createElement("li");
    li.setAttribute('href', '#js-bottom');
    li.setAttribute('id', `page-${i}`);
    li.setAttribute('data-num', `${i}`);
    li.setAttribute('class', 'page_num');
    //  li.setAttribute('onclick', "click_page_move()");
    li.innerHTML = `${i}`;
    fragmentPage.append(li);

}
//li.children[0].classList.add("active");


let allendli = document.createElement('li');
let text_li = document.createElement('a');
text_li.setAttribute('href', '#js-bottom');
text_li.setAttribute('id', 'end');
text_li.setAttribute('class', 'end');
text_li.innerHTML = '마지막페이지';
allendli.append(text_li);

let endli = document.createElement('li');
let next = document.createElement('a');
next.setAttribute('href', '#js-bottom');
next.setAttribute('id', 'next');
next.setAttribute('class', 'next');
//next.addEventListener("click", go_next_page);
next.innerHTML = '다음 페이지';

endli.append(next);
if (now_page !== page_end) {
    fragmentPage.append(endli);
    fragmentPage.append(allendli);
}

document.getElementById("pagenavi_type01").append(fragmentPage);

//------------------------------------------------------------------------

const myDiv = document.getElementById('page_nation');


myDiv.addEventListener('click', (e) => {
    Array.prototype.forEach.call(myDiv.children, (myDiv) => {
        myDiv
        if (myDiv.dataset.num) myDiv.classList.remove("active");
    });

    e.target.classList.add("active");
    console.log('target : ', e.target);
    renderContent(parseInt(e.target.dataset.num));

})


const renderContent = (now_page) => {
    let page_start = json.page_nation_start;
    let page_end = json.page_nation_end;
    let page_total = json.page_nation_total;

    //현재 페이지 백엔드로 요청해서 받아왔다. 
    //페이지가 노출된다
    postlist_render();
    //버튼이 바뀐다
    page_render(now_page, page_end);
}

//포스트리스트 데이터 랜더링
const postlist_render = () => {

    let post_list = document.getElementById('post-list');

    json.contents.forEach((item) => {
        let tr = document.createElement("tr");

        let td_idx = document.createElement("td");
        td_idx.append(item.idx);

        let td_title = document.createElement("td");
        td_title.setAttribute('class', 'post-title');


        let a_post_link = document.createElement('a');
        a_post_link.setAttribute('herf', '#');
        let text_title = item.title + " [" + item.comment_count + "]";
        a_post_link.append(text_title);

        td_title.append(a_post_link);


        let td_user_id = document.createElement("td");
        let text_user_id = document.createTextNode(item.user_id);
        td_user_id.append(text_user_id);

        let td_upload_time = document.createElement("td");
        let text_upload_time = document.createTextNode(item.upload_time);
        td_upload_time.append(text_upload_time);

        let td_view = document.createElement("td");
        let text_view = document.createTextNode(item.view_post_count);
        td_view.append(text_view);

        let td_like = document.createElement("td");
        let text_like = document.createTextNode(item.like_post_count);
        td_like.append(text_like);

        tr.append(td_idx);
        tr.append(td_title);
        tr.append(td_user_id);
        tr.append(td_upload_time);
        tr.append(td_view);
        tr.append(td_like);

        post_list.append(tr);

    });
}

const page_render = (now_page, page_end) => {

    const fragmentPage = document.getElementById('page_nation');

    //이전페이지 등이 존재 할경우
    if (now_page === 1 && fragmentPage.querySelector('#first')) {
        fragmentPage.removeChild(allpreli);
        fragmentPage.removeChild(preli);
    }

    if (now_page !== 1) {
        fragmentPage.prepend(allpreli);
        fragmentPage.prepend(preli);
    }
    //display : none 방향도 고려해보기
    if (now_page !== page_end) {
        fragmentPage.append(endli);
        fragmentPage.append(allendli);
    }

    if (now_page === page_end) {
        fragmentPage.removeChild(endli);
        fragmentPage.removeChild(allendli);
    }

    document.getElementById("pagenavi_type01").append(fragmentPage);

}

//https://velog.io/@eunoia/JS%EB%A1%9C-Pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

//https://velog.io/@1106laura/insertAdjacentHTML