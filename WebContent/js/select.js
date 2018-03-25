//Js material
 var d = function(e) {
        this.element_ = e, this.init()
    };
	
	var s = {
    };
	s = function() {
        function e(e, t) {
            for (var s = 0; s < h.length; s++)
                if (h[s].className === e) return "undefined" != typeof t && (h[s] = t), h[s];
            return !1
        }

        function t(e) {
            var t = e.getAttribute("data-upgraded");
            return null === t ? [""] : t.split(",")
        }

        function s(e, s) {
            var i = t(e);
            return -1 !== i.indexOf(s)
        }

        function i(t, s) {
            if ("undefined" == typeof t && "undefined" == typeof s)
                for (var a = 0; a < h.length; a++) i(h[a].className, h[a].cssClass);
            else {
                var l = t;
                if ("undefined" == typeof s) {
                    var o = e(l);
                    o && (s = o.cssClass)
                }
                for (var r = document.querySelectorAll("." + s), _ = 0; _ < r.length; _++) n(r[_], l)
            }
        }

        function n(i, n) {
            if (!("object" == typeof i && i instanceof Element)) throw new Error("Invalid argument provided to upgrade MDL element.");
            var a = t(i),
                l = [];
            if (n) s(i, n) || l.push(e(n));
            else {
                var o = i.classList;
                h.forEach(function(e) {
                    o.contains(e.cssClass) && -1 === l.indexOf(e) && !s(i, e.className) && l.push(e)
                })
            }
            for (var r, _ = 0, d = l.length; d > _; _++) {
                if (r = l[_], !r) throw new Error("Unable to find a registered component for the given class.");
                a.push(r.className), i.setAttribute("data-upgraded", a.join(","));
                var C = new r.classConstructor(i);
                C[p] = r, c.push(C);
                for (var u = 0, E = r.callbacks.length; E > u; u++) r.callbacks[u](i);
                r.widget && (i[r.className] = C);
                var m = document.createEvent("Events");
                m.initEvent("componentupgraded", !0, !0), i.dispatchEvent(m)
            }
        }

        function a(e) {
            Array.isArray(e) || (e = "function" == typeof e.item ? Array.prototype.slice.call(e) : [e]);
            for (var t, s = 0, i = e.length; i > s; s++) t = e[s], t instanceof HTMLElement && (n(t), t.children.length > 0 && a(t.children))
        }

        function l(t) {
            var s = "undefined" == typeof t.widget && "undefined" == typeof t.widget,
                i = !0;
            s || (i = t.widget || t.widget);
            var n = {
                classConstructor: t.constructor || t.constructor,
                className: t.classAsString || t.classAsString,
                cssClass: t.cssClass || t.cssClass,
                widget: i,
                callbacks: []
            };
            if (h.forEach(function(e) {
                    if (e.cssClass === n.cssClass) throw new Error("The provided cssClass has already been registered: " + e.cssClass);
                    if (e.className === n.className) throw new Error("The provided className has already been registered")
                }), t.constructor.prototype.hasOwnProperty(p)) throw new Error("MDL component classes must not have " + p + " defined as a property.");
            var a = e(t.classAsString, n);
            a || h.push(n)
        }

        function o(t, s) {
            var i = e(t);
            i && i.callbacks.push(s)
        }

        function r() {
            for (var e = 0; e < h.length; e++) i(h[e].className)
        }

        function _(e) {
            var t = c.indexOf(e);
            c.splice(t, 1);
            var s = e.element_.getAttribute("data-upgraded").split(","),
                i = s.indexOf(e[p].classAsString);
            s.splice(i, 1), e.element_.setAttribute("data-upgraded", s.join(","));
            var n = document.createEvent("Events");
            n.initEvent("componentdowngraded", !0, !0), e.element_.dispatchEvent(n)
        }

        function d(e) {
            var t = function(e) {
                c.filter(function(t) {
                    return t.element_ === e
                }).forEach(_)
            };
            if (e instanceof Array || e instanceof NodeList)
                for (var s = 0; s < e.length; s++) t(e[s]);
            else {
                if (!(e instanceof Node)) throw new Error("Invalid argument provided to downgrade MDL nodes.");
                t(e)
            }
        }
        var h = [],
            c = [],
            p = "mdlComponentConfigInternal_";
        return {
            upgradeAllRegistered: r,
            register: l
        }
    }(), 
	
	window.componentHandler = s, 
	window.componentHandler = s, 
	window.addEventListener("load", function() {
        "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("js"), 
		s.upgradeAllRegistered()) : (s.upgradeElement = function() {}, 
		s.register = function() {}
		)
    }), Date.now || (Date.now = function() {
        return (new Date).getTime()
    }, Date.now = Date.now);
	
	//Classe L
	var L = function(e) {
        this.element_ = e, this.maxRows = this.Constant_.NO_MAX_ROWS, this.init()
    };
    window.MaterialTextfield = L, L.prototype.Constant_ = {
        NO_MAX_ROWS: -1,
    }, L.prototype.CssClasses_ = {
        LABEL: "textfield__label",
        INPUT: "textfield__input",
        IS_DIRTY: "is-dirty",
        IS_FOCUSED: "is-focused"
    }, L.prototype.onKeyDown_ = function(e) {
        var t = e.target.value.split("\n").length;
        13 === e.keyCode && t >= this.maxRows && e.preventDefault()
    }, L.prototype.onFocus_ = function(e) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED)
    }, L.prototype.onBlur_ = function(e) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)
    }, L.prototype.onReset_ = function(e) {
        this.updateClasses_()
    }, L.prototype.updateClasses_ = function() {
        this.checkDisabled(), this.checkValidity(), this.checkDirty(), this.checkFocus()
    }, L.prototype.checkDisabled = function() {
        this.input_.disabled ? this.element_.classList.add(this.CssClasses_.IS_DISABLED) : this.element_.classList.remove(this.CssClasses_.IS_DISABLED)
    }, L.prototype.checkDisabled = L.prototype.checkDisabled, L.prototype.checkFocus = function() {
		//Evento de tirar o foco do select
        Boolean(this.element_.querySelector(":focus")) ? 
//        			this.element_.classList.add(this.CssClasses_.IS_FOCUSED) : 
        				this.element_.classList.remove(this.CssClasses_.IS_FOCUSED) :""
    }, L.prototype.checkFocus = L.prototype.checkFocus, L.prototype.checkValidity = function() {
        this.input_.validity && (this.input_.validity.valid ? this.element_.classList.remove(this.CssClasses_.IS_INVALID) : this.element_.classList.add(this.CssClasses_.IS_INVALID))
    }, L.prototype.checkValidity = L.prototype.checkValidity, L.prototype.checkDirty = function() {
		//Ao colocar o nome em cima do texto do select
        this.input_.value && this.input_.value.length > 0 ? this.element_.classList.add(this.CssClasses_.IS_DIRTY) : this.element_.classList.remove(this.CssClasses_.IS_DIRTY)
    }, L.prototype.checkDirty = L.prototype.checkDirty, L.prototype.disable = function() {
        this.input_.disabled = !0, this.updateClasses_()
    }, L.prototype.disable = L.prototype.disable, L.prototype.enable = function() {
        this.input_.disabled = !1, this.updateClasses_()
    }, L.prototype.enable = L.prototype.enable, L.prototype.change = function(e) {
        this.input_.value = e || "", this.updateClasses_()
    }, L.prototype.change = L.prototype.change, L.prototype.init = function() {
        if (this.element_ && (this.label_ = this.element_.querySelector("." + this.CssClasses_.LABEL), 
        	this.input_ = this.element_.querySelector("." + this.CssClasses_.INPUT), this.input_)) {
            this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE) && 
            				(this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10), 
            								isNaN(this.maxRows) && (this.maxRows = this.Constant_.NO_MAX_ROWS)), 
				this.boundUpdateClassesHandler = this.updateClasses_.bind(this), 
				this.boundFocusHandler = this.onFocus_.bind(this), 
				this.boundBlurHandler = this.onBlur_.bind(this), 
				this.boundResetHandler = this.onReset_.bind(this), 
				this.input_.addEventListener("input", this.boundUpdateClassesHandler), 
				this.input_.addEventListener("focus", this.boundFocusHandler), 
				this.input_.addEventListener("blur", this.boundBlurHandler), 
				this.input_.addEventListener("reset", this.boundResetHandler), 
				this.maxRows !== this.Constant_.NO_MAX_ROWS && (this.boundKeyDownHandler = this.onKeyDown_.bind(this), 
																	this.input_.addEventListener("keydown", this.boundKeyDownHandler)
																);
            var e = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
            this.updateClasses_(), 
			this.element_.classList.add(this.CssClasses_.IS_UPGRADED), 
			e && this.element_.classList.add(this.CssClasses_.IS_INVALID), 
			this.input_.hasAttribute("autofocus") && (this.element_.focus(), this.checkFocus())
			
        }
    }, s.register({
        constructor: L,
        classAsString: "MaterialTextfield",
        cssClass: "textfield",
        widget: !0
    });
	
	//Classe D
	window.MaterialMenu = d, d.prototype.Constant_ = {
        CLOSE_TIMEOUT: 150
    }, d.prototype.Keycodes_ = {
    }, d.prototype.CssClasses_ = {
        CONTAINER: "menu__container",
        OUTLINE: "menu__outline",
        ITEM: "menu__item",
        IS_VISIBLE: "is-visible",
    }, d.prototype.init = function() {
        if (this.element_) {
            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.CONTAINER), 
			this.element_.parentElement.insertBefore(e, this.element_), 
			this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_), 
			this.container_ = e;
            var t = document.createElement("div");
			t.classList.add(this.CssClasses_.OUTLINE), 
			this.outline_ = t, e.insertBefore(t, this.element_);
            var s = this.element_.getAttribute("for") || this.element_.getAttribute("data-for"),i = null;
            s && (i = document.getElementById(s), i && (this.forElement_ = i, i.addEventListener("click", this.handleForClick_.bind(this)), i.addEventListener("keydown", this.handleForKeyboardEvent_.bind(this))));
            var n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM);
            this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this), this.boundItemClick_ = this.handleItemClick_.bind(this);
            for (var a = 0; a < n.length; a++) n[a].addEventListener("click", this.boundItemClick_), n[a].tabIndex = "-1", n[a].addEventListener("keydown", this.boundItemKeydown_);
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))
                for (this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), a = 0; a < n.length; a++) {
                    var l = n[a],
                        o = document.createElement("span");
                    o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
                    var r = document.createElement("span");
                    r.classList.add(this.CssClasses_.RIPPLE), 
					o.appendChild(r), 
					l.appendChild(o), 
					l.classList.add(this.CssClasses_.RIPPLE_EFFECT)
                }
        }
    }, d.prototype.handleForClick_ = function(e) {
        if (this.element_ && this.forElement_) {
            var t = this.forElement_.getBoundingClientRect(),
                s = this.forElement_.parentElement.getBoundingClientRect();
        }
        this.toggle(e)
    }, d.prototype.handleForKeyboardEvent_ = function(e) {
        if (this.element_ && this.container_ && this.forElement_) {
            var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
            t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) && (e.keyCode === this.Keycodes_.UP_ARROW ? (e.preventDefault(), t[t.length - 1].focus()) : e.keyCode === this.Keycodes_.DOWN_ARROW && (e.preventDefault(), t[0].focus()))
        }
    },
	d.prototype.handleItemKeyboardEvent_ = function(e) {
        if (this.element_ && this.container_) {
            var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
            if (t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
                var s = Array.prototype.slice.call(t).indexOf(e.target);
                if (e.keyCode === this.Keycodes_.UP_ARROW) e.preventDefault(), s > 0 ? t[s - 1].focus() : t[t.length - 1].focus();
                else if (e.keyCode === this.Keycodes_.DOWN_ARROW) 
					e.preventDefault(), t.length > s + 1 ? t[s + 1].focus() : t[0].focus();
                else if (e.keyCode === this.Keycodes_.SPACE || e.keyCode === this.Keycodes_.ENTER) {
                    e.preventDefault();
                    var i = new MouseEvent("mousedown");
                    e.target.dispatchEvent(i), 
					i = new MouseEvent("mouseup"), 
					e.target.dispatchEvent(i), 
					e.target.click()
                }
				else e.keyCode === this.Keycodes_.ESCAPE && (e.preventDefault(), this.hide())
            }
        }
    }, d.prototype.handleItemClick_ = function(e) {
        e.target.hasAttribute("disabled") ? e.stopPropagation() : (this.closing_ = !0, window.setTimeout(function(e) {
            this.hide(), this.closing_ = !1
        }.bind(this), 
		this.Constant_.CLOSE_TIMEOUT
		))
    }, d.prototype.applyClip_ = function(e, t) {
        this.element_.classList.contains(this.CssClasses_.UNALIGNED) ? this.element_.style.clip = "" : this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) ? this.element_.style.clip = "rect(0 " + t + "px 0 " + t + "px)" : this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ? this.element_.style.clip = "rect(" + e + "px 0 " + e + "px 0)" : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) ? this.element_.style.clip = "rect(" + e + "px " + t + "px " + e + "px " + t + "px)" : this.element_.style.clip = ""
    }, d.prototype.removeAnimationEndListener_ = function(e) {
        e.target.classList.remove(d.prototype.CssClasses_.IS_ANIMATING)
    }, d.prototype.addAnimationEndListener_ = function() {
        this.element_.addEventListener("transitionend", this.removeAnimationEndListener_), this.element_.addEventListener("webkitTransitionEnd", this.removeAnimationEndListener_)
    }, d.prototype.show = function(e) {
        if (this.element_ && this.container_ && this.outline_) {
            var t = this.element_.getBoundingClientRect().height,
                s = this.element_.getBoundingClientRect().width;
            this.container_.style.width = s + "px", 
			this.container_.style.height = t + "px", 
			this.outline_.style.width = s + "px", 
			this.outline_.style.height = t + "px";

            this.applyClip_(t, s), window.requestAnimationFrame(function() {
                this.element_.classList.add(this.CssClasses_.IS_ANIMATING), 
				this.element_.style.clip = "rect(0 " + s + "px " + t + "px 0)", 
				this.container_.classList.add(this.CssClasses_.IS_VISIBLE)
            }.bind(this)), 
			this.addAnimationEndListener_();
            var o = function(t) {
                t === e || this.closing_ || t.target.parentNode === this.element_ || (document.removeEventListener("click", o), this.hide())
            }.bind(this);
            document.addEventListener("click", o)
        }
    }, d.prototype.show = d.prototype.show, d.prototype.hide = function() {
        if (this.element_ && this.container_ && this.outline_) {
            for (var e = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), t = 0; t < e.length; t++) e[t].style.removeProperty("transition-delay");
            var s = this.element_.getBoundingClientRect(),
                i = s.height,
                n = s.width;
            this.element_.classList.add(this.CssClasses_.IS_ANIMATING), 
			this.applyClip_(i, n), 
			this.container_.classList.remove(this.CssClasses_.IS_VISIBLE), 
			this.addAnimationEndListener_()
        }
    }, d.prototype.hide = d.prototype.hide, d.prototype.toggle = function(e) {
        this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) ? this.hide() : this.show(e)
    }, d.prototype.toggle = d.prototype.toggle, s.register({
        constructor: d,
        classAsString: "MaterialMenu",
        cssClass: "menu-select",
        widget: !0
    });
	
	
	"use strict";window.onload=function(){
		getmdlSelect.init(".textfield"),
		document.addEventListener("DOMNodeInserted",function(e){
				if(componentHandler.upgradeDom != null){
					componentHandler.upgradeDom();
				}
			},!1)};
		var getmdlSelect={
				addEventListeners:function(e){
					var t=e.querySelector("input"),
						n=e.querySelectorAll("li");
						[].forEach.call(n,function(n){
							n.onclick=function(){
								if(e.MaterialTextfield.change(n.textContent),t.dataset.val=n.dataset.val||"","createEvent"in document){
										var c=document.createEvent("HTMLEvents");
										c.initEvent("change",!1,!0),t.dispatchEvent(c)
							}
								else t.fireEvent("onchange")
							}})},
				init:function(e){
					var t=document.querySelectorAll(e);
						[].forEach.call(t,function(e){
							getmdlSelect.addEventListeners(e),
							e.style.width=e.querySelector(".menu-select").clientWidth+"px"})
							}
					};
	