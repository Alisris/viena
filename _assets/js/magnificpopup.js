//magnificpopup
$(function(){
	var mfpOpen = false;
	var swipeenabled = false;
	
	var lang = $('html').attr('lang');			
	
	var previmage = "Vorheriges Bild";
	var nextimage = "Nächstes Bild";
	var imgcounter = "Bild %curr% von %total%";
	
	if(lang == "en") {	
		previmage = "Previous Image";
		nextimage = "Next Image";
		imgcounter = "Image %curr% of %total%";
	} else if(lang == "it") {
		previmage = "foto precedente";
		nextimage = "foto successiva";
		imgcounter = "foto %curr% di %total%";
	}
	
	$('.img-container').each(function(e){
		//console.log('no freepage');

		$(this).magnificPopup({
		  delegate: 'a', // child items selector, by clicking on it popup will open
		  type: 'image',
		  gallery:{
			enabled:true,
		  	preload: [1,3],
			tPrev: previmage, // title for left button
			tNext: nextimage, // title for right button
			tCounter: imgcounter // markup of counter
		  },
		  mainClass: 'mfp-zoom', // this class is for CSS animation below
		  zoom: {
			enabled: true, // By default it's false, so don't forget to enable it
		
			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function 
//			disableOn: true,
			// The "opener" function should return the element from which popup will be zoomed in
			// and to which popup will be scaled down
			// By defailt it looks for an image tag:
			opener: function(openerElement) {
			  // openerElement is the element on which popup was initialized, in this case its <a> tag
			  // you don't need to add "opener" option if this code matches your needs, it's defailt one.
			  return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		  },
		  callbacks: {
			open: function() {

				var magnificPopup = $.magnificPopup.instance;

				if(magnificPopup.items.length > 1){
					
					$(".mfp-gallery").swipe({
						//callback
						swipe:function(event, direction, distance, duration, fingerCount) {
						},
						swipeLeft:function(event, distance, duration, fingerCount) {
						  magnificPopup.next();
						},
						swipeRight:function(event, distance, duration, fingerCount) {
						  magnificPopup.prev();
						},
						
						threshold:0,
						fingers:'all'
					});
					
				
				}
			},
			close: function() {
				$(".mfp-gallery").swipe("destroy");	
			}
		  }
		  // other options
		});  
		
	});


	
	$(".iframe-popup").magnificPopup({
		type: 'iframe'
	});
	
	/*$(".inline-popup").magnificPopup({
		type: 'inline'
	});*/
	
	$(document).on("click",".inline-popup",function(ev){
		
		ev.preventDefault();
		ev.stopPropagation();
		
		$.magnificPopup.open({
			items: {
			  src: $(this).attr("href"),
			  type: 'inline'
			},
			midClick: false,
			removalDelay: 500,
			mainClass: 'mfp-zoom-out',
			callbacks: {
				/*beforeOpen: function() {
					this.st.mainClass = this.st.el.attr('data-effect');
				},*/
				open: function() {
					$('.overlaybox').on('click', function(ev) {
						ev.preventDefault();
						ev.stopPropagation();
						$('#parentwrapper').css('position', 'fixed');
						params = ( $(this).attr("data-params") !== undefined ? $(this).attr("data-params") : "");
						href = $(this).attr("href");
						// close current popup
						$.magnificPopup.close();
						
						ajaxlinkclicked = true;
						
						return false;
					});
				},
                change: function() {
                    var thisthis = this;
                    setTimeout(function(){ $(document).trigger("magnificpopup_" + thisthis.currItem.data.src); console.log("magnificpopup_" + thisthis.currItem.data.src); }, 200);
                },
				afterClose: function() {
					
					$('.overlaybox').unbind("click");
					
					if(ajaxlinkclicked){
					
						$.magnificPopup.open({
							
							tLoading: "<img src='/assets2021/content/icon-spinner.svg' width='60' height='60' />",
							items: {
								src: ( href.indexOf('?') !== -1 ? href+'&'+params : href+'?'+params )
							},
							type: 'ajax'	
						});
						$('#parentwrapper').css('position', 'relative');
						ajaxlinkclicked = false;
					}
				
				}
			}
		});
	});
/*
	var mymouseXstart;
	var mymouseXend;
	var mymouseXend2;
	$( "a.nof" ).mousedown(function(event) {
		mymouseXstart = event.pageX;
	});
	
	$( "a.nof" ).mouseup(function(event) {
		mymouseXend = event.pageX;
		if((mymouseXstart>mymouseXend+20) || (mymouseXstart<mymouseXend-20)) {
			console.log('dont open');
			event.stopPropagation();
		}
	});
	$( "a.nof" ).click(function(event) {
		mymouseXend = event.pageX;
		if((mymouseXstart>mymouseXend2+20) || (mymouseXstart<mymouseXend2-20)) {
			console.log('dont open');
			event.stopPropagation();event.preventDefault();
		}	
	});
	*/
});