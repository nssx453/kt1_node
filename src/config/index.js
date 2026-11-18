const dotenv =  require("dotenv");
const path = require('path');

dotenv.config()

module.exports ={
   inputfile: process.env.INPUT_FILE,
   outputfile: process.env.OUTPUT_FILE,
   minage:Number(process.env.MIN_AGE),
   cityfilter:process.env.CITY_FILTER
}
