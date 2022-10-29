import axios from "axios";

async function fetchLocation(lat: any, long:any) {  
    try {
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${lat}&lon=${long}&format=json`);           
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return '404';
        }else{
            return "404"
        }
    }
}

export default fetchLocation;