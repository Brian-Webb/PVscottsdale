//function that adds row to a given "data-rows" ID
$('#addRow').click(function(){
  //initialize needed variables
  var rowsID = '#' + $(this).attr('data-rows'),
      row = '<div class="row collapse feature-row"><div class="small-1 columns"><span class="prefix"><a href="#" class="move-row-up" title="Move this feature up one position"><i class="fa fa-arrow-up"></i></a></span></div><div class="small-10 columns"><input type="text" placeholder="Feature" name="feature-list" /></div><div class="small-1 columns"><span class="postfix remove-row-wrapper"><a href="#" class="remove-row" title="Remove this feature"><i class="fa fa-times"></i></a></span></div></div>';

  //inject the new row into the correct list
  $(rowsID).append(row);

  //cancel default event handler for click
  return false;
});

//function that removes the selected row from #feature-rows
$('#feature-rows').on('click', '.remove-row', function(){
  //initialize needed variables
  var $currentFeatureRow = $(this).closest('.feature-row');

  //delete the row that is the closest parent of the '.remove-row' button that was clicked
  $currentFeatureRow.remove();

  //cancel default event handler for click
  return false;
});

//function that moves the selected row up one position
$('#feature-rows').on('click', '.move-row-up', function(){
  //initialize needed variables
  var $currentFeatureRow = $(this).closest('.feature-row'),
      $previousFeatureRow = $currentFeatureRow.prev('.feature-row');

  //if there is a previous row (meaning this is not the first row) move the closest parent of the '.move-row-up' button that was clicked before the previous row
  if ($previousFeatureRow.length != 0) {
    $previousFeatureRow.before($currentFeatureRow);
  }

  //cancel default event handler for click
  return false;
});

//handle form submission
$('#property-of-the-week-form').foundation({bindings:'events'}); //needed to allow for custom handling of the abide valid event
$('#property-of-the-week-form').on('valid.fndtn.abide', function() {
  revealResults();
  generateHTML();
});

//helper functions
  //reveal results
  function revealResults() {
    //initialize needed variables
    var formWrapper = $('#form-wrapper'),
        resultsWrapper = $('#results-wrapper');

    //hide form
    formWrapper.slideUp(400);

    //reveal results
    resultsWrapper.slideDown(800);
  }

  //generate HTML functions
  function generateHTML() {
    //initialize needed variables
    var formData = $('#property-of-the-week-form input').serializeArray(), 
        values = [], 
        featureList = [], 
        i = 0, 
        htmlTemplate = '';

    //load all form fields into the 'values' variable array use
    formData.forEach(function(entry) {
        if(entry.name == 'feature-list') {
          featureList[i] = entry.value;
          i++;
        }
        else {
          values[entry.name] = entry.value;
        }
    });

    //load the textarea in that is missed by serializeArray()
    values['description'] = $('textarea[name="description"]').val();

      //replace 'returns' with br tag for formatting
      values['description'] = values['description'].replace(/\r?\n/g, '<br />');

    //create feature list ul/li
    values['feature-list'] = generateFeatureListHtml(featureList);

    //load html template
    $.get('htmltemplate.html').done(function( data ) {
      htmlTemplate = data;

      //check if mls-num is empty
      if(values['mls-num'] != '') {
        mls_replacment = values['mls-num'];
      } else {
        mls_replacment = '';
      }

      //replace placeholders in html template
      htmlTemplate = htmlTemplate.replace('{price}', values['price']);
      htmlTemplate = htmlTemplate.replace('{address}', values['address']);
      htmlTemplate = htmlTemplate.replace('{description}', values['description']);
      htmlTemplate = htmlTemplate.replace('{feature-list}', values['feature-list']);
      htmlTemplate = htmlTemplate.replace('{mls-num}', mls_replacment);

      //set results textarea value to the final resulting html
      $('#html-results').val(htmlTemplate);
    });
  }

  //generates the ul/li html for the featureList from array of values
  function generateFeatureListHtml(featureList) {
    //initialize needed variables
    var html = '<ul>';

    //for each feature, add another li tag including the value of the current index
    for(var i=0; i < featureList.length; i++) {
      //only add li if feature is not left blank
      if(featureList[i] != '') {
        html += '<li>' + featureList[i] + '</li>';
      }
    }

    //close the ul
    html += '</ul>';

    //return final html
    return html;
  }