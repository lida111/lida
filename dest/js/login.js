"use strict";console.log(1);var oUser=$("#username").first(),oPass=$("#userpass").first();$("#btnLogin").click(function(){console.log(1),console.log(oUser.val()),$.ajax({url:"../interface/login.php",dataType:"json",data:{username:oUser.val(),password:oPass.val()}}).then(function(o){console.log(o),o.code?(alert("登录成功，马上就到首页"),document.cookie="username = ".concat(o.data.username),setTimeout(function(){window.location.href="../pages/index.html"})):0==o.code?alert("你输入的账号密码错误，请重新输入"):alert("服务器出了问题 请稍后重试")})});for(var oATitle=document.getElementsByClassName("on"),oDivContent=document.getElementsByClassName("content"),_loop=function(t){oATitle[t].onclick=function(){for(var o=0;o<oATitle.length;o++)oATitle[o].style.color="#666666";oATitle[t].style.color="#f56600";for(var e=0;e<oDivContent.length;e++)oDivContent[e].style.display="none";oDivContent[t].style.display="block"}},i=0;i<oATitle.length;i++)_loop(i);