$(function() {
	"use strict";

    $(document).ready(function() {
        $('#data-table').DataTable({
           lengthMenu: [[6, 10, 20, -1], [6, 10, 20, 'Todos']],
           language: {
            url: 'http://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
          }
        });
     } );

});
