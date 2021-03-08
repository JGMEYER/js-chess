(this["webpackJsonpjs-chess"]=this["webpackJsonpjs-chess"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var i=n(6),o=n.n(i),l=n(16),s=n.n(l),a=(n(21),n(9)),r=n(7),c=n(1),h=n(2),u=n(8),v=n(4),f=n(3),d=(n(22),n(5)),b=(n(23),n(13)),k=n.n(b),w={WHITE:0,BLACK:1};Object.freeze(w);var g=w;function p(e){var t=Object(a.a)(e,2),n=t[0],i=t[1];if(n<0||n>7)return null;if(i<0||i>7)return null;var o=String.fromCharCode(i+97),l=8-n;return"".concat(o).concat(l)}function j(e){if(2!==e.length||e.toLowerCase()!==e)throw TypeError("FileRank must be 2-character lowercase string");var t=e[0],n=Number(e[1]);if(t<"a"||t>"h")throw RangeError("File out of bounds");if(n<1||n>8)throw RangeError("Rank out of bounds");return[8-n,t.charCodeAt(0)-97]}var C=function(){function e(t,n,i){Object(c.a)(this,e),this.from=t,this.to=n,this.promotion=i}return Object(h.a)(e,[{key:"fromToRowCol",value:function(){return j(this.from)}},{key:"toToRowCol",value:function(){return j(this.to)}}]),e}(),O=function(){function e(t,n,i,o,l,s,a){if(Object(c.a)(this,e),this.constructor==e)throw new Error("Cannot instantiate abstract class ChessPiece");this.id=e.count,this.icon=t,this.printIcon=n,this.notation=i,this.points=o,this.color=l,this.row=s,this.col=a,e.count++}return Object(h.a)(e,[{key:"move",value:function(e,t){this.row=e,this.col=t}},{key:"getFileRank",value:function(){return p([this.row,this.col])}},{key:"getMoveRowCol",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=p([this.row,this.col]),i=p(e);return new C(n,i,t)}},{key:"getMoveFileRank",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=p([this.row,this.col]),i=e;return new C(n,i,t)}},{key:"_validMovesAlongLine",value:function(e,t,n,i){for(var o=[],l=null,s=null,a=this.row+t,r=this.col+n;a>=0&&a<=7&&r>=0&&r<=7;){if(l=e.get(a,r),s=this.getMoveRowCol([a,r]),l){l.isEnemyOf(this.color)&&(i&&e.kingWouldBeInCheck(this.color,s)||o.push(s));break}i&&e.kingWouldBeInCheck(this.color,s)||o.push(s),a+=t,r+=n}return o}},{key:"validMoves",value:function(e,t){throw new Error("Method validMoves() must be implemented.")}},{key:"isEnemyOf",value:function(e){return e!==this.color}}]),e}();O.count=0;var m=O,E=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2658":"\u265e",s=e===g.WHITE?"N":"n";return t.call(this,"\u265e",l,s,3,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[this.getMoveRowCol([this.row-2,this.col-1]),this.getMoveRowCol([this.row-2,this.col+1]),this.getMoveRowCol([this.row-1,this.col+2]),this.getMoveRowCol([this.row+1,this.col+2]),this.getMoveRowCol([this.row+2,this.col+1]),this.getMoveRowCol([this.row+2,this.col-1]),this.getMoveRowCol([this.row+1,this.col-2]),this.getMoveRowCol([this.row-1,this.col-2])],o=null,l=i.filter((function(n){return null!==n.to&&(!(o=e.getFileRank(n.to))||!(!o||!o.isEnemyOf(t.color)))}));return n?l.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):l}}]),n}(m),M=n(11),y=n(10),I=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2655":"\u265b",s=e===g.WHITE?"Q":"q";return t.call(this,"\u265b",l,s,9,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,-1,t),i=this._validMovesAlongLine(e,-1,1,t),o=this._validMovesAlongLine(e,1,-1,t),l=this._validMovesAlongLine(e,1,1,t),s=this._validMovesAlongLine(e,-1,0,t),a=this._validMovesAlongLine(e,0,1,t),r=this._validMovesAlongLine(e,1,0,t),c=this._validMovesAlongLine(e,0,-1,t);return[].concat(Object(d.a)(s),Object(d.a)(a),Object(d.a)(r),Object(d.a)(c),Object(d.a)(n),Object(d.a)(i),Object(d.a)(o),Object(d.a)(l))}}]),n}(m),T=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2659":"\u265f",s=e===g.WHITE?"P":"p";return t.call(this,"\u265f",l,s,1,e,i,o)}return Object(h.a)(n,[{key:"hasMoved",value:function(){return this.color===g.WHITE&&6!==this.row||this.color===g.BLACK&&1!==this.row}},{key:"getMoveRowCol",value:function(e){var t=Object(a.a)(e,2),i=t[0],o=(t[1],0===i||7===i?"q":null);return Object(M.a)(Object(y.a)(n.prototype),"getMoveRowCol",this).call(this,e,o)}},{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[];this.color===g.WHITE?this.row>0&&null===e.get(this.row-1,this.col)&&i.push(this.getMoveRowCol([this.row-1,this.col])):this.color===g.BLACK&&this.row<7&&null===e.get(this.row+1,this.col)&&i.push(this.getMoveRowCol([this.row+1,this.col])),this.hasMoved()||(this.color===g.WHITE?this.row>1&&null===e.get(this.row-1,this.col)&&null===e.get(this.row-2,this.col)&&i.push(this.getMoveRowCol([this.row-2,this.col])):this.color===g.BLACK&&this.row<6&&null===e.get(this.row+1,this.col)&&null===e.get(this.row+2,this.col)&&i.push(this.getMoveRowCol([this.row+2,this.col])));e.get(this.row,this.col-1),e.get(this.row,this.col+1);if(this.color===g.WHITE){if(this.row>0&&this.col>0){var o=e.get(this.row-1,this.col-1);(o&&o.isEnemyOf(this.color)||e.enPassantTarget===p([this.row-1,this.col-1]))&&i.push(this.getMoveRowCol([this.row-1,this.col-1]))}if(this.row>0&&this.col<7){var l=e.get(this.row-1,this.col+1);(l&&l.isEnemyOf(this.color)||e.enPassantTarget===p([this.row-1,this.col+1]))&&i.push(this.getMoveRowCol([this.row-1,this.col+1]))}}else if(this.color===g.BLACK){if(this.row<7&&this.col>0){var s=e.get(this.row+1,this.col-1);(s&&s.isEnemyOf(this.color)||e.enPassantTarget===p([this.row+1,this.col-1]))&&i.push(this.getMoveRowCol([this.row+1,this.col-1]))}if(this.row<7&&this.col<7){var a=e.get(this.row+1,this.col+1);(a&&a.isEnemyOf(this.color)||e.enPassantTarget===p([this.row+1,this.col+1]))&&i.push(this.getMoveRowCol([this.row+1,this.col+1]))}}return n?i.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):i}}]),n}(m),R=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2656":"\u265c",s=e===g.WHITE?"R":"r";return t.call(this,"\u265c",l,s,5,e,i,o)}return Object(h.a)(n,[{key:"move",value:function(e,t){Object(M.a)(Object(y.a)(n.prototype),"move",this).call(this,e,t)}},{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,0,t),i=this._validMovesAlongLine(e,1,0,t),o=this._validMovesAlongLine(e,0,1,t),l=this._validMovesAlongLine(e,0,-1,t);return[].concat(Object(d.a)(n),Object(d.a)(o),Object(d.a)(i),Object(d.a)(l))}}]),n}(m),P=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2654":"\u265a",s=e===g.WHITE?"K":"k";return t.call(this,"\u265a",l,s,Infinity,e,i,o)}return Object(h.a)(n,[{key:"move",value:function(e,t){Object(M.a)(Object(y.a)(n.prototype),"move",this).call(this,e,t)}},{key:"queenSideCastleAvailable",value:function(e){var t=this.color===g.WHITE?"Q":"q";return e.castleAvailable(t)}},{key:"canQueenSideCastle",value:function(e){var t=this.color===g.WHITE?1:8;return!!this.queenSideCastleAvailable(e)&&(!(e.fileRankOccupied("b".concat(t))||e.fileRankOccupied("c".concat(t))||e.fileRankOccupied("d".concat(t)))&&(!e.kingInCheck(this.color)&&(!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("d".concat(t)))&&!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("c".concat(t))))))}},{key:"kingSideCastleAvailable",value:function(e){var t=this.color===g.WHITE?"K":"k";return e.castleAvailable(t)}},{key:"canKingSideCastle",value:function(e){var t=this.color===g.WHITE?1:8;return!!this.kingSideCastleAvailable(e)&&(!e.fileRankOccupied("f".concat(t))&&!e.fileRankOccupied("g".concat(t))&&(!e.kingInCheck(this.color)&&(!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("f".concat(t)))&&!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("g".concat(t))))))}},{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[this.getMoveRowCol([this.row-1,this.col]),this.getMoveRowCol([this.row-1,this.col+1]),this.getMoveRowCol([this.row,this.col+1]),this.getMoveRowCol([this.row+1,this.col+1]),this.getMoveRowCol([this.row+1,this.col]),this.getMoveRowCol([this.row+1,this.col-1]),this.getMoveRowCol([this.row,this.col-1]),this.getMoveRowCol([this.row-1,this.col-1])],o=null,l=i.filter((function(n){return null!==n.to&&(!(o=e.getFileRank(n.to))||!(!o||!o.isEnemyOf(t.color)))}));if(n){var s=this.color===g.WHITE?1:8;this.canQueenSideCastle(e)&&l.push(this.getMoveFileRank("c".concat(s))),this.canKingSideCastle(e)&&l.push(this.getMoveFileRank("g".concat(s)))}return n?l.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):l}}]),n}(m),W=function(){function e(){Object(c.a)(this,e),this.board=[[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null]],this.currentPlayer=g.WHITE,this.availableCastles="-",this.enPassantTarget="-",this.halfMoveClock=0,this.fullMoveNumber=1}return Object(h.a)(e,[{key:"get",value:function(e,t){return this.board[e][t]}},{key:"getFileRank",value:function(e){var t=j(e),n=Object(a.a)(t,2),i=n[0],o=n[1];return this.board[i][o]}},{key:"fileRankOccupied",value:function(e){var t=j(e),n=Object(a.a)(t,2),i=n[0],o=n[1];return null!==this.board[i][o]}},{key:"setFileRank",value:function(e,t){var n=j(e),i=Object(a.a)(n,2),o=i[0],l=i[1];this.board[o][l]=t}},{key:"reset",value:function(){this.board=[[new R(g.BLACK,0,0),new E(g.BLACK,0,1),new B(g.BLACK,0,2),new I(g.BLACK,0,3),new P(g.BLACK,0,4),new B(g.BLACK,0,5),new E(g.BLACK,0,6),new R(g.BLACK,0,7)],[new T(g.BLACK,1,0),new T(g.BLACK,1,1),new T(g.BLACK,1,2),new T(g.BLACK,1,3),new T(g.BLACK,1,4),new T(g.BLACK,1,5),new T(g.BLACK,1,6),new T(g.BLACK,1,7)],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[new T(g.WHITE,6,0),new T(g.WHITE,6,1),new T(g.WHITE,6,2),new T(g.WHITE,6,3),new T(g.WHITE,6,4),new T(g.WHITE,6,5),new T(g.WHITE,6,6),new T(g.WHITE,6,7)],[new R(g.WHITE,7,0),new E(g.WHITE,7,1),new B(g.WHITE,7,2),new I(g.WHITE,7,3),new P(g.WHITE,7,4),new B(g.WHITE,7,5),new E(g.WHITE,7,6),new R(g.WHITE,7,7)]],this.currentPlayer=g.WHITE,this.availableCastles="KQkq",this.enPassantTarget="-",this.halfMoveClock=0,this.fullMoveNumber=1}},{key:"move",value:function(e){var t=j(e.from),n=Object(a.a)(t,2),i=n[0],o=n[1],l=j(e.to),s=Object(a.a)(l,2),r=s[0],c=s[1],h=this.board[i][o],u=this.board[r][c];switch(this.board[i][o]=null,this.board[r][c]=h,h.move(r,c),e.promotion){case"q":this.board[r][c]=new I(this.currentPlayer,r,c);break;case"r":this.board[r][c]=new R(this.currentPlayer,r,c);break;case"b":this.board[r][c]=new B(this.currentPlayer,r,c);break;case"n":this.board[r][c]=new E(this.currentPlayer,r,c);break;case null:break;default:throw new Error("Invalid promotion value, should be /[qrbn]/")}if(h instanceof T&&e.to===this.enPassantTarget&&(h.color===g.WHITE?(u=this.board[r+1][c],this.board[r+1][c]=null):h.color===g.BLACK&&(u=this.board[r-1][c],this.board[r-1][c]=null)),h instanceof T&&2===Math.abs(i-r)?h.color===g.WHITE?this.enPassantTarget=p([r+1,c]):h.color===g.BLACK&&(this.enPassantTarget=p([r-1,c])):this.enPassantTarget="-",h instanceof P&&2===Math.abs(o-c))if(h.color===g.WHITE)if("g1"===e.to){var v=this.getFileRank("h1");this.setFileRank("f1",v),this.setFileRank("h1",null)}else{if("c1"!==e.to)throw new Error("Invalid white king move");var f=this.getFileRank("a1");this.setFileRank("d1",f),this.setFileRank("a1",null)}else if(h.color===g.BLACK)if("g8"===e.to){var d=this.getFileRank("h8");this.setFileRank("f8",d),this.setFileRank("h8",null)}else{if("c8"!==e.to)throw new Error("Invalid white king move");var b=this.getFileRank("a8");this.setFileRank("d8",b),this.setFileRank("a8",null)}return h instanceof P&&(h.color===g.WHITE?this.invalidateCastle("KQ"):h.color===g.BLACK&&this.invalidateCastle("kq")),h instanceof R&&(h.color===g.WHITE?"a1"===e.from?this.invalidateCastle("Q"):"h1"===e.from&&this.invalidateCastle("K"):h.color===g.BLACK&&("a8"===e.from?this.invalidateCastle("q"):"h8"===e.from&&this.invalidateCastle("k"))),h instanceof T||h instanceof P?this.halfMoveClock=0:this.halfMoveClock++,this.currentPlayer=this.currentPlayer===g.WHITE?g.BLACK:g.WHITE,this.currentPlayer===g.WHITE&&this.fullMoveNumber++,u}},{key:"removePiece",value:function(e,t){this.board[e][t]=null}},{key:"castleAvailable",value:function(e){return this.availableCastles.includes(e)}},{key:"invalidateCastle",value:function(e){this.availableCastles=this.availableCastles.replace(e,""),""===this.availableCastles&&(this.availableCastles="-")}},{key:"kingInCheck",value:function(e){for(var t=this.getPiecesFor(e,P)[0],n=this.getPiecesFor(e===g.WHITE?g.BLACK:g.WHITE),i=0;i<n.length;i++){if(n[i].validMoves(this,!1).filter((function(e){return e.to===t.getFileRank()})).length>0)return!0}return!1}},{key:"kingInCheckmate",value:function(e){var t=this;if(!this.kingInCheck(e))return!1;var n=this.getPiecesFor(e),i=[];return n.forEach((function(e){i.push.apply(i,Object(d.a)(e.validMoves(t)))})),0===i.length}},{key:"kingWouldBeInCheck",value:function(e,t){var n=Object(b.cloneDeep)(this);return n.move(t),n.kingInCheck(e)}},{key:"getPieces",value:function(){var e=[];return this.board.forEach((function(t){t.forEach((function(t){null!==t&&e.push(t)}))})),e}},{key:"getPiecesFor",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];return this.board.forEach((function(i){i.forEach((function(i){null!==i&&i.color===e&&(null===t||i instanceof t)&&n.push(i)}))})),n}},{key:"toFEN",value:function(){var e=[];this.board.forEach((function(t){var n="",i=0;t.forEach((function(e){null===e?i++:(i&&(n+=i,i=0),n+=e.notation)})),i&&(n+=i),e.push(n)}));var t=e.join("/");return t+=this.currentPlayer===g.WHITE?" w":" b",t+=" ".concat(this.availableCastles),t+=" ".concat(this.enPassantTarget),t+=" ".concat(this.halfMoveClock),t+=" ".concat(this.fullMoveNumber)}},{key:"print",value:function(){var e=[];this.board.forEach((function(t){var n="";t.forEach((function(e){n+=null===e?".":e.printIcon})),e.push(n)})),console.log(e.join("\n"))}}],[{key:"fromFEN",value:function(t){var n=t.split(" ");if(6!==n.length)throw new Error("FEN string must have 6 components: [ranks activePlayer availableCastles enPassantTarget halfMoveClock fullMoveNumber]");var i=n[0],o=n[1],l=n[2],s=n[3],a=n[4],r=n[5];if(-1===i.indexOf("K")||-1===i.indexOf("k"))throw new Error("Both white and black king must be present");var c=new e,h=i.split("/");if(8!==h.length)throw new RangeError("FEN must contain 8 ranks");for(var u=0;u<8;u++){for(var v=0,f=0;f<h[u].length;f++){var d=h[u][f];if(!(d>="1"&&d<="8"||["P","N","B","R","Q","K"].includes(d.toUpperCase())))throw new Error("Invalid rank notation char");if(d>="1"&&d<="8")v+=Number(d);else{var b=d===d.toUpperCase()?g.WHITE:g.BLACK,k=void 0;switch(d.toLowerCase()){case"p":k=new T(b,u,v);break;case"n":k=new E(b,u,v);break;case"b":k=new B(b,u,v);break;case"r":k=new R(b,u,v);break;case"q":k=new I(b,u,v);break;case"k":k=new P(b,u,v);break;default:throw new Error("Invalid piece notation")}c.board[u][v]=k,v++}}if(v<7||v>8)throw new Error("File must contain 8 pieces")}switch(o){case"w":c.currentPlayer=g.WHITE;break;case"b":c.currentPlayer=g.BLACK;break;default:throw new Error("Invalid active color notation")}if(!l.match("(-|K?Q?k?q?)"))throw new Error("Malformed available castles");if(c.availableCastles=l,!(1===s.length&&"-"===s||2===s.length&&s[0]>="a"&&s[0]<="h"&&s[1]>=1&&s[1]<=8))throw new Error("Malformed en passant target");if(c.enPassantTarget=s,isNaN(a)||parseInt(a)!=a||parseInt(a)<0)throw new Error("Half Move Clock must be an integer >= 0");if(c.halfMoveClock=Number(a),isNaN(r)||parseInt(r)!=r||parseInt(r)<1)throw new Error("Full Move Number must be a positive integer");return c.fullMoveNumber=Number(r),c}}]),e}(),B=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e,i,o){Object(c.a)(this,n);var l=e===g.WHITE?"\u2657":"\u265d",s=e===g.WHITE?"B":"b";return t.call(this,"\u265d",l,s,3,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,-1,t),i=this._validMovesAlongLine(e,-1,1,t),o=this._validMovesAlongLine(e,1,-1,t),l=this._validMovesAlongLine(e,1,1,t);return[].concat(Object(d.a)(n),Object(d.a)(i),Object(d.a)(o),Object(d.a)(l))}}]),n}(m),L=n(0),A=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){return Object(c.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"render",value:function(){var e=Object(d.a)(this.props.piecesCaptured);e.sort((function(e,t){return e.points===t.points?e instanceof B?-1:1:e.points>t.points?-1:1}));var t=e.reduce((function(e,t){return e+t.points}),0);return Object(L.jsxs)("div",{className:"captured-pieces-ui",children:[Object(L.jsx)("p",{className:"captured-pieces-points",children:t}),e.map((function(t,n){return Object(L.jsx)("p",{style:{zIndex:e.length-n},className:"captured-piece ".concat(t.color===g.WHITE?"white":"black"),children:t.icon},"captured-piece".concat(t.id))}))]})}}]),n}(o.a.Component),H=(n(27),function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(e,t){this.props.movePiece(e,t)}},{key:"render",value:function(){var e=this;return Object(L.jsx)("div",{className:"chess-board",children:new Array(64).fill(null).map((function(t,n){return Object(L.jsx)("div",{onClick:function(){return e.handleOnClick(Math.floor(n/8),n%8)}},"square".concat(n))}))})}}]),n}(o.a.Component)),S=(n(28),function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(){this.props.selectPiece()}},{key:"render",value:function(){var e="chess-piece";return this.props.piece.color===g.WHITE&&(e+=" white"),this.props.isInCheck&&(e+=" in-check"),Object(L.jsx)("div",{className:e,style:{top:"".concat(50*this.props.piece.row,"px"),left:"".concat(50*this.props.piece.col,"px")},onClick:this.handleOnClick,children:this.props.piece.icon})}}]),n}(o.a.Component)),F=(n(29),function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).state={fenCode:i.props.fenCode},i.handleChange=i.handleChange.bind(Object(u.a)(i)),i.handleSubmit=i.handleSubmit.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"componentDidUpdate",value:function(e){var t=this;e.fenCode!==this.props.fenCode&&this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{fenCode:t.props.fenCode})}))}},{key:"handleChange",value:function(e){this.setState((function(t){return Object(r.a)(Object(r.a)({},t),{},{fenCode:e.target.value,errorStr:""})}))}},{key:"handleSubmit",value:function(e){e.preventDefault();try{W.fromFEN(this.state.fenCode)}catch(t){return void this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{errorStr:t.message})}))}this.props.updateBoard(this.state.fenCode)}},{key:"render",value:function(){return Object(L.jsxs)("div",{children:[Object(L.jsxs)("form",{className:"fen-form",onSubmit:this.handleSubmit,children:[Object(L.jsx)("label",{htmlFor:"fen-input",children:"FEN"}),Object(L.jsx)("input",{className:"fen-input",name:"fen-input",type:"text",size:"87",maxLength:"87",value:this.state.fenCode,onChange:this.handleChange})]}),Object(L.jsx)("p",{className:"fen-form-error",children:this.state.errorStr})]})}}]),n}(o.a.Component)),N=(n(30),function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(e,t){this.props.movePiece(e,t)}},{key:"render",value:function(){var e=this;return Object(L.jsx)("div",{children:this.props.validMoves.map((function(t,n){var i=t.toToRowCol(),o=Object(a.a)(i,2),l=o[0],s=o[1];return Object(L.jsx)("div",{className:"valid-move",style:{top:"".concat(50*l,"px"),left:"".concat(50*s,"px")},onClick:function(){return e.handleOnClick(l,s)},children:"\u2022"},"valid-move".concat(n))}))})}}]),n}(o.a.Component)),K=function(){function e(){var t=this;Object(c.a)(this,e),this.bestMove=null,this.skill=null,this.depth=null,this.isThinking=!1,this.engineStatus={},this.stockfish=new Worker("stockfish.js"),this.stockfish.onmessage=function(e){var n=e&&"object"===typeof e?e.data:e;if(console.log("Stockfish: ",n),"uciok"===n)t.engineStatus.engineLoaded=!0;else if("readyok"===n)t.engineStatus.engineReady=!0;else{var i=n.match("^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?");i&&(t.bestMove=new C(i[1],i[2],i[3]?i[3]:null),t.isThinking=!1)}},this.stockfish.postMessage("uci"),this.stockfish.postMessage("isready")}return Object(h.a)(e,[{key:"isEngineLoaded",value:function(){return this.engineStatus.engineLoaded}},{key:"setFEN",value:function(e){if(!this.engineStatus.engineLoaded)throw new Error("Engine not loaded");this.stockfish.postMessage("position fen ".concat(e))}},{key:"setDepth",value:function(e){console.log(e),this.depth=k.a.clamp(e,1,20)}},{key:"setSkillLevel",value:function(e){if(!this.engineStatus.engineLoaded)throw new Error("Engine not loaded");e=k.a.clamp(e,0,20),console.log(e),this.stockfish.postMessage("setoption name Skill Level value ".concat(e));var t=Math.round(6.35*e+1),n=Math.round(-.5*e+10);this.stockfish.postMessage("setoption name Skill Level Maximum Error value ".concat(n)),this.stockfish.postMessage("setoption name Skill Level Probability value ".concat(t)),this.skillLevel=e}},{key:"searchBestMove",value:function(e){this.bestMove=null,this.isThinking=!0,this.setFEN(e.toFEN()),this.stockfish.postMessage("go depth ".concat(this.depth))}},{key:"getBestMove",value:function(){return this.isThinking?null:this.bestMove}}]),e}(),x=function(e){Object(v.a)(n,e);var t=Object(f.a)(n);function n(e){var i;Object(c.a)(this,n),i=t.call(this,e);var o=new W;o.reset();var l=new K;return i.state={chessBoardState:o,selectedPiece:null,whitePiecesCaptured:[],blackPiecesCaptured:[],stockfish:l,stockfishSkillLevel:0,stockfishDepth:1},i.selectPiece=i.selectPiece.bind(Object(u.a)(i)),i.movePiece=i.movePiece.bind(Object(u.a)(i)),i.updateBoard=i.updateBoard.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"selectPiece",value:function(e){e===this.state.selectedPiece?this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{selectedPiece:null})})):this.state.chessBoardState.currentPlayer===e.color&&this.setState((function(t){return Object(r.a)(Object(r.a)({},t),{},{selectedPiece:e})}))}},{key:"movePiece",value:function(e,t){if(this.state.selectedPiece){var n=this.state.selectedPiece.validMoves(this.state.chessBoardState).filter((function(n){var i=n.toToRowCol(),o=Object(a.a)(i,2),l=o[0],s=o[1];return l===e&&s===t}))[0];if(n){var i=this.state.chessBoardState.move(n);i&&(i.color===g.WHITE?this.state.whitePiecesCaptured.push(i):i.color===g.BLACK&&this.state.blackPiecesCaptured.push(i))}else console.log("Invalid move");var o=W.fromFEN(this.state.chessBoardState.toFEN());this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{chessBoardState:o,selectedPiece:null})}))}else console.log("No piece selected")}},{key:"updateBoard",value:function(e){var t=W.fromFEN(e);this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{chessBoardState:t})}))}},{key:"render",value:function(){var e=this,t=this.state.chessBoardState.getPieces();return Object(L.jsxs)("div",{children:[Object(L.jsxs)("div",{className:"chess-board-game-ui-container",children:[Object(L.jsxs)("div",{className:"chess-board-ui-container",children:[Object(L.jsx)(H,{movePiece:this.movePiece}),t.map((function(t){return Object(L.jsx)(S,{piece:t,isInCheck:t instanceof P&&e.state.chessBoardState.kingInCheck(t.color),selectPiece:function(){return e.selectPiece(t)}},"chess-piece".concat(t.id))})),this.state.selectedPiece?Object(L.jsx)(N,{validMoves:this.state.selectedPiece.validMoves(this.state.chessBoardState),movePiece:this.movePiece}):Object(L.jsx)("div",{})]}),Object(L.jsxs)("div",{className:"chess-board-ui-sidebar",children:[Object(L.jsx)(A,{piecesCaptured:this.state.whitePiecesCaptured}),Object(L.jsx)(A,{piecesCaptured:this.state.blackPiecesCaptured})]})]}),Object(L.jsx)(F,{fenCode:this.state.chessBoardState.toFEN(),updateBoard:this.updateBoard})]})}}]),n}(o.a.Component);s.a.render(Object(L.jsx)(o.a.StrictMode,{children:Object(L.jsx)(x,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.9bb1483d.chunk.js.map