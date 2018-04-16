$(document).ready(function()
{
	(function($)
	{
		// Use fullpage plugin to slide (smoothly) from page to page
		$('#fullpage').fullpage(
		{
			autoScrolling: false,
			menu: '#menu',
			anchors:['section-0', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6'],
			sectionSelector: 'section'
		});
	})(jQuery);

});
