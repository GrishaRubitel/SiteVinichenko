<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Task 1</title>
    <link rel="stylesheet" href="php1_style.css">
</head>
<body>
    <div class="container">
        <form method="post" action="php1_back.php" id="pageHolder">
          <label for="name">Имя:</label>
          <input type="text" id="name" name="name">
      
          <label for="shoes">Обувь:</label>
          <select id="shoes" name="shoes">
            <option value="Кроссовки">Кроссовки</option>
            <option value="Ботинки">Ботинки</option>
            <option value="Сандалии">Сандалии</option>
          </select>
      
          <label>Цвет:</label>
          <input type="radio" id="red" name="color" value="Красный">
          <label for="red">Красный</label>
          <input type="radio" id="white" name="color" value="Белый">
          <label for="white">Белый</label>
      
          <button class="menu_butt" type="button" onclick="sendForm('Паук')">Паук</button>
          <button class="menu_butt" type="button" onclick="sendForm('Утка')">Утка</button>
          <button class="menu_butt" type="button" onclick="sendForm('Собака')">Собака</button>  

          <div class="output">
            <div id="textOutput"></div>
            <div id="imageOutput">
                <img src="" alt="" id="shoeHolder">
            </div>
          </div>
          <input type="hidden" id="animal" name="animal" value="">
        </form>
      </div>
    <a href="../tasks.html"><button class="menu_butt">Назад</button></a>

    <script>
        function sendForm(type) {
            document.getElementById('animal').value = type;
            document.getElementById('pageHolder').submit();
        }
    </script>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $shoes = $_POST['shoes'];
    $color = $_POST['color'];
    $animal = $_POST['animal'];

    $shoe_image_src = "";
    switch ($shoes) {
        case 'Кроссовки':
            $shoe_image_src = "https://justnike.ru/image/cache/data/Nike%20M2K%20Tekno/80731_Shoes%20%28146%29-1200x748-700x500.jpg";
            break;
        case 'Сандалии':
            $shoe_image_src = "http://klublady.ru/uploads/posts/2022-03/1647078559_129-klublady-ru-p-obraz-muzhskie-sandalii-foto-136.jpg";
            break;
        case 'Ботинки':
            $shoe_image_src = "https://www.patboot.ru/i/ProductImageHi.2134.jpg";
            break;
        default:
            $shoe_image_src = "https://i.ytimg.com/vi/EEyMatsczaA/maxresdefault.jpg";
            break;
    }

    if (!empty($name) && !empty($shoes) && !empty($color) && !empty($animal)) {
        $pairs = "";
        switch ($animal) {
            case 'Паук':
                $pairs = "8 пар";
                break;
            case 'Утка':
                $pairs = "2 пары";
                break;
            case 'Собака':
                $pairs = "4 пары";
                break;
            default:
                $pairs = "0 пар";
                break;
        }

        echo "<script>";
        echo "var outputDiv = document.getElementById('textOutput');";
        echo "outputDiv.innerHTML = '<p>$name, вы выбрали для животного:<br>' +";
        echo "'$animal, $shoes<br>' +";
        echo "'Цвет $color<br>' +";
        echo "'Количество $pairs';";
        echo "var image = document.getElementById('shoeHolder');";
        echo "image.src = '$shoe_image_src';";
        echo "</script>";
    } else {
        echo "<script>";
        echo "var outputDiv = document.getElementById('textOutput');";
        echo "outputDiv.innerHTML = '<p>Пожалуйста, заполните все поля формы.</p>'";
        echo "</script>";
    }
}
?>

</body>
</html>
