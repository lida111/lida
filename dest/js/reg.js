"use strict";var isRight=[0,0,0,0],oUser=$("#userId").first(),oPass=$("#passId").first(),oPass2=$("#pass2Id").first(),oBtnReg=$("#btnReg").first();function isUser(){/^[_a-zA-Z]\w{5,15}$/.test(oUser.val())?(isRight[0]=1,oUser.next().text("√")):(isRight[0]=0,oUser.next().text("×,用户名格式错误"))}function hasUser(){$.ajax({method:"get",url:"../interface/isreg.php",dataType:"json",data:{username:oUser.val()}}).then(function(s){"0"==s.code?(isRight[3]=0,oUser.next().html("已存在的用户名")):"1"==s.code&&(isRight[3]=1,oUser.next().html("可使用的用户名"))})}function isPass(){/^[\da-zA-Z]{6,16}$/.test(oPass.val())?(isRight[1]=1,oPass.next().html("√")):(isRight[1]=0,oPass.next().html("×，请输入正确的密码格式"))}function isPass2(){if(!/^[\da-zA-Z]{6,16}$/.test(oPass2.val()))return isRight[2]=0,void oPass2.next().html("×，请输入正确的密码格式");isRight[2]=1,oPass2.next().html("√"),oPass2.val()==oPass.val()?(isRight[2]=1,oPass2.next().html("√")):(isRight[2]=0,oPass2.next().html("×，两次密码不一致"))}oUser.blur(function(){isUser(),1==isRight[0]&&hasUser()}),oPass.blur(function(){isPass()}),oPass.change(function(){isRight[2]=0,oPass2.val()&&isPass2()}),oPass2.blur(function(){isPass2()}),oBtnReg.click(function(){var t=0;isRight.forEach(function(s){t+=s}),4==t?$.ajax({method:"post",url:"../interface/reg.php",dataType:"json",data:{username:oUser.val(),password:oPass.val()}}).then(function(s){"1"==s.code?(alert("注册成功，正在调转登录页面"),setTimeout(function(){window.location.href="../pages/login.html"},2e3)):"0"==s.code&&alert("注册失败，服务器出了问题 请稍后重试")}):alert("你填写的信息不完整，请填写完整")});