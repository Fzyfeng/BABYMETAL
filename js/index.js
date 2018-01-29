
var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();
let data=[
  ['初登场_2010.11.28','2348876'],
  ['Tokyo Idol Festival _2011.8','2628809'],
  ['15分一本胜负_2012.4','3554891'],
  ['第二回横丁祭_2012.4','2761394'],
  ['护颈祭_2012.7','2761269'],
  ['Legend I_2012.10','2954144'],
  ['第一次海外演出 in Singapore_2012.11','1958674'],
  ['Legend D_2012.12','2988294'],
  ['Legend Z_2013.2','3116433'],
  ['1999圣诞祭_2013.6','3778604'],
  ['Summer Sonic Ⅰ_2013.8','4567577'],
  ['Inazuma Rock Fes_2013.9','1952618'],
  ['1997圣诞祭_2013.12','3416127'],
  ['武道馆红夜_2014.3.1','2153800'],
  ['武道馆黑夜_2014.3.2_','2166494'],
  ['Sonisphere Festival_2014.7','2811508'],
  ['Summer Sonic Ⅱ_2014.8','1969936'],
  ['2014世界巡演_2014.7~11','2347484'],
  ['2015新春狐狸祭_2015.1','2776414'],
  ['红黑弥撒_2015.4','4306302'],
  ['METROCK_2015.5','4566369'],
  ['巨大天下金属武道会_2015.6','6229265'],
  ['Summer Sonic Ⅲ_2015.8','3268743'],
  ['横滨アリーナ_2015.12','6244689'],
  ['伦敦温布利_2016.4','7295686'],
  ['NHK特番_2016.4','4357542'],
  ['NHK特番_2016.4','4584702'],
  ['东京巨蛋_2016.9','9608930']
]

function init() {

  let a = 100 ;
  let table = [];
  for(let i=0,n=1,m=3 ; table.length<=a ; i++){
    table[i]=[
      'position',
      'time',
      n,
      m++
    ];
    if(m===7){
      m=3;
      n++;
    }
  }


  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  // table

  for ( var i = 0; i < table.length; i++ ) {

    var element = document.createElement( 'img' );
    element.className = 'element';
    element.src='images/show.png';
    element.setAttribute('dataTH','9608930');
    //element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add( object );

    objects.push( object );

    var object = new THREE.Object3D();
    object.position.x = ( table[i][2] * 180 ) - 1330;
    object.position.y = - ( table[i][3] * 140 ) + 990;
    object.position.z = parseInt( Math.random() * 1000 );

    targets.table.push( object );

  }

  // sphere

  var vector = new THREE.Vector3();

  for ( var i = 0, l = objects.length; i < l; i ++ ) {

    var phi = Math.acos( -1 + ( 2 * i ) / l );
    var theta = Math.sqrt( l * Math.PI ) * phi;

    var object = new THREE.Object3D();

    object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
    object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
    object.position.z = 800 * Math.cos( phi );

    vector.copy( object.position ).multiplyScalar( 2 );

    object.lookAt( vector );

    targets.sphere.push( object );

  }

  // helix

  var vector = new THREE.Vector3();

  for ( var i = 0, l = objects.length; i < l; i ++ ) {

    var phi = i * 0.175 + Math.PI;

    var object = new THREE.Object3D();

    object.position.x = 1300 * Math.sin( phi );
    object.position.y = - ( i * 8 ) + 450;
    object.position.z = 1400 * Math.cos( phi );

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt( vector );

    targets.helix.push( object );

  }

  // grid

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = new THREE.Object3D();

    object.position.x = ( ( i % 5 ) * 400 ) - 800;
    object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
    object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

    targets.grid.push( object );

  }

  //

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  //

  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 0.5;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener( 'change', render );

  var button = document.getElementById( 'table' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.table, 2000 );

  }, false );

  var button = document.getElementById( 'sphere' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.sphere, 2000 );

  }, false );

  var button = document.getElementById( 'helix' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.helix, 2000 );

  }, false );

  var button = document.getElementById( 'grid' );
  button.addEventListener( 'click', function ( event ) {

    transform( targets.grid, 2000 );

  }, false );

  transform( targets.table, 5000 );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

  TWEEN.removeAll();

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = objects[ i ];
    var target = targets[ i ];

    new TWEEN.Tween( object.position )
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

    new TWEEN.Tween( object.rotation )
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

  }

  new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );

  TWEEN.update();

  controls.update();

}

function render() {

  renderer.render( scene, camera );

}

document.getElementById('container').addEventListener('click',function (e) {
  if(e.target.className === 'element'){
    window.location.href = 'https://www.bilibili.com/video/av' + e.target.getAttribute('dataTH') ;
  }
})