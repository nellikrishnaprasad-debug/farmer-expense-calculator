<script>
  let chart = null;
function calculateExpense(){

let seed = Number(document.getElementById("seed").value) || 0;
let fert = Number(document.getElementById("fert").value) || 0;
let labour = Number(document.getElementById("labour").value) || 0;
let pesticide = Number(document.getElementById("pesticide").value) || 0;
let irrigation = Number(document.getElementById("irrigation").value) || 0;
let tractor = Number(document.getElementById("tractor").value) || 0;
let diesel = Number(document.getElementById("diesel").value) || 0;
let other = Number(document.getElementById("other").value) || 0;

let acres = Number(document.getElementById("acres").value) || 1;

let totalExpense = seed + fert + labour + pesticide +
irrigation + tractor + diesel + other;

let perAcre = totalExpense / acres;

let totalYield = Number(document.getElementById("yield").value) || 0;
let price = Number(document.getElementById("price").value) || 0;

let totalIncome = totalYield * price;
let profitLoss = totalIncome - totalExpense;

let color = profitLoss >= 0 ? "green" : "red";

document.querySelector(".result").innerHTML = `

<h2 style="text-align:center;color:green;">
🌾 Smart Farmer Expense Report
</h2>

<hr>

<p>Total Expense: ₹ ${totalExpense.toLocaleString()}</p>

<p>Cost Per Acre: ₹ ${perAcre.toFixed(2)}</p>

<p>Total Income: ₹ ${totalIncome.toLocaleString()}</p>

<p style="color:${color};font-weight:bold;">
Profit / Loss: ₹ ${profitLoss.toLocaleString()}
</p>
`;
if(chart){
    chart.destroy();
}

const ctx = document.getElementById("expenseChart").getContext("2d");

chart = new Chart(ctx,{
    type:"pie",
    data:{
        labels:[
            "Seed",
            "Fertilizer",
            "Labour",
            "Pesticide",
            "Irrigation",
            "Tractor",
            "Diesel",
            "Other"
        ],
        datasets:[{
            data:[
                seed,
                fert,
                labour,
                pesticide,
                irrigation,
                tractor,
                diesel,
                other
            ]
        }]
    },
    options:{
        responsive:true
    }
});
  document.getElementById("expenseCard").innerHTML =
"₹ " + totalExpense.toLocaleString();

document.getElementById("incomeCard").innerHTML =
"₹ " + totalIncome.toLocaleString();

document.getElementById("profitCard").innerHTML =
"₹ " + profitLoss.toLocaleString();

document.getElementById("acreCard").innerHTML =
"₹ " + perAcre.toFixed(2);
saveData();

}
function printReport(){

let farmer = document.getElementById("farmerName").value || "N/A";
let village = document.getElementById("village").value || "N/A";
let crop = document.getElementById("crop").value || "N/A";
let date = document.getElementById("date").value || "N/A";

let report = document.querySelector(".result").innerHTML;

let printContent = `
<html>
<head>
<title>Farmer Report</title>

<style>
body{
font-family:Arial;
padding:20px;
}

h1{
text-align:center;
color:green;
}

.box{
border:1px solid #ccc;
padding:15px;
border-radius:10px;
}

</style>
</head>

<body>

<h1>🌾 Smart Farmer Report</h1>

<div class="box">

<h3>Farmer Details</h3>

<p>Farmer Name: ${farmer}</p>
<p>Village: ${village}</p>
<p>Crop: ${crop}</p>
<p>Date: ${date}</p>

<hr>

<h3>Calculation Report</h3>

${report}

</div>

</body>
</html>
`;

let newWindow = window.open();

newWindow.document.write(printContent);

newWindow.document.close();

newWindow.print();

}
  function saveData() {

const ids = [
"farmerName","village","crop","date","acres",
"seed","fert","labour","pesticide",
"irrigation","tractor","diesel","other",
"yield","price"
];

ids.forEach(id=>{
localStorage.setItem(id, document.getElementById(id).value);
});

}

function loadData() {

const ids = [
"farmerName","village","crop","date","acres",
"seed","fert","labour","pesticide",
"irrigation","tractor","diesel","other",
"yield","price"
];

ids.forEach(id=>{
let value = localStorage.getItem(id);
if(value !== null){
document.getElementById(id).value = value;
}
});

}

window.onload = loadData;
  let telugu = false;

function changeLanguage(){

telugu = !telugu;

if(telugu){

document.getElementById("langBtn").innerHTML="🌐 English";

document.querySelector("h1").innerHTML="🌾 స్మార్ట్ రైతు ఖర్చుల కాలిక్యులేటర్";

document.querySelectorAll("label")[0].innerHTML="రైతు పేరు";
document.querySelectorAll("label")[1].innerHTML="గ్రామం";
document.querySelectorAll("label")[2].innerHTML="పంట మొత్తం ఎకరాలు";
document.querySelectorAll("label")[3].innerHTML="తేదీ";

document.querySelectorAll("label")[4].innerHTML="విత్తనాల ఖర్చు";
document.querySelectorAll("label")[5].innerHTML="ఎరువుల ఖర్చు";
document.querySelectorAll("label")[6].innerHTML="కూలీల ఖర్చు";
document.querySelectorAll("label")[7].innerHTML="పురుగుమందుల ఖర్చు";
document.querySelectorAll("label")[8].innerHTML="నీటి ఖర్చు";
document.querySelectorAll("label")[9].innerHTML="ట్రాక్టర్ ఖర్చు";
document.querySelectorAll("label")[10].innerHTML="డీజిల్ ఖర్చు";
document.querySelectorAll("label")[11].innerHTML="ఇతర ఖర్చులు";

document.querySelectorAll("label")[12].innerHTML="మొత్తం దిగుబడి (క్వింటాళ్లు)";
document.querySelectorAll("label")[13].innerHTML="క్వింటాల్ ధర";

}else{

document.getElementById("langBtn").innerHTML="🌐 తెలుగు";

document.querySelector("h1").innerHTML="🌾 Smart Farmer Expense Manager";

document.querySelectorAll("label")[0].innerHTML="Farmer Name";
document.querySelectorAll("label")[1].innerHTML="Village";
document.querySelectorAll("label")[2].innerHTML="Total Acres";
document.querySelectorAll("label")[3].innerHTML="Date";

document.querySelectorAll("label")[4].innerHTML="Seed Cost";
document.querySelectorAll("label")[5].innerHTML="Fertilizer Cost";
document.querySelectorAll("label")[6].innerHTML="Labour Cost";
document.querySelectorAll("label")[7].innerHTML="Pesticide Cost";
document.querySelectorAll("label")[8].innerHTML="Irrigation Cost";
document.querySelectorAll("label")[9].innerHTML="Tractor Cost";
document.querySelectorAll("label")[10].innerHTML="Diesel Cost";
document.querySelectorAll("label")[11].innerHTML="Other Expenses";

document.querySelectorAll("label")[12].innerHTML="Total Yield (Quintals)";
document.querySelectorAll("label")[13].innerHTML="Price Per Quintal";

}

}
</script>
