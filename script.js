const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
// Menu mobile
$("#menuBtn").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$$('#nav a').forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
// Theme
$("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");$("#themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"});
// Checklist
const checks=$$('#checklist input');function updateChecks(){let n=checks.filter(x=>x.checked).length;$("#count").textContent=`${n}/5 mục hoàn thành`;$("#percent").textContent=Math.round(n/5*100)+"%";$("#bar").style.width=(n/5*100)+"%"}checks.forEach(x=>x.addEventListener("change",updateChecks));
// Filter/search signs
let filter="all";function filterSigns(){let q=$("#search").value.toLocaleLowerCase("vi");$$(".sign").forEach(s=>s.hidden=!(filter==="all"||s.dataset.type===filter)||!s.dataset.name.toLocaleLowerCase("vi").includes(q))}
$$(".filters button").forEach(b=>b.addEventListener("click",()=>{$$(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;filterSigns()}));$("#search").addEventListener("input",filterSigns);
// Sign detail modal
$$(".sign").forEach(s=>s.addEventListener("click",()=>{$("#modalTitle").textContent=s.dataset.name;$("#modalDesc").textContent=s.dataset.desc;$("#modal").classList.add("open")}));$$("[data-close]").forEach(x=>x.addEventListener("click",()=>$("#modal").classList.remove("open")));document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#modal").classList.remove("open")});
// Quiz
const qs=[
["Khi đèn tín hiệu giao thông chuyển sang màu đỏ, bạn cần làm gì?",["Tăng tốc để đi qua nhanh","Dừng lại trước vạch dừng","Bấm còi xin đường"],1,"Đèn đỏ là tín hiệu phải dừng lại. Hãy dừng trước vạch dừng và chờ tín hiệu được phép đi."],
["Khi đi xe máy hoặc xe máy điện, hành động nào giúp bảo vệ bạn?",["Đội mũ bảo hiểm và cài quai đúng cách","Chỉ đội mũ khi đi xa","Đội mũ nhưng không cần cài quai"],0,"Mũ bảo hiểm cần phù hợp, đạt chuẩn và được cài quai đúng cách."],
["Khi muốn sang đường tại nơi có vạch dành cho người đi bộ, bạn nên làm gì?",["Chạy thật nhanh qua đường","Quan sát, tuân theo tín hiệu và đi đúng vạch","Vừa đi vừa nhìn điện thoại"],1,"Hãy quan sát, tuân theo đèn tín hiệu (nếu có) và đi trong phạm vi vạch sang đường."],
["Khi đang điều khiển phương tiện, bạn cần sử dụng điện thoại như thế nào?",["Cầm điện thoại để xem bản đồ","Nhắn tin khi đường vắng","Không cầm, sử dụng điện thoại khi đang điều khiển xe"],2,"Sử dụng điện thoại làm giảm sự tập trung. Hãy dừng xe ở nơi an toàn trước khi thao tác."],
["Khi gặp người đi bộ đang qua đường tại nơi có vạch sang đường, bạn nên làm gì?",["Giảm tốc độ, nhường đường theo quy định","Bấm còi liên tục","Lách nhanh qua trước"],0,"Tôn trọng người đi bộ, giảm tốc độ và nhường đường theo quy định."]
];let qi=0,score=0,chosen=false;
function render(){let q=qs[qi];chosen=false;$("#step").textContent=`CÂU HỎI ${String(qi+1).padStart(2,"0")} / 05`;$("#score").textContent=score;$("#qbar").style.width=(qi/5*100)+"%";$("#question").textContent=q[0];$("#feedback").textContent="Chọn một đáp án để tiếp tục.";$("#next").disabled=true;$("#next").textContent=qi===4?"Xem kết quả →":"Tiếp theo →";$("#answers").innerHTML="";q[1].forEach((a,i)=>{let b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+". "+a;b.addEventListener("click",()=>choose(i));$("#answers").append(b)});$("#answers").hidden=false;$("#question").hidden=false;$(".quizfoot").hidden=false;$("#result").hidden=true}
function choose(i){if(chosen)return;chosen=true;let q=qs[qi];$$(".answer").forEach((b,j)=>{b.disabled=true;if(j===q[2])b.classList.add("correct");else if(j===i)b.classList.add("wrong")});if(i===q[2])score++;$("#score").textContent=score;$("#feedback").textContent=q[3];$("#next").disabled=false}
$("#next").addEventListener("click",()=>{if(!chosen)return;if(qi<4){qi++;render()}else{ $("#qbar").style.width="100%";$("#answers").hidden=true;$("#question").hidden=true;$(".quizfoot").hidden=true;$("#result").hidden=false;let msg=score===5?"Xuất sắc! Bạn đã nắm rất tốt các nguyên tắc cơ bản.":score>=3?"Khá tốt! Hãy tiếp tục ôn tập để vững kiến thức hơn.":"Đừng nản lòng! Hãy xem lại kiến thức và thử lại nhé.";$("#result").innerHTML=`<strong>${score}/5</strong><h3>Hoàn thành bài trắc nghiệm!</h3><p>${msg}</p><button id="retry">Làm lại bài kiểm tra ↻</button>`;$("#retry").addEventListener("click",()=>{qi=0;score=0;render()})}});
render();
