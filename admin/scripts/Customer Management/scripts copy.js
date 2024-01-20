let isProductTypeVisible = localStorage.getItem('isProductTypeVisible');
let isCategoryVisible = localStorage.getItem('isCategoryVisible');

async function toggleProductTypeDisplay(productType, categoryList, element) {
    const allCategoryLists = document.querySelectorAll(element);

    let indexOfBlock = 0;
    allCategoryLists.forEach((list, index) => {
        list.style.display = 'none';
    });

    categoryList.style.display = 'block';

    allCategoryLists.forEach((list, index) => {
        if (allCategoryLists[index].style.display === 'block') {
            localStorage.setItem(allCategoryLists[index].className, index);
        }
    });

    indexOfBlock = localStorage.getItem(categoryList.className);

    console.log('indexOfBlock', indexOfBlock)

    allCategoryLists[indexOfBlock].style.display = 'block'


    const url = new URL(window.location.href);
    url.searchParams.set('prodTypeId', productType.prodTypeId);
    url.searchParams.delete('subCategoryId');
    url.searchParams.delete('categoryId');
    window.history.replaceState(null, null, url);

    // Update localStorage for the visible product type
    await fetchAndDisplayCategories(productType.prodTypeId, categoryList);

    // Clear localStorage after some time (e.g., 5 seconds)
    setTimeout(() => {
        localStorage.removeItem('isCategoryVisible');
    }, 5000);

}

function createCategoryItem(category) {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';

    const categoryName = document.createElement('div');
    categoryName.className = 'category-name';
    categoryName.textContent = `${category.categoryName} ( ${category.totalProducts} )`;
    categoryItem.appendChild(categoryName);

    const subCategoryList = document.createElement('div');
    subCategoryList.className = 'sub-category-list';
    categoryItem.appendChild(subCategoryList);


    categoryName.addEventListener('click', () => {
        toggleProductTypeDisplay(category, subCategoryList, '.sub-category-list');

        if (subCategoryList.style.display === 'block') {
            const url = new URL(window.location.href);
            url.searchParams.set("categoryId", category.categoryId);
            url.searchParams.delete('subCategoryId');
            window.history.replaceState(null, null, url);
            fetchAndDisplaySubCategories(category.categoryId, subCategoryList);
            listProducts();
        }
    });

    fetchAndDisplaySubCategories(category.categoryId, subCategoryList);



    return categoryItem;
}

// ... (rest of the code)


function createSubCategoryItem(subCategory) {
    const subCategoryItem = document.createElement('div');
    subCategoryItem.className = 'sub-category-list-item';

    subCategoryItem.textContent = `${subCategory.subCategoryName}  ( ${subCategory.totalProducts} )`;

    subCategoryItem.addEventListener('click', () => {
        const url = new URL(window.location.href);
        url.searchParams.set("subCategoryId", subCategory.subCategoryId);

        // Keep all other params intact
        url.searchParams.set('prodTypeId', subCategory.prodTypeId);
        url.searchParams.set('categoryId', subCategory.categoryId);
        url.searchParams.delete('prodId');
        url.pathname = '/customer/getProds';
        // Update state
        selectedSubCategoryName = subCategory.subCategoryName;

        // Update localStorage

        window.history.replaceState(null, null, url);
        window.location.href = url

        listProducts();
    });

    return subCategoryItem;
}
async function listProducts() {
    const listProductsDiv = document.getElementById('listProducts');
    listProductsDiv.innerHTML = '';

    const url = new URL(window.location.href);
    const prodTypeId = url.searchParams.get('prodTypeId');
    const categoryId = url.searchParams.get('categoryId');
    const subCategoryId = url.searchParams.get('subCategoryId');

    const apiUrl = new URL(`http://localhost:3000/listProducts/:id`);

    if (prodTypeId) {
        apiUrl.searchParams.set('prodTypeId', prodTypeId);
    }
    if (categoryId) {
        apiUrl.searchParams.set('categoryId', categoryId);
    }
    if (subCategoryId) {
        apiUrl.searchParams.set('subCategoryId', subCategoryId);
    }

    const listProducts = await axios.get(apiUrl);

    const productsDiv = document.createElement('div');
    productsDiv.className = 'products-div';

    listProducts.data.data.forEach(prods => {
        const productDiv = document.createElement('div')
        productDiv.className = 'product-div'

        const imgContainer = document.createElement('div')
        imgContainer.className = 'img-container'

        const imgElement = document.createElement('img')
        imgElement.className = 'img'
        imgContainer.appendChild(imgElement)

        const productTitle = document.createElement('h3')
        productTitle.className = 'product-title'

        const productSubTitle = document.createElement('h5')
        productSubTitle.className = 'product-sub-title'

        const productShortDescription = document.createElement('p')
        productShortDescription.className = 'product-short-description-title'

        const productCost = document.createElement('p')
        productCost.className = 'product-cost'



        productTitle.innerText = prods.prodName

        productSubTitle.innerText = prods.prodSubTitle

        productShortDescription.innerText = prods.prodShortDescription

        productCost.innerText = `${prods.cost} per ${prods.quantity} - ${prods.quantityType}`

        imgElement.src = 'http://localhost:3000' + prods.imageUrl
        productDiv.appendChild(productTitle)
        productDiv.appendChild(productSubTitle)
        productDiv.appendChild(productShortDescription)

        const imgHref = document.createElement('a')
        imgHref.className = 'img-href'
        imgHref.appendChild(imgElement)
        imgContainer.appendChild(imgHref)

        productDiv.appendChild(imgContainer)

        productDiv.appendChild(productCost)
        productsDiv.appendChild(productDiv)

        const productDetailUrl = window.location.origin + '/customer/product/detail?prodId=' + prods.prodId
        imgHref.href = productDetailUrl
    });

    listProductsDiv.appendChild(productsDiv);
}



async function createProductTypeItem(productType, container) {
    const productTypeItem = createListItem(productType);
    productType.innerHTML = '';

    const categoryList = document.createElement('div');
    categoryList.className = 'product-type';

    productTypeItem.addEventListener('click', () => {
        const url = new URL(window.location.href)
        url.searchParams.set('prodTypeId', productType.prodTypeId)
        window.history.replaceState(null, null, url)
        toggleProductTypeDisplay(productType, categoryList, '.product-type');
    });

    container.appendChild(productTypeItem);
    container.appendChild(categoryList);
}

function createListItem(data) {

    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    listItem.textContent = `${data.prodTypeName} ( ${data.totalProducts} )`;
    return listItem;
}

async function fetchAndDisplayCategories(prodTypeId, categoryList) {
    try {

        const categories = await fetchData(`http://localhost:3000/listCategory/:id?prodTypeId=${prodTypeId}`);

        renderCategories(categories, categoryList);
    } catch (error) {
        console.error(error);
    }
}

function renderCategories(categories, categoryList) {
    categoryList.innerHTML = '';

    categories.forEach((category, index) => {
        const categoryItem = createCategoryItem(category);
        categoryList.appendChild(categoryItem);
    });
}

async function fetchAndDisplaySubCategories(categoryId, subCategoryList) {
    try {
        const subCategories = await fetchData(`http://localhost:3000/listSubCategory/:id?categoryId=${categoryId}`);
        renderSubCategories(subCategories, subCategoryList);
    } catch (error) {
        console.error(error);
    }
}

function renderSubCategories(subCategories, subCategoryList) {
    subCategoryList.innerHTML = '';

    subCategories.forEach(subCategory => {
        const subCategoryItem = createSubCategoryItem(subCategory);
        subCategoryList.appendChild(subCategoryItem);
    });
}

async function fetchData(url) {
    const response = await axios.get(url);
    return response.data.data;
}

async function fetchProductTypes() {
    try {
        const productTypes = await fetchData('http://localhost:3000/listProductType/:id');
        const productTypesContainer = document.getElementById('productTypes');

        productTypesContainer.innerHTML = '';

        productTypes.forEach(productType => {
            const productTypeDiv = document.createElement('div');

            createProductTypeItem(productType, productTypeDiv);
            productTypesContainer.appendChild(productTypeDiv);
        });
    } catch (error) {
        console.error(error);
    }
}


window.addEventListener('beforeunload', () => {
    fetchProductTypes()

})

document.addEventListener('DOMContentLoaded', () => {
    fetchProductTypes();


});


