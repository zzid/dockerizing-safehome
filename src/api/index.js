import axios from 'axios';

var keys = require('./keys.json')
const seoul_key = keys['seoul_key']

const baseURL = "https://django-react-safehome.herokuapp.com/api/"

export const fetchCategoryData = async (category) =>{
    try{
        const res = await axios.get(baseURL+category);
        var modifiedData
        if(category ==='crime'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                murder: data.murder,
                robber: data.robber,
                rape: data.rape,
                theft: data.theft,
                violence: data.violence,
                total: data.total,
                arr_total: data.arr_total,
                arrest: data.arrest
            }))
        }
        else if(category ==='population'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                household: data.household,
                total_male: data.total_male,
                total_female: data.total_female,
                total: data.total_total,
                for_male: data.for_male,
                for_female: data.for_female,
            }))
        }
        else if(category === 'fire'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                total: data.fire_damage,
            }))
        }
        else if(category === 'alcohol'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                dead_num: data.dead_num,
                casual_num: data.casual_num,
                total: data.accident_num,
            }))
        }
        else if(category === 'children'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                safe_num : data.safe_num,
                total : data.accident_num
            }))
        }
        else if(category === 'flood'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                total_cost : data.total_cost,
                houses : data.houses,
                buildings : data.buildings,
                public : data.public,
                total : data.people,
            }))
        }
        else if(category === 'house'){
            modifiedData = res.data.map(data=>({
                region_code: data.region_info.region_code,
                region_name: data.region_info.region_name,
                total : data.price
            }))
        }
        return modifiedData;

    } catch (error) { /*  Official, handling error */
        // Error 
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error);
        // return 'Some error occured!'
        throw error
    }
}
export const fetchOneRegionData = async (region) => {
    // const regionCode = region.replace(/([A-Z])/g,'');
    try{
        const res = await axios.get(baseURL + 'rate/' + region)
        const d = res.data
        const modifiedData = {
                region_code : d.region_info.region_code,
                region_name : d.region_info.region_name,
                population : d.population_rate,
                flood_vic : d.flood_vic_rate,
                crime_num : d.crime_num_rate,
                fire_cost : d.fire_cost_rate,
                child_car_num : d.child_car_rate,
                alc_car_num : d.alc_car_rate,
                house_price : d.house_price_rate,
        }
        return modifiedData;
    } catch (e) {
        console.log(e)
    }
    
}

export const fetchRegionDrawData = async() =>{
    try{
        const res = await axios.get(baseURL + 'draw_data/')
        return res.data;
    } catch (e){
        console.log(e)
    }
}
export const fetchNewsData = async () =>{
    try{
        const res = await axios.get(baseURL+'news/')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const fetchTestData = async()=>{
    try{
        const res = await axios.get(`http://openapi.seoul.go.kr:8088/${seoul_key}/json/SPOP_DAILYSUM_JACHI/1/15/`);
        const modData = res.data.SPOP_DAILYSUM_JACHI.row.map((data)=>({
            region_code : "KR" + data.SIGNGU_CODE_SE,
            region_name : data.SIGNGU_NM,
            total : data.TOT_LVPOP_CO,
        }))
        return modData;
    } catch (e) {
        console.log('seoul_err')
    }
}