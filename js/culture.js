import culture from "../json_data/culture_data.json"  assert { type: "json" }


let culture_data = JSON.parse(JSON.stringify(culture));
console.log(culture_data.list[0].title);



let culture_ul = document.getElementById("culture-card-list");

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
    start_date.textContent = item.start_date.replace(/(\d{4}(\d{2})(\d))/, '$1-$2-$3');

    let end_date = document.createElement("p");
    end_date.setAttribute("class", "end_date");
    end_date.textContent = item.end_date.replace(/(\d{4}(\d{2})(\d))/, '$1-$2-$3');

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