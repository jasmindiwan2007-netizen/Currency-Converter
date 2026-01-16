url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

         
dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".From select");
const toCurr=document.querySelector(".To select");
const msg=document.querySelector("#msg");

for (let select of dropdowns){
    for (Currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=Currcode;
    newOption.value=Currcode;
    if (select.name=="from" && Currcode=="USD"){
        newOption.selected="selected";
    }
    else if (select.name=="to" && Currcode=="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{

        updateFlag(evt.target);
  
    });
}

const updateExchangeRate = async () =>{
let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if (amtVal==="" || amtVal<1){
        amtVal.value=1;
        amount.value="1";
    }

    //  console.log(fromCurr.value,toCurr.value);
    const base_url = `${url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(base_url); 
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    finalamt=amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalamt} ${toCurr.value}`;
}

const updateFlag =(element) =>{
  let Currcode=element.value;
  let Countrycode=countryList[Currcode];
   let newSrc=`https://flagsapi.com/${Countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})