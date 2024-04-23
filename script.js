$(document).ready(function () {
  $(window).scroll(function () {
    //  sticky navbar on scroll script  //
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    //  scroll-up button show/hide script  //
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  //  slide-up script  //

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    //  removing smooth scroll on slide-up button click  //
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    //  Smooth scroll on Menu Items click  //

    $("html").css("scrollBehavior", "smooth");
  });

  //  Toggle Navbar  //

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  //  Typing Text Animation  //

  var typed = new Typed(".typing", {
    strings: [
      "Fullstack Developer",
      "Software Developer",
      "Python Developer",
      "Java Developer",
      "Data Analyst",
      "Problem Solver",
      "Product Developer"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Fullstack Developer",
      "Software Developer",
      "Python Developer",
      "Java Developer",
      "Data Analyst",
      "Problem Solver",
      "Product Developer"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  //  Owl Carousel  //

  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: false
      }
    }
  });
});

function saveTo_AWS_RDS() {
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;

  const formData = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  // Define the URL of your Lambda function
const lambdaEndpoint = 'https://d4gf6zpqjpyolyuuinzj4kvnte0deaev.lambda-url.us-east-2.on.aws/';

// Fetch options
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
};

// Make the fetch request
fetch(lambdaEndpoint, options)
    .then(response => {
        // Check if the response is OK (status code 200)
        // console.log(response);
        if (!response.ok) {
          throw new Error('Failed to submit form');
            
        }
        // Parse the response body as JSON
        return response.json();
    })
    .then(data => {
        // Handle the response data
        // console.log(data);
        showNotification('Message sent successfully!');
        document.getElementById("contact-me-form").reset();
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        showNotification('An error occurred while saving message.');
    });
}

function handleResponse(response) {
  if (response.ok) {
    showNotification('Message sent successfully!');
    var frm = document.getElementsByName('contact-me-form')[0];
    frm.reset();  // Reset all form data
  } else {
    throw new Error('Failed to send message.');
  }
}

function handleError(error) {
  console.error(error);
  showNotification('An error occurred while processing the request.');
}

//notification function
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');

  notificationText.textContent = message;
  notification.classList.add('show');

  const closeNotificationButton = document.getElementById('closeNotification');
  closeNotificationButton.addEventListener('click', () => {
    notification.classList.remove('show');
  });

  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000); // Hide after 5 seconds
}
