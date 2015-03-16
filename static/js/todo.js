'use-strict';

// Add new task
$('form').submit(function () {

    // Add to the list
    var newTask = $('input').val();
    if (newTask !== '') {
        $('ul').append('<li>' + newTask + '<a href="">done</a></li>');
    };

    // Clear input box
    $('input').val('');

    return false;
});

// Remove a completed/cancelled task
$(document).on('click', 'a', function (e) {
    e.preventDefault();
    $(this).parent().remove();
});
