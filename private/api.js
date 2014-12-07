var css = document.createElement("style");
css.type = "text/css";
css.innerHTML =" #zeema-no-agree-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: 20px 20px; border-top: 6px solid #F85E5E; background-color: #fff; } #zeema-no-agree-bar { color: rgb(51, 51, 51); display: block; font-family: 'Arial', sans-serif; font-size: 16px; line-height: 26px; } #zeema-revice-now { margin-left: 10px; font-size: 14px; line-height: 24px; font-weight: bold; padding: 5px 10px 5px 10px; background-color: #FFE1D2; border: 1px solid #E0AAAA; text-decoration: none; color: #222; cursor: pointer; border-radius: 3px; } #zeema-revice-now:hover { opacity: 0.8; } #zeema-hide { position: absolute; right: 20px; top: 25px; border: 0; background-color: #fff; padding: 0px; color: #111; font-size: 16px; cursor: pointer; } #zeema-hide:hover { opacity: 0.8;} #zeema-badge { position:fixed; bottom:10px; left:10px; width:50px; height:50px; z-index:10; cursor: pointer;} .zeema-error-badge {  background: url('<%= rootUrl %>/notverified.svg'); background-size: 50px 50px; } .zeema-ok-badge {  background: url('<%= rootUrl %>/verified.svg'); background-size: 50px 50px; } ";
document.body.appendChild(css);
Zeema = {};
Zeema.check = function(appId,email,url){
  url = typeof url !== 'undefined' ? url : "<%= rootUrl %>";
  
  Zeema.url = url;
  Zeema.appId = appId;
  Zeema.email = email;

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url+"/check?appId="+appId+"&email="+email+"&callback=_zeema_check&ts=" + Date.now();
  document.body.appendChild(script);
}
Zeema._hide = function(){
  createCookie('zeema','hide');
  var zeema_div = document.getElementById('zeema-no-agree-bar');
  zeema_div.style.display= 'none';
  zeema_icon_error = document.getElementById('zeema-badge');
  zeema_icon_error.style.display= 'block';
}
Zeema._show = function(){
  createCookie('zeema','show');
  var zeema_div = document.getElementById('zeema-no-agree-bar');
  zeema_div.style.display= 'block';
  zeema_icon_error = document.getElementById('zeema-badge');
  zeema_icon_error.style.display ='none';
}

Zeema._revice = function(){
  document.location.href=Zeema.url+'/user/manage?appId='+Zeema.appId+'&email='+Zeema.email;
}
Zeema._showBadge = function(name,visible){
  visible = typeof visible !== 'undefined' ? visible : 'true';
  var zeema_badge = document.createElement('div');
  zeema_badge.id = 'zeema-badge';
  zeema_badge.onclick=Zeema._show;
  if(visible==='false'){zeema_badge.style.display ='none';}
  zeema_badge.className = 'zeema-'+name+'-badge';
  document.body.appendChild(zeema_badge);
}
Zeema._showHideButton = function(){
  zeema_div =document.getElementById('zeema-no-agree-bar');
  zeema_hide = document.createElement('div');
  zeema_hide.id = 'zeema-hide';
  zeema_hide.onclick=Zeema._hide;
  zeema_hide.innerHTML+= "x";
  zeema_div.appendChild(zeema_hide);
}

window._zeema_check = function(payload){
  var isHide =readCookie('zeema');
  if(isHide==null){ createCookie('zeema','show');}
  if (payload && payload.status=='OK') {
    Zeema._showBadge('ok');

    var zeema_div = document.createElement('div');
    zeema_div.id = 'zeema-no-agree-bar';
    zeema_div.style.borderTop= '6px solid #27ae60';
    document.body.appendChild(zeema_div);
    var zeema_text = document.createElement('span');
    zeema_text.id = 'zeema-no-agree-text';
    zeema_text.innerHTML += "You <b>agree</b> with <b> all</b> terms of " + payload.appName;
    zeema_div.style.display='none';
    zeema_div.appendChild(zeema_text);

    var zeema_btn = document.createElement('button');
    zeema_btn.id = 'zeema-revice-now';
    zeema_btn.style.backgroundColor= '#2ecc71';
    zeema_btn.onclick=Zeema._revice;
    zeema_btn.innerHTML += "Manage Terms";
    zeema_div.appendChild(zeema_btn);

    Zeema._showHideButton();

  }else if(payload && payload.status == 'NOT_OK' && isHide == 'show'){
    Zeema._showBadge('error','false');

    var zeema_div = document.createElement('div');
    zeema_div.id = 'zeema-no-agree-bar';
    document.body.appendChild(zeema_div);
    var zeema_text = document.createElement('span');
    zeema_text.id = 'zeema-no-agree-text';
    zeema_text.innerHTML += "You <b>don’t</b> agree with <b>"+payload.countNotAgreedTerms.length+"</b> terms of " + payload.appName;
    zeema_div.appendChild(zeema_text);

    var zeema_btn = document.createElement('button');
    zeema_btn.id = 'zeema-revice-now';
    zeema_btn.onclick=Zeema._revice;
    zeema_btn.innerHTML += "Manage Terms";
    zeema_div.appendChild(zeema_btn);

    Zeema._showHideButton();


  }else if(payload && payload.status == 'NOT_OK' && isHide == 'hide'){
    Zeema._showBadge('error');

    var zeema_div = document.createElement('div');
    zeema_div.id = 'zeema-no-agree-bar';
    document.body.appendChild(zeema_div);
    var zeema_text = document.createElement('span');
    zeema_text.id = 'zeema-no-agree-text';
    zeema_text.innerHTML += "You <b>don’t</b> agree with <b>"+payload.countNotAgreedTerms.length+"</b> terms of " + payload.appName;
    zeema_div.style.display='none';
    zeema_div.appendChild(zeema_text);

    Zeema._showHideButton();


  }
}

function createCookie(name,value) {
  var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
