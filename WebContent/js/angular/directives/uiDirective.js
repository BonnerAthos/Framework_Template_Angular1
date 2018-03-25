angular.module("uiDirective", []);

angular.module("uiDirective").directive("uiForm", function(vPath, utilValid) {
	return {
		restrict : "A",
		scope : {
			action : "@action",
			name : "@name",
			notSubmit : "@notSubmit"
		},
		controller : function($scope, $element, $attrs) {
			var scopes = [];

			if ($scope.notSubmit) {
				$element.on('submit', function() {
					return false;
				});
			}
			var inputs = [];
			this.addScope = function(scope) {
				inputs.push(scope);
			}
			this.isFormValid = function() {
				return inputs.some(function(scope) {
					return (scope.notEmpty && !scope.value)
							|| (scope.showErro);
				});
			}

			function isValid() {
				return scopes.some(function(scope) {
					if(scope.isSelect){
						return ($.isEmptyObject(scope.value) && $.isEmptyObject(scope.multValue));
					}else{
						return (scope.notEmpty && !scope.value)	|| (scope.showErro) ;
					}
				});
			};

			function setSubmit() {
				$element.on('submit', function() {
					return !isValid();
				});
			}

			this.setValidForm = function() {
				setSubmit();
			}
			this.addScope = function(scope) {
				scopes.push(scope);
			};

			this.isFormValid = function() {
				return isValid();
			};
			this.showListMsg = function() {
				utilValid.validScopes(scopes);
			};
		}
	}
});

angular.module("uiDirective").directive("uiInput", function(utilListener, vPath, utilEvent) {
	return {
		templateUrl : vPath.VIEWS + "ui-input.html",
		replace : true,
		scope : {
			name : "@name",
			width : "@width",
			addClass : "@addClass",
			label : "@label",
			type : "@type",
			iconBefore : "@iconBefore",
			iconAfter : "@iconAfter",
			placeholder : "@placeholder",
			notEmpty : "@notEmpty",
			datePicker : "@datePicker",
			maskDate : "@maskDate",
			validDate : "@validDate",
			clockPicker : "@clockPicker",
			maskClock : "@maskClock",
			validClock : "@validClock",
			maskCpf : "@maskCpf",
			validCpf : "@validCpf",
			maskCnpj : "@maskCnpj",
			validCnpj : "@validCnpj",
			maskCep : "@maskCep",
			validCep : "@validCep",
			validEmail : "@validEmail",
			validNumber : "@validNumber",
			maskNumber : "@maskNumber",
			maskMax : "@maskMax",
			validMin : "@validMin",
			compare : "=compare",
			compareLabel : "@compareLabel",
			value : "=value"

		},
		require : "^?uiForm",
		link : function(scope, element, attrs, ctrl) {
			if (!scope.width) {
				scope.width = 12;
			}
			if (ctrl) {
				ctrl.addScope(scope);
			}
			scope.onBlur = function() {
				utilEvent.onBlurInputFloat(scope, element);
			}
			utilListener.setListenerInputFloat(scope, element);

			if (!scope.label) {
				scope.notFloat = "not-floating";
			}
		}
	}
});

angular.module("uiDirective").directive("uiPaper", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-paper.html",
		replace : true,
		transclude : true,
		scope : {
			width : "@width",
			addClass : "@addClass"
		},
		link : function(scope, element, attrs) {
			if (!scope.width) {
				scope.width = 12;
			}
		}
	}
});

angular.module("uiDirective").directive("uiToggle",	function(utilListener, vPath) {
		return {
			templateUrl : vPath.VIEWS + "ui-toggle.html",
			// restrict: "E",
			replace : true,
	
			scope : {
				width : "@width",
				addClass : "@addClass",
				valueTrue : "@valueTrue",
				valueFalse : "@valueFalse",
				labelTrue : "@labelTrue",
				labelFalse : "@labelFalse",
				value : "=value"
			},
			link : function(scope, element, attrs, ctrl) {
				utilListener.setListenerToggle(scope, element);
			}
		}
	});

angular.module("uiDirective").directive("uiSnackBar", function(utilValid, vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-snack-bar.html",
		replace : true,
		// Criando um novo objeto
		scope : {
			width : "@width",
			addClass : "@addClass",
			timeOutSnack : "@timeOutSnack",
			uiMensagem : "@uiMensagem",
			tipoClass : "@tipoClass",
			labelSnack : "@labelSnack",
			position : "@position",
			value : "=value"
		},
		link : function(scope, element) {
			$.material.ripples(element.find("ui-snack-bar"));
			utilValid.validSnackBar(scope);
		}
	}
});

angular.module("uiDirective").directive("uiButton",	function(utilListener, vPath, vMsg, $timeout, utilDialog, $rootScope) {
	return {
		templateUrl : vPath.VIEWS + "ui-button.html",
		replace : true,
		transclude : true,
		scope : {
			width : "@width",
			addClass : "@addClass",
			icon : "@icon",
			type : "@type",
			link : "@link",
			tooltip : "@tooltip",
			titleTooltip : "@titleTooltip",
			float : "@float",
			badges : "=badges",
			btnDisabled : "=btnDisabled",
			showValidation : "@showValidation",
			validForm : "@validForm"
		},
		require : "^?uiForm",
		link : function(scope, element, attrs, ctrl) {
			if (scope.showValidation) {
				element.bind('click', function(e) {
					if (ctrl && scope.showValidation
							&& ctrl.isFormValid() && !scope.link) {
						try {
							e.stopImmediatePropagation();
							return false;
						} catch (e) {
						}
					}
				});
			}
			scope.isFormValid = function() {
				if (ctrl && scope.validForm) {
					return ctrl.isFormValid();
				} else {
					return false;
				}
			};
			scope.showListMsg = function() {
				if (ctrl && scope.showValidation && ctrl.isFormValid()
						&& !scope.link) {
					ctrl.showListMsg();
				} else if (scope.link && scope.link != "#") {
					var index = scope.link.indexOf("://") ? (scope.link.indexOf("//") + 2) : 0;
					var url = scope.link.substring(index);
					$timeout(function() {
						utilDialog.openLoading(scope,
								vMsg.AGUARDE_CARREGANDO + url);
					}, 500);
				}
			};
			if (ctrl && scope.showValidation) {
				ctrl.setValidForm();
			}
			if (scope.tooltip) {
				element.attr('title', scope.titleTooltip);
				element.tooltip({
					placement : scope.tooltip,
					delay : {
						"show" : 200,
						"hide" : 200
					}
				});
			}
			var floatClass = "";
			if (scope.float) {
				if (scope.float == "left-bottom") {
					floatClass = "float-left-bottom";
				} else if (scope.float == "right-bottom") {
					floatClass = "float-right-bottom";
				} else if (scope.float == "right-top") {
					floatClass = "float-right-top";
				} else {
					floatClass = "float-left-top";
				}
			}
			$timeout(function() {
				if (scope.float) {
					element.addClass("btn-float");
					element.addClass(floatClass);
				}
				if (scope.badges) {
					element.find(".btn").css("overflow", "visible")
				}
				element.find(".btn-fab").fadeIn("5000");
				
				$.material.ripples(element.find(".btn"));
			}, 100);

		}
	}
});

angular.module("uiDirective").directive("uiNavbar", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-navbar.html",
		replace : true,
		transclude : true,
		scope : {
			label : "@label",
			addClass : "@addClass",
			imgLogo : "@imgLogo",
			url : "@url"
		},
		link : function(scope, element, attrs) {
			$.material.ripples(element.find("a"));
		}
	}
});

angular.module("uiDirective").directive("uiMenuNavLeft", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-menu-nav-left.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			label : "@label"
		},
		link : function(scope, element, attrs) {
			element.find("label:first").each(function() {
				$.material.ripples(this);
			});
		}
	}
});

angular.module("uiDirective").directive("uiMenuNavRight", function(vPath, $timeout, $document) {
	return {
		templateUrl : vPath.VIEWS + "ui-menu-nav-right.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			badges : "=badges",
			minWidth : "@minWidth"

		},
		link : function(scope, element, attrs) {
			scope.isChecked = false;
			var btn = element.find(".btn");
			btn.on("click", function() {
				var input = element.find("input");
				var isChecked = input.is(":checked");
				$timeout(function() {
					if (isChecked) {
						input.removeAttr("checked");
					}
				}, 200)
			});
			
		}
	}
});

angular.module("uiDirective").directive("uiLinkdropNavRight", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-linkdrop-nav-right.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			label : "@label",
			badges : "=badges",
			addClass : "@addClass",
		},
		link : function(scope, element, attrs) {
			var btn = element.find(".btn");
			$.material.ripples(btn);
		}
	}
});

angular.module("uiDirective").directive("uiLinkNavRight", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-link-nav-right.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			label : "@label",
			url : "@url",
		},
		link : function(scope, element, attrs) {
			if (!scope.url) {
				scope.url = "#";
			}
			$.material.ripples(element);
		}
	}
});

angular.module("uiDirective").directive("uiLiDrop", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-li-drop.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			url : "@url",
		},
		link : function(scope, element, attrs) {
			if (!scope.url) {
				scope.url = "#";
			}
			$.material.ripples(element.find("a"));
		}
	}
});

angular.module("uiDirective").directive("uiRadio",function(vPath){
	return {
		templateUrl: vPath.VIEWS + "ui-radio.html",
		
		scope: {
			addClass:"@addClass",
			width: "@width",
			nameRadio: "@nameRadio",
			label: "@label",
			name: "@name",
			value: "=value"
		}
	}
	
});

angular.module("uiDirective").directive("uiCheckbox", function(utilListener, vPath, utilValid) {
	return {
		templateUrl : vPath.VIEWS + "ui-checkbox.html",

		scope : {
			addClass : "@addClass",
			width : "@width",
			name : "@name",
			label : "@label",
			tipo: "@tipo",
			modelo : "@modelo",
			nameCheck: "@nameCheck",
			selected: "=selected",
			list: "=list",
			value: "=value"

		},link : function(scope, element, attrs, ctrl) {
			utilListener.setListenerCheckbox(scope, element);
			$.material.ripples(element.find("input"));

			scope.addItem = function(item, list){
				if (list) {
					var idx = list.indexOf(item);				
					if (idx > -1) {
						list.splice(idx, 1);
					} else {
						list.push(item);
					}
				}
			};
			
			scope.isExiste = function(item,selected){
				return selected.indexOf(item) > -1;
			};
		}
	}
});

angular.module("uiDirective").directive("uiLiMenu", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-li-menu.html",
		replace : true,
		scope : {
			url : "@url",
			label : "@label",
			addClass : "@addClass",
			icon : "@icon"
		},
		link : function(scope, element, attrs) {
			if (!scope.url) {
				scope.url = "#";
			}
			$.material.ripples(element.find(".li-link-menu"));
		}
	}
});

angular.module("uiDirective").directive("uiLinkMenu", function(vPath, $timeout, utilDialog, vMsg) {
	return {
		templateUrl : vPath.VIEWS + "ui-link-menu.html",
		replace : true,
		scope : {
			url : "@url",
			label : "@label",
			addClass : "@addClass",
			icon : "@icon"
		},
		link : function(scope, element, attrs) {
			if (!scope.url) {
				scope.url = "#";
			}
			$.material.ripples(element.find("a"));
		}
	}
});

angular.module("uiDirective").directive("uiMenuLink", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-menu-link.html",
		replace : true,
		transclude : true,
		scope : {
			url : "@url",
			label : "@label",
			addClass : "@addClass",
			width : "@width",
			icon : "@icon"
		},
		link : function(scope, element, attrs) {
			if (!scope.url) {
				scope.url = "#";
			}
			$.material.ripples(element.find(".ui-menu-link"));
		}
	}
});

angular.module("uiDirective").directive("uiLoadingLine", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-loading-line.html",
		replace : true,
		scope : {
			addClass : "@addClass",
			width : "@width",
			show : "=show"
		},
		link : function(scope, element, attrs) {
			if (!scope.width) {
				scope.width = 12;
			}
		}
	}
});

angular.module("uiDirective").directive("uiLoadingCicle", function(vPath, $timeout, $window) {
			function setConfigLoading(scope, element) {
				$timeout(function() {
					var lgText = 0;
					if (scope.label) {
						lgText = parseInt(element.find(".spinner-label").css(
								"width"));
					}
					var lgSpinner = parseInt(element.find(".spinner").css(
							"width"));
					var lgContainer = parseInt(element.css("width"));
					var position = (lgContainer / 2)
							- ((lgText + lgSpinner) / 2);
					position = (position * 100) / lgContainer;
					element.find(".container-spinner").css({
						left : Math.round(position) + "%",
						opacity : 1,
						width : (90 - position) + "%"
					});
				}, 100);
			}
			return {
				templateUrl : vPath.VIEWS + "ui-loading-cicle.html",
				replace : true,
				scope : {
					addClass : "@addClass",
					label : "@label",
					size : "@size",
					show : "=show"
				},
				link : function(scope, element, attrs) {
					if (!scope.width) {
						scope.width = 12;
					}
					angular.element($window).bind('resize', function() {
						setConfigLoading(scope, element);
					});
					scope.$watch('show', function() {
						setConfigLoading(scope, element);
					});
				}
			}
		});

angular.module("uiDirective").directive("uiTable",function(vPath, vMsg, utilDialog) {
	return {
		templateUrl : vPath.VIEWS + "ui-table.html",
		replace : true,
		transclude : true,
		scope : {
			width : "@width",
			addClass : "@addClass",
			pagination : "@pagination",
			data : "=data",
			objFilter : "=objFilter",
			loading : "=loading",
			onLoad : "=onLoad",
			onEdit : "=onEdit",
			onDelete : "=onDelete"
		},
		controller : function($scope, $element, $attrs) {
			var fields = [];
			$scope.fields = fields;
			$scope.listRowPages = [{id: 5, text: "5"}, {id: 10, text: "10"}, {id: 20, text: "20"}, {id: 30, text: "30"}, {id: 40, text: "40"},
			                      {id: 50, text: "50"}, {id: 100, text: "100"}, {id: 300, text: "300"}, {id: 500, text: "500"}, {id: 1000, text: "1000"}];
			this.addField = function(scope) {
				$scope.fields.push(scope);
			};
			this.setOrdem = function(ordem, crescente, scope,
					click) {
				$scope.objFilter.ordem = ordem;
				$scope.objFilter.crescente = crescente;
				fields.forEach(function(field) {
					field.click = 0;
				});
				scope.click = click;
				$scope.onLoad();
			}
		},
		link : function(scope, element, attrs) {
			console.log("passou : "+scope.objFilter);
			scope.rowPages = vMsg.REGISTROS_PAGINA;
			scope.rowPageSelected = {id:5, text:"5"};
			function loadTable(){
				scope.objFilter.qtdRegistros = scope.rowPageSelected.id;
				scope.onLoad();
			}
			scope.$watch("data", function() {
				var data = scope.data;
				var pageInfo = "";
				var end = (data.pagina != data.qtdPaginas) ? (data.pagina * data.qtdRegistros): data.totalRegistros;
				var init = (data.pagina != data.qtdPaginas) ? (end + 1)	- data.qtdRegistros : ((data.qtdPaginas - 1) * data.qtdRegistros) + 1;
				if (data.pagina < data.qtdPaginas) {
					scope.rightShow = false;
					scope.lastShow = false;
				} else {
					scope.rightShow = true;
					scope.lastShow = true;
				}
				if (data.pagina > 1) {
					scope.leftShow = false;
					scope.firstShow = false;
				} else {
					scope.leftShow = true;
					scope.firstShow = true;
				}
				if (data.pagina	&& data.qtdPaginas && scope.pagination) {
					pageInfo = init + "/" + end + " " + vMsg.DE;
				}
				if (data.totalRegistros) {
					pageInfo += " "	+ data.totalRegistros + " Registro(s)";
				}
				if (!pageInfo) {
					pageInfo = vMsg.SEM_REGISTROS;
				}
				scope.pageInfo = pageInfo;
			});
		scope.clickButton = function(button) {
			if (scope.objFilter) {
				if (button == "first") {
					scope.objFilter.pagina = 1;
				}
				if (button == "left") {
					scope.objFilter.pagina = (scope.data.pagina - 1);
				}
				if (button == "right") {
					scope.objFilter.pagina = (scope.data.pagina + 1);
				}
				if (button == "last") {
						scope.objFilter.pagina = scope.data.qtdPaginas;
					}
				}
				loadTable();
			}
	
			scope.changeSelect = function(item) {
				scope.rowPageSelected = item;
				loadTable();
			};
			scope.editClick = function(item) {
				scope.onEdit(item);
			};
			scope.deleteClick = function(item) {				
				scope.onDelete(item);
			};
		}
	}
});

angular.module("uiDirective").directive("uiTrThead", function(vPath, vMsg, $compile, $timeout) {
	return {
		templateUrl : vPath.VIEWS + "ui-tr-thead.html",
		replace : true,
		transclude : true,
		scope : {
			width : "@width",
			addClass : "@addClass",
			field : "@field",
			labelTooltipEdit : "@labelTooltipEdit",
			labelTooltipDelete : "@labelTooltipDelete",
			labelBtnEdit : "@labelBtnEdit",
			labelBtnDelete : "@labelBtnDelete",
			orderBy : "@orderBy",
			isAction : "@isAction"
		},
		require : "^?uiTable",
		link : function(scope, element, attrs, ctrl) {
			if (!scope.labelTooltipEdit) {
				scope.labelTooltipEdit = vMsg.EDITAR;
			}
			if (!scope.labelTooltipDelete) {
				scope.labelTooltipDelete = vMsg.DELETE;
			}
			if (ctrl) {
				ctrl.addField(scope);
			}
			if (scope.orderBy) {
				var icon1 = $('<i ng-if="click == 1" ng-click="setOrder(2);" class="material-icons">arrow_drop_up</i>');
				var icon2 = $('<i ng-if="click == 2" ng-click="setOrder(0);" class=" material-icons">arrow_drop_down</i>');
				var icon3 = $('<i ng-if="click == 0" ng-click="setOrder(1);" class="not-order material-icons">remove</i>');

				$.material.ripples(icon1);
				$.material.ripples(icon2);
				$.material.ripples(icon3);

				icon1 = $compile(icon1)(scope);
				icon2 = $compile(icon2)(scope);
				icon3 = $compile(icon3)(scope);

				element.append(icon1);
				element.append(icon2);
				element.append(icon3);

				scope.trOrder = 'tr-order';
				scope.click = 0;
			}

			scope.setOrder = function(click) {
				var field = scope.field, crescente = {
					0 : true,
					1 : true,
					2 : false
				};
				if (ctrl) {
					if (click == 0) {
						field = "id";
					}
					ctrl.setOrdem(field, crescente[click],
							scope, click);
				}
			};
		}
	}
});

angular.module("uiDirective").directive("uiCadModal", function(vPath, vMsg) {
	return {
		templateUrl : vPath.PAGINAS + "ui-tr-thead.html",
		replace : true,
		transclude : true,
		scope : {

		},
		link : function(scope, element, attrs) {

		}
	}
});

angular.module("uiDirective").directive("uiFooter", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-footer.html",
		transclude : true
	}
});

angular.module("uiDirective").directive("uiColum", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-colum.html",
		transclude : true
	}
});

angular.module("uiDirective").directive("uiContentFooter", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-content-footer.html",
		scope : {
			width : "@width",
			label : "@label"
		}
	}
});

angular.module("uiDirective").directive("uiSelect",	function(vPath, $document, utilListener, vMsg, utilValid, utilEvent, utilFunc, $timeout,$window) {
	return {
		templateUrl : vPath.VIEWS + "ui-select.html",
		scope : {
			width : "@width",
			addClass : "@addClass",
			label : "@label",
			field : "@field",
			notEmpty : "@notEmpty",
			isFilter : "@isFilter",
			notDiselected : "@notDiselected",
			iconBefore : "@iconBefore",
			list : "=list",
			funcClick: "=funcClick",
			multValue : "=multValue",
			value : "=value"
		},
		require : "^?uiForm",
		link : function(scope, element, attrs, ctrl) {
			scope.isSelect = true;
			scope.isFirstLoad = true;//Flag para não validar na primeira vez que carrega a página.
			scope.msgFilter = vMsg.FILTRAR;
			if (ctrl) {
				ctrl.addScope(scope);
			}
			if (!scope.width) {
				scope.width = 12;
			}
			if(!scope.isFilter){
				element.find(".li-filtro-select").css("display", "none");
			}
			
			element.find(".form-control:first").on("focus", function() {
				utilFunc.setPositionSelect(element);
				element.find("#select" + scope.$id).prop("checked", true);
			});
			
			$document.on("click", function() {
				if (!element.find(".lista-select").is(":hover")
						&& !element.find(".form-control:first").is(":hover")) {
					element.find("#select" + scope.$id).prop("checked", false);
				}
			});
			
			scope.closeSelect = function() {
				element.find("#select" + scope.$id).prop("checked", false);
			};
			scope.onClickLi = function(item) {
				utilValid.validClickSelect(scope, element, item);
				utilValid.validSelect(scope, element);
				if(scope.funcClick){
					scope.funcClick(item);
				}
				
			};
			scope.finishRenderList = function(){
				if(!scope.onRender){
					$timeout(function(){
						utilValid.validSetSelect(scope, element, true);
						scope.onRender = false;
					}, 500);
				}
				scope.onRender = true;
			};
			utilListener.setListenerSelect(scope, element);
		}
	}
});

angular.module("uiDirective").directive("uiMenuNotification", function(vPath) {
	return {
		templateUrl : vPath.VIEWS + "ui-menu-notification.html",
		replace : true,
		transclude : true,
		scope : {
			icon : "@icon",
			label : "@label",
			addClass : "@addClass",
			badges : "=badges",
			notifications : "=notifications",
		},
		link : function(scope, element, attrs) {
			var btn = element.find(".btn");
			$.material.ripples(btn);
		}
	}
});

