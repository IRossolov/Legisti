var PAGES = [];

var currentPage = 0;
function switchPage(n, onEnd){
  if( n < 0 || n >= PAGES.length || n === currentPage ) return onEnd && onEnd();

  var css = { display: 'block' }, view, animationend, _cur = currentPage;
  if( n > currentPage ){
    css.animationName = 'pagination-next';
    view = $( PAGES[ n ] );
    animationend = () => $( PAGES[ _cur ] ).css({ display: 'none' })
  } else {
    css.animationName = 'pagination-prev';
    view = $( PAGES[ currentPage ] );
    $( PAGES[ n ] ).css({ display: 'block' });
    animationend = () => $( PAGES[ _cur ] ).css({ display: 'none' })
  }
  var _hnd = () => {
    animationend();
    view.css({ animationName: '' });
    view.off('animationend', _hnd);
    if( onEnd ) onEnd();
  }
  view.on('animationend', _hnd);
  view.css(css);

  currentPage = n;
}

var  _animation = false;
const _onWheel = e => {
  if( _animation ) return;

  var target = e.currentTarget.children[ currentPage ], nextPage = null, { deltaY } = e.originalEvent;
  if( (target.scrollTop + target.offsetHeight) === target.scrollHeight && deltaY > 30 ) nextPage = currentPage + 1;
  else if( target.scrollTop === 0 && deltaY < -30 ) nextPage = currentPage - 1;

  if( nextPage !== null ){
    _animation = true;
    switchPage(nextPage, () => setTimeout(() => _animation = false, 400));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  PAGES = $('.content__screen');
  $('.content').on('wheel', _onWheel);
});
