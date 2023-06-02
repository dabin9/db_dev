function mToggle() {
    let
        btn = document.querySelector(".mo-btn")
    ,   layer = document.querySelector(".m-gnb")
    ;
    function append_event() {
        btn.classList.toggle("on")
        layer.classList.toggle("on")
    }
    function event_listener() {
        if ( btn ) btn.addEventListener("click", append_event);
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
        // console.log(icons, btns)
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
	function make_dom( datas ) {
		let 
			ul = document.createElement("ul")
		,	li = document.createElement("li")
		,	div = document.createElement("div")
		;

		ul.classList.add("data-list");	//	css를 위한 class추가
		
		// 받은 데이터는 최상위가 배열로 되어있기 때문에 반복문을 돌림
		datas.forEach( data => {
			let new_li = li.cloneNode( true );	// li를 계속 넣기 위해 복사
			// data는 object형태로 들어가기 때문에 for in문으로 데이터 별로 돌려서 DOM Element에 추가
			for( const property in data ) {
				/**
				 * @property : object property명
				 * @data : object 한개의 데이터
				 */
				let 
                    new_div = div.cloneNode( true );	//	데이터를 넣기 위한 div를 복사
				new_div.innerHTML = `<span class="label">${ property }</span><span class="text">${ data[property] }</span>`;	// 복사한 div에 데이터를 넣음
				new_li.appendChild( new_div );	// 복사인 li에 div를 넣음
			}
			// 각 object의 속성별로 li에 넣는 것 완료

			ul.appendChild( new_li );	// 완료된 li를 ul에 추가
		});

		document.querySelector(".content").appendChild( ul );	// 완성된 ul DOM Element를 .wrap에 넣음
	}


	function dom1() {
		function get_json_data() {
			fetch("/json/data1.json")
			.then( response => response.json() )
			.then( data => {
				make_dom( data );
			});
		}
		get_json_data();
	}
	function dom2() {
		function get_json_data() {
			fetch("/json/data2.json")
			.then( response => response.json() )
			.then( data => {
				make_dom( data );
			});
		}
		get_json_data();
	}
	function dom3() {
		function get_json_data() {
			fetch("/json/data3.json")
			.then( response => response.json() )
			.then( data => {
				make_dom( data );
			});
		}
		get_json_data();
	}
    function dom4() {
		function get_json_data() {
			fetch("/json/data4.json")
			.then( response => response.json() )
			.then( data => {
				make_dom( data );
			});
		}
		get_json_data();
	}
    function dom5() {
		function get_json_data() {
			fetch("/json/data5.json")
			.then( response => response.json() )
			.then( data => {
				make_dom( data );
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

	function init() {
		page_chk();
	}

	( _ => {
		init();
	})();
}



new mToggle;
new hoverGnb;
new changeInputValue;
new inputNumber;
new activeIcon;
new inpCreditNum;
new chkActive;
new commonActiveTab;
new appendDatas;

// swiper

new Swiper(".notice-slide", {
    direction: "vertical",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    pagination: {
      clickable: true,
    },
  });



