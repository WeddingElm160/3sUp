import * as cheerio from 'cheerio';


const fetchData = async (upc, supermarket) => {  
  switch (supermarket) {
    case 'Bodega Aurrera':{
      if(upc.length==12)
        upc= '0'+upc
      url =(`https://despensa.bodegaaurrera.com.mx/p/00${upc.slice(0, -1)}`);
      
      const response = await fetch("https://deadpool.instaleap.io/api/v2", {
        "headers": {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
          "accept": "*/*",
          "accept-language": "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
          "apollographql-client-name": "Ecommerce",
          "apollographql-client-version": "3.12.1",
          "content-type": "application/json",
          "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Microsoft Edge\";v=\"114\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "token": "",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": `[{\"operationName\":\"GetProducts\",\"variables\":{\"storeId\":\"565\",\"filter\":{\"sku\":{\"eq\":\"00${upc.slice(0, -1)}\"}},\"variants\":false,\"showProductsWithoutStock\":true},\"query\":\"fragment BaseProductV2 on Product {\\n  id\\n  description\\n  name\\n  brand\\n  photosUrls\\n  sku\\n  unit\\n  price\\n  specialPrice\\n  promotion {\\n    description\\n    type\\n    isActive\\n    conditions\\n    __typename\\n  }\\n  variants {\\n    selectors\\n    productModifications\\n    __typename\\n  }\\n  isAvailable\\n  stock\\n  nutritionalDetails\\n  clickMultiplier\\n  subQty\\n  subUnit\\n  maxQty\\n  minQty\\n  specialMaxQty\\n  ean\\n  boost\\n  showSubUnit\\n  isActive\\n  slug\\n  categoriesPath\\n  categories {\\n    id\\n    name\\n    __typename\\n  }\\n  formats {\\n    format\\n    equivalence\\n    unitEquivalence\\n    minQty\\n    maxQty\\n    __typename\\n  }\\n  tags {\\n    id\\n    tagReference\\n    name\\n    filter\\n    enabled\\n    description\\n    backgroundColor\\n    textColor\\n    __typename\\n  }\\n  __typename\\n}\\n\\nquery GetProducts($pagination: paginationInput, $search: SearchInput, $storeId: ID!, $categoryId: ID, $onlyThisCategory: Boolean, $filter: ProductsFilterInput, $orderBy: productsSortInput, $variants: Boolean, $showProductsWithoutStock: Boolean) {\\n  getProducts(\\n    pagination: $pagination\\n    search: $search\\n    storeId: $storeId\\n    categoryId: $categoryId\\n    onlyThisCategory: $onlyThisCategory\\n    filter: $filter\\n    orderBy: $orderBy\\n    variants: $variants\\n    showProductsWithoutStock: $showProductsWithoutStock\\n  ) {\\n    redirectTo\\n    products {\\n      ...BaseProductV2\\n      __typename\\n    }\\n    paginator {\\n      pages\\n      page\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}]`,
        "method": "POST"
      });
      
      const productData = (await response.json())[0]?.data?.getProducts?.products[0];

      if (!productData) {
        data = {
          statusCode: 404
        }
        break
      }
      data = {
        statusCode: 200,
        body: {
          name: productData.name,
          price: productData.specialPrice? productData.specialPrice : productData.price,
          oldPrice: productData.specialPrice? productData.price : null,
          description: productData.description,
          images: productData.photosUrls
        }
        
      };
    }
    break
    case 'Chedraui':{
      if(upc.length==12)
        upc= upc.slice(1);
      const results = (await (await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyB2-DrsIMb2t473Kc466S-OtDJaTBxkjGo&cx=64b7b1f2799364153&q=%22${upc}_00%22`)).json())?.items;
      
      if (!results) {
        data = {
          statusCode: 404
        }
        break
      }

      url = results[0].link
      const productId = url.slice(-9, -2)

      const response = await fetch("https://www.chedraui.com.mx/api/catalog_system/pub/products/search?fq=productId:"+productId, {
        "headers": {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
          "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Microsoft Edge\";v=\"114\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      const productData = (await response.json())[0];

      data = {
        statusCode: 200,
        body: {
          name: productData.productName,
          price: productData.items[0].sellers[0].commertialOffer.Price,
          oldPrice: productData.items[0].sellers[0].commertialOffer.Price == productData.items[0].sellers[0].commertialOffer.PriceWithoutDiscount? null: productData.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
          description: productData.metaTagDescription,
          images: productData.items[0].images.map(img => img.imageUrl)
        }
        
      };
    }
    break
    case 'Soriana':{

      const results = (await (await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyB2-DrsIMb2t473Kc466S-OtDJaTBxkjGo&cx=e0b119c0184c541b5&q=site:www.soriana.com%20${upc}_A.jpg`)).json())?.items;
      
      if (!results) {
        data = {
          statusCode: 404
        }
        break
      }

      url = results[0].link
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
        },
      });
      
      const $ = cheerio.load(await response.text());
      
      const productData = JSON.parse($('script[type="application/ld+json"]:first').text());
      
      data= {
        statusCode: 200,
        body: {
          name: productData.name,
          price: productData.offers.price,
          oldPrice: $('span.value:first')?.attr("content"),
          description: productData.description,
          images: $('.carousel-item img')?.toArray().map(img => $(img).attr('src').slice(0, -21))
        }
      };
    }
    break
    case 'La Comer':{
      url =(`https://www.lacomer.com.mx/lacomer-api/api/v1/public/articulopasillo/detalleArticulo?artEan=${upc}&noPagina=1&succId=287`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
        },
      });
      
      const productData = await response.json();

      if (!productData.estrucArti) {
        data = {
          statusCode: 404
        }
        break
      }
      //console.log(productData);
      data = {
        statusCode: 200,
        body: {
          name: productData.estrucArti.art_des_com,
          price: productData.estrucArti.artPrven,
          oldPrice: (productData.estrucArti.artPrlin-productData.estrucArti.artPrven)>5?productData.estrucArti.artPrlin:null,
          description: '',
          images: Object.values(productData.estrucArtiImg)
        }
        
      };
    }
    break
    default:
      data = {
        statusCode: 400
      }
  }
  if(data.body){
    data.body.url = url
    data.body.barCode = upc
  }
  //console.log(data);
  return data;
};

export default fetchData;
