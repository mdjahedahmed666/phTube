const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    console.log(data);
    
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((cat) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="handleCategoryData('${cat.category_id}')" class="btn">${cat.category}</button>`;
        tabContainer.appendChild(div);
    })

};

const handleCategoryData = async (categoryId) => {
    console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    console.log(data);
    const cardContainer = document.getElementById("card-container");
    data.data.forEach((loadData) => {
        console.log(loadData);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="rounded-lg">
                <img class="w-full" src=${loadData.thumbnail} alt="Shoes" />
            </figure>
            <div class="card-body">
              <div class="flex justify-around gap-4">
                <div>
                  <img class="rounded-full w-20" src=${loadData.authors[0].profile_picture} alt="" />
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
                <p class="text-sm">${loadData.others.views}</p>
              </div>
            </div>
          </div>
        `;
        cardContainer.appendChild(div);

});
};
handleCategory();