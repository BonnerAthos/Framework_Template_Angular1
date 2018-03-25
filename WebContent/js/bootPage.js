/*

 bootpag - jQuery plugin for dynamic pagination

 Copyright (c) 2015 botmonster@7items.com

 Licensed under the MIT license:
   http://www.opensource.org/licenses/mit-license.php

 Project home:
   http://botmonster.com/jquery-bootpag/

 Version:  1.0.7

*/


(function(h, q){
	h.fn.bootpag = function(p){
		function m(c , b){
			b = parseInt(b , 10);
			var d ,
				e = 0 == a.maxVisible ? 1 : a.maxVisible,
				k = 1 == a.maxVisible ? 0 : 1,
				n = Math.floor((b -1) /e) * e,
				f = c.find("li");
				a.page = b = 0 > b ? 0 : b > a.total ? a.total : b;
				f.removeClass(a.activeClass);
				d = 1 > b-1 ? 1 : a.leaps && b-1 >= a.maxVisible ? Math.floor((b -1) /e) * e : b -1;
				a.firstLastUse && f.first().toggleClass(a.disabledClass, 1 === b);
				e = f.first();
				a.firstLastUse && (e = e.next());
				e.toggleClass(a.disabledClass, 1 === b).attr("data-lp",d).find("a").attr("href", g(d));
				k = 1 == a.maxVisible ? 0 : 1;
				d = b + 1 > a.total ? 
						a.total : 
							a.leaps && b + 1 < a.total - a.maxVisible ?
									n+a.maxVisible+k :
										b+1;e=f.last();
				a.firstLastUse&&( e = e.prev());
				e.toggleClass(a.disabledClass ,b === a.total).attr("data-lp", d).find("a").attr("href", g(d));
				f.last().toggleClass(a.disabledClass, b=== a.total); e=f.filter("[data-lp="+b+"]");
				k = "." + [a.nextClass, a.prevClass, a.firstClass, a.lastClass].join(",.");
				
				if(!e.not(k).length){
					var m = b <= n ? -a.maxVisible : 0;
					f.not(k).each(function(b){
						d = b + 1 + n + m;
						h(this).attr("data-lp", d).toggle( d <= a.total).find("a").html(d).attr("href", g(d))
					});
					e = f.filter("[data-lp="+b+"]")
				}
				e.not(k).addClass(a.activeClass);
				l.data("settings",a)
		} 
		
		function g(c){
			return a.href.replace(a.hrefVariable, c)
		}
		
		var l = this ,
			a = h.extend({ total:0, 
								page : 1, 
								maxVisible : null,
								leaps : !0, 
								href : "javascript:void(0);",
								hrefVariable : "{{number}}",
								next : "&raquo;",
								prev : "&laquo;",
								firstLastUse : !1,first :'<span aria-hidden="true">&larr ; </span>',
								last : '<span aria-hidden="true">&rarr;</span>', 
								wrapClass : "pagination pagination-sm " , 
								activeClass : "active",
								disabledClass : "disabled",
								nextClass : "next", 
								prevClass: "prev",
								lastClass : "last" , 
								firstClass : "first",
								registros: 5,
								totalRegistros: 0}, 
								l.data("settings") || {}, 
								p || {});
		if( 0 >= a.total) return this;
			h.isNumeric(a.maxVisible) || a.maxVisible || (a.maxVisible = parseInt(a.total, 10));
		
		l.data("settings", a);
		
		return this.each(function(){
			function getSelected(num){
				
				if(num == a.registros){
					return "selected";
				}else{ return ""}
			}
			var estilo = 'style="position: relative; float: left; padding: 5px 10px; margin-left: -1px; line-height: 1.3; color: #337ab7; text-decoration: none; background-color: #fff; border: 1px solid #ddd; border-top-left-radius: 4px; border-bottom-left-radius: 4px; cursor: default";'
			
			var liQtdRegistos = '<div class="text-left col-sm-3 ">'
									+'<div class="col-sm-7 text-right" ' + estilo + '>Registros</div>'
										+'<div class="col-sm-5 "><select id="qtdRegistros" name="qtdRegistros" class="form-control input-sm" ' + estilo + '>'
											+ '<option value="5" ' + getSelected(5) + '> 5</option>'
											+ '<option value="10" ' + getSelected(10) + '>10</option>'
											+ '<option value="20" ' + getSelected(20) + '>20</option>'
											+ '<option value="30" ' + getSelected(30) + '>30</option>'
											+ '<option value="40" ' + getSelected(40) + '>40</option>'
											+ '<option value="50" ' + getSelected(50) + '>50</option>'
											+ '<option value="100" ' + getSelected(100) + '>100</option>'
										+ '</select></div>'	
									+ '</div>';
			var liTotal = '<div><div class="col-sm-3 text-right" ' + estilo + '> Pág.: ' + a.page  +  '/'  + a.total + ' - Total.: ' + a.totalRegistros + '</div></div>';
			
			var c , b, d = h (this);
			c=[ ' <ul class="', a.wrapClass, ' col-sm-12 bootpag">'];
			a.firstLastUse && (c=c.concat(['<li data-lp="1" class="', a.firstClass, '"><a href="', g(1), '">', a.first, "</a></li>"]));
			a.prev && (c=c.concat(['<li data-lp="1" class="', a.prevClass, '"><a href="', g(1),'">', a.prev, "</a></li>"]));
			for(b = 1; b <= Math.min(a.total, a.maxVisible);b++)
				c = c.concat(['<li data-lp="', b ,'"> <a href="', g(b), '">', b, "</a></li>"]);
				a.next && (b = a.leaps && a.total > a.maxVisible 
						? Math.min(a.maxVisible + 1, a.total) 
								: 2, c = c.concat(['<li data-lp="', b, '" class="', a.nextClass, '"><a href="', g(b), '">', a.next, "</a></li>"]));
				a.firstLastUse && (c=c.concat(['<li data-lp="', a.total, '" class="last"><a href="', g(a.total), '">', a.last,"</a></li>"]));
				c.push(((a.registros > 4) ? liQtdRegistos  : '') + ((a.page > 0 && a.total > 0) ? liTotal : '') + " </ul>"); 
				d.find("ul.bootpag").remove();
				d.append(c.join(""));
				c=d.find("ul.bootpag");
				d.find("li").click(function(){
						var b= h (this);
						if(!b.hasClass(a.disabledClass) && !b.hasClass(a.activeClass)){
							var c=parseInt(b.attr("data-lp"),10);
							l.find("ul.bootpag").each(function(){
								m(h(this),c)
							});
							l.trigger("page", c)
						}
				});
				m(c, a.page)
			})
		}
})(jQuery, window);
