
function addFeature(data) {
    axios({
        method: "post",
        url: `${addFeaturesUrl}`,
        data: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        success.innerText = JSON.stringify(response.data, undefined, 4);
        success.style.color = 'green';
        success.innerHTML = response.data.message;
        setTimeout(() => {
            success.style.color = 'black';
            success.innerHTML = '';
        }, 3000);
        // window.location.reload()
    }).catch((error) => {
        console.log(error)
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).e;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    })
}

function listFeature(data) {
    axios({
        method: "get",
        url: `${listFeaturesUrl}:id`,
        headers: headers
    }).then((response) => {
        const featureList = document.getElementById('featureList');
        featureList.innerHTML = '';

        response.data.data.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${feature.featureName} - <a href="#" onclick="viewFeature(${feature.featureId})">View</a>`;
            featureList.appendChild(listItem);
        });


    }).catch((error) => {
        console.log(error)
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).e;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    })
}

function getFeatureDetail(){
    
    // Get the featureId from the URL
    const featureId = new URL(window.location.href).searchParams.get('featureId');
    axios({
        method: "get",
        url: `${listFeaturesUrl}${featureId}`,
        headers: headers
    }).then((response) => {
        const featureDetail = response.data.data[0];

        const featureDetailContainer = document.getElementById('featureDetail');
        featureDetailContainer.innerHTML = `
                    <h1>${featureDetail.featureName}</h1>
                    <p>Feature Description: ${featureDetail.featureDescription}</p>
                    <p>Status: ${featureDetail.status}</p>
                `;


    }).catch((error) => {
        console.log(error)
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).e;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    })
}

function uploadImages(featureId) {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files; // Get all selected files

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('featureImage', files[i]);
    }
    axios.post(`${uploadFeatureImageUrl}${featureId}`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
    })
        .then(response => {
            window.location.href = '/featureManagement/listFeatures?featureId=' + featureId
        })
        .catch(error => {
            const errorMessage = JSON.parse(JSON.stringify(error.response.data));
            errorMsg.style.color = 'red';
            errorMsg.innerHTML = errorMessage;
            setTimeout(() => {
                errorMsg.style.color = 'black';
                errorMsg.innerHTML = '';
            }, 3000);      // Handle error if needed
        });
}


const getFeatureImage = async (featureId) => {
    try {
        const response = await axios.get(`${listFeatureImageUrl}${featureId}`);
        console.log(response.data.result.map(item => new URL(response.request.responseURL).origin + item.imageUrl))
        return response.data.result.map(item => new URL(response.request.responseURL).origin + item.imageUrl);
    } catch (error) {
        console.error('Error fetching product image:', error);
        throw error;
    }
};

async function deleteFeatureImg(imagePath) {
    try {
        const response = await axios.delete(`${deleteFeatureImageUrl}${imagePath}`, {
            headers
        });
        window.location.reload()
        return response.data;
    } catch (error) {

        const errorMsg = document.getElementById('error')
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);      // Handle error if needed
        throw error; // Throw the error for handling in the calling code if needed
    }
}

