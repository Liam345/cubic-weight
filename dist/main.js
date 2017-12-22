'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var filteredArr = [];
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var targetUrl = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';
var startEndpoint = '/api/products/1';
var baseUrl = proxyUrl + targetUrl;
var allowed = 'Air Conditioners';

function filterByItem(raw) {
  var filtered = raw.objects.filter(function (value) {
    return value.category === allowed;
  });
  filteredArr.push.apply(filteredArr, _toConsumableArray(filtered));
}

async function fetchProducts(baseUrl, endpoint) {
  var response = await fetch(baseUrl + endpoint);
  var data = await response.json();
  filterByItem(data);
  if (data.next != null) {
    fetchProducts(baseUrl, data.next);
  } else {
    calculateCubicWeight();
    return;
  }
}

function calculateCubicWeight() {
  var totalCubicWeight = filteredArr.reduce(function (total, cur) {
    return total + cur.size.width * cur.size.length * cur.size.height / 4000;
  }, 0);
  var totalItems = filteredArr.length;
  var avgCubicWeight = totalCubicWeight / totalItems;
  console.log('Average cubic weight of ' + allowed + ' is ' + avgCubicWeight);
}

fetchProducts(baseUrl, startEndpoint);