
class Commons {

   copy(data){
       return data;
        return JSON.parse(JSON.stringify(data));
   }

}

export default new Commons();

