import culture from "../json_data/culture_data.json"  assert { type: "json" }

let culture_data = JSON.parse(JSON.stringify(culture));
//제목
let title_section = document.getElementById("title");

let title_span = document.createElement("span");
title_span.setAttribute('class', 'category');
let text_title = document.createTextNode(culture_data.list[0].title);
title_span.append(text_title);
title_section.append(title_span);

//서브 정보(인덱스, 날짜, 아이디, 조회수)
let sub_item = document.getElementsByClassName('sub');
console.log(sub_item);
let idx = document.createTextNode(culture_data.list[0].idx);
sub_item[0].append(idx);

let start_date = document.createTextNode(culture_data.list[0].start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3'));
sub_item[1].append(start_date);

let end_date = document.createTextNode(culture_data.list[0].start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3'));
sub_item[2].append(end_date);

let place = document.createTextNode(culture_data.list[0].place);
sub_item[3].append(place);

let view_count = document.createTextNode(culture_data.list[0].view_post_count);
sub_item[4].append(view_count);


//내용
let content = document.getElementById("content");
let card = document.createElement("div");
card.setAttribute("class", "culture-card");
let img = document.createElement("img");
img.setAttribute("src", culture_data.list[0].tumbnail);
img.setAttribute("style", "width : 180px ; height : 240px");
card.append(img);
content.append(card);

// 수정삭제 버튼 있다없다 유무 => json 데이터에서 유무 판단하는 데이터 보내기
// 유저가 게시글을 작성한 유저라면?
// 아니라면?

//삭제 버튼 클릭시 이벤트
const delete_post = () => {
    //삭제 팝업을 띄운다.

    //api 요청을 보낸다.
}

//수정 버튼 클릭시 이벤트
const modify_post = () => {

}

//목록 버튼 클릭시 이벤트
//이전 목록 상태를 불러온다.