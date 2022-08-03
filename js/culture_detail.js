import culture from "../json_data/culture_data.json"  assert { type: "json" }


let url_str = window.location.href;
const local_url = new URL(url_str);
const urlParams = local_url.searchParams;
const culture_idx = urlParams.get('culture_idx');


async function fetch_method(url, options) {

    const result = await fetch(url, options).then((response) => {

        if (response.status === 400) {

            console.log(response);
        }
        if (response.status === 404) {

            alert("찾을수 없는 페이지 입니다")
        }

        if (response.status === 204) {
            return "deleted"
        }

        if (response.status === 200) {
            console.log(response);
            return response.json()

        };

    }).then(data => {
        console.log(data);
        return data
    }).catch((error) => {
        console.log(error);
    });

    return result;

}


async function get_culture_info() {

    let url = DEFAULT_CULTURE_URL + culture_idx;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": document.cookie
        }
    }

    const data = await fetch_method(url, options);
    return data

}

let result = await get_culture_info();



//let culture_data = JSON.parse(JSON.stringify(culture));
//제목
let title_section = document.getElementById("title");

let title_span = document.createElement("span");
title_span.setAttribute('class', 'category');
let text_title = document.createTextNode(result.title);
title_span.append(text_title);
title_section.append(title_span);

//서브 정보(인덱스, 날짜, 아이디, 조회수)
let sub_item = document.getElementsByClassName('sub');
console.log(sub_item);
let idx = document.createTextNode(result.idx);
sub_item[0].append(idx);

let start_date = document.createTextNode(result.start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3'));
sub_item[1].append(start_date);

let end_date = document.createTextNode(result.start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3'));
sub_item[2].append(end_date);

let place = document.createTextNode(result.place);
sub_item[3].append(place);

let view_count = document.createTextNode(result.view_post_count);
sub_item[4].append(view_count);


//내용
let content = document.getElementById("content");
let card = document.createElement("div");
card.setAttribute("class", "culture-card");
let img = document.createElement("img");
img.setAttribute("src", result.tumbnail);
img.setAttribute("style", "width : 180px ; height : 240px");
card.append(img);
content.append(card);
