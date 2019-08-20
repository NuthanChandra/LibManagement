$("#issue_date").change(function() {
    var date = new Date(this.value);
    date.setDate(date.getDate() + 15);
    // Further extract the Day and add or delete a day
    $("#return_date").val(date.toISOString().split('T')[0]);
  });
