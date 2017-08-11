console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object

    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };

   


    // call saveKoala with the new obejct
    saveKoala(objectToSend);
  }); //end addButton on click

  $('body').on('click', '.deleteButton', function () {
    var koalaId = $(this).parent().parent().data().id;
    $.ajax({
      method: 'DELETE',
      url: '/koalas/' + koalaId,
      success: function(response) {
        getKoalas();
      }
    });
  });

  $('body').on('click', '.transferButton', function () {
    var koalaId = $(this).parent().parent().data().id;
    $.ajax({
      method: 'PUT',
      url: '/koalas/' + koalaId,
      success: function(response) {
        getKoalas();
      }
    });
  });
}); // end doc ready

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function (data) {
      console.log('got some koalas: ', data);
      drawKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function (data) {
      console.log('got some koalas: ', data);
      getKoalas();
    } // end success
  }); //end ajax
}

//function 

function drawKoalas(data) {
  $('#viewKoalas').empty();
  for (var i = 0; i < data.length; i++) {
    var koala = data[i];
    console.log(koala);
    var $koalaRow = $('<tr></tr>');
    $koalaRow.data('id', koala.id);

    if(koala.ready_for_transfer === true) {
      $koalaRow.prepend(
        '<td>' + koala.name + '</td>' +
        '<td>' + koala.age + '</td>' +
        '<td>' + koala.gender + '</td>' +
        '<td>' + koala.ready_for_transfer + '</td>' +
        '<td>' + '</td>' +      
        '<td>' + koala.notes + '</td>' +      
        '<td> <button class="deleteButton">DELETE ME</button></td>'
      );
    } else {
      $koalaRow.prepend(
        '<td>' + koala.name + '</td>' +
        '<td>' + koala.age + '</td>' +
        '<td>' + koala.gender + '</td>' +
        '<td>' + koala.ready_for_transfer + '</td>' +
        '<td> <button class="transferButton">Ready for Transfer</button></td>' +
        '<td>' + koala.notes + '</td>' +      
        '<td> <button class="deleteButton">DELETE ME</button></td>'
      );
    }
    

    $('#viewKoalas').prepend($koalaRow);

    // 1. create <tr> = $koalaRow
    // 2. add id with data
    // 3. append/prepend td stuff to tr
    // 4. prepend tr to #viewKoalas

  }
}
