const filteredArr = [];
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
const startEndpoint = '/api/products/1';
const baseUrl = proxyUrl + targetUrl;
const allowed = 'Air Conditioners';

function filterByItem(raw) {
  const filtered = raw.objects.filter(function(value) {
    return value.category === allowed;
  });
  filteredArr.push(...filtered);
}

async function fetchProducts(baseUrl,endpoint) {
    const response = await fetch(baseUrl+endpoint);
    const data = await response.json();
    filterByItem(data)
    if(data.next != null){
      fetchProducts(baseUrl,data.next);
    }
    else{
      calculateCubicWeight();
      return;
    }
    }

function calculateCubicWeight(){
  const totalCubicWeight = filteredArr.reduce(function(total,cur){
           return total + (cur.size.width * cur.size.length * cur.size.height / 4000);
  },0);
  const totalItems = filteredArr.length;
  const avgCubicWeight = totalCubicWeight / totalItems;
  console.log(`Average cubic weight of ${allowed} is ${avgCubicWeight}`);
}

fetchProducts(baseUrl,startEndpoint);
