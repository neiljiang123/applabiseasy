
      import React, {useState} from 'react';
import './App.css';
// search the names of the items in the typebox




function App() {
  return (
    <div className="App">
      <h1>Your Shopping Cart</h1>
     <ShoppingCart />
    </div>
  );
}

// function ShoppingCart() {

//   const [products, setProducts] = useState(null);

//   var newProducts = searchedItems.map(function(singleProduct){
//     return (
//       <div className='product' >
//         <p>{singleProduct.description}</p>
//         <br>
//         </br>
//         <p className='money'>{singleProduct.price}</p>
//         <img src={singleProduct.image}></img>
//     </div>
//     )
//   })

//   setProducts(newProducts);

//   return(
//     <div className="cart">
//       {products}
//     </div>
//   );
// }

var initialMouse = 0;
var slideMovementTotal = 0;
var mouseIsDown = false;
var slider = $('#slider');

slider.on('mousedown touchstart', function(event){
	mouseIsDown = true;
	slideMovementTotal = $('#button-background').width() - $(this).width() + 10;
	initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
});

$(document.body, '#slider').on('mouseup touchend', function (event) {
	if (!mouseIsDown)
		return;
	mouseIsDown = false;
	var currentMouse = event.clientX || event.changedTouches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;

	if (relativeMouse < slideMovementTotal) {
		$('.slide-text').fadeTo(300, 1);
		slider.animate({
			left: "-10px"
		}, 300);
		return;
	}
	slider.addClass('unlocked');
	$('#locker').text('lock_outline');
	setTimeout(function(){
		slider.on('click tap', function(event){
			if (!slider.hasClass('unlocked'))
				return;
			slider.removeClass('unlocked');
			$('#locker').text('lock_open');
			slider.off('click tap');
		});
	}, 0);
});

$(document.body).on('mousemove touchmove', function(event){
	if (!mouseIsDown)
		return;

	var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
	var relativeMouse = currentMouse - initialMouse;
	var slidePercent = 1 - (relativeMouse / slideMovementTotal);
	
	$('.slide-text').fadeTo(0, slidePercent);

	if (relativeMouse <= 0) {
		slider.css({'left': '-10px'});
		return;
	}
	if (relativeMouse >= slideMovementTotal + 10) {
		slider.css({'left': slideMovementTotal + 'px'});
		return;
	}
	slider.css({'left': relativeMouse - 10});
});




export default App;
