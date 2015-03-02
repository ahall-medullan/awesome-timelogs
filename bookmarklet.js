(function($, d, n, i, s){ 
	for( ; i > 0; i--,d.addDays(-1)){ 
	  if(d.getDay() == 0 || d.getDay() == 6) continue;
	  s = (d.getYear() + 1900)+'-'+(d.getMonth()+1)+'-'+d.getDate();
	  n += '<label style="size:10pt"><input type="checkbox" value="' + s + '"/>' + s + '</label>'; 
	}

	$('<p id=xdates/>').append(n).appendTo($('.form_col_right').empty());
	$('input[value="Add To Log"]').before($('<input type=button value="Magic" id="xmagic"/>'));
	$('#xmagic').on('click', function(e){ 
		var project = $('#project_id').val() || 59, 
			task = $('#task_id').val() || 200, 
			hours = $('#hours').val() || 1, 
			notes = $('#notes').val() || 'Lunch';
			
			$('#xdates :checked').each(function(){ 
				day = $(this).val();
				d = day.split('-');

				return $.ajax({ 
					type: "POST",
					success: function(d){ console.log('added', day, notes); },
					data: {
						mode: "timeaddsubmit", submit: "Add To Log",
						year: d[0], month_id: d[1], day: d[2],
						project_id: project, task_id: task,
						hours: hours, notes: notes 
					}
				});
			}); 
	}); 
})(jQuery, new Date(), '', 30)
