var NUM_PARTICLES  = 100
var EMITTER_X      = 155
var EMITTER_Y      = 120
var MIN_SIZE       = 0.1
var MAX_SIZE       = 0.3
var MIN_VELOCITY_Y = 0.2
var MAX_VELOCITY_Y = 0.8
var VELOCITY_X     = 0
var MIN_ALPHA      = 0.15
var MAX_ALPHA      = 0.35
var FADE_SPEED     = 0.001
var GROWTH_SPEED   = 1.003
var WIND_SPEED     = 0.13
var PARTICLE_IMG   = new Image
PARTICLE_IMG.src   = './images/smoke-particle.png'

var particles      = []
var context        = null

function SmokeParticle(x, y, context) {
  this.context   = context
  this.posX      = x
  this.posY      = y
  this.velX      = VELOCITY_X
  this.velY      = (Math.random()*(MAX_VELOCITY_Y - MIN_VELOCITY_Y)) + MIN_VELOCITY_Y
  this.alpha     = (Math.random()*(MAX_ALPHA - MIN_ALPHA)) + MIN_ALPHA
  this.size      = (Math.random()*(MAX_SIZE - MIN_SIZE)) + MIN_SIZE
  this.image     = PARTICLE_IMG
  this.reborn    = false

  this.isDead = function() {
    return this.alpha === 0
  }

  this.update = function() {
    this.posX  += this.velX + WIND_SPEED
    this.posY  -= this.velY
    this.size  *= GROWTH_SPEED
    this.alpha -= FADE_SPEED
    if (this.alpha < 0) this.alpha = 0
  }

  this.render = function() {
    // Don't show the particle until it has completed one cycle.
    // This way, they aren't all bunched together at the beginning.
    this.context.globalAlpha = (this.reborn ? this.alpha : 0)
    var height               = this.image.height * this.size
    var width                = this.image.width  * this.size
    var x                    = Math.round(this.posX - width/2)
    var y                    = Math.round(this.posY + height/2)

    this.context.drawImage(this.image, x, y, width, height)
  }
}

function initSmokeSystem(container) {
  context = container.getContext('2d')
  for (var i = 0; i < NUM_PARTICLES; i++) {
    var particle = new SmokeParticle(EMITTER_X, EMITTER_Y, context)
    particles.push(particle)
  }

  renderSmokeSystem()
}

function renderSmokeSystem() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  for (var i = 0; i < NUM_PARTICLES; i++) {
    particles[i].update()
    if (particles[i].isDead()) {
      particles[i] = new SmokeParticle(EMITTER_X, EMITTER_Y, context)
      particles[i].reborn = true
    }
    particles[i].render()
  }
  requestAnimFrame(renderSmokeSystem)
}

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function( callback ){
            window.setTimeout(callback, 1000 / 60)
         }
})()


//$(document).ready(function () {
//document.addEventListener("DOMContentLoaded", function(event) {
  // smoke for Noircat's pipe
//  initSmokeSystem(document.getElementById('smoke'))
//});
