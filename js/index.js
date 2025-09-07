// category ID
const categoryContainer = document.getElementById('categoryContainer')

// plants-container
const plantsContainer = document.getElementById('plants-container')




// categoryContainer
const category = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((r) => r.json())
    .then((d) => {
        // console.log(d.categories)
        const categoriesItem = d.categories
       showCategory(categoriesItem)
    })
    .catch((e) => console.log(e))
};


// callBackFunction 1 to categoryContainer
const showCategory = (categoriesItem) => {
     categoriesItem.forEach((categories) => {
            categoryContainer.innerHTML += `
                <li id="${categories.id}" class="p-2 rounded-lg hover:bg-[#15803d] cursor-pointer hover:text-white font-bold">${categories.category_name}</li>
            `
        });

        categoryContainer.addEventListener('click', (p) => {

            const allLI = document.querySelectorAll('li')
            
            if(p.target.localName === 'li'){
                allLI.forEach(li => {
                    li.classList.remove('bg-[#15803d]', 'text-white')
                })

                p.target.classList.add('bg-[#15803d]', 'text-white')
                categoriesIdData(p.target.id)
            }
        })
}

// plants-container 
const categoriesIdData = (treeId) => {
    console.log(treeId)
    fetch(`https://openapi.programming-hero.com/api/category/${treeId}`)
    .then((r) => r.json())
    .then((d) => {
        showPlants(d.plants)

    })
    .catch((error) => console.log(error))
}



// show plants-container  >> main container
const showPlants = (tree) => {
    plantsContainer.innerHTML = ''
    tree.forEach((tree) => {
        plantsContainer.innerHTML += `
            <div class="card bg-base-100 w-96 h-[500px] shadow-sm">
  <figure>
    <img src="${tree.image}"  />
  </figure>
  <div class="card-body">
    <h2 onclick="my_modal_5.showModal()" class="card-title">${tree.name}</h2>
    <p>${tree.description}</p>

    <ul class="flex justify-between">
        <li><div class="badge badge-outline bg-[#dcfce7] text-[#15803d] font-bold">${tree.category}</div></li>
        <li class="text-[#15803d]">${tree.price}</li>
    </ul>
    <div class="card-actions justify-end">
      <button class="btn  bg-[#15803d] text-white w-full rounded-full">Add to Cart</button>
    </div>
  </div>
    </div>
        `
    });
}



category()