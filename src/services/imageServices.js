//Setti fastana hérna til að föllin væru læsilegri
const ENDPOINT = 'https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&q=';
const KEY = 'AIzaSyCefJfjoi6Qx4o9UL7ruz8gaQ_MH71e7Ck';

//Sækir fyrstu síðu gagna eftir leitarorði. Skilar bara myndasafninu(json.items).
export const getImages = async (keyword) => {
    if(typeof keyword !== 'undefined' && keyword != ''){
        const endpointToFetch = ENDPOINT+keyword.toString()+'&searchType=image&key='+KEY;
        const response = await fetch(endpointToFetch);
        const json = await response.json();
        return json.items;
    }
};

//Sækir viðeigandi síðu gagna eftir leitarorði. Tekur við byrjunarpunkti og bætir við parametrana í requestið.
//Skilar bara myndasafninu(json.items).
export const getImagesByPage = async (keyword, pageNr) => {
    if(typeof keyword !== 'undefined' && keyword != ''){
        const pageNrString = '&start='+pageNr;
        const endpointToFetch = ENDPOINT+keyword.toString()+'&searchType=image&key='+KEY+pageNrString;
        const response = await fetch(endpointToFetch);
        const json = await response.json();
        return json.items;
    }
};