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
            const prodTypeName = document.createElement('div');
            prodTypeName.className = 'prod-type-name';
            prodTypeName.innerText = `${productType.prodTypeName} (${productType.totalProducts})`;

            prodTypeName.addEventListener('click', async () => {
                const redirectUrl = new URL(window.location.origin + "/customer/product/list")
                redirectUrl.searchParams.set('prodTypeId', productType.prodTypeId)
                window.location.href = redirectUrl
                // fetchCategories()

            })
            productTypeDiv.id = productType.prodTypeId

            const prodTypeId = new URL(window.location.href).searchParams.get('prodTypeId')
            if (productTypeDiv.id === prodTypeId) {
                productTypeDiv.classList.add('active')
            }
            productTypeDiv.appendChild(prodTypeName);
            productTypesContainer.appendChild(productTypeDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchCategories() {
    try {
        const url = new URL('http://localhost:3000/listCategory/:id');
        const categories = await fetchData(url);
        const categoriesList = document.getElementById('categoryList');

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            const categoryName = document.createElement('div');

            categoryName.className = 'category-name';
            categoryName.id = category.categoryId;
            categoryName.innerText = `${category.categoryName} (${category.totalProducts})`;

            categoryDiv.addEventListener('click', () => {
                const categoryList = document.querySelectorAll('.category');
                categoryList.forEach(name => name.classList.remove('active'));

                categoryDiv.classList.add('active');
                setSearchParams('subCategoryId');
                setSearchParams('categoryId', category.categoryId);
                fetchSubCategories()
                listProducts()



            });
            const categoryId = new URL(window.location.href).searchParams.get('categoryId')
            if (categoryName.id === categoryId) {
                categoryDiv.classList.add('active')
            }


            categoryDiv.appendChild(categoryName);
            categoriesList.appendChild(categoryDiv);
        });

        

    } catch (error) {
        console.error(error);
    }
}



async function fetchSubCategories() {
    try {

        const url = new URL('http://localhost:3000/listSubCategory/:id');
        const prodTypeId = new URL(window.location.href).searchParams.get('prodTypeId')
        if (prodTypeId) {
            url.searchParams.set('prodTypeId', prodTypeId);

        }
        const categoryId = new URL(window.location.href).searchParams.get('categoryId')
        if (categoryId) {
            url.searchParams.set('categoryId', categoryId);
        }
        const subCategories = await fetchData(url);
        const subCategorylist = document.getElementById('subCategoryList')
        subCategorylist.innerHTML=''

        subCategories.forEach(subCategory => {
            const subCategoryDiv = document.createElement('div');
            subCategoryDiv.className = 'sub-category';
            const subCategoryName = document.createElement('div');

            subCategoryName.className = 'sub-category-name';
            subCategoryName.id = subCategory.subCategoryId;
            subCategoryName.innerText = `${subCategory.subCategoryName} (${subCategory.totalProducts})`;

            subCategoryDiv.appendChild(subCategoryName)
            subCategorylist.appendChild(subCategoryDiv);



            const subCategoryId = new URL(window.location.href).searchParams.get('subCategoryId')
            if (subCategoryName.id === subCategoryId) {
                subCategoryDiv.classList.add('active')
            }
            
            subCategoryDiv.addEventListener('click', () => {
                const subCategoryList = document.querySelectorAll('.sub-category');
                subCategoryList.forEach(name => name.classList.remove('active'));

                subCategoryDiv.classList.add('active');

                setSearchParams('subCategoryId', subCategory.subCategoryId);
                listProducts()
            });

        });
    } catch (error) {
        console.error(error);
    }
}


function handleClick(triggerElement, targetElement) {
    triggerElement.addEventListener('click', (event) => {
        event.stopPropagation();
        targetElement.style.display = (targetElement.style.display === 'none') ? 'table-row' : 'none';
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
    const sort = url.searchParams.get('sort');

    const apiUrl = new URL(`http://localhost:3000/listProducts/:id`);

    if (prodTypeId) {
        apiUrl.searchParams.set('prodTypeId', prodTypeId);
    }
    if (sort) {
        apiUrl.searchParams.set('sort', sort);
    }
    if (categoryId) {
        apiUrl.searchParams.set('categoryId', categoryId);
    }
    if (subCategoryId) {
        apiUrl.searchParams.set('subCategoryId', subCategoryId);
    }

    const listProducts = await axios.get(apiUrl);


    listProducts.data.data.forEach(prods => {

        const productContentDiv = document.createElement('div');
        productContentDiv.className = 'product-content-div';
        toggleBookmark(productContentDiv)

        const contentDetail = document.createElement('div')
        contentDetail.className = 'content-div'

        const productDiv = document.createElement('div')
        productDiv.className = 'product-div'

        const contactInfo = document.createElement('p')
        contactInfo.className = 'contact-info'

        const imgContainer = document.createElement('div')
        imgContainer.className = 'img-container'

        const imgElement = document.createElement('img')
        imgElement.className = 'img'
        imgContainer.appendChild(imgElement)

        const productTitle = document.createElement('p')
        productTitle.className = 'product-title'

        const productLocation = document.createElement('p')
        productLocation.className = 'product-location'

        const productSizeInfo = document.createElement('div')
        productSizeInfo.className = 'product-size-info'

        const productCost = document.createElement('p')
        productCost.className = 'product-cost'

        productTitle.innerText = prods.prodName

        productLocation.innerText = `${prods.prodLocation} ${prods.prodLocation1}\n${prods.prodLocation2}`

        productSizeInfo.innerHTML = `
        <p class='size-info'>
          <span>3 - 4</span><i class="fas fa-bed"></i>
          <span>2 - 4</span><i class="fas fa-bath"></i>
          <span>1500 sqft</span><i class="fas fa-expand"></i>
        </p>
      `;


        contactInfo.innerText = '☏' + '+977 9860000000'

        productCost.innerText = `रु॰ ${prods.cost.toLocaleString()}`

        imgElement.src = 'http://localhost:3000' + prods.imageUrl


        const imgHref = document.createElement('a')
        imgHref.className = 'img-href'


        imgHref.appendChild(imgElement)

        imgContainer.appendChild(imgHref)

        productDiv.appendChild(imgContainer)

        contentDetail.appendChild(productCost)
        contentDetail.appendChild(productSizeInfo)


        contentDetail.appendChild(productTitle)
        contentDetail.appendChild(productLocation)
        productDiv.appendChild(contentDetail)

        // productDiv.appendChild(contactInfo)


        const productDetailUrl = window.location.origin + '/customer/product/detail?prodId=' + prods.prodId
        imgHref.href = productDetailUrl

        // Append each productDiv to the productContentDiv
        productContentDiv.appendChild(productDiv);

        // Append the productContentDiv to the listProductsDiv
        listProductsDiv.appendChild(productContentDiv);


    });

    scrollButtonHide();


}


async function getProductDetail() {
    const searchParams = new URL(document.location.href);
    const prodId = searchParams.searchParams.get('prodId');
    const apiUrl = new URL(`http://localhost:3000/listProducts/${prodId}`);

    try {
        const response = await axios.get(apiUrl);
        const product = response.data.data[0];

        // Display product image
        const productImage = document.getElementById('productImage');
        const productCategory = document.getElementById('productCategory');
        productCategory.innerHTML = `<p>${product.prodTypeName} > ${product.categoryName} > ${product.subCategoryName}</p>`
        // Display product information
        const productInfo = document.getElementById('productInfo');
        productInfo.innerHTML = `

            <h2>${product.prodName}</h2>

            <p><strong>Cost:</strong> ${product.cost} per ${product.quantity} - ${product.quantityType}</p>
            <p><strong>Description:</strong> ${product.prodDescription}</p>
        `;

        productImage.src = 'http://localhost:3000' + product.imageUrl;
        productImage.alt = product.prodName;

        // Display product locations
        const locationList = document.getElementById('locationList');
        locationList.innerHTML = `
            <li class="location-item"><strong>Location 1:</strong> ${product.prodLocation1}</li>
            <li class="location-item"><strong>Location 2:</strong> ${product.prodLocation2}</li>
            <li class="location-item"><strong>Location 3:</strong> ${product.prodLocation}</li>
        `;
    } catch (error) {
        console.error(error);
    }
}

function toggleBookmark(productDiv) {
    const icon = document.createElement('img');
    icon.className = 'bookmark-icon';
    icon.src = '/bookmark';
    productDiv.appendChild(icon);

    icon.addEventListener('click', function () {
        icon.classList.toggle('bookmarked');

        if (icon.classList.contains('bookmarked')) {
            icon.src = '/bookmarked';
        } else {
            icon.src = '/bookmark';
        }
    });
}

let currentIndex = 0;

function scrollItems(direction) {
    const prodsContainer = document.querySelector('#prods');
    const itemWidth = document.querySelector('.product-content-div').offsetWidth;

    if (direction === 'next') {
        prodsContainer.scrollLeft += itemWidth;
    } else if (direction === 'prev') {
        prodsContainer.scrollLeft -= itemWidth;
    }
}





function scrollButtonHide() {
    const listProds = document.querySelector('#listProducts');
    const prodsContainer = document.querySelector('#prods');

    // Check if listProds or prodsContainer is null
    if (!listProds || !prodsContainer) {
        return;
    }

    // Check if .prev and .next buttons exist
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    if (!prevButton || !nextButton) {
        return;
    }

    const containerWidth = prodsContainer.offsetWidth;
    const totalItemsWidth = listProds.scrollWidth;

    // Check if scrollbar is present by comparing scrollWidth and offsetWidth
    const isScrollbarPresent = totalItemsWidth > containerWidth;

    // Display/hide .prev based on scroll position
    prevButton.style.display = prodsContainer.scrollLeft < 100 ? 'none' : 'inline';

    // Display/hide .next based on scroll position
    nextButton.style.display = prodsContainer.scrollLeft + containerWidth >= totalItemsWidth - 100 ? 'none' : 'inline';
}







