<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width,user-scalable=no"/>
    <link rel="shortcut icon" href="logo.png" type="image/png">
	<title>RPG</title>
</head>
<body style="background: #000;">
    <?php
         $fp = fopen('dat.txt', 'w+');
         fwrite($fp, "dat adasdjall");
         fclose($fp);
     ?>
    <!-- pointJS engine -->
    <script type="text/javascript" src="engine/point.js"></script>

    <!-- Vk API -->
    <script src="https://vk.com/js/api/xd_connection.js?2"  type="text/javascript"></script>
    <script type="text/javascript">
        VK.init(function() { 
           console.log("Connect VK api!");
        }, function() { 
           console.log("No connect Vk api!");
         }, '5.53');
     </script>

    <!-- ========= my scripts ======= -->
    <!-- Init vars in script -->
    <script type="text/javascript" src="src/init.js" defer></script>
    <script type="text/javascript" src="src/data.js" defer></script>
    <!-- Objs scr -->
    <script type="text/javascript" src="src/animobjs.js" defer></script>
    <script type="text/javascript" src="src/imgobjs.js" defer></script>
    <script type="text/javascript" src="src/textobjs.js" defer></script>
    <!-- main JavaScript script -->
    <script type="text/javascript" src="src/main.js" defer></script>
</body>
</html>