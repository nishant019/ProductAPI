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

            prodTypeName.addEventListener('click', async () => {
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
            // categoryDiv.style.display = 'none';

            const categoryName = document.createElement('div');
            categoryName.className = 'category-name';
            categoryName.innerText = `${category.categoryName} (${category.totalProducts})`;

            // Use handleClick with correct parameters
            handleClick(prodTypeName, categoryDiv);
            categoryName.addEventListener('click', async (e) => {
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
            // subCategoryDiv.style.display = 'none';

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

    // Create a new container div for product content


    listProducts.data.data.forEach(prods => {

        const productContentDiv = document.createElement('div');
        productContentDiv.className = 'product-content-div';
        toggleBookmark(productContentDiv)

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
        productDiv.appendChild(productCost)
        productDiv.appendChild(productSizeInfo)


        productDiv.appendChild(productTitle)
        productDiv.appendChild(productLocation)
        // productDiv.appendChild(contactInfo)


        const productDetailUrl = window.location.origin + '/customer/product/detail?prodId=' + prods.prodId
        imgHref.href = productDetailUrl

        // Append each productDiv to the productContentDiv
        productContentDiv.appendChild(productDiv);

        // Append the productContentDiv to the listProductsDiv
        listProductsDiv.appendChild(productContentDiv);

        // Create a button outside the productContentDiv
        // const button = document.createElement('button')
        // button.className = 'book-button'
        // button.innerText = 'Add to list'
        // productContentDiv.appendChild(button);
    });


}


async function getProductDetail() {
    const searchParams = new URL(document.location.href);
    const prodId = searchParams.searchParams.get('prodId');
    const apiUrl = new URL(`http://localhost:3000/listProducts/${prodId}`);

    try {
        const response = await axios.get(apiUrl);
        console.log(response)
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



//   const scrollContainer = document.querySelector('#listProducts');
//   let currentIndex = 0;

//   function scrollItems(direction) {
//     const itemWidth = document.querySelector('.product-content-div').offsetWidth;
//     const containerWidth = scrollContainer.offsetWidth;

//     if (direction === 'next' && currentIndex < scrollContainer.children.length - 1) {
//       currentIndex++;
//     } else if (direction === 'prev' && currentIndex > 0) {
//       currentIndex--;
//     }

//     const transformValue = -currentIndex * itemWidth + "px";
//     scrollContainer.style.transform = `translateX(${transformValue})`;
//   }

  
