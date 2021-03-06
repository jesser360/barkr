
console.log("Sanity Check: JS is working!");
 var allDogs = [];
$(document).ready(function(){

  var $dogTarget = $('#dogTarget');
  $.ajax({
    method: 'GET',
    url: '/feed',
    success: handleGetSuccess,
    error: handleGetError
  });

  var $newProfileDog = $('#newProfileDog');
  $.ajax({
    method: 'GET',
    url: '/api/owners/:ownerId',
    success: handleGetProfileSucc,
    error: handleGetProfileError
  });

  // $('#signup-form').on('submit', function signup(e){
  //      e.preventDefault();
  //      var signupData = $('#signup-form').serialize();
  //      console.log("before ajax" + signupData);
  //      $.post('/api/owners', signupData, function(res){
  //        console.log("signup form", res);
  //      });
  //   });




    // $('#login-form').on('submit', function signup(e){
    //     e.preventDefault();
    //     var loginData = $('#login-form').serialize();
    //     console.log(loginData);
    //     $.post('/sessions', loginData, function(res){
    //       console.log(res);
    //     });
    // });



  $('#newDogForm').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method:"POST",
      url:'/api/dogs',
      data:$(this).serializeArray(),
      success:NewDogSuccess,
      error:NewDogError
    })
  });

  function NewDogSuccess(data){
    allDogs.push(data);
    console.log("success booking  " + data.human);
    $('#newDogForm input').val('');
    newDogRender(data);
    //$('[data-dog-id='+data._id+']')[0].scrollIntoView();

  };
  function NewDogError(err){
    console.log("errrorrr" +err);
  };

  $('#newProfileDog').on('click', '.delete-dog', handleDeleteClick);
  $('#newProfileDog').on('click', '.update-dog', handleUpdateDog);
  $('#newProfileDog').on('click', '.save-dog', handleSaveDog);
  $('#newProfileDog').on('click', '.update-owner', handleUpdateOwner);
  $('#newProfileDog').on('click', '.save-owner', handleSaveOwner);

    function handleUpdateOwner(e){
      var $ownerRow = $(this).closest('.owner')
      var ownerId = $ownerRow.data('human-id')
      console.log("ID" + ownerId);

      $ownerRow.find('.save-owner').toggleClass('hidden');
      $ownerRow.find('.update-owner').toggleClass('hidden');
      var name = $ownerRow.find('span.owner-name').text();
      console.log(name+"name");
      $ownerRow.find('span.owner-name').html('<input class = "edit-owner-name" value ="' + name + '"></input><br/>');
      var age = $ownerRow.find('span.owner-age').text();
      console.log(age+"age");
      $ownerRow.find('span.owner-age').html('<label><input class = "edit-owner-age" value ="' + age + '"></input>');
      var gender = $ownerRow.find('span.owner-gender').text();
      console.log(gender+"gender");
      $ownerRow.find('span.owner-gender').html('<label><input class = "edit-owner-gender" value ="' + gender + '"></input>');

    };

      function handleSaveOwner(e){
        var id = $(this).closest('.owner').data('human-id');
        console.log("clicked save for " + id);
        var $ownerRow = $('[data-human-id ='+id+']');
        var ownerName = $ownerRow.find('.edit-owner-name').val();
        var age = $ownerRow.find('.edit-owner-age').val();
        var gender = $ownerRow.find('.edit-owner-gender').val();
        console.log(ownerName,age,gender);
        // db.Owner.findById(id, function(err,owner){
        //   var email = owner.email;
        //   var password = owner.password;
        //   var imgOwner = owner.imgOwner;
        var ownerData = {
          ownerName : ownerName,
          age : age,
          gender : gender
      };


    $.ajax({
      method:"PUT",
      url:'/api/owners/' + id,
      data: ownerData,
      success: handleSaveSuccess,
      error:handleSaveError,
    });
    function handleSaveSuccess(data){
      var id = data._id;
      //$('[data-human-id='+id+']').remove();
      location.reload();
      //getDogSaveHtml(data);
      //render();
      //$('[data-dog-id='+id+']')[0].scrollIntoView();

    }
    function handleSaveError(err){
      console.log("error" + err);
    }
  };

  function handleUpdateDog(e){

    var $dogRow = $(this).closest('.dog');
    var dogId = $dogRow.data('dog-id');
    console.log('update for dog' + dogId)

    $dogRow.find('.save-dog').toggleClass('hidden');
    $dogRow.find('.update-dog').toggleClass('hidden');

    var name = $dogRow.find('span.dog-name').text();
    console.log(name+"name");
    $dogRow.find('span.dog-name').html('<input class = "edit-dog-name" value ="' + name + '"></input><br/>');
    var isBig = $dogRow.find('span.dog-size').text();
    console.log(isBig+"isBig");
    $dogRow.find('span.dog-size').html('<label><input class = "edit-dog-size" value ="' + isBig + '"></input>');
    var breed = $dogRow.find('span.dog-breed').text();
    console.log(breed+"breed");
    $dogRow.find('span.dog-breed').html('<input class = "edit-dog-breed" value ="' + breed + '"></input>');
    var isSocialized = $dogRow.find('span.dog-temper').text();
    console.log(isSocialized+"temper");
    $dogRow.find('span.dog-temper').html('<input type="checkbox" name = "isSocialized" >Play well</input>');


    //
  };
  function handleSaveDog(e){
    var id = $(this).closest('.dog').data('dog-id');
    console.log("clicked save for " + id);
    var $dogRow = $('[data-dog-id ='+id+']');
    var name = $dogRow.find('.edit-dog-name').val();
    var breed = $dogRow.find('.edit-dog-breed').val();
    var isBig = $dogRow.find('edit-dog-size').val();
    var isSocialized = $('input[name=isSocialized]:checked').val();
    console.log(isSocialized);
    var dogData = {
      dogName : name,
      breed : breed,
      isBig : isBig,
      isSocialized : isSocialized
  };

    $.ajax({
      method:"PUT",
      url:'/api/dogs/' + id,
      data: dogData,
      success: handleUpdateSuccess,
      error:handleUpdateError,
    });
    function handleUpdateSuccess(data){
      var id = data._id;
      //$('[data-dog-id='+id+']').remove();
      location.reload();
      //getDogSaveHtml(data);
      //render();
      //$('[data-dog-id='+id+']')[0].scrollIntoView();

    }
    function handleUpdateError(err){
      console.log("error" + err);
    }
  };

  function getDogHtml(dog) {
    return `<hr>
            <p>
            <div class='col-sm-6 row dog border text-center' data-dog-id = ${dog._id} >
            <img src="../images/bookPic.png" alt="book image">
            <br/>
              <span class='dog-name'>${dog.dogName}</span>
              is a <span class='dog-size'>${(dog.isBig === true ? 'large' : 'small')}</span><span class='dog-breed'> ${dog.breed}</span>.
              <br/>
              They are <span class='dog-temper'>${(dog.isSocialized === true ? 'great' : 'not very good')}</span> with other dogs.
              <br/>
              </p>
              <button id="updateDog" class="btn btn-info update-dog" type="update">
              <span class="label">Update Dog</span>
              <span class="glyphicon glyphicon-pencil"></span>
              </button>
              <button id="saveDog" class="btn btn-info save-dog hidden" type="save">
              <span class="label">Save Changes</span>
              <span class="glyphicon glyphicon-ok"></span>
              </button>
              <button id="delete" class="btn btn-danger delete-dog" type="delete">
              <span class="label">Delete Dog</span>
              <span class="glyphicon glyphicon-trash"></span>
              </button>
              </div>
              <div class='col-sm-6 row owner border text-center' data-human-id =${(dog.human) ? dog.human._id : 'null'}>
              <img src="../images/authorPic.png" alt="author image">
              <br/>
                <b><span class='owner-name'>${(dog.human) ? dog.human.ownerName : 'null'}</span></b>
                is a <span class ='owner-age'>${(dog.human) ? dog.human.age : 'null'}</span> year old <span class='owner-gender'>${(dog.human) ? dog.human.gender : 'null'}</span>.
                <br/>
                Email is <span class='email'>${(dog.human) ? dog.human.email : 'null'}<span>.
                </p>
                <button id="updateOwner" class="btn btn-info update-owner" type="update">
                <span class="label">Update Owner</span>
                <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button id="saveOwner" class="btn btn-info save-owner hidden" type="save">
                <span class="label">Save Changes</span>
                <span class="glyphicon glyphicon-ok"></span>
                </button>
                </div>
              `;
  };
  function getAllDogsHtml(dogs){
    return dogs.map(getDogHtml);
    console.log("going through all books");
  }
  function render(){
    $dogTarget.empty();
    var allHtml = getAllDogsHtml(allDogs);
    $dogTarget.prepend(allHtml);

  };
  function newDogRender(dog){
    var newDog = getDogHtml(dog);
    $('#newProfileDog').append(newDog);

  }
  function handleGetSuccess(data){
    render();
    console.log("rendderring!!!");
    //res.render('feed');
  };

  function handleGetError(err){
    console.log("bummer error" +err);
    $dogTarget.text("failed to load, server working?")
  };
function handleGetProfileSucc(data){
  var newDog = getDogHtml(data);
  $('#newProfileDog').append(newDog);
}
function handleGetProfileError(err){
  console.log("bummer error" +err);
};

  function handleDeleteClick(e){
    var id = $(this).closest('.dog').data('dog-id');
    var ownerid = $(this).children('.owner').data('owner-id');
    console.log("clicked delete for"+id);
    console.log("clicked for " +ownerid);
    $('#deleteModal').data('dog-id',id);
    $('#deleteModal').modal();
    console.log("modal pop up");
    };

    $('#deleteDog').on('click', function deleteButton(e){
      var id = $('#deleteModal').data('dog-id');
      console.log('id is ' + id);
      $.ajax({
        method:"DELETE",
        url: '/api/dogs/' + id,
        success: handleDeleteSuccess,
        error: handleDeleteError,
      });
    function handleDeleteSuccess(e){
      $('#deleteModal').modal('hide');
      $(this).closest('.dog').empty();
      //$(this).sibling('.owner').empty();
      $.get('/api/dogs/'+id, function(data){
        //remove current instance of album
        $('[data-dog-id=' + id + ']').fadeOut();
           //re-render album
        getDogHtml(e);
          });
          console.log("dog deleted");
    }
    function handleDeleteError(e){
      console.log(e + 'error');
    }
    });
    // function getDogSaveHtml(dog) {
    //   var html=( `<hr>
    //               <p>
    //               <div class='col-sm-6 row dog border text-center' data-dog-id = ${dog._id} >
    //               <img src="../images/bookPic.png" alt="book image">
    //               <br/>
    //                 <span class='dog-name'>${dog.dogName}</span>
    //                 is a <span class='dog-size'>${(dog.isBig === true ? 'large' : 'small')}</span><span class='dog-breed'> ${dog.breed}</span>.
    //                 <br/>
    //                 They are <span class='dog-temper'>${(dog.isSocialized === true ? 'great' : 'not very good')}</span> with other dogs.
    //                 <br/>
    //                 </p>
    //                 <button id="updateDog" class="btn btn-info update-dog" type="update">
    //                 <span class="label">Update Dog</span>
    //                 <span class="glyphicon glyphicon-pencil"></span>
    //                 </button>
    //                 <button id="saveDog" class="btn btn-info save-dog hidden" type="save">
    //                 <span class="label">Save Changes</span>
    //                 <span class="glyphicon glyphicon-ok"></span>
    //                 </button>
    //                 </div>
    //                 <div class='col-sm-6 row owner border text-center' data-human-id =${(dog.human) ? dog.human._id : 'null'}>
    //                 <img src="../images/authorPic.png" alt="author image">
    //                 <br/>
    //                   <b><span class='owner-name'>${(dog.human) ? dog.human.ownerName : 'null'}</span></b>
    //                   is a <span class ='owner-age'>${(dog.human) ? dog.human.age : 'null'}</span> year old <span class='owner-gender'>${(dog.human) ? dog.human.gender : 'null'}</span>.
    //                   <br/>
    //                   Email is <span class='email'>${(dog.human) ? dog.human.email : 'null'}<span>.
    //                   </p>
    //                   <button id="updateOwner" class="btn btn-info update-owner" type="update">
    //                   <span class="label">Update Owner</span>
    //                   <span class="glyphicon glyphicon-pencil"></span>
    //                   </button>
    //                   <button id="saveOwner" class="btn btn-info save-owner hidden" type="save">
    //                   <span class="label">Save Changes</span>
    //                   <span class="glyphicon glyphicon-ok"></span>
    //                   </button>
    //                   <button id="delete" class="btn btn-danger delete-dog" type="delete">
    //                   <span class="label">Delete Dog</span>
    //                   <span class="glyphicon glyphicon-trash"></span>
    //                   </button>
    //                   </div>
    //             `);
    //             $('#dogTarget').prepend(html);
    //
    // };
  })//end document ready
