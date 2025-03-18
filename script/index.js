const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error(error))
}

const loadVideos = ()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayVideos(data.pets))
        .catch(error => console.log(error))
}

const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('categories')
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
            <button class="categorie-btn border w-[312px] h-[104px] gap-5">
                <div class="flex d-flex align-items-center justify-content-center w-[264px] h-[56px] m-auto gap-4">
                    <img src="${item.category_icon}">
                    <span class="fw-bold">${item.category}</span>
                </div>
            </button>
        `
        categoriesContainer.appendChild(buttonContainer)
    })
}

const displayVideos = (videos)=>{
    console.log(videos)
    const videoContainer = document.getElementById('videos')
    videos.forEach((video)=>{
        console.log(video)
        const card = document.createElement('div')
        card.classList.add('card', 'shadow-sm')
        card.innerHTML=`
            <figure>
                <img src=${video.image} class="w-full h-full object-cover p-3 rounded-lg" alt="${video.pet_name}" />
            </figure>
            <div class="card-body flex flex-column">
                <h3 class="card-title">${video.pet_name}</h3>
                <span class="card-text"> <img src="assets/breed.png" class="d-inline"> Breed: ${video.breed || 'N/A'}</span>
                <span class="card-text"> <img src="assets/dob.png" class="d-inline"> Date of Birth: ${video.date_of_birth || 'N/A'}</span>
                <span class="card-text"> <img src="assets/gender.png" class="d-inline"> Gender: ${video.gender || 'N/A'}</span>
                <span class="card-text"> <img src="assets/currency.png" class="d-inline"> Price: ${video.price || 'N/A'} $</span> <hr class="bd-dark">
                <div class="d-flex justify-content-between">
                    <button class="card-btn btn"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="card-btn btn fw-bolder text-[#0E7A81]">Adopt</button>
                    <button class="card-btn btn fw-bolder text-[#0E7A81]">Details</button>
                </div>
            </div>
        `
        videoContainer.appendChild(card)
    })
}


loadCategories()
loadVideos()