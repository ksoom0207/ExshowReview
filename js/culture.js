import culture from "../json_data/culture_data.json"  assert { type: "json" }


let culture_data = JSON.parse(JSON.stringify(culture));
//리스트 보여주기

let culture_ul = document.getElementById("culture-card-list");

const first_culture_render = () => {
    while (culture_ul.hasChildNodes()) {
        culture_ul.removeChild(culture_ul.lastChild);
    }

    culture_data.list.forEach(item => {

        let culture_li = document.createElement("li");
        culture_li.setAttribute("class", "culture-item");

        //제목
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        title.textContent = item.title;

        //태그
        let tag = document.createElement("div");
        tag.setAttribute("class", "tag");
        tag.innerHtml = item.tag;

        let card = document.createElement("div");
        card.setAttribute("class", "culture-card");
        let img = document.createElement("img");
        img.setAttribute("src", item.tumbnail);
        img.setAttribute("style", "width : 180px ; height : 240px");
        card.append(img);

        let info = document.createElement("div");
        info.setAttribute("class", "culture-info");
        //날짜
        let start_date = document.createElement("p");
        start_date.setAttribute("class", "start_date");
        start_date.textContent = item.start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3');

        let end_date = document.createElement("p");
        end_date.setAttribute("class", "end_date");
        end_date.textContent = item.end_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3');

        //장소
        let place = document.createElement("p");
        place.setAttribute("class", "place");
        place.textContent = item.place;

        info.append(start_date);
        info.append(end_date);
        info.append(place);

        culture_li.append(title);
        culture_li.append(tag);
        culture_li.append(card);
        culture_li.append(info);

        culture_ul.appendChild(culture_li);

    });

}

const culture_render = (tag) => {
    while (culture_ul.hasChildNodes()) {
        culture_ul.removeChild(culture_ul.lastChild);
    }

    culture_data.list.forEach(item => {

        if (tag === item.tag) {

            console.log(item.tag)
            let culture_li = document.createElement("li");
            culture_li.setAttribute("class", "culture-item");

            //제목
            let title = document.createElement("div");
            title.setAttribute("class", "title");
            title.textContent = item.title;

            //태그
            let tag = document.createElement("div");
            tag.setAttribute("class", "tag");
            tag.innerHtml = item.tag;

            let card = document.createElement("div");
            card.setAttribute("class", "culture-card");
            let img = document.createElement("img");
            img.setAttribute("src", item.tumbnail);
            img.setAttribute("style", "width : 180px ; height : 240px");
            card.append(img);

            let info = document.createElement("div");
            info.setAttribute("class", "culture-info");
            //날짜
            let start_date = document.createElement("p");
            start_date.setAttribute("class", "start_date");
            start_date.textContent = item.start_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3');

            let end_date = document.createElement("p");
            end_date.setAttribute("class", "end_date");
            end_date.textContent = item.end_date.replace(/(\d{4})(\d{2})(\d)/, '$1-$2-$3');

            //장소
            let place = document.createElement("p");
            place.setAttribute("class", "place");
            place.textContent = item.place;

            info.append(start_date);
            info.append(end_date);
            info.append(place);

            culture_li.append(title);
            culture_li.append(tag);
            culture_li.append(card);
            culture_li.append(info);

            culture_ul.appendChild(culture_li);
        }
    });

}

//페이지가 노출된다
first_culture_render();


//태그 클릭시 해당하는 데이터 보여주기 
let tag_list = document.getElementById("tag_list");

tag_list.addEventListener("click", (e) => {
    console.log(e.target.classList);

    if (e.target.classList[0] === "tag") {
        /*
          if (e.target.classList[1] === "art") {
            culture_render("미술");
        }
        if (e.target.classList[1] === "music") {
            culture_render("음악");
        }
        if (e.target.classList[1] === "theater") {
            culture_render("연극");
        }
        if (e.target.classList[1] === "traditional_music") {
            culture_render("국악");
        }
        if (e.target.classList[1] === "etc") {
            culture_render("기타");
        }
*/
        culture_render(e.target.innerText);
        if (e.target.classList[1] === "all") {
            first_culture_render();
        }
    }

})

//select_box별로 검색결과 다르게 하기
const search = () => {
    let title, place;
    let search = document.getElementById("search-choose");
    let search_option = search.options[search.selectedIndex].value;

    let search_word = document.getElementById("search").value;
    let card_list = document.getElementsByClassName("culture-item");


    if (search_option === "title") {
        for (let i = 0; i < card_list.length; i++) {
            title = card_list[i].getElementsByClassName("title");
            if (card_list[i].innerText.indexOf(search_word) > -1) {
                card_list[i].style.display = "flex";
            } else {
                card_list[i].style.display = "none";
            }

        }
    }
    if (search_option === "place") {
        for (let i = 0; i < card_list.length; i++) {
            place = card_list[i].getElementsByClassName("place");
            if (card_list[0].innerText.indexOf(search_word) > -1) {
                card_list[i].style.display = "flex";
            } else {
                card_list[i].style.display = "none";

            }

        }
    }
}

let search_button = document.getElementById("search-button");
search_button.addEventListener("click", search);
