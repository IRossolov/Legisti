var PAGES = [];

var currentPage = 0;
function switchPage(n){
  if( n < 0 || n >= PAGES.length || n === currentPage ) return;

  var css = { display: 'block' }, view, animationend, _cur = currentPage;
  if( n > currentPage ){
    css.animation = 'pagination-next 1s';
    view = $( PAGES[ n ] );
    animationend = () => $( PAGES[ _cur ] ).css({ display: 'none' })
  } else {
    css.animation = 'pagination-prev 1s';
    view = $( PAGES[ currentPage ] );
    $( PAGES[ n ] ).css({ display: 'block' });
    animationend = () => $( PAGES[ _cur ] ).css({ display: 'none' })
  }
  var _hnd = () => { animationend(); view.off('animationend', _hnd) };
  view.on('animationend', _hnd);
  view.css(css);

  currentPage = n;
}

window.addEventListener('DOMContentLoaded', () => {
  PAGES = $('.content__screen');
  /*$('.content').on('scroll', ({ target }) => {
    var curPage = currentPage;
    if( (target.scrollTop + target.offsetHeight) === target.scrollHeight ) curPage = currentPage + 1
    else if( target.scrollTop === 0 ) curPage = currentPage - 1;

    switchPage(curPage);
  });*/
});
