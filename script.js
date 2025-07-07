const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
const dropdowns=document.querySelectorAll(".selection select");
const btn=document.querySelector(".rslt");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }       
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/32.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue==="" || amountValue<1){
        amount.value="1"
    }
    exchange();
})

function exchange(){
    const from = document.querySelector(".from select").value.toLowerCase();
    const to = document.querySelector(".to select").value.toLowerCase();
    const url=`${BASE_URL}${from}.json`;

    fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Network response is not ok");
            }
            return response.json();
        })
        .then((data)=>{
            const rate=data[from][to];
            let amount=document.querySelector(".amount input").value;
            let result=(amount*rate).toFixed(2);
            const resultDiv=document.querySelector(".result");
            resultDiv.innerText=`${amount} ${from.toUpperCase()} = ${result} ${to.toUpperCase()}`;
        })
        .catch((error)=>{
            console.error("Error fetching exchange rate");
            document.querySelector(".result").innerText="Error can't fetch exchange rate";
        });
}