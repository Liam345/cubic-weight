# Average Cubic-weight web app

The application logs the Average cubic weight of all the Air Conditioners
from the list of products in the paginated API.
The first endpoint of the API is /api/products/1
The response of the API call is a data and the next endpoint.
The application makes a call to subsequent endpoints and filters products with category Air Conditioners until the next endpoint is null i.e. its the last page.

Assumption : Average cubic weight is calculated by

1. Multiply all the dimensions (width, length, height)
2. Since, these dimensions are in cm^3 we convert to m^3 by division of 100^3.
   In, addition to calculate cubic weight we multiply by 250.
   Hence, 250/100^3 = 4000
   We divide, the result in 1) by 4000.
   We get the Cubic weight of a product in m^3
3. We sum the cubic weights of all the Air Conditioners in m^3 and divide it by the numer of Air Conditioners to find the Average cubic weight.

## Installation and Run

To run this project in your command line

1. Clone the repository in your local filesystem
   ### `git clone <repourl>`
2. Navigate to the folder you cloned
   ### `cd cubic-weight`
3. Install dependency modules
   ### `npm install`
4. Navigate to the dist directory. The directory contatins a js file and a html file
5. Open the index.html file in your preferred browser.
