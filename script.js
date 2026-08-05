let chart = null;
let telugu = false;

function calculateExpense() {

const seed = Number(document.getElementById("seed").value) || 0;
const fert = Number(document.getElementById("fert").value) || 0;
const labour = Number(document.getElementById("labour").value) || 0;
const pesticide = Number(document.getElementById("pesticide").value) || 0;
const irrigation = Number(document.getElementById("irrigation").value) || 0;
const tractor = Number(document.getElementById("tractor").value) || 0;
const diesel = Number(document.getElementById("diesel").value) || 0;
const other = Number(document.getElementById("other").value) || 0;

const acres = Number(document.getElementById("acres").value) || 1;
const yieldQty = Number(document.getElementById("yield").value) || 0;
const price = Number(document.getElementById("price").value) || 0;

const totalExpense =
seed + fert + labour + pesticide +
irrigation + tractor + diesel + other;

const totalIncome = yieldQty * price;
const perAcre = totalExpense / acres;
const profitLoss = totalIncome - totalExpense;

document.getElementById("expenseCard").textContent =
"₹ " + totalExpense.toLocaleString();

document.getElementById("incomeCard").textContent =
"₹ " + totalIncome.toLocaleString();

document.getElementById("profitCard").textContent =
"₹ " + profitLoss.toLocaleString();

document.getElementById("acreCard").textContent =
"₹ " + perAcre.toFixed(2);

const color = profitLoss >= 0 ? "green" : "red";

document.getElementById("reportSection").innerHTML = `
<h2 style="text-align:center;color:green">
🌾 Smart Farmer Expense Report
</h2>
<hr>

<p><b>Total Expense :</b> ₹ ${totalExpense.toLocaleString()}</p>

<p><b>Cost Per Acre :</b> ₹ ${perAcre.toFixed(2)}</p>

<p><b>Total Income :</b> ₹ ${totalIncome.toLocaleString()}</p>

<p style="color:${color};font-weight:bold;">
<b>Profit / Loss :</b> ₹ ${profitLoss.toLocaleString()}
</p>
`;

drawChart(
seed,
fert,
labour,
pesticide,
irrigation,
tractor,
diesel,
other
);

saveData();

}

function drawChart(
seed,
fert,
labour,
pesticide,
irrigation,
tractor,
diesel,
other
){

if(chart){
chart.destroy();
}

const ctx =
document.getElementById("expenseChart").getContext("2d");

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
responsive:true,
plugins:{
legend:{
position:"bottom"
}
}
}
});

}

function printReport(){

const farmer=document.getElementById("farmerName").value || "N/A";
const village=document.getElementById("village").value || "N/A";
const crop=document.getElementById("crop").value || "N/A";
const date=document.getElementById("date").value || "N/A";

const report=document.getElementById("reportSection").innerHTML;

const printWindow=window.open("","","width=900,height=700");

printWindow.document.write(`
<html>
<head>
<title>Farmer Report</title>

<style>

body{
font-family:Arial,sans-serif;
padding:20px;
}

h1{
color:green;
text-align:center;
}

table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}

table,th,td{
border:1px solid #333;
}

th,td{
padding:8px;
text-align:left;
}

.report{
margin-top:20px;
padding:15px;
border:1px solid green;
border-radius:8px;
}

</style>

</head>

<body>

<h1>🌾 Smart Farmer Expense Report</h1>

<table>

<tr>
<th>Farmer Name</th>
<td>${farmer}</td>
</tr>

<tr>
<th>Village</th>
<td>${village}</td>
</tr>

<tr>
<th>Crop</th>
<td>${crop}</td>
</tr>

<tr>
<th>Date</th>
<td>${date}</td>
</tr>

</table>

<div class="report">

${report}

</div>

</body>

</html>
`);

printWindow.document.close();
printWindow.focus();
printWindow.print();

}

function downloadPDF(){

const report = `
<h1>Farmer Expense Report</h1>

<p>Total Expense : ${document.getElementById("expenseCard").textContent}</p>

<p>Total Income : ${document.getElementById("incomeCard").textContent}</p>

<p>Profit / Loss : ${document.getElementById("profitCard").textContent}</p>

<p>Cost Per Acre : ${document.getElementById("acreCard").textContent}</p>
`;

const div = document.createElement("div");
div.innerHTML = report;

html2pdf().from(div).save("Farmer_Expense_Report.pdf");

}

function saveData(){

const ids=[
"farmerName",
"village",
"crop",
"date",
"acres",
"seed",
"fert",
"labour",
"pesticide",
"irrigation",
"tractor",
"diesel",
"other",
"yield",
"price"
];

ids.forEach(id=>{

const el=document.getElementById(id);

if(el){

localStorage.setItem(id,el.value);

}

});

}

function loadData(){

const ids=[
"farmerName",
"village",
"crop",
"date",
"acres",
"seed",
"fert",
"labour",
"pesticide",
"irrigation",
"tractor",
"diesel",
"other",
"yield",
"price"
];

ids.forEach(id=>{

const value=localStorage.getItem(id);

const el=document.getElementById(id);

if(el && value!==null){

el.value=value;

}

});

}

function resetForm(){

if(!confirm("Are you sure you want to reset all data?")){
return;
}

const ids=[
"farmerName",
"village",
"crop",
"date",
"acres",
"seed",
"fert",
"labour",
"pesticide",
"irrigation",
"tractor",
"diesel",
"other",
"yield",
"price"
];

ids.forEach(id=>{
const el=document.getElementById(id);
if(el){
el.value="";
}
});

document.getElementById("crop").selectedIndex=0;

document.getElementById("reportSection").innerHTML=`
<h2>🌾 Smart Farmer Expense Report</h2>
<p>Total Expense : ₹0</p>
`;

document.getElementById("expenseCard").textContent="₹0";
document.getElementById("incomeCard").textContent="₹0";
document.getElementById("profitCard").textContent="₹0";
document.getElementById("acreCard").textContent="₹0";

localStorage.clear();

if(chart){
chart.destroy();
chart=null;
}

}

function changeLanguage(){

telugu=!telugu;

const labels=document.querySelectorAll("label");

if(telugu){

document.getElementById("langBtn").textContent="🌐 English";
document.getElementById("title").textContent="🌾 స్మార్ట్ రైతు ఖర్చుల కాలిక్యులేటర్";

labels[0].textContent="రైతు పేరు";
labels[1].textContent="గ్రామం";
labels[2].textContent="పంట పేరు";
labels[3].textContent="మొత్తం ఎకరాలు";
labels[4].textContent="తేదీ";
labels[5].textContent="విత్తనాల ఖర్చు";
labels[6].textContent="ఎరువుల ఖర్చు";
labels[7].textContent="కూలీల ఖర్చు";
labels[8].textContent="పురుగుమందుల ఖర్చు";
labels[9].textContent="నీటి ఖర్చు";
labels[10].textContent="ట్రాక్టర్ ఖర్చు";
labels[11].textContent="డీజిల్ ఖర్చు";
labels[12].textContent="ఇతర ఖర్చులు";
labels[13].textContent="మొత్తం దిగుబడి";
labels[14].textContent="క్వింటాల్ ధర";

}else{

document.getElementById("langBtn").textContent="🌐 తెలుగు";
document.getElementById("title").textContent="🌾 Smart Farmer Expense Manager";

labels[0].textContent="Farmer Name";
labels[1].textContent="Village";
labels[2].textContent="Crop Name";
labels[3].textContent="Total Acres";
labels[4].textContent="Date";
labels[5].textContent="Seed Cost";
labels[6].textContent="Fertilizer Cost";
labels[7].textContent="Labour Cost";
labels[8].textContent="Pesticide Cost";
labels[9].textContent="Irrigation Cost";
labels[10].textContent="Tractor Cost";
labels[11].textContent="Diesel Cost";
labels[12].textContent="Other Expenses";
labels[13].textContent="Total Yield (Quintals)";
labels[14].textContent="Price Per Quintal";

}

}

window.onload=function(){

loadData();

};
