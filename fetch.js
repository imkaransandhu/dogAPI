const doggos = document.querySelector(".doggos");   // Selecting the div where the dog image is appended.
const breedList = document.querySelector(".breed-list"); // Selecting the dropdown.
const createImage = document.createElement("img"); // Create an image for dog.


const ALL_BREED_URL = "https://dog.ceo/api/breeds/list/all"; // URL for fetching the breeds
createBreedList(); // Lsiting the breeds in the dropdown
function createBreedList() {
  const promise = fetch(ALL_BREED_URL);
  promise
    .then((res) => {
      const processingPromise = res.json();
      return processingPromise;
    })
    .then((processedRes) => {
      const arrayOfBreeds = Object.keys(processedRes.message); // Changing the object keys intom arrays.
      arrayOfBreeds.forEach((breed, index) => {
        let breedItem = new Option(breed, breed); // Creating the news options from the breeds.
        breedItem.classList.add("breed-item");
        breedList.appendChild(breedItem);
      });
    })
}


// Fetch an image of Dog when the breed is selected from the list.
function addNewDog(breedType) {
  let dogUrl = `https://dog.ceo/api/breed/${breedType}/images/random`;
  const promise = fetch(dogUrl);

  promise.then(function (response) {
    const processingPromise = response.json();
    return processingPromise;
  })
    .then(function (processedRes) {
      doggos.appendChild(createImage);
      createImage.src = processedRes.message;
      createImage.alt = `A ${breedType} Dog.`;
      createImage.setAttribute("class", "dog-img")
      setTimeout(() => loaded(), 1000)
    })
}


// Loading the spinner while the image of dog is loading
function loading() {
  document.querySelector(".loader").style.display = "block";
}

// Hiding the spinner once the image has been displayed.
function loaded() {
  document.querySelector(".loader").style.display = "none";
}

// Funnction when the breed in changed.
breedList.addEventListener("change", (e) => {
  const breedType = e.target.value;
  addNewDog(breedType);
  loading();
})
