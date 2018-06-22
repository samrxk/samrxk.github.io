;(function(){
  var $t = $('.tag');
  var tags = ['photographer', 'snowboarder', 'gamer'];

  // mobile utility method
  var page = {
    resize: null,
    mobile: false,
    pos: 0,
  }

  var randLetter = function() {
    var rand = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
    var num = Math.round(Math.random() * (rand.length - 1));
    return rand[num];
  }

  var tag = function(length) {
    var tag = '';
    for (var i=0; i<length; i++) {
      var x = randLetter();
      tag += x;
    }
    return tag;
  }

  var setText = function(next) {
    $t.text(tags[next]);
    $t.data('current', next);
  }

  var next = function() {
    var next;
    if($t.data('current') == 0) {
      next = 1;
    } else if ($t.data('current') == 1) {
      next = 2;
    } else if ($t.data('current') == 2) {
      next = 0;
    }
    return next;
  }

  var timer = function() {
    var tf = true;
    var count = 0;
    var go = setInterval(function() {
      if(tf && count < 100) {
        $t.text(tag(tags[next()].length));
        count += 1;
      }
    }, 5);

    var animate = setInterval(function() {
      if(tf && count == 100) {
        tf = false;
        setText(next());
      }
    },500);

    var loop = setInterval(function() {
      tf = true;
      count = 1;
    },4000);
  }

  var Go = setTimeout(function() {
    timer();
    clearTimeout(Go);
  },1000);

  var showDetail = function(name) {
    var $el = $('section[data-name="' + name + '"]');
    page.pos = $(document).scrollTop();
    $el.fadeIn(250).removeClass('hidden');
    $('.overlay-wrapper').addClass('hidden');
    $(document).scrollTop(0);
  }

  var hideDetail = function() {
    $(document).scrollTop(page.pos);
    $('.overlay-wrapper').removeClass('hidden');
    $('section[data-name]').fadeOut(500).addClass('hidden');
  }

  $('section[role="overview"] a.down').on('click', function(ev) {
    ev.preventDefault();
    $('html,body').animate({scrollTop: $('section[role="work"]').offset().top}, 500);
  });

  $('a[href="#work"]').on('click', function(ev) {
    ev.preventDefault();
    $('html,body').animate({scrollTop: $('section[role="work"]').offset().top}, 500);
  });

  $('a[href="#contact"]').on('click', function(ev) {
    ev.preventDefault();
    $('html,body').animate({scrollTop: $('section[role="contact"]').offset().top}, 500);
  });

  $('a[href="#about"]').on('click', function(ev) {
    ev.preventDefault();
    $('section[role="about"]').removeClass('hidden');
  });

  $('section.folio-detail a.down').on('click', function(ev) {
    ev.preventDefault();
    $('html,body').animate({scrollTop: $(ev.target).closest('.folio-detail').find('div.body').offset().top}, 500);
  });

  $('a.det-link').click(function(ev) {
    ev.preventDefault();
    var targ = $(this).attr('data-target');
    showDetail(targ);
  });

  $('.det-close').click(function(ev) {
    ev.preventDefault();
    hideDetail();
  });

})();
