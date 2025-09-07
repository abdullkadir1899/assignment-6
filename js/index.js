// main card container 
const cardContainer = document.getElementById('plants-container')
const modalContainer = document.getElementById('modal-container')
const categoryContainer = document.getElementById('categoryContainer')




//  all tree & modal
const loadAllTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then((r) => r.json())
    .then((d) => {
        const data = d.plants;
        cardContainer.innerHTML = ''

        modalContainer.innerHTML= ''

        data.forEach((e, index) => {
            const modalId = `modal_${index}`
               
               
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
            `

        })
    })
    .catch((er) => console.log(er))

}




// category
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((r) => r.json())
    .then((d) => {
        console.log(d.categories)
        const categories = d.categories
        categories.forEach((e) => {
            categoryContainer.innerHTML += `
            <li onclick="loadAllTrees()" id="all-Trees" class="p-2 rounded-lg hover:bg-[#15803d] cursor-pointer hover:text-white font-bold">${e.category_name}</li>
            `
        });

    })
    .catch((er) => console.log(er))
}






loadCategory()


loadAllTrees()