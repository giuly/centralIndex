var Pagination = {
  code: '',

  Extend: function(data) {
    data = data || {};
    Pagination.size = data.size || 300;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 3;
  },

  Add: function(s, f) {
    for (var i = s; i < f; i++) {
      Pagination.code += '<a data-rel="'+i+'" class="searchFromPage">' + i + '</a>';
    }
  },

  Last: function() {
    Pagination.code += '<i>...</i><a data-rel="'+Pagination.size+'" class="searchFromPage">' + Pagination.size + '</a>';
  },

  First: function() {
    Pagination.code += '<a data-rel="1" class="searchFromPage">1</a><i>...</i>';
  },


  Click: function() {
    Pagination.page = +this.innerHTML;
    Pagination.Start();
  },

  Prev: function() {
    Pagination.page--;
    if (Pagination.page < 1) {
      Pagination.page = 1;
    }
    Pagination.Start();
  },

  Next: function() {
    Pagination.page++;
    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size;
    }
    Pagination.Start();
  },

  TypePage: function() {
    Pagination.code = '<input onclick="this.setSelectionRange(0, this.value.length);this.focus();" onkeypress="if (event.keyCode == 13) { this.blur(); }" value="' + Pagination.page + '" /> &nbsp; / &nbsp; ' + Pagination.size;
    Pagination.Finish();
    var v = Pagination.e.getElementsByTagName('input')[0];
    v.click();
    v.addEventListener("blur", function(event) {

      var p = parseInt(this.value);

      if (!isNaN(parseFloat(p)) && isFinite(p)) {
        if (p > Pagination.size) {
          p = Pagination.size;
        } else if (p < 1) {
          p = 1;
        }
      } else {
        p = Pagination.page;
      }
      Pagination.Init(document.getElementById('pagination'), {
        size: Pagination.size,
        page: p,
        step: Pagination.step
      });
    }, false);
  },


  Bind: function() {
    var a = Pagination.e.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = 'searchFromPage current';
      a[i].addEventListener('click', Pagination.Click, false);
    }
  },

  Finish: function() {
    Pagination.e.innerHTML = Pagination.code;
    Pagination.code = '';
    Pagination.Bind();
  },

  Start: function() {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
    } else {
      Pagination.First();
      Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
      Pagination.Last();
    }
    Pagination.Finish();
  },


  Buttons: function(e) {
    var nav = e.getElementsByTagName('a');
    //nav[0].addEventListener('click', Pagination.Prev, false);
    //nav[1].addEventListener('click', Pagination.Next, false);
  },

  Create: function(e) {
    var html = [
      '', // previous button
      '<span></span>', // pagination container
      '' // next button
    ];
    e.innerHTML = html.join('');
    Pagination.e = e.getElementsByTagName('span')[0];
    Pagination.Buttons(e);
  },

  Init: function(e, data) {
    Pagination.Extend(data);
    Pagination.Create(e);
    Pagination.Start();
  }
};
