$(window).scrollTop(0);

// Define isRtl variable for RTL support
var isRtl = false; // Set to true for RTL languages

// Hide Header on on scroll down
var lastScrollTop = 0;
var header = $('.header');

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scroll Down: Fade Out header with slide-up effect
        header.removeClass('fadeInDown').addClass('fadeOutUp').fadeOut();
    } else if (scrollTop < lastScrollTop) {
        // Scroll Up: Fade In header with slide-down effect
        header.removeClass('fadeOutUp').addClass('fadeInDown').fadeIn();
    }

    lastScrollTop = scrollTop;
});

// Homepage main slider
$(".mainslider").slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: false,
    cssEase: 'ease-in-out',
    responsive: [
        {
            breakpoint: 768,
            settings: {
                autoplay: false,
                dots: true,
                arrows: false,
            },
        },
    ],
});

$('.mainslider.homeWrapper').on('afterChange', function (event, slick, currentSlide) {
    // Reset all slides to the initial scale
    $('.mainslider.homeWrapper .slickbox').css('transform', 'scale(1)');

    // Apply the zoom-in effect to the current slide
    $('.mainslider.homeWrapper .slick-current').css('transform', 'scale(1.05)'); // Adjust scale as needed
});

// Trigger the zoom effect on the first slide when the page loads
$('.mainslider.homeWrapper .slick-current').css('transform', 'scale(1.05)');

// Function to trigger AOS animation manually
function triggerAOSAnimation() {
    $('.mainslider .slick-active [data-aos]').each(function () {
        $(this).addClass('aos-animate');
    });
}

// Trigger AOS on initial load
triggerAOSAnimation();

// Reinitialize AOS on each slide change
$('.mainslider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // Remove the aos-animate class from all elements
    $('[data-aos]').removeClass('aos-animate');
});

$('.mainslider').on('afterChange', function (event, slick, currentSlide) {
    // Add the aos-animate class to the active slide elements
    triggerAOSAnimation();

    // Refresh AOS to apply animations
    AOS.refreshHard();
});


$('.marqueesliderwrapper .slick.marquee').slick({
            rtl: isRtl,
            speed: 3000, // Increased speed for smoother marquee effect
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: false,
            cssEase: 'linear',
            slidesToShow: 7, // Show 7 slides at once for better marquee effect
            draggable: false,
            focusOnSelect: false,
            pauseOnFocus: false,
            pauseOnHover: true,
            slidesToScroll: 1,
            variableWidth: false, // Changed to false for consistent spacing
            infinite: true,
            initialSlide: 0, // Start from first slide
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
});
      


$(function () {
    $('a[href*=\\#]').on('click', function (e) {
        e.preventDefault(); // Prevent the default action of the anchor click

        var target = $(this).attr('href'); // Get the target element's ID
        var $target = $(target); // Select the target element

        if ($target.length) { // Check if the target element exists
            $('html, body').animate(
                {
                    scrollTop: $target.offset().top // Animate the scrollTop property
                },
                500, // Duration of the animation in milliseconds
                'swing' // Easing function for smooth scrolling
            );
        }
    });
});

// tab js
// Set Ground Floor as active by default
$('.tab-button[data-tab="groundfloor"]').addClass('text-primary bg-primary/10 border-primary');
$('#groundfloor').removeClass('hidden');

// Tab click functionality
$('.tab-button').click(function () {
    var targetTab = $(this).data('tab');

    // Remove active classes from all tabs
    $('.tab-button').removeClass('text-primary bg-primary/10 border-primary');
    $('.tab-content').addClass('hidden');

    // Add active class to clicked tab
    $(this).addClass('text-primary bg-primary/10 border-primary');

    // Show corresponding content
    $('#' + targetTab).removeClass('hidden');
});


// gallery

 // Gallery data
 const galleryImages = [
    {
      src: 'assets/images/gallery/top-view-buddha-mall.jpg',
      alt: 'Top View of Buddha Mall'
    },
    {
      src: 'assets/images/gallery/buddha-mall-opening.jpg',
      alt: 'Buddha Mall Opening'
    },
    {
      src: 'assets/images/gallery/clicking-photo.jpg',
      alt: 'Clicking Photo'
    },
    {
      src: 'assets/images/gallery/cultural-dress-photo.jpg',
      alt: 'Cultural Dress Photo'
    },
    {
      src: 'assets/images/gallery/kumari-dance.jpg',
      alt: 'Kumari Dance'
    },
    {
      src: 'assets/images/gallery/lakhe-dance.jpg',
      alt: 'Lakhe Dance'
    },
    {
      src: 'assets/images/gallery/dance-performance.jpg',
      alt: 'Dance Performance'
    },
    {
      src: 'assets/images/gallery/cultural-dance.jpg',
      alt: 'Cultural Dance'
    },
    {
      src: 'assets/images/gallery/sabin-rai-performance.jpg',
      alt: 'Sabin Rai Performance'
    },
    {
      src: 'assets/images/gallery/tabala-performance.jpg',
      alt: 'Tabala Performance'
    },
    {
      src: 'assets/images/gallery/modeling-kids.jpg',
      alt: 'Modeling Kids'
    },
    {
      src: 'assets/images/gallery/token-of-love-buddha-mall.jpg',
      alt: 'Token of Love'
    }
  ];

  let currentPhotoIndex = 0;
  const totalPhotos = galleryImages.length;

  // Update total photos count
  $('#totalPhotos').text(totalPhotos);

  // Function to show photo in modal
  function showPhoto(index) {
    if (index < 0) index = totalPhotos - 1;
    if (index >= totalPhotos) index = 0;

    currentPhotoIndex = index;
    const photo = galleryImages[index];

    $('#modalImage').attr('src', photo.src).attr('alt', photo.alt);
    $('#currentPhotoIndex').text(index + 1);

    // Show/hide navigation buttons based on photo count
    if (totalPhotos <= 1) {
      $('#prevPhoto, #nextPhoto').hide();
    } else {
      $('#prevPhoto, #nextPhoto').show();
    }
  }

  // Function to open photo viewer
  function openPhotoViewer(index) {
    console.log('Opening photo viewer for index:', index);
    showPhoto(index);
    $('#photoViewerModal').removeClass('hidden').fadeIn(300);
    $('body').addClass('overflow-hidden');
  }

  // Function to close photo viewer
  function closePhotoViewer() {
    $('#photoViewerModal').fadeOut(300, function () {
      $(this).addClass('hidden');
    });
    $('body').removeClass('overflow-hidden');
  }

  // Click event for gallery items
  $('.gallery-item').on('click', function (e) {
    e.preventDefault();
    console.log('Gallery item clicked');
    const index = parseInt($(this).data('index'));
    console.log('Index:', index);
    openPhotoViewer(index);
  });

  // Close button click
  $('#closePhotoViewer').on('click', function () {
    closePhotoViewer();
  });

  // Previous button click
  $('#prevPhoto').on('click', function () {
    showPhoto(currentPhotoIndex - 1);
  });

  // Next button click
  $('#nextPhoto').on('click', function () {
    showPhoto(currentPhotoIndex + 1);
  });

  // Close on modal background click
  $('#photoViewerModal').on('click', function (e) {
    if (e.target === this) {
      closePhotoViewer();
    }
  });

  // Keyboard navigation
  $(document).on('keydown', function (e) {
    if (!$('#photoViewerModal').hasClass('hidden')) {
      switch (e.key) {
        case 'Escape':
          closePhotoViewer();
          break;
        case 'ArrowLeft':
          showPhoto(currentPhotoIndex - 1);
          break;
        case 'ArrowRight':
          showPhoto(currentPhotoIndex + 1);
          break;
      }
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  $('#photoViewerModal').on('touchstart', function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });

  $('#photoViewerModal').on('touchend', function (e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next photo
        showPhoto(currentPhotoIndex + 1);
      } else {
        // Swipe right - previous photo
        showPhoto(currentPhotoIndex - 1);
      }
    }
  }

// News & Events Slider

$('.news-events-slider').slick({
            rtl: isRtl,
            speed: 500,
            autoplay: false,
            autoplaySpeed: 5000,
            centerMode: false,
            cssEase: 'ease-in-out',
            slidesToShow: 3,
            slidesToScroll: 1,
            draggable: true,
            focusOnSelect: false,
            pauseOnFocus: true,
            pauseOnHover: true,
            infinite: true,
            initialSlide: 0,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
});
        


