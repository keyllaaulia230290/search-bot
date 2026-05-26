function formatDate(value){

if(!value) return "-";



// EXCEL SERIAL NUMBER

if(typeof value === "number"){

const excelDate =
new Date(
(value - 25569) * 86400 * 1000
);

const day =
String(
excelDate.getDate()
).padStart(2,"0");

const month =
String(
excelDate.getMonth()+1
).padStart(2,"0");

const year =
excelDate.getFullYear();

return `${day}/${month}/${year}`;

}



// NORMAL DATE

const normalDate =
new Date(value);

if(!isNaN(normalDate)){

const day =
String(
normalDate.getDate()
).padStart(2,"0");

const month =
String(
normalDate.getMonth()+1
).padStart(2,"0");

const year =
normalDate.getFullYear();

return `${day}/${month}/${year}`;

}



return value;

}

const uploadBtn =
document.getElementById("uploadBtn");

const excelFile =
document.getElementById("excelFile");

const statusBox =
document.getElementById("statusBox");

const tableBody =
document.querySelector(
"#previewTable tbody"
);



// UPLOAD BUTTON

uploadBtn.addEventListener("click",()=>{

const file = excelFile.files[0];

if(!file){

alert(
"Pilih file Excel terlebih dahulu!"
);

return;

}



const reader = new FileReader();



reader.onload = function(event){

try{

const data = new Uint8Array(
event.target.result
);



const workbook = XLSX.read(
data,
{type:'array'}
);



const firstSheet =
workbook.SheetNames[0];



const worksheet =
workbook.Sheets[firstSheet];



const jsonData =
XLSX.utils.sheet_to_json(
worksheet
);



if(jsonData.length===0){

alert(
"Excel kosong!"
);

return;

}



// SAVE DATABASE

localStorage.setItem(
"ajraDatabase",
JSON.stringify(jsonData)
);



// SHOW STATUS

statusBox.innerHTML=`

✅ ${jsonData.length}
data berhasil diupload!

`;



// CLEAR TABLE

tableBody.innerHTML="";



// PREVIEW TABLE

jsonData.forEach(row=>{

tableBody.innerHTML += `

<tr>

<td>${row["IGG ID"]||"-"}</td>

<td>${row["CUSTOMER"]||"-"}</td>

<td>${row["USERNAME"]||"-"}</td>

<td>${formatDate(row["Expired"])}</td>

<td>${row["Sisa Hari"]||"-"}</td>

<td>${row["Status"]||"-"}</td>

</tr>

`;

});



console.log(
"UPLOAD SUCCESS",
jsonData
);

}

catch(error){

console.error(error);

alert(
"Gagal membaca file Excel!"
);

}

};



reader.readAsArrayBuffer(file);

});



// AUTO LOAD DATA

window.addEventListener(
"load",
()=>{

const savedData =
JSON.parse(
localStorage.getItem(
"ajraDatabase"
)
);



if(savedData){

statusBox.innerHTML=`

📂 ${savedData.length}
data tersimpan.

`;



tableBody.innerHTML="";



savedData.forEach(row=>{

tableBody.innerHTML += `

<tr>

<td>${row["IGG ID"]||"-"}</td>

<td>${row["CUSTOMER"]||"-"}</td>

<td>${row["USERNAME"]||"-"}</td>

<td>${formatDate(row["Expired"])}</td>

<td>${row["Sisa Hari"]||"-"}</td>

<td>${row["Status"]||"-"}</td>

</tr>

`;

});

}

}
);