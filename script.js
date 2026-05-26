// LOAD DATABASE

let database = JSON.parse(localStorage.getItem("ajraDatabase")) || [];

// LOADING SCREEN

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 3000);
});

// ELEMENT

const searchBtn = document.getElementById("searchBtn");

const searchInput = document.getElementById("searchInput");

const searchLoading = document.getElementById("searchLoading");

const resultBox = document.getElementById("resultBox");

function normalize(text) {
  return String(text || "")
    .trim()
    .toLowerCase();
}

function formatDate(value){

if(!value) return "-";



// HANDLE EXCEL SERIAL DATE

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



// HANDLE NORMAL DATE STRING

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



// FALLBACK

return value;

}

// SEARCH FUNCTION

function searchData() {
  const keyword = normalize(searchInput.value);

  if (keyword === "") {
    alert("Masukkan IGG ID / CUSTOMER");

    return;
  }

  resultBox.style.display = "none";

  searchLoading.style.display = "block";

  setTimeout(() => {
    searchLoading.style.display = "none";

    const found = database.find((item) => {
      const igg = normalize(item["IGG ID"]);

      const customer = normalize(item["CUSTOMER"]);

      return igg.includes(keyword) || customer.includes(keyword);
    });

    if (found) {
      resultBox.innerHTML = `

<div class="card">

<p>
<strong>IGG ID :</strong>
${found["IGG ID"] || "-"}
</p>

<p>
<strong>USERNAME :</strong>
${found["USERNAME"] || "-"}
</p>

<p>
<strong>CUSTOMER :</strong>
${found["CUSTOMER"] || "-"}
</p>

<p>
<strong>EXPIRED :</strong>
${formatDate(found["Expired"])}
</p>

<p>
<strong>SISA HARI :</strong>
${found["Sisa Hari"] || "-"}
</p>

<p>
<strong>STATUS :</strong>
${found["Status"] || "-"}
</p>

</div>

`;

      resultBox.style.display = "block";
    } else {
      resultBox.innerHTML = `

<div class="card">

<h2 style="
text-align:center;
color:#ff9090;
">

Data Tidak Ditemukan

</h2>

</div>

`;

      resultBox.style.display = "block";
    }
  }, 1500);
}

// BUTTON

searchBtn.addEventListener("click", searchData);

// ENTER SEARCH

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchData();
  }
});
