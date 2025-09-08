// main card container
const cardContainer = document.getElementById("plants-container");
const modalContainer = document.getElementById("modal-container");
const categoryContainer = document.getElementById("categoryContainer");

//  all tree & modal
const loadAllTrees = () => {
    showSpinner()
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((r) => r.json())
    .then((d) => {
      const data = d.plants;
      cardContainer.innerHTML = "";

      modalContainer.innerHTML = "";

      data.forEach((e, index) => {
        const modalId = `modal_${index}`;

        // cardContainer
        cardContainer.innerHTML += `
            <div class="card bg-base-100 w-96 h-[500px] shadow-sm">
            <figure>
                <img src="${e.image}">
            </figure>
            <div class="card-body">
                <h2 onclick="document.getElementById('${modalId}').showModal()" class="card-title cursor-pointer">${e.name}</h2>
                <P>${e.description}</P>
                <ul class=" flex justify-between">
                    <li><div class="badge badge-outline bg-[#dcfce7] border-none"> ${e.category}</div></li>
                    <li><div  class="text-[#15803d] "> ৳ ${e.price}</div></li>
                </ul>
                <div class="card-actions justify-end">
                    <button class="btn bg-[#15803d] w-full text-white rounded-full">Add to Cart</button>
                </div>
            </div>

            </div>
            `;

        // modalContainer
        modalContainer.innerHTML += `
            <dialog id="${modalId}" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="text-lg font-extrabold mb-3">${e.name}</h3>
                <img class="h-[300px] w-full rounded-xl" src="${e.image}"/>
                <p class="mt-3">Category: ${e.category}</p>
                <p class="mt-3">Price: ৳${e.price}</p>
                <p class="py-4 font-bold">${e.description}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                    </div>
            </div>
            
            </dialog>
            `;
      });
      hiddenSpinner()
    })
    .catch((er) => console.log(er));
};

// category
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((r) => r.json())
    .then((d) => {
      // console.log(d.categories)
      const categories = d.categories;
      showCategory(categories);
    })
    .catch((er) => console.log(er));
};

const showCategory = (categories) => {
  cardContainer.innerHTML = "";
  categories.forEach((e) => {
    categoryContainer.innerHTML += `
            <li onclick="" id="${e.id}" class="p-2 rounded-lg hover:bg-[#15803d] cursor-pointer hover:text-white font-bold">${e.category_name}</li>
            `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLI = document.querySelectorAll("li");

    allLI.forEach((li) => {
      li.classList.remove("text-white", "bg-[#15803d]");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("text-white", "bg-[#15803d]");
      loadCard(e.target.id);
    }
  });
};

const loadCard = (e) => {
  console.log(e);
  showSpinner()
  fetch(`https://openapi.programming-hero.com/api/category/${e}`)
    .then((r) => r.json())
    .then((d) => {
      showCategoryContainer(d.plants);
      hiddenSpinner()
    })
    .catch((err) => console.log(err));
};

// showCategoryContainer
const showCategoryContainer = (ar) => {
  cardContainer.innerHTML = "";
  modalContainer.innerHTML = "";

  ar.forEach((ele, index) => {
    const modalId = `modal_${index}`;

    // card
    cardContainer.innerHTML += `
        <div class="card bg-base-100 w-96 h-[500px] shadow-sm">
           <figure>
                <img src="${ele.image}">
            </figure>
         <div class="card-body">
                    <h2 onclick="document.getElementById('${modalId}').showModal()" class="card-title cursor-pointer">${ele.name}</h2>
                    <p>${ele.description}</p>
                    <ul class="flex justify-between">
                        <li>
                            <div class="badge badge-outline bg-[#dcfce7] border-none">${ele.category}</div>
                        </li>
                        <li>
                            <div class="text-[#15803d]">৳ ${ele.price}</div>
                        </li>
                    </ul>
                    <div class="card-actions justify-end">
                        <button class="btn bg-[#15803d] w-full text-white rounded-full">Add to Cart</button>
                    </div>
                </div>            
        </div>
        `;






    // modal
    modalContainer.innerHTML += `
            <dialog id="${modalId}" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="text-lg font-extrabold mb-3">${ele.name}</h3>
                    <img class="h-[300px] w-full rounded-xl" src="${ele.image}"/>
                    <p class="mt-3">Price: ৳${ele.price}</p>
                    <p class="py-4 font-bold">${ele.description}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        `;
  });
};


// Spinner

const showSpinner = () => {
    document.getElementById('spinner').classList.remove('hidden')
}

const hiddenSpinner = () => {
    document.getElementById('spinner').classList.add('hidden')
}



loadCategory();
loadAllTrees();
