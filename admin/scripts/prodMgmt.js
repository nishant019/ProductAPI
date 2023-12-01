//lists product on a table
function getProducts(currentPage) {
    axios.get(`${getProdsUrl}${'/:id'}?page=${currentPage}`, { headers })
        .then((response) => {
            const tableData = response.data;
            const table = document.getElementById("userTable");
            const tbody = table.querySelector("tbody");
            tbody.innerHTML = '';

            tableData.prods.forEach((prod, index) => {
                const row = document.createElement("tr");
                const page = (currentPage === 1) ? index : index + (currentPage - 1) * 10;
                row.innerHTML = `
            <td>${page + 1}</td>
            <td>${prod.prodId || ''}</td>
            <td>${prod.prodName || ''}</td>
            <td>${prod.prodTypeName || ''} </td>
            <td>${prod.categoryName || ''} </td>
            <td>${prod.subCategoryName || ''}</td>
            <td>${prod.prodLocation || ''}</td>
            <td>${prod.prodLocation1 || ''}</td>
            <td>${prod.prodLocation2 || ''}</td>
            <td>${prod.prodSubTitle || ''}</td>
            <td>${prod.prodTitle || ''}</td>
            <td>${prod.prodShortDescription || ''}</td>
            <td>${prod.prodDescription || ''}</td>
            <td>${prod.createdByUser || ''}</td>
            <td>${newDate(prod.createddate) || ''}</td>
            <td>${prod.updatedByUser || ''}</td>
            <td>${newDate(prod.updateddate) || ''}</td>

            <td><button id="edit" class="edit-button">Edit</button></td>
            <td><button id="delete" class="delete-button">Delete</button></td>
            <td><button class="view-button">View Details</button></td>
            
          `;
                tbody.appendChild(row);

            });

            document.getElementById("userCount").innerHTML = tableData.totalData;
            document.getElementById("pageCount").innerHTML = tableData.totalPages;
            document.getElementById("pageNumber").innerHTML = tableData.currentPage;
            createPagination(tableData.totalPages, tableData.currentPage);
            maxPages = tableData.totalPages;

            const editButtons = document.querySelectorAll(".edit-button");
            const deleteButtons = document.querySelectorAll(".delete-button");
            const detailsButton = document.querySelectorAll(".view-button");



            deleteButtons.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    let prodId = tableData.prods[index].prodId;

                    deleteProductTable(prodId);
                });
            });

            editButtons.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    const prodId = tableData.prods[index].prodId;
                    openProdUpdatePage(prodId, tableData.prods[index]);
                });
            });
            detailsButton.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    const prodId = tableData.prods[index].prodId;
                    viewProdDetails(prodId);
                });
            });
            const url = `/productManagement/getProds?page=${currentPage}`;

            historyListState(currentPage, url, productInfoStates, "prodPageState");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//to update product event
function openProdUpdatePage(prodId) {

    window.location.href = `/productManagement/updateProds?prodId=${prodId}`;
}

//request for update product
function updateProds(data) {
    const loco = new URL(window.location.href);
    const prodId = loco.searchParams.get("prodId");
    axios({
        method: 'put',
        url: `${updateProdsUrl}` + `${prodId}`,
        data: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        success.innerText = JSON.stringify(response.data, undefined, 4);
        success.style.color = 'green';
        success.innerHTML = response.data.message;
        setTimeout(() => {
            // Clear input fields or perform necessary actions
            success.style.color = 'black';
            success.innerHTML = '';
        }, 3000);
        // Redirect to the product management page
        window.location.href = '/productManagement/getProdDetail?prodId=' + prodId
        // window.location.href = new URL(document.referrer).origin + "/productManagement/getProds";
    }).catch((error) => {
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    });
}

//confirmation for deleting product
function deleteProductTable(prodId) {
    if (window.confirm("Are you sure you want to delete this product??")) {
        deleteProduct(prodId);
        window.location.reload();
        window.alert("Product is deleted!");

    } else {
        window.location.href = '/productManagement/getProds';
    }
}

//request for delete product
function deleteProduct(prodId) {
    axios({
        method: 'delete',
        url: `${deleteProductUrl + prodId}`,
        headers: headers
    }).then((response) => {
        alert.innerText = JSON.stringify(response.data, undefined, 4);
        success.style.color = 'green';
        window.alert = response.data.message;
        setTimeout(() => {
            success.style.color = 'black';
            success.innerHTML = '';
            window.location.href = '/productManagement/getProds';
            
        }, 3000);
    }).catch((error) => {
        const errorMessage = JSON.parse(JSON.stringify(error.response.data)).error;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    });
}

//add product
function addProduct(data) {

    axios({
        method: 'post',
        url: `${addProductUrl}`, // Replace with your product add URL
        data: JSON.stringify(data),
        headers: headers
    }).then((response) => {
        success.innerText = JSON.stringify(response.data, undefined, 4);
        success.style.color = 'green';
        success.innerHTML = response.data.message;
        setTimeout(() => {
            document.getElementById('prodName').value = '';
            document.getElementById('prodLocation').value = '';
            document.getElementById('prodLocation1').value = '';
            document.getElementById('prodLocation2').value = '';
            // document.getElementById('prodImage').value = '';
            document.getElementById('prodTitle').value = '';
            document.getElementById('prodDescription').value = '';

            success.style.color = 'black';
            success.innerHTML = '';
        }, 3000);
        window.location.href = '/productManagement/getProdDetail?prodId=' + response.data.prodId
    }).catch((error) => {
        const errorMessage = JSON.parse(JSON.stringify(error)).error;
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = errorMessage;
        setTimeout(() => {
            errorMsg.style.color = 'black';
            errorMsg.innerHTML = '';
        }, 3000);
    });
}

//gets product details page
function viewProdDetails(prodId) {
    window.location.href = '/productManagement/getProdDetail?prodId=' + prodId
}
//request to get product details
const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${getProdsUrl}/${productId}`, { headers });
        console.log(response.data.prods[0])
        return response.data.prods[0];
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};


function uploadImages(prodId) {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files; // Get all selected files

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('prodImage', files[i]);
    }
    axios.post(`${uploadImageUrl}${prodId}`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
    })
        .then(response => {
            window.location.href = '/productManagement/getProdDetail?prodId=' + prodId
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


const getProductImage = async (productId) => {
    try {
        const response = await axios.get(`${getImageUrl}${productId}`);
        return response.data.result.map(item => new URL(response.request.responseURL).origin + item.imageUrl);
    } catch (error) {
        console.error('Error fetching product image:', error);
        throw error;
    }
};
function newDate(msString) {
    let ms = parseInt(msString, 10);
    let date = new Date(ms);

    // Format date in 'yyyymmdd' format
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;

    // Format time in 24-hour format
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Ensure three digits for milliseconds
    let formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    return `${formattedDate}, ${formattedTime}`;
}

//displays product on html page
const displayProduct = async (productId) => {
    try {
        const productData = await getProduct(productId);
        console.log(productData.cost)
        document.getElementById('productInfo').innerHTML = `
        <h2>${productData.prodName}</h2>
        
        <p>Product Type: ${productData.prodTypeName} ||
        Category: ${productData.categoryName} ||
        Sub Category: ${productData.subCategoryName}</p>

        <p>Sub Title: ${productData.prodSubTitle}</p>
        <p>Title: ${productData.prodTitle}</p>
        <p>Location: ${productData.prodLocation}</p>
        <p>Location1: ${productData.prodLocation1}</p>
        <p>Location2: ${productData.prodLocation2}</p>
        <p>Short Description: ${productData.prodShortDescription}</p>
        <p>Description: ${productData.prodDescription}</p>


        <p>Cost per Quantity: NPR ${productData.cost} / ${productData.quantity}  ${productData.quantityType}</p>

        <p>Created By: ${productData.createdByUser}</p>
        <p>Created Date: ${newDate(productData.createddate)}</p>
        <p>Updated By: ${productData.updatedByUser}</p>
        <p>Updated Date: ${newDate(productData.updateddate)}</p>
      `;
        const imageUrls = await getProductImage(prodId);

        // Fetch and display product images
        const imageContainer = document.getElementById('productImage');
        imageContainer.innerHTML = '';

        const imageWrapper = document.createElement('div');
        imageWrapper.setAttribute('class', 'image-wrapper');
        imageUrls.forEach(imageUrl => {
            const pathname = new URL(imageUrl).pathname;
            const imgDiv = document.createElement('div');
            imgDiv.setAttribute('id', 'imgDiv')
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑 Delete';
            deleteButton.setAttribute("id", "deleteimage")
            deleteButton.addEventListener('click', () => {
                const confirmation = confirm('Are you sure you want to delete this image?');
                if (confirmation) {
                    deleteImage(encodeURIComponent(pathname));
                } else {
                    console.log('Deletion cancelled by user');
                }
            });


            const imgElement = document.createElement('img');
            imgElement.setAttribute('id', 'productImages');
            imgElement.src = imageUrl;
            imgElement.alt = 'Product Image';

            imageContainer.appendChild(imageWrapper);
            imageWrapper.appendChild(imgDiv)
            imgDiv.appendChild(imgElement);
            imgDiv.appendChild(deleteButton);

        })
    } catch (err) {
        console.error('Error:', err);
    }
};

//request to delete image
async function deleteImage(imagePath) {
    console.log(`${deleteImageUrl}${imagePath}`)

    try {
        const response = await axios.delete(`${deleteImageUrl}${imagePath}`, {
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