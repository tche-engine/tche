var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


//TODO :: como colocar isso no local certo sem criar sempre o path absoluto??
var texture = PIXI.Texture.fromImage('http://localhost:8080/tche-maker/sample-game/assets/bunny.png');

var createAndAnimateBunny = function(pos,left){
	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);

	// center the sprite's anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite to the center of the screen
	bunny.position.x = pos.x;
	bunny.position.y = pos.y;

	stage.addChild(bunny);

	// start animating
	animate();
	function animate() {
	    requestAnimationFrame(animate);

	    // just for fun, let's rotate mr rabbit a little
	    if (left){
	    	bunny.rotation += 0.1;
	    }else{
	    	bunny.rotation -= 0.1;
	    }

	    // render the container
	    renderer.render(stage);
	}

};

for (var j = 10 - 1; j >= 0; j--) {
	for (var i = 10 - 1; i >= 0; i--) {
		createAndAnimateBunny({
			x: 100 * j,
			y: 75 * i
		},
		j % 2 === 0);
	}
}