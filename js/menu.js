$(document).ready(function(){
  let pageTitle = $('head title').text().trim().toLowerCase();

  $.getJSON('/data/menu.json', function(menus){
    let menuHtml = '<nav class="navbar navbar-expand-lg navbar-light bg-light"><ul class="navbar-nav">';

    menus.forEach(menu => {
      if(menu.submenu){ // Check for submenu presence
        menuHtml += `<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${menu.name}</a>
          <ul class="dropdown-menu">`;

        menu.submenu.forEach(sub => {
          menuHtml += `<li><a class="dropdown-item" href="${sub.url}">${sub.name}</a></li>`;
        });

        menuHtml += '</ul></li>';
      } else {
        let activeClass = pageTitle.includes(menu.name.toLowerCase()) ? 'active' : '';
        menuHtml += `<li class="nav-item"><a class="nav-link ${activeClass}" href="${menu.url}">${menu.name}</a></li>`;
      }
    });

    menuHtml += '</ul></nav>';
    $('.header.clearfix').html(menuHtml);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Failed to load menu:', textStatus, errorThrown);
  });
});