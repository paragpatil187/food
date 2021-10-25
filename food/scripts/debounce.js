
function debounce(food_name,searchresult, showresult){
    
    
    
        if(timerId){
            clearTimeout(timerId);
        }
    
        timerId = setTimeout(()=>{
    
            main(food_name,searchresult, showresult)
            
        }, 1000);
    
    }
    
    async function Search_food(food_name){
    

    
            
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food_name}`);
            let data = await res.json();
            console.log('data:', data)
            return data;
    
        
    
    }
    
    
    var timerId;
        async function main(food_name, searchresult, showresult){

            
            if(food_name.length < 3){
                return false;
            }
    
            let res = await Search_food(food_name);
            console.log('res:', res)
    
            let foods_data = res.meals;
            append_food(foods_data, searchresult, showresult);
    
        }
    
        function append_food(food_list, searchresult, showresult){
    
         for(let key in food_list ){
    
            if(food_list[key]===undefined){
                return false;
            }
    
            // food_list[key].forEach(function(food) {
    
                let each_div = document.createElement("div");
                    each_div.setAttribute("class", "each-div");
    
                let img = document.createElement("img");
                    img.src = food_list[key].strMealThumb;
    
                let details_div = document.createElement("div");
                    details_div.setAttribute("class", "details-div")
                
                let name=document.createElement("p")
                    name.innerText = "Name : " + food_list[key].strCategory;
    
                let category=document.createElement("p")
                    category.innerText = "Category : " + food_list[key].strArea;
    
                details_div.append(name, category)
                // console.log('details_div:', details_div)
    
                each_div.append(img, details_div);
    
                searchresult.append(each_div);
    
                each_div.onclick = function() {
    
                    
                    where_to_append.style.display = "none";
    
                    let instruction = document.createElement("p");
                        instruction.innerText = food_list[key].strInstructions;
                        
                    details_div.append(instruction)
    
                    goto_div.append(img, details_div)
    
                }
        
    
         }
    
            
    
        }
    
    
    
    export { debounce }