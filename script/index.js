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

const loadCategotryPet = (id)=>{
    document.querySelector('.loading').style.display = 'flex'
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.data))
        .catch(error => console.log(error))
        .finally(()=>{
            setTimeout(()=>{
                document.querySelector('.loading').style.display = 'none'
            },2000)
        })
}

const loadModal =(id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayLoadModal(data.petData))
}

const displayLoadModal = (items)=>{
    // console.log(items)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
        <figure>
                <img src=${items.image} class="w-full h-full object-cover pl-3 pr-3 pt-3 rounded-lg" alt="${items.pet_name}" />
        </figure>
        <div>
            <h3 class="card-title">${items.pet_name}</h3>
            <span class="card-text"> <img src="assets/breed.png" class="d-inline"> Breed: ${items.breed || 'N/A'}</span>
            <span class="card-text"> <img src="assets/dob.png" class="d-inline"> Date of Birth: ${items.date_of_birth || 'N/A'}</span>
            <span class="card-text"> <img src="assets/gender.png" class="d-inline"> Gender: ${items.gender || 'N/A'}</span>
            <span class="card-text"> <img src="assets/currency.png" class="d-inline"> Price: ${items.price || 'N/A'} $</span> <hr class="bd-dark">
        </div>
    `
}

const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('categories')
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
            <button onclick="loadCategotryPet('${item.category}')" id="btn-${item.category}" class="categorie-btn border w-[312px] h-[104px] gap-5">
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
    // console.log(videos)
    const videoContainer = document.getElementById('videos')
    videoContainer.innerHTML = ''
    if(videos.length === 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center gap-4">
                <img src="assets/error.webp">
                <h3 class="fw-bolder"> No Information Available </h3>
                <p class="text-muted text-center w-[760px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        return
    }
    else{
        videoContainer.classList.add('grid')
    }
    // card
    videos.forEach((video)=>{
        const card = document.createElement('div')
        card.classList.add('card', 'shadow-sm')
        card.innerHTML=`
            <figure>
                <img src=${video.image} class="w-full h-full object-cover pl-3 pr-3 pt-3 rounded-lg" alt="${video.pet_name}" />
            </figure>
            <div class="card-body flex flex-column pt-0">
                <h3 class="card-title">${video.pet_name}</h3>
                <span class="card-text"> <img src="assets/breed.png" class="d-inline"> Breed: ${video.breed || 'N/A'}</span>
                <span class="card-text"> <img src="assets/dob.png" class="d-inline"> Date of Birth: ${video.date_of_birth || 'N/A'}</span>
                <span class="card-text"> <img src="assets/gender.png" class="d-inline"> Gender: ${video.gender || 'N/A'}</span>
                <span class="card-text"> <img src="assets/currency.png" class="d-inline"> Price: ${video.price || 'N/A'} $</span> <hr class="bd-dark">
                <div class="d-flex justify-content-between">
                    <button class="card-btn btn"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="card-btn btn fw-bolder text-[#0E7A81]">Adopt</button>
                    <button class="card-btn btn fw-bolder text-[#0E7A81]" onclick="loadModal(${video.petId})">Details</button>
                </div>
            </div>
        `
        videoContainer.appendChild(card)
    })
}


loadCategories()
loadVideos()