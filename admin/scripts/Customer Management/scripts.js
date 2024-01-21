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
            productTypeDiv.className = 'product-type';
            productTypeDiv.style.display = 'block';

            const prodTypeName = document.createElement('div');
            prodTypeName.className = 'prod-type-name';
            prodTypeName.innerText = `${productType.prodTypeName} (${productType.totalProducts})`;
            fetchCategories(productType, productTypeDiv, prodTypeName);

            prodTypeName.addEventListener('click', async() => {
                setSearchParams('categoryId');
                setSearchParams('subCategoryId');
                setSearchParams('prodTypeId', productType.prodTypeId)
                await listProducts();


            })

            productTypeDiv.appendChild(prodTypeName);
            productTypesContainer.appendChild(productTypeDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchCategories(productType, productDiv, prodTypeName) {
    try {
        const url = new URL('http://localhost:3000/listCategory/:id');
        url.searchParams.set('prodTypeId', productType.prodTypeId);
        const categories = await fetchData(url);

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.style.display = 'none';

            const categoryName = document.createElement('div');
            categoryName.className = 'category-name';
            categoryName.innerText = `${category.categoryName} (${category.totalProducts})`;

            // Use handleClick with correct parameters
            handleClick(prodTypeName, categoryDiv);
            categoryName.addEventListener('click', async(e) => {
                setSearchParams('subCategoryId');
                setSearchParams('prodTypeId', category.prodTypeId);
                setSearchParams('categoryId', category.categoryId);
                await listProducts();

            });

            fetchSubCategories(productType, category, categoryDiv, categoryName);

            categoryDiv.appendChild(categoryName);
            productDiv.appendChild(categoryDiv);
        });
    } catch (error) {
        console.error(error);
    }
}


async function fetchSubCategories(productType, category, categoryDiv, categoryName) {
    try {
        const url = new URL('http://localhost:3000/listSubCategory/:id');
        url.searchParams.set('prodTypeId', productType.prodTypeId);
        url.searchParams.set('categoryId', category.categoryId);
        const subCategories = await fetchData(url);

        subCategories.forEach(subCategory => {
            const subCategoryDiv = document.createElement('div');
            subCategoryDiv.className = 'sub-category';
            subCategoryDiv.style.display = 'none';

            const subCategoryName = document.createElement('div');
            subCategoryName.className = 'sub-category-name';
            subCategoryName.innerText = `${subCategory.subCategoryName} (${subCategory.totalProducts})`;
            handleClick(categoryName, subCategoryDiv);

            subCategoryDiv.addEventListener('click', async () => {

                setSearchParams('prodTypeId', subCategory.prodTypeId);
                setSearchParams('categoryId', subCategory.categoryId);
                setSearchParams('subCategoryId', subCategory.subCategoryId);

                await listProducts();


            });

            subCategoryDiv.appendChild(subCategoryName);
            categoryDiv.appendChild(subCategoryDiv);
        });
    } catch (error) {
        console.error(error);
    }
}


function handleClick(triggerElement, targetElement) {
    triggerElement.addEventListener('click', (event) => {
        event.stopPropagation();
        targetElement.style.display = (targetElement.style.display === 'none') ? 'block' : 'none';
    });
}



function setSearchParams(name, value) {
    const url = new URL(window.location.href);

    // If value is provided, set or replace the parameter
    if (value !== undefined) {
        url.searchParams.set(name, value);
    } else {
        // If value is not provided, delete the parameter
        url.searchParams.delete(name);
    }

    window.history.replaceState(null, null, url);
    return url
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

document.addEventListener('DOMContentLoaded', () => {
    fetchProductTypes()
})
