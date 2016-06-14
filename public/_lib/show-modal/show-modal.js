!(function(){

  var modal = null;

  var init = function() {
    modal = document.createElement('div');
    modal.classList.add('show-modal');
    modal.innerHTML = '<iframe></iframe><i class="iconfont close">x</i>';
    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = function(e) {
      e.stopPropagation()
      this.parentNode.classList.remove('show');
    }
  }

  document.addEventListener('click', function(e) {
    if (e.target.dataset.role === 'show-modal') {
      modal === null ? init() : "";
      modal.querySelector('iframe').src = e.target.dataset.src;
      modal.classList.add('show');
    }
  })
})();
