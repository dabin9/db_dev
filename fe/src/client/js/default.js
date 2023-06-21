function mToggle() {
    let
        btn = document.querySelector(".mo-btn")
    ,   layer = document.querySelector(".m-gnb")
    ,   dimd = document.querySelector(".dimd")
    ;
    function open( e ) {
        btn.classList.toggle("on");
        layer.classList.toggle("on");
        dimd.classList.toggle("on");
    }
    function hide( e ) {
        btn.classList.remove("on");        
        layer.classList.remove("on");       
        dimd.classList.remove("on");       
    }

    function event_listener() {
        if ( btn ) btn.addEventListener("click", open);
        if ( dimd ) dimd.addEventListener("click", hide);
    }
    function init() {
        event_listener();
    }
    (function() {
        init();
    })();
}
function hoverGnb() {
    let
        btns = Array.prototype.slice.call(document.querySelectorAll(".gnb-box"))
    ;

    function event_listener() {
        if ( btns ) btns.forEach(function(elem, i) {
            elem.addEventListener("mouseenter", ( e )=>{
                elem.classList.add("on");
            });
            elem.addEventListener("mouseleave",  ( e )=>{
                elem.classList.remove("on");
            });
        });
    };

    function init() {
        event_listener();
    };

    (function() {
        init();
    })();
}
function commonActiveTab() {
    let
        btns = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"))
    ,   contents = Array.prototype.slice.call(document.querySelectorAll(".tab-contents .content"))
    ;

    function append_listener( e ) {
        let idx = 0;

        idx = btns.indexOf(e.currentTarget);
        // console.log(idx)
        btns.forEach(( btn, i )=>{
            if ( idx == i ) {
                contents[i].classList.add("tab-content-active");
            } else {
                contents[i].classList.remove("tab-content-active");
            }
        })
    }

    function event_listener() {
        btns.forEach(( btn ) => {
            btn.addEventListener("click", append_listener);
        })
    };

    function init() {
        event_listener();
    }
    (function() {
        init();
    })();
}
const appendDatas = function() {
    let bbs_datas = [];
    
    function make_list_dom() {
        let 
            li = document.createElement("li")
        ,   div = document.createElement("div")
        ,   link = document.createElement("a")
        ,   img = document.createElement("img")
        ,   nums = document.querySelector("#nums")
        ,   wrap = document.querySelector("#board-content")
        ,   sort = ['idx','ctg','title','text','thumbnail']
        ;

        function make_column( cname, data ) {
            let 
                div_clone = div.cloneNode( true )
            ,   img_clone = img.cloneNode( true )
            ;
            
            div_clone.classList.add(`col-${cname}`);
            if ( cname == 'thumbnail' ) {
                img_clone.src = data[cname];
                div_clone.appendChild(img_clone);
            } else {
                div_clone.textContent = data[cname];
            }
            return div_clone;
        }

        function make_row( data ) {
            let
                li_clone = li.cloneNode( true )
            ,   link_clone = link.cloneNode( true )
            ;

            sort.map( cname => {
                let div = make_column( cname, data );
                li_clone.appendChild( div );
             });
            link_clone.href = `./detail.html?idx=${data['idx']}`;
            li_clone.appendChild(link_clone);
            wrap.appendChild(li_clone);
        }

        if ( wrap ) {
            bbs_datas.map( data => make_row( data ) )
            nums.innerHTML = `(${bbs_datas.length})`
        }
    }
    function make_detail_doms() {
        function make_detail_dom() {
            let
                li = document.createElement("li")
            ,   wrap = document.querySelector("#board-detail")
            ,   sort = ['title', 'wname', 'wdate', 'content']
            ,   sort_name = {
                    title: "제목",
                    wname: "글쓴이",
                    wdate: "작성일"
            }
            ,   idx = null
            ,   datas = {}
            ;

            function make_column() {
                sort.map( cname => {
                    let
                        li_clone = li.cloneNode( true )
                    ;
                    
                    li_clone.innerHTML = ( cname == "title" || cname == "wname" || cname == "wdate" ? sort_name[cname] + " : " : "" ) + datas[cname];
                    li_clone.classList.add( cname );
                    wrap.appendChild(li_clone);
                })
            }
            function event_collection() {
                function changeInputValue() {
                    let 
                        // pw-i를 누르면 required의 type ps or text change
                        btns = Array.prototype.slice.call(document.querySelectorAll(".pw-i"))
                    ,   icons = Array.prototype.slice.call(document.querySelectorAll(".required"))
                    ;
                
                    function append_event( e ) {
                        // console.log("Aaaa")
                        // console.log(e.currentTarget)
                        idx = btns.indexOf(e.currentTarget);
                        // console.log(idx);
                        btns.forEach(( btn, i ) => {
                            if ( idx == i ) {
                                btn.classList.toggle("on")
                                if ( icons[i].type == 'password' ) {
                                    icons[i].type = 'text'
                                } else if ( icons[i].type == 'text' ) {
                                    icons[i].type = 'password'
                                }
                            }
                        })
                    }
                
                    function event_listener() {
                        if ( btns.length > 0 ) {
                            btns.forEach(( btn, i )=> {
                                btn.addEventListener("click", append_event);
                            })
                        }
                    }
                    function init() {
                        event_listener();
                    }
                    (function() {
                        init();
                    })();
                    return {
                        init
                    };
                }
                function inputNumber() {
                    let inputs = Array.prototype.slice.call(document.querySelectorAll(".only-num"));
                    
                    function down_listener( e ) {
                        let excusal = ['Backspace','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End','Tab','Delete','Insert','Ctrl','v'];
                        // console.log(excusal)
                        // console.log(e.key)
                        // e.key >= 0 && e.key <= 9 라면 트루 그 외 false
                        // console.log( excusal.indexOf(e.key) == -1 )
                        if ( !(e.key >= 0 && e.key <= 9) && excusal.indexOf(e.key) == -1 ) {
                            e.preventDefalut;
                            alert("잘못된 입력입니다!!");
                        };
                    }
                    
                    function change_listener( e ) {
                        // console.log(e.currentTarget)
                        // keyup 이 되면 정규식 치환, 숫자 제외하고 다
                        let val = e.target.value.replace(/[^0-9,-]/g,"");
                        // console.log(val)
                        e.target.value = val;
                        // console.log(val)
                    }
                
                    function event_listener() {
                        // console.log("Aaaa")
                        inputs.forEach(( elem, i )=>{
                            elem.addEventListener("keyup", change_listener);
                            elem.addEventListener("change", change_listener);
                            elem.addEventListener("keydown", down_listener);
                        })
                    }
                    function init() {
                        if ( inputs.length > 0 ) event_listener();
                    }
                    return init();
                }
                function activeIcon() {
                    let 
                        btns = document.querySelector(".input")
                    ,   actives = Array.prototype.slice.call(document.querySelectorAll(".process-pw li"))
                    ;
                
                    function press_event( e ) {
                        // console.log("aaaaaaa")
                        actives.forEach(( elem, i )=>{
                            if ( e.target.value.length > i ) {
                                elem.classList.add("active");
                            } else {
                                elem.classList.remove("active");
                            }
                        })
                    }
                
                    function event_listener() {
                        if ( btns ) btns.addEventListener("keyup", press_event);
                    }
                    function init() {
                        event_listener();
                    }
                    return init();
                }
                function inpCreditNum() {
                    let inputs = Array.prototype.slice.call(document.querySelectorAll(".input-number"));
                    function key_listener( e ) {
                        // e.length이 maxlength 숫자형보다 크거나 같을때
                        // console.log(e.target.value.length, e.target.getAttribute("maxlength")*1)
                        if ( e.target.value.length >= e.target.getAttribute("maxlength") * 1 ) {
                            let idx = inputs.indexOf(e.target);
                            // console.log(idx)
                            if ( inputs[idx + 1] ) {
                                inputs[idx + 1].select();
                                inputs[idx + 1].focus();
                            }
                        }
                        // inp들이 select(), focus() 이벤트가 일어난다
                    }
                    function event_listener() {
                        inputs.forEach(( inp )=>{
                            inp.addEventListener("keyup", key_listener);
                        })
                    }
                    function init() {
                        event_listener();
                    }
                    return init();
                }
                function chkActive() {
                    let 
                        chks = Array.prototype.slice.call(document.querySelectorAll(".chks"))
                    ,   all = document.querySelector(".all-chk")
                    ;
                
                    function all_chk( e ) {
                        chks.forEach(function( chk ) {
                            chk.checked = e.target.checked;
                        })
                    }
                
                    function chk_count( e ) {
                        let chk = 0;
                        chks.forEach(( elem )=> {
                            if ( elem.checked == true ) chk += 1;
                            // console.log(chk)
                        });
                        console.log(chks.length, chk);
                
                        if ( chks.length == chk ) all.checked = true;
                        else all.checked = false;
                    }
                
                    function event_listener() {
                        chks.forEach(( chk ) => {
                            chk.addEventListener("change", chk_count);
                        })
                        if (all) all.addEventListener("change", all_chk);
                    }
                    function init() {
                        event_listener();
                    }
                    (function() {
                        init();
                    })();
                }
                function event_listener() {
                    new changeInputValue;
                    new inputNumber;
                    new activeIcon;
                    new inpCreditNum;
                    new chkActive;
                }
                function init() {
                    event_listener();
                }
                (function() {
                    init();
                })();
            }
            if ( wrap ) {
                const
                    urlParamas = new URLSearchParams(window.location.search)
                ;
                idx = urlParamas.get("idx");
                datas = bbs_datas.filter( data => idx == data.idx)[0];
                make_column();
                new event_collection;

                // datas = bbs_datas.filter( data => idx == data.idx )
            }
        }
        function dDatas() {
            function get_json_data() {
                fetch("./json/data.json")
                .then( response => response.json() )
                .then( data => {
                    bbs_datas = data;
                    make_detail_dom();
                });
            }
            get_json_data();
        }
        dDatas();
    }
	function dom1() {
		function get_json_data() {
			fetch("./json/data1.json")
			.then( response => response.json() )
			.then( data => {
                bbs_datas = data;
                make_list_dom(bbs_datas)
			});
		}
		get_json_data();
	}
	function dom2() {
		function get_json_data() {
			fetch("./json/data2.json")
			.then( response => response.json() )
			.then( data => {
				bbs_datas = data;
                 make_list_dom(bbs_datas)
			});
		}
		get_json_data();
	}
	function dom3() {
		function get_json_data() {
			fetch("./json/data3.json")
			.then( response => response.json() )
			.then( data => {
				bbs_datas = data;
                 make_list_dom(bbs_datas)
			});
		}
		get_json_data();
	}
    function dom4() {
		function get_json_data() {
			fetch("./json/data4.json")
			.then( response => response.json() )
			.then( data => {
				bbs_datas = data;
                 make_list_dom(bbs_datas)
			});
		}
		get_json_data();
	}
    function dom5() {
		function get_json_data() {
			fetch("./json/data5.json")
			.then( response => response.json() )
			.then( data => {
				bbs_datas = data;
                 make_list_dom(bbs_datas)
			});
		}
		get_json_data();
	}
	function page_chk() {
		let pages = document.querySelectorAll((".page"));

		window.addEventListener("load", ( event )=> {
			pages.forEach(( page ) => {
				let 
					page1 = document.querySelector(".type1"),
					page2 = document.querySelector(".type2"),
					page3 = document.querySelector(".type3"),
					page4 = document.querySelector(".type4"),
					page5 = document.querySelector(".type5")
				;
                
				if ( page.contains(page1) ) {
					dom1();
				} else if ( page.contains(page2) ) {
					dom2();
				} else if ( page.contains(page3) ) {
					dom3();
				} else if ( page.contains(page4) ) {
					dom4();
				} else if ( page.contains(page5) ) {
					dom5();
				}
			})
		})
	}

	async function init() {
		await page_chk();
		await make_list_dom();
		await make_detail_doms();
	}

	( _ => {
		init();
	})();
}
function scrollAnimation() {
    function scroll_listener () {
        // console.log(document.documentElement.scrollTop)
       let 
           winScroll = window.scrollY || document.documentElement.scrollTop
       ,   height = document.documentElement.scrollHeight - document.documentElement.clientHeight
       ,   scrolled = ( winScroll / height ) * 100
       ,   elem = document.querySelector(".progress-bar")
       ;
       elem.style.width = scrolled + "%";
   }
    function event_listener() {
        window.addEventListener("load", scroll_listener);
        window.addEventListener("scroll", scroll_listener);
    }
    function init() {
        event_listener();
    }
    (function() {
        init();
    })();
}
function help(){
    let
        btn = document.querySelector(".me")
    ,   layer = document.querySelector(".help")
    ,   bubble = document.querySelector(".speech-bubble")
    ;
    function append_event() {
        layer.classList.toggle("active")
    }
    function event_listener() {
        if ( btn ) btn.addEventListener("click", append_event);
    }
    function init() {
        event_listener();
    }
    (_=>{
        init();
    })();
}



new mToggle;
new hoverGnb;
new commonActiveTab;
new appendDatas;
new scrollAnimation;
new help;

// swiper

new Swiper(".notice-slide", {
    direction: "vertical",
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    pagination: {
      clickable: true,
    },
  });



