'use strict';

let myForm = document.querySelector(".myForm");
let imageGallery = document.querySelector(".img-gallery");
const OpenAI_API_Key = "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"

let isImageGenerating = false;

const updateImageCard = (imageDataArray) => {
    imageDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn")

        //set the image source to ai generated image  data

        const aiGeneratedImage = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImage;

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", aiGeneratedImage);
            downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
        }
    });
}

const generateAiImages = async (imageDescription, imageQuantity) => {
    try {
        //sending request to the OPENAI to generate images on the basis of user input
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OpenAI_API_Key}`
            },
            body: JSON.stringify({
                prompt: imageDescription,
                n: parseInt(imageQuantity),
                size: "1024x1024",
                response_format: "b64_json"
            })
        });

        if (!response.ok) throw new Error("Failed to generate images, Please try again");
        const { data } = await response.json();
        // console.log(data);

        updateImageCard([...data]);

    } catch (error) {
        alert(error.message);
    } finally {
        isImageGenerating = false;
    }
}

// function to be performed
function handleFormSubmission(e) {
    e.preventDefault();
    // console.log(e.srcElement);
    if (isImageGenerating) return;
    isImageGenerating = true;


    const imageDescription = e.srcElement[0].value;
    const imageQuantity = e.srcElement[1].value;
    // console.log(imageDescription,imageQuantity); 

    const imageCardMarkup = Array.from({ length: imageQuantity }, () =>
        `<div class="img-card loading">
                <img src="./images/loader.svg" alt="img">
                <a href="#" class="download-btn">
                    <img src="./images/download.svg" alt="download icon">
                </a>
            </div>`
    ).join("");

    // this will show the loading image until the image is completely loaded...
    imageGallery.innerHTML = imageCardMarkup;

    generateAiImages(imageDescription, imageQuantity);

}

myForm.addEventListener("submit", handleFormSubmission);