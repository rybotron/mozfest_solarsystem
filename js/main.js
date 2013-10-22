// rAF shim
// A variation of Paul Irish's Shim http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// updated by Greg Hewgill http://stackoverflow.com/users/893/greg-hewgill
var requestAnimationFrame = 
    window.requestAnimationFrame || //Chromium 
    window.webkitRequestAnimationFrame || //Webkit
    window.mozRequestAnimationFrame || //Mozilla Geko
    window.oRequestAnimationFrame || //Opera Presto
    window.msRequestAnimationFrame || //IE Trident?
    function(callback) { //Fallback function
        window.setTimeout(callback, 1000/60);
	};

// Shader Loader from 100,000 Stars http://workshop.chromeexperiments.com/stars/
var shaderList = ['js/shaders/lavashader'];

function loadShaders(list, callback) {
    var shaders = {};
    var expectedFiles = list.length * 2;
    var loadedFiles = 0;

    function makeCallback(name, type) {
        return function (data) {
            if (shaders[name] === undefined) {
                shaders[name] = {};
            }
            shaders[name][type] = data;
            loadedFiles++;
            if (loadedFiles == expectedFiles) {
                callback(shaders);
            }
        };
    }
    for (var i = 0; i < list.length; i++) {
        var vertexShaderFile = list[i] + '.vsh';
        var fragmentShaderFile = list[i] + '.fsh';
        var splitted = list[i].split('/');
        var shaderName = splitted[splitted.length - 1];
        $(document)
            .load(vertexShaderFile, makeCallback(shaderName, 'vertex'));
        $(document)
            .load(fragmentShaderFile, makeCallback(shaderName, 'fragment'));
    }
}

var ephemeris = [
	{ name:"Sun", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Sun' }, texture: 'textures/planets/sunmap.jpg', size: 1392684, orbit_sidereal_in_days: 0, diameter_km:1392000, diameter_sqrtln:7.072, obliquity:0, rotation_sidereal_in_days:0, a_semimajor_axis:0, e_eccentricity:0, i_inclination:0, O_perihelion:0, w_ecliptic_long:0, L_mean_anomaly:0, a_per_cy:0, e_per_cy:0, i_per_cy:0, O_per_cy:0, w_per_cy:0, L_per_cy:0},
	{ name:"Mercury", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Mercury_(planet)' }, texture: 'textures/planets/mercurymap.jpg', size: 2439.7,	period: 88.0, EC: 0.20563593, A: 57909227, aphelion: 69817445, orbit_sidereal_in_days: 87.96926, rotation_sidereal_in_days:58.6467, diameter_km:4879, diameter_sqrtln:4.246, obliquity:0.01,  a_semimajor_axis:0.38709893, e_eccentricity:0.20563069, i_inclination:7.00487, O_ecliptic_long:48.33167, w_perihelion:77.45645, L_mean_longitude:252.25084, a_per_cy:0.00000066, e_per_cy:0.00002527, i_per_cy:-23.51, O_per_cy:-446.30, w_per_cy:573.57, L_per_cy:538101628.29},
	{ name:"Venus", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Venus' }, texture: 'textures/planets/venusmap.jpg', size: 6051.8, period: 224.7, EC: 0.00677672, A: 108209475, aphelion: 108942780, orbit_sidereal_in_days: 224.7008, rotation_sidereal_in_days:-243.02, diameter_km:12104, diameter_sqrtln:4.701, obliquity:177.4, a_semimajor_axis:0.72333199, e_eccentricity:0.00677323, i_inclination:3.39471, O_ecliptic_long:76.68069, w_perihelion:131.53298, L_mean_longitude:181.97973, a_per_cy:0.00000092, e_per_cy:-0.00004938, i_per_cy:-2.86, O_per_cy:-996.89, w_per_cy:-108.80, L_per_cy:210664136.06},
	{ name:"Earth", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Earth' }, texture: 'textures/planets/earthmap2.jpg', size: 6371.00, period: 365.2, EC: 0.01671123, A: 149598262, aphelion: 152098233, orbit_sidereal_in_days: 365.25636, rotation_sidereal_in_days: 1, diameter_km: 12756, diameter_sqrtln: 4.727, obliquity: 23.439, a_semimajor_axis: 1.00000011, e_eccentricity: 0.01671022, i_inclination: 0.00005, O_ecliptic_long: -11.26064, w_perihelion: 102.94719, L_mean_longitude: 100.46435, a_per_cy: -0.00000005, e_per_cy: -0.00003804, i_per_cy: -46.94, O_per_cy: -18228.25, w_per_cy: 1198.28, L_per_cy: 129597740.63},
	{ name:"Mars", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Mars' }, texture: 'textures/planets/marsmap.jpg', size: 3389.5, period: 687, EC: 0.0933941, A: 227943824,	aphelion: 249232432,  orbit_sidereal_in_days: 686.97959, rotation_sidereal_in_days:24.62326, diameter_km:6794, diameter_sqrtln:4.412, obliquity:1.5424, a_semimajor_axis:1.52366231, e_eccentricity:0.09341233, i_inclination:1.85061, O_ecliptic_long:49.57854, w_perihelion:336.04084, L_mean_longitude:355.45332, a_per_cy:-0.00007221, e_per_cy:0.00011902, i_per_cy:-25.47, O_per_cy:-1020.19, w_per_cy:1560.78, L_per_cy:68905103.78},
	{ name:"Jupiter", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Jupiter' }, texture: 'textures/planets/jupitermap.jpg', size: 69911, period: 433.2, EC: 0.04838624, A: 778340821, aphelion: 816001807, orbit_sidereal_in_days: 4332.8201, rotation_sidereal_in_days:0.38451, diameter_km:142984, diameter_sqrtln:5.935, obliquity:3.13, a_semimajor_axis:5.20336301, e_eccentricity:0.04839266, i_inclination:1.30530, O_ecliptic_long:100.55615, w_perihelion:14.75385, L_mean_longitude:34.40438, a_per_cy:0.00060737, e_per_cy:-0.00012880, i_per_cy:-4.15, O_per_cy:1217.17, w_per_cy:839.93, L_per_cy:10925078.35},
	{ name:"Saturn", title: { text: 'Name of the planet please', url: 'images/saturn_popup.png' }, texture: 'textures/planets/saturnmap.jpg',	size: 58232, period: 10760,	EC: 0.05386179,	A: 1426666422, aphelion: 1503509229, orbit_sidereal_in_days: 10755.699, rotation_sidereal_in_days:0.43929, diameter_km:120536, diameter_sqrtln:5.85, obliquity:26.73, a_semimajor_axis:9.53707032, e_eccentricity:0.05415060, i_inclination:2.48446, O_ecliptic_long:113.71504, w_perihelion:92.43194, L_mean_longitude:49.94432, a_per_cy:-0.00301530, e_per_cy:-0.00036762, i_per_cy:6.11, O_per_cy:-1591.05, w_per_cy:-1948.89, L_per_cy:4401052.95},
	{ name:"Uranus", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Uranus' }, texture: 'textures/planets/uranusmap.jpg', size: 25362, period: 30700,	EC: 0.04725744,	A: 2870658186, aphelion: 3006318143, orbit_sidereal_in_days: 30681.84, rotation_sidereal_in_days:-0.7183333, diameter_km:51118, diameter_sqrtln:5.421, obliquity:97.77, a_semimajor_axis:19.19126393, e_eccentricity:0.04716771, i_inclination:0.76986, O_ecliptic_long:74.22988, w_perihelion:170.96424, L_mean_longitude:313.23218, a_per_cy:0.00152025, e_per_cy:-0.00019150, i_per_cy:-2.09, O_per_cy:-1681.40, w_per_cy:1312.56, L_per_cy:1542547.79},
	{ name:"Neptune", title: { text: 'Name of the planet please', url: 'http://en.wikipedia.org/wiki/Neptune' }, texture: 'textures/planets/neptunemap.jpg', size: 24622, period: 60200, EC: 0.00859048, A: 4498396441, aphelion: 4537039826, orbit_sidereal_in_days: 60194.85, rotation_sidereal_in_days:0.67125, diameter_km:49528, diameter_sqrtln:5.405, obliquity:28.32, a_semimajor_axis:30.06896348, e_eccentricity:0.00858587, i_inclination:1.76917, O_ecliptic_long:131.72169, w_perihelion:44.97135, L_mean_longitude:304.88003, a_per_cy:-0.00125196, e_per_cy:0.00002510, i_per_cy:-3.64, O_per_cy:-151.25, w_per_cy:-844.43, L_per_cy:786449.21},
];

var WIDTH = $(window).width(),
    HEIGHT = $(window).height();

var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 1,
	FAR = 100000;

var stats, 
	scene,
	camera,
	renderer, 
	projector,
	composer, 
	controls,
	tween,
	camTarget,
	solarSystem,
	dae;

var trajectory;

var time, t;
var clock = new THREE.Clock();

var mouse = { x: -1000, y: 0 }, 
	INTERSECTED;

var timer = function(){
	this.count = 1;
	this.multiplier = .25;
	return this;
}

function vec3Mid( vec1, vec2 ){
	var vec = new THREE.Vector3();
	vec.x = (vec1.x + vec2.x) / 2;
	vec.y = (vec1.y + vec2.y) / 2;
	vec.z = (vec1.z + vec2.z) / 2;
	return vec;
}

var camPosition = function( position, target, time ){
	this.tween = function(){
		TWEEN.removeAll();
		camTweener( position, target, time );
	};
	return this;
}

function camTweener( newCamPosition, newTarget, time ) {

	var camCurrentPosition	= camera.position;
	var camCurrentRotation	= camera.rotation;
	var camCurrentTarget = camTarget;

	tweenPosition = new TWEEN.Tween( camCurrentPosition )
		.to( newCamPosition , time )
		.delay(0)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onUpdate( function() {
			camera.position = camCurrentPosition;
			camera.rotation = camCurrentRotation;
			// camera.lookAt( camCurrentTarget );
		});

	tweenLookAt = new TWEEN.Tween( camCurrentTarget )
		.to( newTarget, time)
		.delay(0)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.onComplete( function(){
			camera.lookAt( newTarget );
		});

	tweenPosition.start();
	tweenLookAt.start();
}

function addLensFlare( x, y, z, size, overrideImage ){

	var flareColor = new THREE.Color( 0xffffff );

	var lensFlare = new THREE.LensFlare( overrideImage, 700, 0.0, THREE.AdditiveBlending, flareColor );

	var textureFlare0 = THREE.ImageUtils.loadTexture( "./textures/lensflare/lensflare0.png" );
	var textureFlare2 = THREE.ImageUtils.loadTexture( "./textures/lensflare/lensflare2.png" );
	var textureFlare3 = THREE.ImageUtils.loadTexture( "./textures/lensflare/lensflare3.png" );

	lensFlare.add( textureFlare0, 200, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

	lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

	lensFlare.customUpdateCallback = lensFlareUpdateCallback;

	lensFlare.position = new THREE.Vector3(x,y,z);
	lensFlare.size = size ? size : 16000 ;
	return lensFlare;

}

function lensFlareUpdateCallback( object ) {

	var f, fl = object.lensFlares.length;
	var flare;
	var vecX = -object.positionScreen.x * 2;
	var vecY = -object.positionScreen.y * 2;


	for( f = 0; f < fl; f++ ) {

	   flare = object.lensFlares[ f ];

	   flare.x = object.positionScreen.x + vecX * flare.distance;
	   flare.y = object.positionScreen.y + vecY * flare.distance;

	   flare.rotation = 0;

	}

	object.lensFlares[ 2 ].y += 0.025;
	object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
}


/********************************
	PAGE LOADING
********************************/

function setLoadMessage( msg ){
	$( '#loadtext' ).html(msg + "...");
}

$(document).ready( function() {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	$( '#loadtext' ).show();
	setLoadMessage("Loading the Solar System");

	// Load the Galaxy Collada
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'meshes/galaxy.dae', function ( collada ) {

		dae = collada.scene;
		dae.scale.x = dae.scale.y = dae.scale.z = 50000;
		dae.updateMatrix();

	} );

	loadShaders( shaderList, function (e) {
		shaderList = e;
		postShadersLoaded();
	});

	var postShadersLoaded = function () {
	        initThreeD();
	        animate();
			$("#loadtext").hide();
    };
} );


function initThreeD() {

	/********************************
		SCENE SETUP
	********************************/
	$container = $("#container");

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.000055 );

	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
	camera.position.y = 200;
	camera.position.z = 500;

	camTarget = new THREE.Vector3();
	camTarget = scene.position;

	fovValue = 0.5 / Math.tan(camera.fov * Math.PI / 360) * HEIGHT;
	
	var ambientLight = new THREE.AmbientLight( 0x404040 );
	ambientLight.color.setRGB( .30, .30, .30 );
	scene.add(ambientLight);

	var pointLight = new THREE.PointLight(0xFFFFFF, 1.25);

	pointLight.position.x = 0;
	pointLight.position.y = 0;
	pointLight.position.z = 0;

	scene.add(pointLight);

	solarSystem = makeSolarSystem();

    var systemSize = 10000;
    var stars = new THREE.Geometry();

    for ( i = 0; i < 10000; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * systemSize - systemSize/2;
        vertex.y = Math.random() * systemSize - systemSize/2;
        vertex.z = Math.random() * systemSize - systemSize/2;

        stars.vertices.push( vertex );
    }

    var starMaterial =   new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture( "textures/star.png" ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    var starField = new THREE.ParticleSystem( stars, starMaterial );

    starField.rotation.x = Math.random() * 6;
    starField.rotation.y = Math.random() * 6;
    starField.rotation.z = Math.random() * 6;

	solarSystem.add( starField );

	lensFlares = new THREE.Object3D();
	var override = THREE.ImageUtils.loadTexture( "textures/lensflare/hexangle.png" );
	var sunFlare = addLensFlare( 0, 0, 10, 5, override );
	lensFlares.add( sunFlare );

	scene.add( dae );
	scene.add( solarSystem );
	scene.add( lensFlares );

	// Camera Positions for GUI
	camOne = new camPosition( { x: 0, y: 50, z: 500 }, { x: 0, y: 0, z: 0 }, 1500 );
	camTwo = new camPosition( { x: 0, y: 12000, z: 500 }, { x: 0, y: 0, z: 0 }, 5000 );
	camThree = new camPosition( { x: -500, y: 250, z: -1000 }, { x: 0, y: 0, z: 0 }, 3000 );

	t = new timer();


	/********************************
		RENDERER
	********************************/
	projector = new THREE.Projector();

	renderer = Detector.webgl? new THREE.WebGLRenderer( { antialias: true } ): new THREE.CanvasRenderer();
	renderer.setSize( WIDTH, HEIGHT );

	$container.append( renderer.domElement );
	renderer.autoClear = false;

	controls = new THREE.OrbitControls( camera, $container[0] );
	controls.addEventListener( 'change', render );
	controls.minDistance = 0;
	controls.maxDistance = 12000;


	/********************************
		STATS
	********************************/

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	$container.append( stats.domElement );

	/********************************
		GUI
	********************************/
	
	var gui = new dat.GUI();
	gui.add( t, 'multiplier', 0, 5).name( 'Orbit Speed' );

	gui.add(ssScale, 's', .000001, .00001)
		.name('SS Scale')
		.onChange( function(){
			scaling = true;
		});
	gui.add(ssScale, 'sunScale', .00001, .0001)
		.name('Sun Scale')
		.onChange( function(){
			scaling = true;
		});
	gui.add(ssScale, 'planetScale', .001, .01)
		.name('Planet Scale')
		.onChange( function(){
			scaling = true;
		});

	var camFolder = gui.addFolder( 'Camera Positions' );
	camFolder.open();
	camFolder.add( camOne, 'tween' ).name( 'Camera Home' );
	camFolder.add( camTwo, 'tween' ).name( 'Camera Two' );
	camFolder.add( camThree, 'tween' ).name( 'Camera Three' );


	// Event Listeners
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentMouseDown( event ) {

	var vector,
		projector,
		raycaster,
		intersects,
		CLICKED,
		posCLICKED,
		lookAtCLICKED,
		zScale,
		camCLICKED;

	vector = new THREE.Vector3( mouse.x, mouse.y, 1 );

	projector = new THREE.Projector();
	projector.unprojectVector( vector, camera );

	raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	intersects = raycaster.intersectObjects( solarSystem.children );

	//if ( event.shiftKey && intersects.length > 0 ) {
	if ( intersects.length > 0 ) { 

		CLICKED = intersects[ 0 ].object;

		posCLICKED = new THREE.Vector3();
		posCLICKED.getPositionFromMatrix( CLICKED.matrixWorld );

		zScale = CLICKED.scale.z * 5;
		lookAtCLICKED = { x: posCLICKED.x + 50, y: posCLICKED.y + 50, z: posCLICKED.z + zScale };

		camCLICKED = new camPosition( lookAtCLICKED, posCLICKED, 1000 );
		camCLICKED.tween();
	}

}

function onWindowResize() {

	windowHalfX = $(window).width() / 2;
	windowHalfY = $(window).height() / 2;

	camera.aspect = $(window).width() / $(window).height();
	camera.updateProjectionMatrix();

	renderer.setSize( $(window).width(), $(window).height() );

}

function animate() {

	requestAnimationFrame( animate );

    camera.updateProjectionMatrix();
	camera.lookAt( camTarget );

	updateRulers();
	controls.update();
	stats.update();
	TWEEN.update();
	setSolarSystemScale();
	planetsOrbit( t.count );

	scene.updateMatrixWorld();

	var delta = clock.getDelta();
	var time = clock.getElapsedTime();

	t.count = t.count + 1 * t.multiplier;

	camera.lookAt( camTarget );
	render();
}

function render() {

	renderer.clear();
	renderer.render( scene, camera );

}