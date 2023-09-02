const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data);

  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleCategoryData('${cat.category_id}')" class="btn">${cat.category}</button>`;
    tabContainer.appendChild(div);
  });
};

const handleCategoryData = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if(data.data.length === 0) {
    const div = document.createElement("div");
    div.textContent = "Nothing to show.";
    div.classList.add("flex", "item-center","justify-center", "text-3xl");
    cardContainer.appendChild(div);
    return;
  }
  data.data.forEach((loadData) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100 shadow-xl h-[650px]">
            <div>
            <figure class="rounded-lg">
                <img class="w-full" src=${loadData.thumbnail} alt="Shoes" />
            </figure>
            <div class="${loadData.others?.posted_date? 'bg-black':''} w-36 p-4 relative bottom-16 left-36 md:left-16">
            <p class="text-[10px] text-white text-center">${loadData.others?.posted_date? formatedDate(loadData.others?.posted_date): ''}</p>
            </div>
            </div>
            <div class="card-body">
              <div class="flex justify-around">
                <div>
                  <img class="rounded-full w-20 h-20" src=${loadData.authors[0].profile_picture} alt="" />
                </div>
                <h2 class="card-title text-base">
                ${loadData.title}
                </h2>
              </div>
              <div class="flex justify-center items-center">
                <p class="text-sm ml-16">${loadData.authors[0].profile_name}</p>
                <div class="w-12 mr-32">
                    <img src="images/tick.jpg" alt="">
                </div>
              </div>
              <div class="justify-end ml-16">
                <p class="text-sm">${loadData.others.views} views</p>
              </div>
            </div>
          </div>
        `;
    cardContainer.appendChild(div);
  });
};
const formatedDate = postedDate =>{
  const totalMinutes = Math.floor(postedDate /60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0){
    return `${hours}hrs ${minutes}min ago`;
  }else{
    return `${minutes}min ago`;
  }
}
const myBlog = ()=>{
  window.location.href = "blog.html";
}

const sortCard = () => {}
handleCategory();
handleCategoryData("1000");
