const filteredArr = [];
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com";
const startEndpoint = "/api/products/1";
const baseUrl = proxyUrl + targetUrl;
const allowed = "Air Conditioners";

function filterByItem(raw) {
  const filtered = raw.objects.filter(value => value.category === allowed);
  filteredArr.push(...filtered);
}

const cWtReducer = (total, cur) =>
  total + cur.size.width * cur.size.length * cur.size.height / 4000;

function calculateCubicWeight() {
  const totalCubicWeight = filteredArr.reduce(cWtReducer, 0);
  const totalItems = filteredArr.length;
  const avgCubicWeight = totalCubicWeight / totalItems;
  console.log(`Average cubic weight of ${allowed} is ${avgCubicWeight}`);
}

async function fetchProducts(endpoint) {
  const response = await fetch(baseUrl + endpoint);
  const data = await response.json();
  filterByItem(data);
  if (data.next != null) {
    fetchProducts(data.next);
  } else {
    calculateCubicWeight();
  }
}

fetchProducts(startEndpoint);
