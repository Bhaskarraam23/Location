import axios from "axios";

// async function fetchLocation({lat, long}:any) {
    async function fetchLocation(latitude:any, longitude:any) {  
    try {
        const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${latitude}&lon=${longitude}&format=json`);           
        // const { data } = response;
        // console.log("respone",data.display_name) 
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