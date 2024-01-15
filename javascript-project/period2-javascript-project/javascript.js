function showContent(contentType) {
    var display = document.getElementById('display');

    switch (contentType) {
        case 'photo':
            display.innerHTML = '<img src="fotos/wissam.JPG " height="100%" width=" 100%"   alt="Your Photo">';
            break;
        case 'contact':
            display.innerHTML = '<p style="color: white;">Contact Information:<br>Email: hatatwisaam@hotmail.com<br>Phone: 123-456-7890</p>';
            break;
        case 'pitch':
            display.innerHTML = '<p style="color: white;">Your Pitch: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>';
            break;
        case 'button4':
            display.innerHTML = '<p style="color: white;"> Ervaring: ik heb ervaring in HTMl en Css en php en javascript </p>';
            break;
        case 'button5':
            display.innerHTML = '<p style="color: white;">Diplomas: havo diploma , taal diploma B1 en chef diploma  </p>';
            break;
        case 'button6':
            display.innerHTML = '<p style="color: white;"> Hoppy : sport  </p>';;
            break;
        default:
            display.innerHTML = '<p style="color: white;">No content available</p>';
            break;
    }
}
