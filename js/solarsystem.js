var ss = [], 
	sun, 
	planets = [], 
	orbits = [], 
	ssScale,
	scaling = true,
	prevTime = 0;

var solarSystemScale = function(){
	this.s = .000001;	
	this.sunScale = .00001;
	this.planetScale = .001;
	return this;
} 				

function findSemiMinor(){
	for( var i = 1; i < ephemeris.length; i++ ){
		ephemeris[i].semiMinor = ephemeris[i].A * Math.sqrt( 1 - ephemeris[i].EC * ephemeris[i].EC );
	}
}

function planetsOrbit( time ){
	if( time > prevTime ){
		for ( var i = 1; i < ss.length; i ++ ) {
	        var planet = ss[i];
			ss[i].orbiting( time, ssScale.s );
		}
		prevTime = time;
	}	
}

function setSolarSystemScale(){
	if ( scaling ){
		var sunS = 1392684 * ssScale.sunScale;
		ss[0].scale.set( sunS, sunS, sunS );

		for ( var i = 1; i < ss.length; i ++ ) {
			var planetS = ephemeris[i].size * ssScale.planetScale;
			ss[i].scale.set( planetS, planetS, planetS );
			ss[i].orbit.scale.set( ssScale.s, ssScale.s, ssScale.s );
	    }

	scaling = false;

	}
}

var Orbit = function( planetNum, e, scale ){
	
	var axisRez = 30 * planetNum,
		eph = e;

	var axisPoints = [];
	var spline = [];

	var material = new THREE.LineBasicMaterial( { 
		color: 0x808080 , 
		linewidth: 1 
	});

	var particles = new THREE.Geometry(),
	    pMaterial = new THREE.ParticleBasicMaterial({
	        color: 0x707070 ,
	        size: 2,
	        fog: true,
	        transparent: true
	});
	
	for( var i = 0; i < axisRez; i++ ) {
		x = ( eph.A * Math.cos( i / axisRez * Math.PI * 2 ) + ( eph.aphelion - eph.A ) );
		z = ( eph.semiMinor * Math.sin( i / axisRez * Math.PI * 2 ) );
		axisPoints[i] = new THREE.Vector3( x, 0, z );
	}
		
	spline =  new THREE.ClosedSplineCurve3( axisPoints );
	var splineGeo = new THREE.Geometry();
	var splinePoints = spline.getPoints( axisRez );
	
	for(var i = 0; i < splinePoints.length; i++){
		splineGeo.vertices.push(splinePoints[i]);
		particles.vertices.push(splinePoints[i]); 
	}

	var particleSystem = new THREE.ParticleSystem( particles, pMaterial);
	var LOD = new THREE.Line( splineGeo, material );	

 return particleSystem;
};

var Planet = function( material ){

	var LOD,
		LODLevel = 3,
		LODDistance = 3000,
		eph;

	sphereGeo = new THREE.SphereGeometry( 1, 15, 15 );
	LOD = new THREE.Mesh ( sphereGeo, material );
	LOD.startTime = 0;

	LOD.setOrbit = function( e ){
		eph = e;
		this.startTime = Math.random() * eph.A;
		this.orbiting( this.startTime, eph.period, .00001 );
	};

	LOD.orbiting = function( time, scale ){

		time += this.startTime;

		var orbitSpeed = time / eph.period;
		this.rotation.y = time * eph.period / 1000; 
		this.position.x = scale * ( eph.A * Math.cos( Math.PI * 2 - orbitSpeed ) + ( eph.aphelion - eph.A ) );
		this.position.z = scale * ( eph.semiMinor * Math.sin(  Math.PI * 2 - orbitSpeed ) );
	};

	return LOD;
};


function makeSolarSystem(){

	findSemiMinor();
	ssScale = new solarSystemScale( { s: .000001, sunScale: .0001, planetScale: .001 } );

	var ss3D = new THREE.Object3D();

	var sunMaterial = new THREE.MeshBasicMaterial( { 
		map: THREE.ImageUtils.loadTexture( 'textures/planets/sunmap.jpg' ), 
		overdraw: true 
	});
	
	var sun = new Planet( sunMaterial );
	sun.name = "The Sun";

	ss.push( sun );
	ss3D.add( ss[0] );

	for ( var i = 1; i < ephemeris.length; i ++ ) {

		var planetMaterial = new THREE.MeshLambertMaterial( { 
				map: THREE.ImageUtils.loadTexture( ephemeris[i].texture ), 
				overdraw: true 
		});

		var axisMaterial = new THREE.LineBasicMaterial( { 
			color: 0x202020, 
			opacity: .5, 
			linewidth: .5 
		});
		
		ss.push( new Planet( planetMaterial ) );
		ss[i].setOrbit( ephemeris[i] );
		ss[i].name = ephemeris[i].name;


		ss[i].orbit = new Orbit( i, ephemeris[i], axisMaterial );
		ss[i].orbit.name = ss[i].name + " Orbit";

		ss3D.add( ss[i] );
		ss3D.add( ss[i].orbit );

	}

	var ruler = new Ruler( ss[3], ss[4] );
	ss3D.add( ruler );

	setSolarSystemScale();
	return ss3D;
};