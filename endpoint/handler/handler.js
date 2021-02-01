//const axios = require('axios').default
const fetch = require("node-fetch");

async function getDatos(){
  const url = 'https://restcountries.eu/rest/v2/all'
  const response = await fetch(url)
  const resul = await response.json();
  return resul
}

const search = async (filters = {}) => {
  console.log(filters);
  const dataCountries = await getDatos();
  const dataRegions = dataCountries.filter(regions => {
    return regions.region === filters.region
  })
  const peopleIni = (filters.from - 1)
  const peopleFin = (filters.to + 1)
  const dataPopulation = dataRegions.filter(population => {
    return (population.population > peopleIni && population.population < peopleFin)
  })
  let lSort = 'asc';
  if (filters.sort) {
    lSort = filters.sort.name
  }
  const sorting = lSort;

  const dataSort = getSort(dataPopulation,sorting);
  const initalPage = (filters.pageNumber - 1) * filters.pageSize;
  const finalPage = filters.pageNumber * filters.pageSize;

  console.log(`initalPage: ${initalPage}`)
  console.log(`finalPage: ${finalPage}`)
  const dataPaginacion = dataSort.slice(initalPage, finalPage);

  return dataPaginacion;
};

const getSort = (data,value) =>{
  return data.sort(function(a,b){

    if (value === "asc") {
      return ((a['name'] < b['name'])?-1:(a['name'] > b['name'])? 1 : 0)
    }

    if (value === "desc") {
      return ((a['name'] > b['name'])?-1:(a['name'] < b['name'])? 1 : 0)
    }

  });
}

const handlerModule = {
  search,
};


module.exports = handlerModule;
