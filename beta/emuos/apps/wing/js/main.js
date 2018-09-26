;// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	'use strict';
	require.config({
		urlArgs: 'rand=' + (new Date()).getTime(),
		paths: {
			jquery: 'libraries/jquery-2.1.4.min',
			phaser: 'libraries/phaser-2.3.0'
		},
		shim: {
			phaser: {
				exports: 'Phaser'
			}
		}
	});

	require([
		'jquery',
		'phaser'
	], function($) {

		$(document).on('contextmenu', function(e) {
			e.preventDefault();
		});

		//var width					= 1280;
		//var height				= 720;

		var w = global.innerWidth * global.devicePixelRatio,
			h = global.innerHeight * global.devicePixelRatio,
			width = (h > w) ? h : w,
			height = (h > w) ? w : h;

		if (global.innerWidth >= 1024 && global.devicePixelRatio >= 2) {
			width = Math.round(width / 2);
			height = Math.round(height / 2);
		}

		if (global.devicePixelRatio === 3) {
			width = Math.round(width / 3) * 2;
			height = Math.round(height / 3) * 2;
		}

		var worldwidth				= 6000;
		var worldheight				= 6000;
		var background				= null;
		var logobackground			= null;
		var logo					= null;
		var ship					= null;
		var shipcollisiongroup		= null;
		var shipmaxvelocity			= 20;
		var pointer					= null;
		var pointerconstraint		= null;
		var bullets					= null;
		var bulletlifetime			= 2500;
		var bulletmaxvelocity		= 80000;
		var bulletcollisiongroup	= null;
		var maxbullets				= 30;
		var fireRate				= 200;
		var nextFire				= 0;
		var enemy1					= null;
		var enemy2					= null;
		var planets					= null;
		var planetscollisiongroup	= null;
		var maxplanets				= 50;

		var game = new Phaser.Game(width, height, Phaser.CANVAS, 'wing', {
			preload: preload,
			create: create,
			update: update,
			render: render
		});

		function preload() {
			game.time.advancedTiming = true;
			game.load.physics('physics', 'assets/sprites/ships/ships.json');
			game.load.image('background', 'assets/background/stars.jpg');
			game.load.image('logo', 'assets/sprites/logo.png');
			game.load.image('ship', 'assets/sprites/ships/ship2.png');
			game.load.image('enemy1', 'assets/sprites/ships/ship2.png');
			game.load.image('enemy2', 'assets/sprites/ships/ship3.png');
			game.load.image('bullet', 'assets/sprites/ships/bullet.png');
			game.load.image('ceres', 'assets/sprites/planets/ceres.png');
			game.load.image('earth', 'assets/sprites/planets/earth.png');
			game.load.image('eris', 'assets/sprites/planets/eris.png');
			game.load.image('jupiter', 'assets/sprites/planets/jupiter.png');
			game.load.image('mars', 'assets/sprites/planets/mars.png');
			game.load.image('mercury', 'assets/sprites/planets/mercury.png');
			game.load.image('moon', 'assets/sprites/planets/moon.png');
			game.load.image('neptune', 'assets/sprites/planets/neptune.png');
			game.load.image('pluto', 'assets/sprites/planets/pluto.png');
			game.load.image('saturn', 'assets/sprites/planets/saturn.png');
			game.load.image('sun', 'assets/sprites/planets/sun.png');
			game.load.image('uranus', 'assets/sprites/planets/uranus.png');
			game.load.image('venus', 'assets/sprites/planets/venus.png');
		}

		function create() {
			// Game Setup
			game.renderer.clearBeforeRender = false;
			game.renderer.renderSession.roundPixels = true;

			// Background
			game.stage.backgroundColor = '#313131';
			//game.world.resize(worldwidth, worldheigth);
			game.world.setBounds(0, 0, worldwidth, worldheight);
			background = game.add.tileSprite(0, 0, worldwidth, worldheight, 'background');
			//background = game.add.tileSprite(0, 0, width, height, 'background');
			//background.fixedToCamera = true;

			game.physics.startSystem(Phaser.Physics.P2JS);
			//game.physics.p2.setImpactEvents(true);
			//game.physics.p2.restitution = 0.8;
			resizePolygon('physics', 'physics2', 'ship2', 0.75);
			planetscollisiongroup = game.physics.p2.createCollisionGroup();
			shipcollisiongroup = game.physics.p2.createCollisionGroup();
			bulletcollisiongroup = game.physics.p2.createCollisionGroup();
			game.physics.p2.updateBoundsCollisionGroup();

			// Planets
			var planettypes = ['ceres', 'earth', 'eris', 'jupiter', 'mars', 'mercury', 'moon', 'neptune', 'pluto', 'saturn', 'sun', 'uranus', 'venus'];
			planets = game.add.group();
			planets.enableBody = true;
			planets.physicsBodyType = Phaser.Physics.P2JS;

			for (var i = 0; i < maxplanets; i++) {
				var planet = planets.create(game.world.randomX, game.world.randomY, planettypes[game.rnd.integerInRange(0 , planettypes.length)]);
				var size = game.rnd.realInRange(0.25, 0.5);
				planet.anchor.set(0.5);
				planet.scale.set(size);
				planet.body.clearShapes();
				planet.body.setCircle((planet.width - 32) / 2);
				planet.body.setCollisionGroup(planetscollisiongroup);
				planet.body.collides([bulletcollisiongroup ,shipcollisiongroup]);
				planet.body.static = true;
				//planet.body.debug = true;
				planet.angle = game.rnd.angle();
			}

			// Player Ship
			ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
			game.physics.p2.enable(ship);
			ship.anchor.set(0.5);
			ship.scale.set(0.75);
			ship.body.clearShapes();
			ship.body.loadPolygon('physics2', 'ship2');
			ship.body.setCollisionGroup(shipcollisiongroup);
			ship.body.collides(planetscollisiongroup);
			ship.body.collideWorldBounds = true;
			ship.body.fixedRotation = true;
			//ship.body.debug = true;
			game.camera.follow(ship);

			// Player Bullets
			bullets = game.add.group();
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.P2JS;

			for (var j = 0; i < maxbullets; i++) {
				var bullet = bullets.create(game.world.randomX, game.world.randomY, 'bullet');
				planet.anchor.set(0.5);
				planet.scale.set(0.75);
				planet.body.clearShapes();
				planet.body.setCircle(10);
				planet.body.setCollisionGroup(planetscollisiongroup);
				planet.body.collides(shipcollisiongroup);
				planet.body.debug = true;
			}

			/*bullets.createMultiple(maxbullets, 'bullet', 0, false);
			bullets.setAll('anchor.x', 0.5);
			bullets.setAll('anchor.y', 0.5);
			bullets.setAll('scale.x', 0.75);
			bullets.setAll('scale.y', 0.75);
			bullets.setAll('body.setCollisionGroup', bulletcollisiongroup);
			bullets.setAll('body.collides', planetscollisiongroup);
			bullets.setAll('outOfBoundsKill', true);
			bullets.setAll('checkWorldBounds', true);*/

			/*enemy1 = game.add.group();
			enemy1.enableBody = true;
			enemy1.physicsBodyType = Phaser.Physics.ARCADE;
			enemy1.createMultiple(maxEnemies, 'enemy1', 0, false);
			enemy1.setAll('anchor.x', 0.5);
			enemy1.setAll('anchor.y', 0.5);
			enemy1.setAll('outOfBoundsKill', true);
			enemy1.setAll('checkWorldBounds', true);*/

			// Logo
			logo = game.add.sprite(game.camera.width / 2, game.camera.height - 50, 'logo');
			logo.anchor.set(0.5);
			logo.scale.set(0.35);
			logo.alpha = 0.7;
			logo.fixedToCamera = true;

			pointer = new p2.Body();
			//pointer.clearShapes();
			//pointer.setCircle(20);
			//pointer.debug = true;
			game.physics.p2.world.addBody(pointer);
		}

		function update() {

			var point = {
				x: game.input.worldX,
				y: game.input.worldY
			};

			pointer.position[0] = game.physics.p2.pxmi(point.x);
			pointer.position[1] = game.physics.p2.pxmi(point.y);

			var bodies = game.physics.p2.hitTest(point, [ship]);

			if (bodies.length === 0) {
				if (pointerconstraint == null) {
					pointerconstraint = game.physics.p2.createDistanceConstraint(ship, pointer, 0, [0.5, 0.5], [0, 0], shipmaxvelocity);
				}
				ship.body.rotation = Math.atan2(ship.y - point.y, ship.x - point.x) + game.math.degToRad(-90) - 1.6;
				ship.rotation = ship.body.rotation;
			} else {
				if (pointerconstraint != null) {
					game.physics.p2.removeConstraint(pointerconstraint);
					pointerconstraint = null;
				}
				ship.body.setZeroVelocity();
			}

			if (game.input.activePointer.isDown) {
				if (game.time.now > nextFire && bullets.countDead() > 0) {
					nextFire = game.time.now + fireRate;
					var bullet = bullets.getFirstExists(false);
					bullet.reset(ship.x, ship.y);
					bullet.lifespan = bulletlifetime;
					bullet.rotation = ship.rotation;
					bullet.body.rotation = ship.rotation + 1.6;
					bullet.body.thrust(bulletmaxvelocity);
				}
			}

			/*game.physics.arcade.collide(ship, planets);
			game.physics.arcade.overlap(bullets, planets, function(bullet, planet) {
				bullet.kill();
			}, null, this);*/

			/*if (!game.camera.atLimit.x)
			{
				background.tilePosition.x -= (ship.body.velocity.x * game.time.physicsElapsed);
			}

			if (!game.camera.atLimit.y)
			{
				background.tilePosition.y -= (ship.body.velocity.y * game.time.physicsElapsed);
			}*/
		}

		function render() {
			var renderer = '';

			switch (game.renderType) {
				case Phaser.WEBGL:
					renderer = 'Renderer: WebGL';
					break;
				case Phaser.CANVAS:
					renderer = 'Renderer: Canvas';
					break;
				case Phaser.HEADLESS:
					renderer = 'Renderer: Headless';
					break;
				default:
					renderer = 'Renderer: Auto';
					break;
			}

			game.debug.text(renderer, 20, 28);
			game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 20, 48, '#00ff00');
			game.debug.text('FPS Min: ' + game.time.fpsMin || 'FPS Min: --', 20, 68, '#00ff00');
			game.debug.text('FPS Max: ' + game.time.fpsMax || 'FPS Max: --', 20, 88, '#00ff00');
			game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + maxbullets, 20, 110);
			game.debug.cameraInfo(game.camera, 20, 160);
			game.debug.inputInfo(20, 280);
			game.debug.spriteInfo(ship, 20, 450);
		}

		function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale) {
			var newData = [];
			var data = game.cache.getPhysicsData(originalPhysicsKey, shapeKey);
			for (var i = 0; i < data.length; i++) {
				var vertices = [];
				for (var j = 0; j < data[i].shape.length; j += 2) {
					vertices[j] = data[i].shape[j] * scale;
					vertices[j + 1] = data[i].shape[j + 1] * scale;
				}
				newData.push({shape : vertices});
			}
			var item = {};
			item[shapeKey] = newData;
			game.load.physics(newPhysicsKey, '', item);
			//debugPolygon(newPhysicsKey, shapeKey);
		}
	});
})(this);