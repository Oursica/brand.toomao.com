!( function( factory ){
  if (typeof define === "function" && define.amd ) {
    define( factory );
  } else {
    factory();
  }
}( function() {
  var css = [
    '/_lib/codemirror/codemirror.css',
    '/_lib/codemirror/index.css',
    '/_lib/codemirror/material.css',
    '/_lib/codemirror/addon/hint/show-hint.css'
  ]
  var js = [
    '/_lib/codemirror/codemirror.js',
    '/_lib/codemirror/xml.js',
    '/_lib/codemirror/javascript.js',
    '/_lib/codemirror/css.js',
    '/_lib/codemirror/htmlmixed.js',
    '/_lib/codemirror/sublime.js',
    '/_lib/codemirror/addon/search/search.js',
    '/_lib/codemirror/addon/search/searchcursor.js',
    '/_lib/codemirror/addon/search/match-highlighter.js',
    '/_lib/codemirror/addon/hint/anyword-hint.js',
    '/_lib/codemirror/addon/hint/css-hint.js',
    '/_lib/codemirror/addon/hint/javascript-hint.js',
    '/_lib/codemirror/addon/hint/html-hint.js',
    '/_lib/codemirror/addon/hint/xml-hint.js',
    '/_lib/codemirror/addon/hint/show-hint.js'
  ]

  css.forEach(function(href, index){
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href;
    document.head.appendChild(link);
  })

  var loadJS = function(i) {

    // 全部加载完成，并初始化控件
    if (i >= js.length) {
      init();
      return;
    }

    var script = document.createElement('script')
    script.src = js[i];
    document.head.appendChild(script);
    script.onload = function() {
      // console.log(script.src + ' loaded.')
      loadJS(i + 1)
    }
  }


  var init = function() {

    var codemirrors = document.querySelectorAll('[data-role="codemirror"]');
    var mixedMode = {
      name: "htmlmixed",
      scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                     mode: null},
                    {matches: /(text|application)\/(x-)?vb(a|script)/i,
                     mode: "vbscript"}]
    };

    for (var i = 0; i < codemirrors.length; i++) {

      var cm = CodeMirror.fromTextArea(codemirrors[i], {
        value: codemirrors[i].value,
        lineNumbers: true,
        mode: mixedMode,
        keyMap: "sublime",
        tabSize: 2
      });
      if (codemirrors[i].rows > 6) {
        cm.setSize("100%", '700px')
      } else {
        cm.setSize("100%", '70px')
      }
      cm.setOption("theme", 'material');
      var timeout;

      // @see http://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
      cm.on('keyup', function(cm, event) {

        var key = event.keyCode || event.which;
        // key == [a-z\.<]
        // console.log(key)
        if(
          (
            key > 64 && key < 91 && event.ctrlKey === false ||   // a~z
            key === 190 && event.shiftKey === false || // .
            key === 188 && event.shiftKey === true // <
          )
          && !cm.state.completionActive)
        {
            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(function() {

                // @see http://stackoverflow.com/questions/19520877/codemirror-use-multiple-hint-sources-for-autocomplete
                var doc = cm.getDoc();
                var POS = doc.getCursor();
                var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name;

                // console.log(mode)

                if (mode == 'xml') { //html depends on xml
                    CodeMirror.showHint(cm, CodeMirror.hint.html, {completeSingle: false});
                } else if (mode == 'javascript') {
                    CodeMirror.showHint(cm, CodeMirror.hint.javascript, {completeSingle: false});
                } else if (mode == 'css') {
                    CodeMirror.showHint(cm, CodeMirror.hint.css, {completeSingle: false});
                }

            }, 150);
        }

      })
      codemirrors[i].codemirror = cm;
    }
  }

  if (document.readyState === 'complete') {
    loadJS(0)
  } else {
    document.addEventListener('readystatechange', function(e) {
      if (document.readyState === 'complete') {
        loadJS(0)
      }
    })
  }
  return null;

}));
