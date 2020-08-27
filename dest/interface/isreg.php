<?php

$username = $_GET['username'];

//2 连接数据库
$conn = mysqli_connect('localhost','root','root','music');

//3 书写SQL语句
$sql = "SELECT * FROM `user` WHERE `username`='$username'";

//4 执行SQL语句
$result = mysqli_query($conn,$sql);

//5 解析查询结果
$data = mysqli_fetch_assoc($result);

if($data){
    // 如果查询到,说明该用户已经存在于数据库,无法注册了
    $arr = array('code'=>0);
}else{
    $arr = array('code'=>1);
}
//6 给前端返回json数据
echo json_encode($arr);

//7 测试接口


?>