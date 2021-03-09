(this["webpackJsonpjs-chess"]=this["webpackJsonpjs-chess"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var i=n(7),o=n.n(i),s=n(16),a=n.n(s),l=(n(21),n(9)),r=n(8),c=n(1),h=n(2),u=n(5),d=n(4),v=n(3),f=(n(22),n(6)),b=(n(23),n(13)),k=n.n(b),j={WHITE:0,BLACK:1};Object.freeze(j);var p=j;function O(e){var t=Object(l.a)(e,2),n=t[0],i=t[1];if(n<0||n>7)return null;if(i<0||i>7)return null;var o=String.fromCharCode(i+97),s=8-n;return"".concat(o).concat(s)}function w(e){if(2!==e.length||e.toLowerCase()!==e)throw TypeError("FileRank must be 2-character lowercase string");var t=e[0],n=Number(e[1]);if(t<"a"||t>"h")throw RangeError("File out of bounds");if(n<1||n>8)throw RangeError("Rank out of bounds");return[8-n,t.charCodeAt(0)-97]}var g=function(){function e(t,n,i){Object(c.a)(this,e),this.from=t,this.to=n,this.promotion=i}return Object(h.a)(e,[{key:"fromToRowCol",value:function(){return w(this.from)}},{key:"toToRowCol",value:function(){return w(this.to)}}]),e}(),C=function(){function e(t,n,i,o,s,a,l){if(Object(c.a)(this,e),this.constructor==e)throw new Error("Cannot instantiate abstract class ChessPiece");this.id=e.count,this.icon=t,this.printIcon=n,this.notation=i,this.points=o,this.color=s,this.row=a,this.col=l,e.count++}return Object(h.a)(e,[{key:"move",value:function(e,t){this.row=e,this.col=t}},{key:"getFileRank",value:function(){return O([this.row,this.col])}},{key:"getMoveRowCol",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=O([this.row,this.col]),i=O(e);return new g(n,i,t)}},{key:"getMoveFileRank",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=O([this.row,this.col]),i=e;return new g(n,i,t)}},{key:"_validMovesAlongLine",value:function(e,t,n,i){for(var o=[],s=null,a=null,l=this.row+t,r=this.col+n;l>=0&&l<=7&&r>=0&&r<=7;){if(s=e.get(l,r),a=this.getMoveRowCol([l,r]),s){s.isEnemyOf(this.color)&&(i&&e.kingWouldBeInCheck(this.color,a)||o.push(a));break}i&&e.kingWouldBeInCheck(this.color,a)||o.push(a),l+=t,r+=n}return o}},{key:"validMoves",value:function(e,t){throw new Error("Method validMoves() must be implemented.")}},{key:"isEnemyOf",value:function(e){return e!==this.color}}]),e}();C.count=0;var y=C,m=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2658":"\u265e",a=e===p.WHITE?"N":"n";return t.call(this,"\u265e",s,a,3,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[this.getMoveRowCol([this.row-2,this.col-1]),this.getMoveRowCol([this.row-2,this.col+1]),this.getMoveRowCol([this.row-1,this.col+2]),this.getMoveRowCol([this.row+1,this.col+2]),this.getMoveRowCol([this.row+2,this.col+1]),this.getMoveRowCol([this.row+2,this.col-1]),this.getMoveRowCol([this.row+1,this.col-2]),this.getMoveRowCol([this.row-1,this.col-2])],o=null,s=i.filter((function(n){return null!==n.to&&(!(o=e.getFileRank(n.to))||!(!o||!o.isEnemyOf(t.color)))}));return n?s.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):s}}]),n}(y),E=n(11),M=n(10),I=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2655":"\u265b",a=e===p.WHITE?"Q":"q";return t.call(this,"\u265b",s,a,9,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,-1,t),i=this._validMovesAlongLine(e,-1,1,t),o=this._validMovesAlongLine(e,1,-1,t),s=this._validMovesAlongLine(e,1,1,t),a=this._validMovesAlongLine(e,-1,0,t),l=this._validMovesAlongLine(e,0,1,t),r=this._validMovesAlongLine(e,1,0,t),c=this._validMovesAlongLine(e,0,-1,t);return[].concat(Object(f.a)(a),Object(f.a)(l),Object(f.a)(r),Object(f.a)(c),Object(f.a)(n),Object(f.a)(i),Object(f.a)(o),Object(f.a)(s))}}]),n}(y),T=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2659":"\u265f",a=e===p.WHITE?"P":"p";return t.call(this,"\u265f",s,a,1,e,i,o)}return Object(h.a)(n,[{key:"hasMoved",value:function(){return this.color===p.WHITE&&6!==this.row||this.color===p.BLACK&&1!==this.row}},{key:"getMoveRowCol",value:function(e){var t=Object(l.a)(e,2),i=t[0],o=(t[1],0===i||7===i?"q":null);return Object(E.a)(Object(M.a)(n.prototype),"getMoveRowCol",this).call(this,e,o)}},{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[];this.color===p.WHITE?this.row>0&&null===e.get(this.row-1,this.col)&&i.push(this.getMoveRowCol([this.row-1,this.col])):this.color===p.BLACK&&this.row<7&&null===e.get(this.row+1,this.col)&&i.push(this.getMoveRowCol([this.row+1,this.col])),this.hasMoved()||(this.color===p.WHITE?this.row>1&&null===e.get(this.row-1,this.col)&&null===e.get(this.row-2,this.col)&&i.push(this.getMoveRowCol([this.row-2,this.col])):this.color===p.BLACK&&this.row<6&&null===e.get(this.row+1,this.col)&&null===e.get(this.row+2,this.col)&&i.push(this.getMoveRowCol([this.row+2,this.col])));e.get(this.row,this.col-1),e.get(this.row,this.col+1);if(this.color===p.WHITE){if(this.row>0&&this.col>0){var o=e.get(this.row-1,this.col-1);(o&&o.isEnemyOf(this.color)||e.enPassantTarget===O([this.row-1,this.col-1]))&&i.push(this.getMoveRowCol([this.row-1,this.col-1]))}if(this.row>0&&this.col<7){var s=e.get(this.row-1,this.col+1);(s&&s.isEnemyOf(this.color)||e.enPassantTarget===O([this.row-1,this.col+1]))&&i.push(this.getMoveRowCol([this.row-1,this.col+1]))}}else if(this.color===p.BLACK){if(this.row<7&&this.col>0){var a=e.get(this.row+1,this.col-1);(a&&a.isEnemyOf(this.color)||e.enPassantTarget===O([this.row+1,this.col-1]))&&i.push(this.getMoveRowCol([this.row+1,this.col-1]))}if(this.row<7&&this.col<7){var l=e.get(this.row+1,this.col+1);(l&&l.isEnemyOf(this.color)||e.enPassantTarget===O([this.row+1,this.col+1]))&&i.push(this.getMoveRowCol([this.row+1,this.col+1]))}}return n?i.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):i}}]),n}(y),B=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2656":"\u265c",a=e===p.WHITE?"R":"r";return t.call(this,"\u265c",s,a,5,e,i,o)}return Object(h.a)(n,[{key:"move",value:function(e,t){Object(E.a)(Object(M.a)(n.prototype),"move",this).call(this,e,t)}},{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,0,t),i=this._validMovesAlongLine(e,1,0,t),o=this._validMovesAlongLine(e,0,1,t),s=this._validMovesAlongLine(e,0,-1,t);return[].concat(Object(f.a)(n),Object(f.a)(o),Object(f.a)(i),Object(f.a)(s))}}]),n}(y),P=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2654":"\u265a",a=e===p.WHITE?"K":"k";return t.call(this,"\u265a",s,a,Infinity,e,i,o)}return Object(h.a)(n,[{key:"move",value:function(e,t){Object(E.a)(Object(M.a)(n.prototype),"move",this).call(this,e,t)}},{key:"queenSideCastleAvailable",value:function(e){var t=this.color===p.WHITE?"Q":"q";return e.castleAvailable(t)}},{key:"canQueenSideCastle",value:function(e){var t=this.color===p.WHITE?1:8;return!!this.queenSideCastleAvailable(e)&&(!(e.fileRankOccupied("b".concat(t))||e.fileRankOccupied("c".concat(t))||e.fileRankOccupied("d".concat(t)))&&(!e.kingInCheck(this.color)&&(!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("d".concat(t)))&&!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("c".concat(t))))))}},{key:"kingSideCastleAvailable",value:function(e){var t=this.color===p.WHITE?"K":"k";return e.castleAvailable(t)}},{key:"canKingSideCastle",value:function(e){var t=this.color===p.WHITE?1:8;return!!this.kingSideCastleAvailable(e)&&(!e.fileRankOccupied("f".concat(t))&&!e.fileRankOccupied("g".concat(t))&&(!e.kingInCheck(this.color)&&(!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("f".concat(t)))&&!e.kingWouldBeInCheck(this.color,this.getMoveFileRank("g".concat(t))))))}},{key:"validMoves",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[this.getMoveRowCol([this.row-1,this.col]),this.getMoveRowCol([this.row-1,this.col+1]),this.getMoveRowCol([this.row,this.col+1]),this.getMoveRowCol([this.row+1,this.col+1]),this.getMoveRowCol([this.row+1,this.col]),this.getMoveRowCol([this.row+1,this.col-1]),this.getMoveRowCol([this.row,this.col-1]),this.getMoveRowCol([this.row-1,this.col-1])],o=null,s=i.filter((function(n){return null!==n.to&&(!(o=e.getFileRank(n.to))||!(!o||!o.isEnemyOf(t.color)))}));if(n){var a=this.color===p.WHITE?1:8;this.canQueenSideCastle(e)&&s.push(this.getMoveFileRank("c".concat(a))),this.canKingSideCastle(e)&&s.push(this.getMoveFileRank("g".concat(a)))}return n?s.filter((function(n){return!e.kingWouldBeInCheck(t.color,n)})):s}}]),n}(y),x=function(){function e(){Object(c.a)(this,e),this.board=[[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null]],this.currentPlayer=p.WHITE,this.availableCastles="-",this.enPassantTarget="-",this.halfMoveClock=0,this.fullMoveNumber=1}return Object(h.a)(e,[{key:"get",value:function(e,t){return this.board[e][t]}},{key:"getFileRank",value:function(e){var t=w(e),n=Object(l.a)(t,2),i=n[0],o=n[1];return this.board[i][o]}},{key:"fileRankOccupied",value:function(e){var t=w(e),n=Object(l.a)(t,2),i=n[0],o=n[1];return null!==this.board[i][o]}},{key:"setFileRank",value:function(e,t){var n=w(e),i=Object(l.a)(n,2),o=i[0],s=i[1];this.board[o][s]=t}},{key:"reset",value:function(){this.board=[[new B(p.BLACK,0,0),new m(p.BLACK,0,1),new H(p.BLACK,0,2),new I(p.BLACK,0,3),new P(p.BLACK,0,4),new H(p.BLACK,0,5),new m(p.BLACK,0,6),new B(p.BLACK,0,7)],[new T(p.BLACK,1,0),new T(p.BLACK,1,1),new T(p.BLACK,1,2),new T(p.BLACK,1,3),new T(p.BLACK,1,4),new T(p.BLACK,1,5),new T(p.BLACK,1,6),new T(p.BLACK,1,7)],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[new T(p.WHITE,6,0),new T(p.WHITE,6,1),new T(p.WHITE,6,2),new T(p.WHITE,6,3),new T(p.WHITE,6,4),new T(p.WHITE,6,5),new T(p.WHITE,6,6),new T(p.WHITE,6,7)],[new B(p.WHITE,7,0),new m(p.WHITE,7,1),new H(p.WHITE,7,2),new I(p.WHITE,7,3),new P(p.WHITE,7,4),new H(p.WHITE,7,5),new m(p.WHITE,7,6),new B(p.WHITE,7,7)]],this.currentPlayer=p.WHITE,this.availableCastles="KQkq",this.enPassantTarget="-",this.halfMoveClock=0,this.fullMoveNumber=1}},{key:"move",value:function(e){var t=w(e.from),n=Object(l.a)(t,2),i=n[0],o=n[1],s=w(e.to),a=Object(l.a)(s,2),r=a[0],c=a[1],h=this.board[i][o],u=this.board[r][c];switch(this.board[i][o]=null,this.board[r][c]=h,h.move(r,c),e.promotion){case"q":this.board[r][c]=new I(this.currentPlayer,r,c);break;case"r":this.board[r][c]=new B(this.currentPlayer,r,c);break;case"b":this.board[r][c]=new H(this.currentPlayer,r,c);break;case"n":this.board[r][c]=new m(this.currentPlayer,r,c);break;case null:break;default:throw new Error("Invalid promotion value, should be /[qrbn]/")}if(h instanceof T&&e.to===this.enPassantTarget&&(h.color===p.WHITE?(u=this.board[r+1][c],this.board[r+1][c]=null):h.color===p.BLACK&&(u=this.board[r-1][c],this.board[r-1][c]=null)),h instanceof T&&2===Math.abs(i-r)?h.color===p.WHITE?this.enPassantTarget=O([r+1,c]):h.color===p.BLACK&&(this.enPassantTarget=O([r-1,c])):this.enPassantTarget="-",h instanceof P&&2===Math.abs(o-c))if(h.color===p.WHITE)if("g1"===e.to){var d=this.getFileRank("h1");this.setFileRank("f1",d),this.setFileRank("h1",null)}else{if("c1"!==e.to)throw new Error("Invalid white king move");var v=this.getFileRank("a1");this.setFileRank("d1",v),this.setFileRank("a1",null)}else if(h.color===p.BLACK)if("g8"===e.to){var f=this.getFileRank("h8");this.setFileRank("f8",f),this.setFileRank("h8",null)}else{if("c8"!==e.to)throw new Error("Invalid white king move");var b=this.getFileRank("a8");this.setFileRank("d8",b),this.setFileRank("a8",null)}return h instanceof P&&(h.color===p.WHITE?this.invalidateCastle("KQ"):h.color===p.BLACK&&this.invalidateCastle("kq")),h instanceof B&&(h.color===p.WHITE?"a1"===e.from?this.invalidateCastle("Q"):"h1"===e.from&&this.invalidateCastle("K"):h.color===p.BLACK&&("a8"===e.from?this.invalidateCastle("q"):"h8"===e.from&&this.invalidateCastle("k"))),u instanceof B&&(u.color===p.WHITE?"a1"===e.to?this.invalidateCastle("Q"):"h1"===e.to&&this.invalidateCastle("K"):u.color===p.BLACK&&("a8"===e.to?this.invalidateCastle("q"):"h8"===e.to&&this.invalidateCastle("k"))),h instanceof T||h instanceof P?this.halfMoveClock=0:this.halfMoveClock++,this.currentPlayer=this.currentPlayer===p.WHITE?p.BLACK:p.WHITE,this.currentPlayer===p.WHITE&&this.fullMoveNumber++,u}},{key:"removePiece",value:function(e,t){this.board[e][t]=null}},{key:"castleAvailable",value:function(e){return this.availableCastles.includes(e)}},{key:"invalidateCastle",value:function(e){this.availableCastles=this.availableCastles.replace(e,""),""===this.availableCastles&&(this.availableCastles="-")}},{key:"kingInCheck",value:function(e){for(var t=this.getPiecesFor(e,P)[0],n=this.getPiecesFor(e===p.WHITE?p.BLACK:p.WHITE),i=0;i<n.length;i++){if(n[i].validMoves(this,!1).filter((function(e){return e.to===t.getFileRank()})).length>0)return!0}return!1}},{key:"kingInCheckmate",value:function(e){var t=this;if(!this.kingInCheck(e))return!1;var n=this.getPiecesFor(e),i=[];return n.forEach((function(e){i.push.apply(i,Object(f.a)(e.validMoves(t)))})),0===i.length}},{key:"kingWouldBeInCheck",value:function(e,t){var n=Object(b.cloneDeep)(this);return n.move(t),n.kingInCheck(e)}},{key:"getPieces",value:function(){var e=[];return this.board.forEach((function(t){t.forEach((function(t){null!==t&&e.push(t)}))})),e}},{key:"getPiecesFor",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];return this.board.forEach((function(i){i.forEach((function(i){null!==i&&i.color===e&&(null===t||i instanceof t)&&n.push(i)}))})),n}},{key:"toFEN",value:function(){var e=[];this.board.forEach((function(t){var n="",i=0;t.forEach((function(e){null===e?i++:(i&&(n+=i,i=0),n+=e.notation)})),i&&(n+=i),e.push(n)}));var t=e.join("/");return t+=this.currentPlayer===p.WHITE?" w":" b",t+=" ".concat(this.availableCastles),t+=" ".concat(this.enPassantTarget),t+=" ".concat(this.halfMoveClock),t+=" ".concat(this.fullMoveNumber)}},{key:"print",value:function(){var e=[];this.board.forEach((function(t){var n="";t.forEach((function(e){n+=null===e?".":e.printIcon})),e.push(n)})),console.log(e.join("\n"))}}],[{key:"fromFEN",value:function(t){var n=t.split(" ");if(6!==n.length)throw new Error("FEN string must have 6 components: [ranks activePlayer availableCastles enPassantTarget halfMoveClock fullMoveNumber]");var i=n[0],o=n[1],s=n[2],a=n[3],l=n[4],r=n[5];if(-1===i.indexOf("K")||-1===i.indexOf("k"))throw new Error("Both white and black king must be present");var c=new e,h=i.split("/");if(8!==h.length)throw new RangeError("FEN must contain 8 ranks");for(var u=0;u<8;u++){for(var d=0,v=0;v<h[u].length;v++){var f=h[u][v];if(!(f>="1"&&f<="8"||["P","N","B","R","Q","K"].includes(f.toUpperCase())))throw new Error("Invalid rank notation char");if(f>="1"&&f<="8")d+=Number(f);else{var b=f===f.toUpperCase()?p.WHITE:p.BLACK,k=void 0;switch(f.toLowerCase()){case"p":k=new T(b,u,d);break;case"n":k=new m(b,u,d);break;case"b":k=new H(b,u,d);break;case"r":k=new B(b,u,d);break;case"q":k=new I(b,u,d);break;case"k":k=new P(b,u,d);break;default:throw new Error("Invalid piece notation")}c.board[u][d]=k,d++}}if(d<7||d>8)throw new Error("File must contain 8 pieces")}switch(o){case"w":c.currentPlayer=p.WHITE;break;case"b":c.currentPlayer=p.BLACK;break;default:throw new Error("Invalid active color notation")}if(!s.match("(-|K?Q?k?q?)"))throw new Error("Malformed available castles");if(c.availableCastles=s,!(1===a.length&&"-"===a||2===a.length&&a[0]>="a"&&a[0]<="h"&&a[1]>=1&&a[1]<=8))throw new Error("Malformed en passant target");if(c.enPassantTarget=a,isNaN(l)||parseInt(l)!=l||parseInt(l)<0)throw new Error("Half Move Clock must be an integer >= 0");if(c.halfMoveClock=Number(l),isNaN(r)||parseInt(r)!=r||parseInt(r)<1)throw new Error("Full Move Number must be a positive integer");return c.fullMoveNumber=Number(r),c}}]),e}(),H=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e,i,o){Object(c.a)(this,n);var s=e===p.WHITE?"\u2657":"\u265d",a=e===p.WHITE?"B":"b";return t.call(this,"\u265d",s,a,3,e,i,o)}return Object(h.a)(n,[{key:"validMoves",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._validMovesAlongLine(e,-1,-1,t),i=this._validMovesAlongLine(e,-1,1,t),o=this._validMovesAlongLine(e,1,-1,t),s=this._validMovesAlongLine(e,1,1,t);return[].concat(Object(f.a)(n),Object(f.a)(i),Object(f.a)(o),Object(f.a)(s))}}]),n}(y),R=n(0),W=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){return Object(c.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"render",value:function(){var e=Object(f.a)(this.props.piecesCaptured);e.sort((function(e,t){return e.points===t.points?e instanceof H?-1:1:e.points>t.points?-1:1}));var t=e.reduce((function(e,t){return e+t.points}),0);return Object(R.jsxs)("div",{className:"captured-pieces-ui",children:[Object(R.jsx)("p",{className:"captured-pieces-points",children:t}),e.map((function(t,n){return Object(R.jsx)("p",{style:{zIndex:e.length-n},className:"captured-piece ".concat(t.color===p.WHITE?"white":"black"),children:t.icon},"captured-piece".concat(t.id))}))]})}}]),n}(o.a.Component),L=(n(27),function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(e,t){this.props.movePiece(e,t)}},{key:"render",value:function(){var e=this;return Object(R.jsxs)("div",{className:"chess-board-container",children:[Object(R.jsx)("div",{className:"chess-board",children:new Array(64).fill(null).map((function(t,n){return Object(R.jsx)("div",{onClick:function(){return e.handleOnClick(Math.floor(n/8),n%8)}},"square".concat(n))}))}),Object(R.jsxs)("div",{className:"chess-board-ranks",children:[Object(R.jsx)("p",{children:"8"}),Object(R.jsx)("p",{children:"7"}),Object(R.jsx)("p",{children:"6"}),Object(R.jsx)("p",{children:"5"}),Object(R.jsx)("p",{children:"4"}),Object(R.jsx)("p",{children:"3"}),Object(R.jsx)("p",{children:"2"}),Object(R.jsx)("p",{children:"1"})]}),Object(R.jsxs)("div",{className:"chess-board-files",children:[Object(R.jsx)("p",{children:"a"}),Object(R.jsx)("p",{children:"b"}),Object(R.jsx)("p",{children:"c"}),Object(R.jsx)("p",{children:"d"}),Object(R.jsx)("p",{children:"e"}),Object(R.jsx)("p",{children:"f"}),Object(R.jsx)("p",{children:"g"}),Object(R.jsx)("p",{children:"h"})]})]})}}]),n}(o.a.Component)),S=(n(28),function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(){this.props.selectPiece()}},{key:"render",value:function(){var e="chess-piece";return this.props.piece.color===p.WHITE&&(e+=" white"),this.props.isInCheck&&(e+=" in-check"),Object(R.jsx)("div",{className:e,style:{top:"".concat(50*this.props.piece.row,"px"),left:"".concat(50*this.props.piece.col,"px")},onClick:this.handleOnClick,children:this.props.piece.icon})}}]),n}(o.a.Component)),A=(n(29),function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).state={fenCode:i.props.fenCode},i.handleChange=i.handleChange.bind(Object(u.a)(i)),i.handleSubmit=i.handleSubmit.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"componentDidUpdate",value:function(e){var t=this;e.fenCode!==this.props.fenCode&&this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{fenCode:t.props.fenCode})}))}},{key:"handleChange",value:function(e){this.setState((function(t){return Object(r.a)(Object(r.a)({},t),{},{fenCode:e.target.value,errorStr:""})}))}},{key:"handleSubmit",value:function(e){e.preventDefault();try{x.fromFEN(this.state.fenCode)}catch(t){return void this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{errorStr:t.message})}))}this.props.updateBoard(this.state.fenCode)}},{key:"render",value:function(){return Object(R.jsxs)("div",{children:[Object(R.jsxs)("form",{className:"fen-form",onSubmit:this.handleSubmit,children:[Object(R.jsx)("label",{htmlFor:"fen-input",children:"FEN"}),Object(R.jsx)("input",{className:"fen-input",name:"fen-input",type:"text",size:"70",maxLength:"70",value:this.state.fenCode,onChange:this.handleChange})]}),Object(R.jsx)("p",{className:"fen-form-error",children:this.state.errorStr})]})}}]),n}(o.a.Component)),F=(n(30),function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleOnClick=i.handleOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleOnClick",value:function(e,t){this.props.movePiece(e,t)}},{key:"render",value:function(){var e=this;return Object(R.jsx)("div",{children:this.props.validMoves.map((function(t,n){var i=t.toToRowCol(),o=Object(l.a)(i,2),s=o[0],a=o[1];return Object(R.jsx)("div",{className:"valid-move",style:{top:"".concat(50*s,"px"),left:"".concat(50*a,"px")},onClick:function(){return e.handleOnClick(s,a)},children:"\u2022"},"valid-move".concat(n))}))})}}]),n}(o.a.Component)),N=function(){function e(){var t=this;Object(c.a)(this,e),this.bestMove=null,this.skill=null,this.depth=null,this.isThinking=!1,this.engineStatus={},this.stockfish=new Worker("stockfish.js"),this.stockfish.onmessage=function(e){var n=e&&"object"===typeof e?e.data:e;if(console.log("Stockfish: ",n),"uciok"===n)t.engineStatus.engineLoaded=!0;else if("readyok"===n)t.engineStatus.engineReady=!0;else{var i=n.match("^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?");i&&(t.bestMove=new g(i[1],i[2],i[3]?i[3]:null),t.isThinking=!1)}},this.stockfish.postMessage("uci"),this.stockfish.postMessage("isready")}return Object(h.a)(e,[{key:"isEngineLoaded",value:function(){return this.engineStatus.engineLoaded}},{key:"setFEN",value:function(e){if(!this.engineStatus.engineLoaded)throw new Error("Engine not loaded");this.stockfish.postMessage("position fen ".concat(e))}},{key:"setDepth",value:function(e){console.log(e),this.depth=k.a.clamp(e,1,20)}},{key:"setSkillLevel",value:function(e){if(!this.engineStatus.engineLoaded)throw new Error("Engine not loaded");e=k.a.clamp(e,0,20),console.log(e),this.stockfish.postMessage("setoption name Skill Level value ".concat(e));var t=Math.round(6.35*e+1),n=Math.round(-.5*e+10);this.stockfish.postMessage("setoption name Skill Level Maximum Error value ".concat(n)),this.stockfish.postMessage("setoption name Skill Level Probability value ".concat(t)),this.skillLevel=e}},{key:"searchBestMove",value:function(e){this.bestMove=null,this.isThinking=!0,this.setFEN(e.toFEN()),this.stockfish.postMessage("go depth ".concat(this.depth))}},{key:"getBestMove",value:function(){return this.isThinking?null:this.bestMove}}]),e}(),K=(n(31),function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(c.a)(this,n),(i=t.call(this,e)).handleToStartOnClick=i.handleToStartOnClick.bind(Object(u.a)(i)),i.handleBackOnClick=i.handleBackOnClick.bind(Object(u.a)(i)),i.handleForwardOnClick=i.handleForwardOnClick.bind(Object(u.a)(i)),i.handleToEndOnClick=i.handleToEndOnClick.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"handleToStartOnClick",value:function(e){this.props.toStart()}},{key:"handleBackOnClick",value:function(e){this.props.back()}},{key:"handleForwardOnClick",value:function(e){this.props.forward()}},{key:"handleToEndOnClick",value:function(e){this.props.toEnd()}},{key:"render",value:function(){return Object(R.jsxs)("div",{className:"history-control-ui",children:[Object(R.jsx)("button",{className:"history-button",onClick:this.handleToStartOnClick,children:"\xab"}),Object(R.jsx)("button",{className:"history-button",onClick:this.handleBackOnClick,children:"\u2039"}),Object(R.jsx)("button",{className:"history-button",onClick:this.handleForwardOnClick,children:"\u203a"}),Object(R.jsx)("button",{className:"history-button".concat(this.props.isInPast?" active":""),onClick:this.handleToEndOnClick,children:"\xbb"})]})}}]),n}(o.a.Component)),_=function(){function e(){Object(c.a)(this,e),this.history=[],this.idx=-1,this.isInPast=!1}return Object(h.a)(e,[{key:"get",value:function(){return this.history[this.idx]}},{key:"push",value:function(e){if(this.isInPast)throw new Error("Cannot add to history while in the past.");this.history.push(e),this.idx++}},{key:"back",value:function(){return this.idx>0&&(this.idx--,this.isInPast=!0),this.history[this.idx]}},{key:"forward",value:function(){return this.idx<this.history.length-1&&this.idx++,this.idx===this.history.length-1&&(this.isInPast=!1),this.history[this.idx]}},{key:"toStart",value:function(){return this.idx=0,this.isInPast=!0,this.history[this.idx]}},{key:"toEnd",value:function(){return this.idx=this.history.length-1,this.isInPast=!1,this.history[this.idx]}}]),e}(),q=function(e){Object(d.a)(n,e);var t=Object(v.a)(n);function n(e){var i;Object(c.a)(this,n),i=t.call(this,e);var o=new x;o.reset();var s=new _;s.push(o.toFEN());var a=new N;return i.state={chessBoardState:o,chessBoardHistory:s,selectedPiece:null,whitePiecesCaptured:[],blackPiecesCaptured:[],stockfish:a,stockfishSkillLevel:0,stockfishDepth:1},i.selectPiece=i.selectPiece.bind(Object(u.a)(i)),i.movePiece=i.movePiece.bind(Object(u.a)(i)),i.updateBoard=i.updateBoard.bind(Object(u.a)(i)),i.historyToStart=i.historyToStart.bind(Object(u.a)(i)),i.historyBack=i.historyBack.bind(Object(u.a)(i)),i.historyForward=i.historyForward.bind(Object(u.a)(i)),i.historyToEnd=i.historyToEnd.bind(Object(u.a)(i)),i}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"selectPiece",value:function(e){this.state.chessBoardHistory.isInPast?console.log("Cannot select pieces while in the past"):e===this.state.selectedPiece?this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{selectedPiece:null})})):this.state.chessBoardState.currentPlayer===e.color&&this.setState((function(t){return Object(r.a)(Object(r.a)({},t),{},{selectedPiece:e})}))}},{key:"movePiece",value:function(e,t){if(this.state.selectedPiece)if(this.state.chessBoardHistory.isInPast)console.log("Cannot move pieces while in the past");else{var n=this.state.selectedPiece.validMoves(this.state.chessBoardState).filter((function(n){var i=n.toToRowCol(),o=Object(l.a)(i,2),s=o[0],a=o[1];return s===e&&a===t}))[0];if(n){var i=this.state.chessBoardState.move(n);i&&(i.color===p.WHITE?this.state.whitePiecesCaptured.push(i):i.color===p.BLACK&&this.state.blackPiecesCaptured.push(i));var o=this.state.chessBoardState.toFEN();this.state.chessBoardHistory.push(o)}else console.log("Invalid move");var s=x.fromFEN(this.state.chessBoardState.toFEN());this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{chessBoardState:s,selectedPiece:null})}))}else console.log("No piece selected")}},{key:"updateBoard",value:function(e){var t=x.fromFEN(e);this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{chessBoardState:t})}))}},{key:"historyToStart",value:function(){var e=this.state.chessBoardHistory.toStart();console.log("to start"),console.log(this.state.chessBoardHistory),this.updateBoard(e)}},{key:"historyBack",value:function(){var e=this.state.chessBoardHistory.back();console.log("back"),console.log(this.state.chessBoardHistory),this.updateBoard(e)}},{key:"historyForward",value:function(){var e=this.state.chessBoardHistory.forward();console.log("forward"),console.log(this.state.chessBoardHistory),this.updateBoard(e)}},{key:"historyToEnd",value:function(){var e=this.state.chessBoardHistory.toEnd();console.log("to end"),console.log(this.state.chessBoardHistory),this.updateBoard(e)}},{key:"render",value:function(){var e=this,t=this.state.chessBoardState.getPieces();return Object(R.jsxs)("div",{children:[Object(R.jsxs)("div",{className:"chess-board-game-ui-container",children:[Object(R.jsxs)("div",{className:"chess-board-ui-container",children:[Object(R.jsx)(L,{movePiece:this.movePiece}),t.map((function(t){return Object(R.jsx)(S,{piece:t,isInCheck:t instanceof P&&e.state.chessBoardState.kingInCheck(t.color),selectPiece:function(){return e.selectPiece(t)}},"chess-piece".concat(t.id))})),this.state.selectedPiece?Object(R.jsx)(F,{validMoves:this.state.selectedPiece.validMoves(this.state.chessBoardState),movePiece:this.movePiece}):Object(R.jsx)("div",{})]}),Object(R.jsxs)("div",{className:"chess-board-ui-sidebar",children:[Object(R.jsx)(W,{piecesCaptured:this.state.whitePiecesCaptured}),Object(R.jsx)(K,{isInPast:this.state.chessBoardHistory.isInPast,toStart:this.historyToStart,back:this.historyBack,forward:this.historyForward,toEnd:this.historyToEnd}),Object(R.jsx)(W,{piecesCaptured:this.state.blackPiecesCaptured})]})]}),Object(R.jsx)(A,{fenCode:this.state.chessBoardState.toFEN(),updateBoard:this.updateBoard})]})}}]),n}(o.a.Component);a.a.render(Object(R.jsx)(o.a.StrictMode,{children:Object(R.jsx)("div",{id:"app-container",children:Object(R.jsx)(q,{})})}),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.229cbab8.chunk.js.map