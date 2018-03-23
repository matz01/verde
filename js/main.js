/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
	// From https://davidwalsh.name/javascript-debounce-function.
	var debounce = function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
			    args = arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	;

	// Window size.
	var win = { width: window.innerWidth, height: window.innerHeight };

	// some animation settings.
	var settings = {
		image: { duration: 900, delay: 0, easing: [0.8, 0, 0.2, 1] },
		more: { duration: 900, delay: 0, easing: [0.8, 0, 0.2, 1] },
		facts: { duration: 300, delay: 0, easing: [0.8, 0, 0.2, 1] },
		title: { duration: 700, delay: 200, easing: [0.8, 0, 0.2, 1] },
		description: { duration: 900, delay: 400, easing: 'easeOutExpo' },
		pagination: { duration: 300, delay: 400, easing: 'easeInOutQuad' },

		menuCtrl: { duration: 300, easing: [0.2, 1, 0.3, 1] },
		menuItems: { duration: 300, easing: [0.2, 1, 0.3, 1] },
		factsCtrl: { duration: 300, easing: 'linear' },
		gallery: { duration: 800, easing: [0.2, 1, 0.3, 1] },
		navigationCtrls: { duration: 800, easing: [0.8, 0, 0.2, 1] },
		previewCloseCtrl: { duration: 300, easing: 'easeOutExpo' },
		factsItems: { duration: 800, easing: [0.8, 0, 0.2, 1] },
		expander: { duration: 800, easing: [0.8, 0, 0.2, 1] }
	};

	var Entry = function () {
		function Entry(el) {
			_classCallCheck(this, Entry);

			this.DOM = { el: el };
			this.init();
		}

		Entry.prototype.init = function init() {
			// DOM elements:
			// title
			this.DOM.title = this.DOM.el.querySelector('.section__content > .section__title');
			charming(this.DOM.title);
			this.DOM.titleLetters = this.DOM.title.querySelectorAll('span');
			// description
			this.DOM.description = this.DOM.el.querySelector('.section__content > .section__description');
			// image
			this.DOM.image = this.DOM.el.querySelector('.section__img > .section__img-inner');
			// more box
			this.DOM.more = this.DOM.el.querySelector('.section__more > .section__more-inner');
			// expander
			this.DOM.expander = this.DOM.el.querySelector('.section__expander');
			// facts
			this.DOM.facts = {
				wrapper: this.DOM.el.querySelector('.section__facts'),
				items: Array.from(this.DOM.el.querySelectorAll('.section__facts > .section__facts-item'))
			};
		};

		Entry.prototype.show = function show(direction) {
			this.isHidden = false;
			return this.toggle(direction);
		};

		Entry.prototype.hide = function hide(direction) {
			this.isHidden = true;
			return this.toggle(direction);
		};

		Entry.prototype.toggle = function toggle(direction) {
			this.direction = direction;
			return Promise.all([this.toggleTitle(!this.isHidden), this.toggleDescription(!this.isHidden), this.toggleImage(!this.isHidden), this.toggleMore(!this.isHidden), this.toggleFacts(!this.isHidden)]);
		};

		Entry.prototype.toggleTitle = function toggleTitle() {
			var _this = this;

			anime.remove(this.DOM.titleLetters);
			return anime({
				targets: this.DOM.titleLetters,
				duration: settings.title.duration,
				delay: function delay(target, index) {
					return index * 30 + settings.title.delay;
				},
				easing: settings.title.easing,
				translateY: this.isHidden ? [0, this.direction === 'next' ? '-100%' : '100%'] : [this.direction === 'next' ? '100%' : '-100%', 0],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: function delay(target, index) {
						return _this.isHidden ? settings.title.duration + settings.title.delay : settings.title.delay;
					}
				}
			}).finished;
		};

		Entry.prototype.toggleDescription = function toggleDescription() {
			anime.remove(this.DOM.description);
			return anime({
				targets: this.DOM.description,
				duration: settings.description.duration,
				delay: !this.isHidden ? settings.description.duration * 0.5 + settings.description.delay : settings.description.delay,
				easing: settings.description.easing,
				translateY: this.isHidden ? [0, this.direction === 'next' ? '-10%' : '10%'] : [this.direction === 'next' ? '20%' : '-20%', 0],
				opacity: this.isHidden ? 0 : 1
			}).finished;
		};

		Entry.prototype.toggleImage = function toggleImage() {
			this.DOM.image.style.transformOrigin = !this.isHidden ? '50% ' + (this.direction === 'next' ? 0 : 100) + '%' : '50% 50%';

			anime.remove(this.DOM.image);
			return anime({
				targets: this.DOM.image,
				duration: settings.image.duration,
				delay: settings.image.delay,
				easing: settings.image.easing,
				translateY: this.isHidden ? ['0%', this.direction === 'next' ? '-100%' : '100%'] : [this.direction === 'next' ? '100%' : '-100%', '0%'],
				scale: !this.isHidden ? [1.8, 1] : 1,
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: 1,
					delay: this.isHidden ? settings.image.duration + settings.image.delay : settings.image.delay
				}
			}).finished;
		};

		Entry.prototype.toggleMore = function toggleMore() {
			var _this2 = this;

			anime.remove(this.DOM.more);
			return anime({
				targets: [this.DOM.more, this.DOM.more.children],
				duration: settings.more.duration,
				delay: settings.more.delay,
				easing: settings.more.easing,
				translateY: this.isHidden ? ['0%', this.direction === 'next' ? '-100%' : '100%'] : [this.direction === 'next' ? '100%' : '-100%', '0%'],
				opacity: {
					value: this.isHidden ? 0 : 1,
					duration: function duration(target, index) {
						return index ? settings.more.duration / 3 : 1;
					},
					delay: function delay(target, index) {
						return index ? _this2.isHidden ? 100 : settings.more.duration * 0.5 + settings.more.delay : _this2.isHidden ? settings.more.duration + settings.more.delay : settings.more.delay;
					}
				}
			}).finished;
		};

		Entry.prototype.toggleFacts = function toggleFacts() {
			var _this3 = this;

			anime.remove(this.DOM.facts.items);
			return anime({
				targets: this.DOM.facts.items.slice(0, 2),
				duration: settings.facts.duration,
				delay: function delay(target, index) {
					return !_this3.isHidden ? index * 40 + settings.facts.duration * 0.5 + settings.facts.delay : index * 40 + settings.facts.delay;
				},
				easing: settings.facts.easing,
				translateY: this.isHidden ? [this.DOM.facts.ty, this.direction === 'next' ? this.DOM.facts.ty - 20 : this.DOM.facts.ty + 20] : [this.direction === 'next' ? this.DOM.facts.ty + 20 : this.DOM.facts.ty - 20, this.DOM.facts.ty],
				opacity: this.isHidden ? 0 : 1
			}).finished;
		};

		return Entry;
	}();

	;

	var Slideshow = function () {
		function Slideshow(el) {
			_classCallCheck(this, Slideshow);

			this.DOM = {};
			this.DOM.el = el;
			this.init();
		}

		Slideshow.prototype.init = function init() {
			// DOM elements.
			this.DOM.menuCtrl = this.DOM.el.querySelector('.sections__header > button.button-menu');
			this.DOM.menu = {
				wrapper: this.DOM.el.querySelector('.menu'),
				items: Array.from(this.DOM.el.querySelectorAll('.menu > .menu__inner > .menu__item')),
				menuCtrls: {
					toggle: this.DOM.el.querySelector('.menu > .menu__toggle'),
					open: this.DOM.el.querySelector('.menu > .menu__toggle > .menu__toggle-inner--open'),
					close: this.DOM.el.querySelector('.menu > .menu__toggle > .menu__toggle-inner--close')
				}
			};
			this.DOM.factsContainer = this.DOM.el.querySelector('.facts');
			this.DOM.factsCtrls = {
				toggle: this.DOM.factsContainer.querySelector('.facts__toggle'),
				more: this.DOM.factsContainer.querySelector('.facts__toggle > .facts__toggle-inner--more'),
				less: this.DOM.factsContainer.querySelector('.facts__toggle > .facts__toggle-inner--less')
			};
			this.DOM.previewCloseCtrl = this.DOM.factsContainer.querySelector('.button-contentclose');
			this.DOM.pagination = this.DOM.el.querySelector('.sections__index .sections__index-inner');
			this.DOM.navigation = this.DOM.el.querySelector('.sections__nav');
			this.DOM.navigation.prevCtrl = this.DOM.navigation.querySelector('button.sections__nav-item--prev');
			this.DOM.navigation.nextCtrl = this.DOM.navigation.querySelector('button.sections__nav-item--next');
			this.DOM.entries = Array.from(this.DOM.el.querySelectorAll('.section'), function (entry) {
				return new Entry(entry);
			});
			this.entriesTotal = this.DOM.entries.length;
			this.currentPos = 0;

			this.layout();
			// Init/Bind events.
			this.initEvents();
		};

		Slideshow.prototype.layout = function layout() {
			this.currentEntry = this.DOM.entries[this.currentPos];
			var factEl = this.currentEntry.DOM.facts.items[0];
			var factHeight = factEl.getBoundingClientRect().height + parseFloat(window.getComputedStyle(factEl).marginBottom);
			var paddingFactsStyle = window.getComputedStyle(this.currentEntry.DOM.facts.wrapper);
			var paddingFacts = parseFloat(paddingFactsStyle.paddingTop) + parseFloat(paddingFactsStyle.paddingBottom);

			this.factsTranslation = win.height - 2 * factHeight - paddingFacts;
			for (var i = 0; i <= this.entriesTotal - 1; ++i) {
				var entry = this.DOM.entries[i];
				entry.DOM.expander.style.transform = 'scale3d(0.54,1,1) translate3d(0px,' + this.factsTranslation + 'px,0px)';
				for (var j = 0, len = entry.DOM.facts.items.length; j <= len - 1; ++j) {
					entry.DOM.facts.ty = this.factsTranslation;
					var item = entry.DOM.facts.items[j];
					item.style.transform = 'translate3d(0px,' + this.factsTranslation + 'px,0px)';
					if (j > 1) {
						item.style.opacity = 0;
					} else if (i === this.currentPos) {
						item.style.opacity = 1;
					}
				}
			}
		};

		Slideshow.prototype.initEvents = function initEvents() {
			var _this4 = this;

			// Navigation

			this.onPrevClick = function () {
				return _this4.navigate('prev');
			};
			this.onNextClick = function () {
				return _this4.navigate('next');
			};
			document.body.addEventListener("wheel", function (e) {
				if (e.deltaY < 0) _this4.onPrevClick();
				if (e.deltaY > 0) _this4.onNextClick();
			});
			this.DOM.navigation.prevCtrl.addEventListener('click', this.onPrevClick);
			this.DOM.navigation.nextCtrl.addEventListener('click', this.onNextClick);

			// Main menu
			this.DOM.menu.menuCtrls.toggle.addEventListener('click', function () {
				return _this4.toggleMenu();
			});

			// Facts Container
			this.DOM.factsCtrls.toggle.addEventListener('click', function () {
				return _this4.toggleFactsContainer();
			});

			// Facts (clickable facts)
			for (var i = 0; i <= this.entriesTotal - 1; ++i) {
				var entry = this.DOM.entries[i];
				entry.DOM.facts.items.filter(function (fact) {
					return fact.classList.contains('section__facts-item--clickable');
				}).forEach(function (clickableFact) {
					return clickableFact.addEventListener('click', function () {
						return _this4.preview(clickableFact.dataset.gallery);
					});
				});
			}

			// Close preview
			this.DOM.previewCloseCtrl.addEventListener('click', function () {
				return _this4.closePreview();
			});

			// Window resize
			this.onResize = function () {
				win = { width: window.innerWidth, height: window.innerHeight };
				_this4.layout();
				if (_this4.isFactsOpen) {
					// Toggle the factsCtrls state
					_this4.DOM.factsCtrls.more.style.opacity = 1;
					_this4.DOM.factsCtrls.less.style.opacity = 0;
					_this4.isFactsOpen = !_this4.isFactsOpen;
					_this4.toggleNavigationCtrls({ opacity: 1, duration: 1 });
					_this4.isFactsAnimating = false;
				}
				if (_this4.gallery) {
					_this4.DOM.previewCloseCtrl.style.opacity = 0;
					_this4.toggleGallery(_this4.gallery, { duration: 1, opacity: 0 }).then(function () {
						return _this4.gallery = null;
					});
				}
				_this4.DOM.el.classList.remove('sections--factsopen');
			};
			window.addEventListener('resize', debounce(function () {
				return _this4.onResize();
			}, 20));
		};

		Slideshow.prototype.navigate = function navigate(direction) {
			if (this.isEntriesAnimating || this.isFactsAnimating) return;
			this.isEntriesAnimating = true;
			// Store direction
			this.direction = direction;
			// Update currentPos
			var newPos = this.currentPos = this.direction === 'next' ? this.currentPos < this.entriesTotal - 1 ? this.currentPos + 1 : 0 : this.currentPos = this.currentPos > 0 ? this.currentPos - 1 : this.entriesTotal - 1;

			var newEntry = this.DOM.entries[newPos];

			this.update(newEntry);
		};

		Slideshow.prototype.update = function update(newEntry) {
			var _this5 = this;

			var updateFn = function updateFn() {
				// hide the current entry and show the next/previous one.
				// when both updatePageNumber, hide and show are finished:
				Promise.all([_this5.currentEntry.hide(_this5.direction), newEntry.show(_this5.direction), _this5.updatePageNumber()]).then(function () {
					_this5.isEntriesAnimating = false;
					_this5.currentEntry.DOM.el.classList.remove('section--current');
					newEntry.DOM.el.classList.add('section--current');
					_this5.currentEntry = newEntry;
				});
			};

			if (this.isFactsOpen) {
				this.toggleFactsContainer().then(updateFn);
			} else {
				updateFn();
			}
		};

		Slideshow.prototype.updatePageNumber = function updatePageNumber() {
			var _this6 = this;

			anime.remove(this.DOM.pagination);
			var halfway = false;
			return anime({
				targets: this.DOM.pagination,
				duration: settings.pagination.duration,
				easing: 'easeInOutQuad',
				translateY: [{ value: this.direction === 'next' ? '-100%' : '100%', delay: settings.pagination.delay }, { value: [this.direction === 'next' ? '100%' : '-100%', '0%'], delay: settings.pagination.duration }],
				opacity: [{ value: 0, delay: settings.pagination.delay }, { value: [0, 1], delay: settings.pagination.duration }],
				update: function update(anime) {
					if (anime.progress >= 50 && !halfway) {
						halfway = true;
						_this6.DOM.pagination.innerHTML = '0' + (_this6.currentPos + 1);
					}
				}
			}).finished;
		};

		Slideshow.prototype.toggleMenu = function toggleMenu() {
			var _this7 = this;

			if (this.isMenuAnimating) return;
			this.isMenuAnimating = true;

			var toggleMenuCtrlFn = function toggleMenuCtrlFn() {
				anime.remove([_this7.DOM.menu.menuCtrls.open, _this7.DOM.menu.menuCtrls.close]);
				return anime({
					targets: [_this7.DOM.menu.menuCtrls.open, _this7.DOM.menu.menuCtrls.close],
					duration: settings.menuCtrl.duration,
					easing: settings.menuCtrl.easing,
					opacity: function opacity(target, index) {
						return index ? !_this7.isMenuOpen ? 1 : 0 : !_this7.isMenuOpen ? 0 : 1;
					},
					translateX: function translateX(target, index) {
						return index ? !_this7.isMenuOpen ? ['50%', '0%'] : '50%' : !_this7.isMenuOpen ? ['0%', '-50%'] : '0%';
					}
				}).finished;
			};

			var toggleMenuItemsFn = function toggleMenuItemsFn() {
				anime.remove(_this7.DOM.menu.items);
				return anime({
					targets: _this7.DOM.menu.items,
					duration: settings.menuItems.duration,
					easing: settings.menuItems.easing,
					delay: function delay(target, index) {
						return !_this7.isMenuOpen ? index * 80 : 0;
					},
					translateX: !_this7.isMenuOpen ? ['5%', '0%'] : '0%',
					opacity: {
						value: !_this7.isMenuOpen ? [0, 1] : 0,
						easing: 'linear',
						delay: function delay(target, index, total) {
							return !_this7.isMenuOpen ? index * 80 : 0;
						}
					}
				}).finished;
			};

			this.DOM.menu.wrapper.classList.toggle('menu--open');

			Promise.all([toggleMenuCtrlFn(), toggleMenuItemsFn()]).then(function () {
				_this7.isMenuOpen = !_this7.isMenuOpen;
				_this7.isMenuAnimating = false;
			});
		};

		Slideshow.prototype.toggleFactsContainer = function toggleFactsContainer() {
			var _this8 = this;

			if (this.isFactsAnimating) {
				return;
			};
			this.isFactsAnimating = true;
			return Promise.all([this.toggleFactsCtrl(), this.animateExpander(), this.animateFactsItems()]).then(function () {
				_this8.isFactsOpen = !_this8.isFactsOpen;
				_this8.isFactsAnimating = false;
			});
		};

		Slideshow.prototype.preview = function preview(gallery) {
			var _this9 = this;

			if (this.isFactsAnimating || !gallery) return;
			this.isFactsAnimating = true;

			this.gallery = gallery;
			this.DOM.el.classList.add('sections--factsopen');
			Promise.all([this.toggleNavigationCtrls({
				opacity: 0
			}), this.toggleFactsCtrl({
				delay: 0,
				opacity: 0
			}), this.animateExpander({
				translateY: 0,
				scaleX: 1.05
			}), this.animateFactsItems({
				translateY: 0,
				opacity: 0,
				delay: 0
			}), this.togglePreviewCloseCtrl({
				opacity: 1,
				delay: 800
			}), this.toggleGallery(gallery, {
				opacity: 1,
				scale: function scale(target, index) {
					return index ? [0.7, 1] : [1, 1];
				}, // just the images..
				delay: function delay(target, index) {
					return index ? index * 100 + 700 : 700;
				} // just the images..
			})]).then(function () {
				return _this9.isFactsAnimating = false;
			});
		};

		Slideshow.prototype.closePreview = function closePreview() {
			var _this10 = this;

			if (this.isFactsAnimating) return;
			this.isFactsAnimating = true;

			Promise.all([this.toggleNavigationCtrls({
				opacity: 1
			}), this.toggleFactsCtrl({
				delay: 600,
				opacity: function opacity(target, index) {
					return index;
				}
			}), this.animateExpander({
				translateY: 0,
				scaleX: 0.54
			}), this.animateFactsItems({
				translateY: 0,
				opacity: 1,
				delay: 200
			}), this.togglePreviewCloseCtrl({
				opacity: 0
			}), this.toggleGallery(this.gallery, {
				opacity: 0
			})]).then(function () {
				_this10.isFactsAnimating = false;
				_this10.gallery = null;
				_this10.DOM.el.classList.remove('sections--factsopen');
			});
		};

		Slideshow.prototype.animateExpander = function animateExpander(animeconfig) {
			return this.animate(Object.assign({
				targets: this.currentEntry.DOM.expander,
				duration: settings.expander.duration,
				easing: settings.expander.easing,
				delay: !this.isFactsOpen ? 0 : 300,
				translateY: !this.isFactsOpen ? [this.factsTranslation, 0] : this.factsTranslation,
				scaleX: [0.54, 0.54]
			}, animeconfig));
		};

		Slideshow.prototype.animateFactsItems = function animateFactsItems(animeconfig) {
			var _this11 = this;

			return this.animate(Object.assign({
				targets: this.currentEntry.DOM.facts.items,
				duration: settings.factsItems.duration,
				easing: settings.factsItems.easing,
				delay: function delay(target, index, total) {
					return !_this11.isFactsOpen ? (index + 1) * 30 + 150 : (total - index - 1) * 30;
				},
				translateY: !this.isFactsOpen ? [this.factsTranslation, 0] : this.factsTranslation,
				opacity: function opacity(target, index) {
					return !_this11.isFactsOpen ? 1 : index > 1 ? 0 : 1;
				}
			}, animeconfig));
		};

		Slideshow.prototype.toggleFactsCtrl = function toggleFactsCtrl(animeconfig) {
			var _this12 = this;

			return this.animate(Object.assign({
				targets: [this.DOM.factsCtrls.more, this.DOM.factsCtrls.less],
				duration: settings.factsCtrl.duration,
				easing: settings.factsCtrl.easing,
				opacity: function opacity(target, index) {
					return index ? !_this12.isFactsOpen ? 1 : 0 : !_this12.isFactsOpen ? 0 : 1;
				}
			}, animeconfig));
		};

		Slideshow.prototype.togglePreviewCloseCtrl = function togglePreviewCloseCtrl(animeconfig) {
			return this.animate(Object.assign({
				targets: this.DOM.previewCloseCtrl,
				duration: settings.previewCloseCtrl.duration,
				easing: settings.previewCloseCtrl.easing
			}, animeconfig));
		};

		Slideshow.prototype.toggleNavigationCtrls = function toggleNavigationCtrls(animeconfig) {
			return this.animate(Object.assign({
				targets: [this.DOM.navigation.prevCtrl, this.DOM.navigation.nextCtrl],
				duration: settings.navigationCtrls.duration,
				easing: settings.navigationCtrls.easing
			}, animeconfig));
		};

		Slideshow.prototype.toggleGallery = function toggleGallery(gallery, animeconfig) {
			return this.animate(Object.assign({
				targets: this.DOM.el.querySelectorAll('#' + gallery + ' > .section__gallery-item'),
				duration: settings.gallery.duration,
				easing: settings.gallery.easing
			}, animeconfig));
		};

		Slideshow.prototype.animate = function animate(opts) {
			anime.remove(opts.targets);
			return anime(opts).finished;
		};

		return Slideshow;
	}();

	;

	// Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('img'), function () {
		document.body.classList.remove('loading');
		// Init
		new Slideshow(document.querySelector('.sections'));
	});
};

/***/ })
/******/ ]);