function showContent(contentType) {
    var display = document.getElementById('display');

    switch (contentType) {
        case 'photo':
            display.innerHTML = '<img src="img/aaaaaaa.jpg " height="100%" width=" 100%"   alt="Your Photo">';
            break;
        case 'contact':
            display.innerHTML = '<p style="color: white;">Contact Information:<br>Email: abdulrahman.n776@gmail.com<br>Phone: 0685538190</p>';
            break;
        case 'button4':
            display.innerHTML = '<p style="color: white;"> Ervaring: ik heb ervaring in HTMl en Css en php en javascript </p>';
            break;
        case 'button5':
            display.innerHTML = '<p style="color: white;">Diplomas: havo diploma , taal diploma B1 en chef diploma  </p>';
            break;
        case 'button6':
            display.innerHTML = '<p style="color: white;"> Hoppy : sport en zwemen  </p>';;
            break;

    }
}





