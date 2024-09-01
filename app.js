let url="https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn=document.querySelector("button");

btn.addEventListener("click",async()=>{
    let inp=document.querySelector("input");
    let head=document.querySelector(".word");
    let txt=document.querySelector(".text");
    let word=inp.value;
    txt.innerHTML="";
    head.innerHTML="<u>"+word.toUpperCase()+"<u>";
    await wordDetail(url+word);
})

async function wordDetail(url){
    try{
        let p=document.querySelector(".text");
        let res=await axios.get(url);
        let arr=res.data;
        arr.forEach(ele => {
            let meanarr=ele.meanings;
            meanarr.forEach((details)=>{
                let subTitle=document.createElement("h3");
                let div=document.createElement("p");
                div.setAttribute("class","defination");
                subTitle.setAttribute("class","sub-title");
                p.append(subTitle);
                p.append(div);
                subTitle.innerHTML=details.partOfSpeech.toUpperCase()+"<br><br>";
                let definearr=details.definitions;
                if(definearr.length>=4){
                    let count=1;
                    for(let i=0;i<=2;i++){
                        let obj=definearr[i];
                        div.innerHTML+=count+". "+(obj.definition+"<br><br>");
                        count++;
                    }    
                }else{
                        let count=1;
                        definearr.forEach((para)=>{
                            div.innerHTML+=count+". "+para.definition+"<br><br>";
                            count++;
                        })
                    }
            })
        });
    }
    catch(err){
        let p=document.querySelector(".text");
        p.innerHTML="No defination Found , Not uddated in our system!";
        console.log("Error Occured");
        return ("Not Found in Dictionary");
    }
}