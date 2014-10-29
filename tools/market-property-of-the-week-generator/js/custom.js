//function that adds row to a given "data-rows" ID
$('#addRow').click(function(){
  var rowsID = '#' + $(this).attr('data-rows');

  var row = '<div class="row collapse feature-row"><div class="small-1 columns"><span class="prefix"><a href="#" class="move-row-up" title="Move this feature up one position"><i class="fa fa-arrow-up"></i></a></span></div><div class="small-10 columns"><input type="text" placeholder="Feature" name="feature-list" /></div><div class="small-1 columns"><span class="postfix remove-row-wrapper"><a href="#" class="remove-row" title="Remove this feature"><i class="fa fa-times"></i></a></span></div></div>';

  $(rowsID).append(row);

  return false;
});

//function that removes the selected row from #feature-rows
$('#feature-rows').on('click', '.remove-row', function(){
  var $currentFeatureRow = $(this).closest('.feature-row');

  $currentFeatureRow.remove();

  return false;
});

//function that moves the selected row up one position
$('#feature-rows').on('click', '.move-row-up', function(){
  var $currentFeatureRow = $(this).closest('.feature-row');
  var $previousFeatureRow = $currentFeatureRow.prev('.feature-row');

  if ($previousFeatureRow.length != 0) {
    $previousFeatureRow.before($currentFeatureRow);
  }

  return false;
});

//handle form submission
$('#property-of-the-week-form').foundation({bindings:'events'});
$('#property-of-the-week-form').on('valid.fndtn.abide', function() {
  revealResults();
  generateHTML();
});

//helper functions
  //reveal results
  function revealResults() {
    var formWrapper = $('#form-wrapper');
    var resultsWrapper = $('#results-wrapper');

    formWrapper.slideUp(400);
    resultsWrapper.slideDown(800);
  }

  //generate HTML functions
  function generateHTML() {
    var formData = $('#property-of-the-week-form input').serializeArray();
    var values = [];
    var featureList = [];
    var i = 0;

    formData.forEach(function(entry) {
        if(entry.name == 'feature-list') {
          featureList[i] = entry.value;
          i++;
        }
        else {
          values[entry.name] = entry.value;
        }
    });

    values['feature-list'] = featureList;

    console.log(values);
  }