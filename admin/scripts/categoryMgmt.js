
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
    if (status) {
        query = '?status=1'
    } else {
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

function getCategory(status) {
    let query
    if (status) {
        query = '?status=1'
    } else {
        query = ''
    }
    return new Promise((resolve, reject) => {

        axios({
            method: "get",
            url: `${getCategoryUrl}${':id'}${query}`,
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


            resolve(data); // Resolve the promise after the data is fetched and dropdown is populated
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

function getSubCategory(categoryType, status) {
    let query, catId
    if (status) {
        query = '&status=1'
    } else {
        query = ''
    }
    return new Promise((resolve, reject) => {
        if (!categoryType) {
            catId = '';
        } else {
            catId = "?categoryId=" + categoryType
        }

        axios({
            method: "get",
            url: `${getSubCategoryUrl}${':id'}${catId}${query}`,
            headers: headers
        }).then((response) => {
            const data = response.data.data;
            const subCategorySelect = document.getElementById('subCategorySelect');
            subCategorySelect.innerHTML = ''
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
        const categorySelect = document.getElementById('categorySelect');
        const subCategorySelect = document.getElementById('subCategorySelect');
        const additionalFieldsContainer = document.getElementById('additionalFields');

        const fetchCategories = () => {
            getCategory('1')
                .then((data) => {
                    // Categories fetched successfully
                    data.forEach(category => {
                        if (category.additionalFields) {
                            const additionalFields = JSON.parse(category.additionalFields);
                            const fieldName = additionalFields.fieldName;
                            const childFields = additionalFields.childFields;

                            // Display additional fields for selected category
                            categorySelect.addEventListener('change', () => {
                                if (categorySelect.value === category.categoryId) {
                                    additionalFieldsContainer.innerHTML = ''; // Clear existing fields

                                    const newFieldDiv = document.createElement('div');
                                    const label = document.createElement('label');
                                    label.textContent = fieldName;

                                    const newField = document.createElement('input');
                                    newField.className = fieldName.replace(/\s+/g, '');
                                    newField.placeholder = fieldName;

                                    newFieldDiv.appendChild(label);
                                    newFieldDiv.appendChild(newField);

                                    additionalFieldsContainer.appendChild(newFieldDiv);

                                    // Create elements for each child field
                                    childFields.forEach(childField => {
                                        const childFieldDiv = document.createElement('div');
                                        const childLabel = document.createElement('label');
                                        childLabel.textContent = childField.childFieldTitle;

                                        const childInput = document.createElement('input');
                                        childInput.className = childField.childFieldTitle.replace(/\s+/g, '');
                                        childInput.placeholder = childField.childFieldTitle;

                                        childFieldDiv.appendChild(childLabel);
                                        childFieldDiv.appendChild(childInput);

                                        additionalFieldsContainer.appendChild(childFieldDiv);
                                    });
                                }
                            });
                        }
                    });

                    const categoryQuery = categorySelect.value;
                    return getSubCategory(categoryQuery, '1');
                })
                .catch(error => {
                    console.error("Error fetching categories:", error);
                });
        };

        // Event listener for category selection change
        categorySelect.addEventListener('change', () => {
            // Clear existing subcategories and additional fields on change
            subCategorySelect.innerHTML = '<option value="" selected>select</option>';
            additionalFieldsContainer.innerHTML = '';

            const categoryQuery = categorySelect.value;

            // Fetch subcategories and additional fields
            getSubCategory(categoryQuery, '1')
                .catch(error => {
                    console.error("Error fetching subcategories:", error);
                });
        });

        fetchCategories();
    });
}


// function getProductTypeAndCategories(res,prodType,prodCategory,prodSubCategory) {
//     return getProductType('1')
//         .then(() => {
//             prodType.value = res.prodType
//             const productTypeQuery = "?prodTypeId=" + res.prodType;

//             getCategory(productTypeQuery,'1').then(() => {
//                 prodCategory.value = res.prodCategory;

//             });

//         })
//         .then(() => {
//             const categoryQuery = res.prodCategory;


//             getSubCategory(categoryQuery,'1').then(() => {
//                 prodSubCategory.value = res.prodSubCategory;

//             });

//         });
// }