
function addProductType(data) {
    axios({
        method: "post",
        url: `${addProductTypeUrl}`,
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

function getProductType(status) {
    let query
    if(status){
        query = '?status=1'
    }else{
        query = ''
    }
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${getProductTypeUrl}${':id'}${query}`,
            headers: headers
        }).then((response) => {
            const data = response.data.data
            const productTypeSelect = document.getElementById('productTypeSelect')

            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.prodTypeId;
                optionElement.textContent = option.prodTypeName;
                productTypeSelect.appendChild(optionElement);
            });

            resolve(); // Resolve the promise after the data is fetched and dropdown is populated
        }).catch((error) => {
            console.log(error);
            reject(error); // Reject the promise in case of an error
        });
    });
}


function addCategory(data) {
    axios({
        method: "post",
        url: `${addCategoryUrl}`,
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

function getCategory(categoryType,status) {
    let query
    if(status){
        query = '&status=1'
    }else{
        query = ''
    }
    return new Promise((resolve, reject) => {
        if (!categoryType) {
            categoryType = '';
        }
        axios({
            method: "get",
            url: `${getCategoryUrl}${':id'}${categoryType}${query}`,
            headers: headers
        }).then((response) => {
            const data = response.data.data;
            const categorySelect = document.getElementById('categorySelect');

            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.categoryId;
                optionElement.textContent = option.categoryName;
                categorySelect.appendChild(optionElement);
            });

            resolve(); // Resolve the promise after the data is fetched and dropdown is populated
        }).catch((error) => {
            console.log(error);
            reject(error); // Reject the promise in case of an error
        });
    });
}


function addSubCategory(data) {
    axios({
        method: "post",
        url: `${addSubCategoryUrl}`,
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

function getSubCategory(categoryType,status) {
    let query
    if(status){
        query = '&status=1'
    }else{
        query = ''
    }
    return new Promise((resolve, reject) => {
        if (!categoryType) {
            categoryType = '';
        }

        axios({
            method: "get",
            url: `${getSubCategoryUrl}${':id'}${categoryType}${query}`,
            headers: headers
        }).then((response) => {
            const data = response.data.data;
            const subCategorySelect = document.getElementById('subCategorySelect');

            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.subCategoryId;
                optionElement.textContent = option.subCategoryName;
                subCategorySelect.appendChild(optionElement);
            });

            resolve(); // Resolve the promise after the data is fetched and dropdown is populated
        }).catch((error) => {
            console.log(error);
            reject(error); // Reject the promise in case of an error
        });
    });
}


function getCategoriesDropdown() {
    document.addEventListener('DOMContentLoaded', () => {
        const productTypeSelect = document.getElementById('productTypeSelect');
        const categorySelect = document.getElementById('categorySelect');
        const subCategorySelect = document.getElementById('subCategorySelect');
        const fetchCategories = () => {
            const prodTypeQuery = "?prodTypeId=" + productTypeSelect.value;

            getCategory(prodTypeQuery,'1')
                .then(() => {
                    // Categories fetched successfully, continue with subcategory fetch
                    const categoryQuery = "?categoryId=" + categorySelect.value;
                    return getSubCategory(categoryQuery,'1');
                })
                .catch(error => {
                    console.error("Error fetching categories:", error);
                });
        };

        // Event listener for product type selection change
        productTypeSelect.addEventListener('change', () => {
            // Clear existing categories and subcategories on change
            categorySelect.innerHTML = '<option value="" selected>select</option>';
            subCategorySelect.innerHTML = '<option value="" selected>select</option>';

            // Fetch and populate categories based on product type selection
            fetchCategories();
        });

        // Event listener for category selection change
        categorySelect.addEventListener('change', () => {
            // Clear existing subcategories on change
            subCategorySelect.innerHTML = '<option value="" selected>select</option>';

            const categoryQuery = "?categoryId=" + categorySelect.value;
            getSubCategory(categoryQuery,'1')
                .catch(error => {
                    console.error("Error fetching subcategories:", error);
                });
        });

        fetchCategories();
    });
}

function getProductTypeAndCategories(res,prodType,prodCategory,prodSubCategory) {
    return getProductType('1')
        .then(() => {
            prodType.value = res.prodType
            const productTypeQuery = "?prodTypeId=" + res.prodType;

            getCategory(productTypeQuery,'1').then(() => {
                prodCategory.value = res.prodCategory;

            });

        })
        .then(() => {
            const categoryQuery = "?categoryId=" + res.prodCategory;


            getSubCategory(categoryQuery,'1').then(() => {
                prodSubCategory.value = res.prodSubCategory;

            });

        });
}