function startup(){"use strict";function Z(){}function et(){console.log("initialSetup");ut();at();ft(A,function(){pt(function(){Et(S);h&&mt(function(){E.getZoom()>=u&&!E.hasLayer(B)&&E.addLayer(B)})})})}function tt(){ot();ft(A,function(){Et(S)})}function nt(e,t){var n=$.extend(!0,{},t);$.each(t,function(t,r){if(e.activityFilter)for(var i=0;i<e.activityFilter.length;i++){var s=e.activityFilter[i];r.properties[s]&&r.properties[s].toLowerCase().charAt(0)!=="y"&&delete n[t]}if(e.lengthFilter){var o=!1;e.lengthFilter.length===0&&(o=!0);for(var u=0;u<e.lengthFilter.length;u++){var c=e.lengthFilter[u],h=r.properties.length;if(c.toLowerCase()=="short"&&h<=a||c.toLowerCase()=="medium"&&h>a&&h<=f||c.toLowerCase()=="long"&&h>f&&h<=l||c.toLowerCase()=="verylong"&&h>l){o=!0;break}}o||delete n[t]}if(e.searchFilter){var p=r.properties.name.toLowerCase().indexOf(e.searchFilter.toLowerCase());p==-1&&delete n[t]}});Et(n)}function rt(e){var t=$(e.currentTarget),n=t.attr("data-filter"),r=t.val();console.log(r);st(n,r)}function it(e){var t=$(e.currentTarget),n="searchFilter",r=t.val();console.log(t);console.log(r);if(t.hasClass("search-key")){console.log("search key");st(n,r)}if(t.hasClass("search-submit")&&t.val()!==""){console.log("search submit");st(n,r)}}function st(e,t){console.log(t);var n=0;if(e=="activityFilter"){var r=M.activityFilter.length;for(i=0;i<M.activityFilter.length;i++){var s=M.activityFilter[i];if(s===t){M.activityFilter.splice(i,1);n=1;break}}n===0&&M.activityFilter.push(t)}if(e=="lengthFilter"){console.log("length");console.log(M.lengthFilter.length);var r=M.lengthFilter.length;for(j=0;j<r;j++){console.log("j");console.log(j);var o=M.lengthFilter[j];if(o==t){console.log("match");M.lengthFilter.splice(j,1);n=1;break}}n===0&&M.lengthFilter.push(t)}if(e=="searchFilter"){console.log("searchFilter");M.searchFilter=t}console.log(M);nt(M,S)}function ot(){A=E.getCenter()}function ut(){A=t}function at(){console.log("displayInitialMap");console.log(A);E=L.map("trailMap",{zoomControl:!1}).addControl(L.control.zoom({position:"topright"})).setView([A.lat,A.lng],11);E.fitBounds(E.getBounds(),{paddingTopLeft:[450,100]});L.tileLayer.provider("MapBox."+e).addTo(E);E.on("locationfound",function(e){H||(H=L.userMarker(e.latlng,{smallIcon:!0,pulsing:!0,accuracy:0}).addTo(E));console.log(e.latlng);H.setLatLng(e.latlng)});E.locate({watch:!0,setView:!1,enableHighAccuracy:!0});E.on("zoomend",function(e){console.log("zoomend");if(c&&B){E.getZoom()>=u&&!E.hasLayer(B)&&E.addLayer(B);if(E.getZoom()<u&&E.hasLayer(B)){U&&E.removeLayer(U);E.removeLayer(B)}}});E.on("locationerror",function(e){console.log("Location Error:");console.log(e.message);console.log(e.code)})}function ft(e,t){console.log("getOrderedTrailheads");var n={loc:e.lat+","+e.lng,type:"GET",path:"/trailheads.json?loc="+e.lat+","+e.lng};Jt(n,function(e){ct(e);typeof t=="function"&&t()})}function lt(e,t){console.log("getOrderedTrailheads");var n="select trailheads.*, ST_Distance_Sphere(ST_WKTToSQL('POINT("+e.lng+" "+e.lat+")'), the_geom) distance "+"from "+Q+" as trailheads "+"ORDER BY distance "+"";Kt(n,function(e){ct(e);typeof t=="function"&&t()})}function ct(e){console.log("populateTrailheadArray");console.log(e);x=[];for(var t=0;t<e.features.length;t++){var n=e.features[t],r=new L.LatLng(n.geometry.coordinates[1],n.geometry.coordinates[0]),i=(new L.CircleMarker(r,{color:"#00adef",fillOpacity:1})).setRadius(4);i.on("click",function(e){return function(){ht(e)}}(n.properties.id));var s={properties:n.properties,marker:i,trails:[],popupContent:""};x.push(s)}}function ht(e){console.log("trailheadMarkerClick");It(e,0);var t=jt(e);kt(S[t.trails[0]],t)}function pt(e){console.log("getTrailData");var t={type:"GET",path:"/trails.json"};Jt(t,function(t){vt(t);typeof e=="function"&&e()})}function dt(e){console.log("getTrailData");var t="select * from "+Y+" order by name";Kt(t,function(t){vt(t);typeof e=="function"&&e()})}function vt(e){for(var t=0;t<e.features.length;t++)S[e.features[t].properties.id]=e.features[t]}function mt(e){console.log("getTrailSegments");var t={type:"GET",path:"/trailsegments.json"};Jt(t,function(t){T=t;B=bt(t);typeof e=="function"&&e()})}function gt(e){var t=!1;$.each(S,function(n,r){if(S[n].properties.name==e){t=n;return!1}});return t}function yt(e){for(var t=0;t<=6;t++){var n="trail"+t;if(gt(e.properties[n])){console.log("segment match");return!0}}console.log("segment non-match");return!1}function bt(e){var t=[],n=[],r=new L.FeatureGroup,i=L.geoJson(e,{style:function(){return{color:p,weight:d,opacity:1,clickable:!1}},onEachFeature:function(e,n){t.push(n)}}),s=L.geoJson(e,{style:function(){return{opacity:0,weight:20,clickable:!0}},onEachFeature:function(e,t){n.push(t);var r=$("<div class='trail-popup'>");for(var i=1;i<=6;i++){var s="trail"+i;if(e.properties[s]){var o;gt(e.properties[s])?o=$("<div class='trail-popup-line trail-popup-line-named'>").attr("data-steward",e.properties.steward).attr("data-source",e.properties.source).attr("data-trailname",e.properties[s]).html(e.properties[s]).css("color","black"):o=$("<div class='trail-popup-line trail-popup-line-unnamed'>").html(e.properties[s]);r.append(o)}}f=(new L.Popup({},t)).setContent(r.outerHTML());e.properties.popup=f;e.properties.popupHTML=r.outerHTML()}});for(var o=0;o<n.length;o++){var u=n[o],a=new L.FeatureGroup([n[o],t[o]]),f=(new L.Popup).setContent(u.feature.properties.popupHTML);a.addEventListener("mouseover",function(e,t){return function(n){if(F){clearTimeout(F);F=null}if(I){clearTimeout(I);I=null}I=setTimeout(function(r){return function(){r.setStyle({weight:m,color:v});r!=R&&R&&R.setStyle({weight:d,color:p});R=r;if(e!=q){U=t.feature.properties.popup.setLatLng(n.latlng).openOn(E);q=e}}}(n.target),250)}}(a,u));a.addEventListener("mouseout",function(e,t){return function(e){var n=t.feature.properties.popup;if(F){clearTimeout(F);F=null}if(I){clearTimeout(I);I=null}F=setTimeout(function(e){return function(){e.target.setStyle({weight:3})}}(e),1250)}}(a,u));r.addLayer(a)}return r}function wt(e){console.log("trailPopupLineClick");var t=$(e.target).attr("data-trailname"),n=$(e.target).attr("data-source"),r=[];for(var i=0;i<x.length;i++){var s=x[i];s.properties.source==n&&(s.properties.trail1==t||s.properties.trail2==t||s.properties.trail3==t||s.properties.trail4==t||s.properties.trail5==t||s.properties.trail6)&&r.push(s)}var o=U._latlng,u=Infinity,a=null;for(var f=0;f<r.length;f++){var l=r[f],c=l.marker.getLatLng(),h=o.distanceTo(c);if(h<u){a=l;u=h}}var p=0,d=null;for(var v=0;v<a.trails.length;v++){var m=a.trails[v];if(S[m].properties.name==t){d=S[m];p=v}}It(a.properties.id,p);kt(d,a)}function Et(e){console.log("addTrailDataToTrailheads");console.log(S);for(var t=0;t<x.length;t++){var n=x[t];n.trails=[];for(var r=1;r<=3;r++){var i="trail"+r;if(n.properties[i]==="")continue;var s=n.properties[i];$.each(e,function(e,t){n.properties[i]==t.properties.name&&n.trails.push(e)})}}St(x);xt(x);Tt(x);Nt(x)}function St(e){console.log("fixDuplicateTrailNames");for(var t=0;t<e.length;t++){var n=e[t],r={};for(var i=0;i<n.trails.length;i++){var s=S[n.trails[i]].properties.name;r[s]=r[s]||[];var o={source:S[n.trails[i]].properties.source,trailID:S[n.trails[i]].properties.id};r[s].push(o)}for(var u in r)if(r.hasOwnProperty(u)&&r[u].length>1)for(var a=0;a<r[u].length;a++){var f=r[u][a];if(f.source!=n.properties.source){var l=f.trailID,c=$.inArray(l.toString(),n.trails);n.trails.splice(c,1)}}}}function xt(e){for(var t=0;t<e.length;t++){var n=e[t],r=$("<div>").addClass("trailhead-popup"),i=$("<div>").addClass("trailhead-box").html($("<div class='popupTrailheadNames'>"+n.properties.name+"</div>")).appendTo(r);i.append($("<img>").addClass("calloutTrailheadIcon").attr({src:"img/icon_trailhead_1.png"}));for(var s=0;s<n.trails.length;s++){var o=S[n.trails[s]],u=$("<div>").addClass("trailhead-trailname trail"+(s+1)).attr("data-trailname",o.properties.name).attr("data-trailid",o.properties.id).attr("data-trailheadname",n.properties.name).attr("data-trailheadid",n.properties.id).attr("data-index",s);console.log(o.properties.status);var a="";o.properties.status==1&&u.append($("<img>").addClass("status").attr({src:"img/icon_alert_yellow.png",title:"alert"}));o.properties.status==2&&u.append($("<img>").addClass("status").attr({src:"img/icon_alert_yellow.png",title:"alert"}));u.append("<div class='popupTrailNames'>"+o.properties.name+"</div>");u.append("<b>").appendTo(i)}n.popupContent=r.outerHTML()}}function Tt(e){console.log("mapActiveTrailheads");var t=[];for(var n=0;n<e.length;n++)e[n].trails.length&&t.push(e[n].marker);if(O){console.log("remove");E.removeLayer(O)}O=L.layerGroup(t);E.addLayer(O)}function Nt(e){console.log("makeTrailDivs");_=[];$("#trailList").html("");$.each(e,function(e,t){var n=t.properties.name,r=t.properties.id,i=t.trails;if(i.length===0)return!0;var s=t.properties.source,o=Ct(t.properties.distance),u;for(var a=0;a<i.length;a++){var f=i[a],l=S[f],c=S[f].properties.name,h=S[f].properties.length;u=$("<div>").addClass("trail-box").attr("data-source","list").attr("data-trailid",f).attr("data-trailname",c).attr("data-trail-length",h).attr("data-trailheadName",n).attr("data-trailheadid",r).attr("data-index",a).appendTo("#trailList").click(Ht).click(function(e,t){return function(n){kt(e,t)}}(l,t));var p=$("<div>").addClass("trailInfo").appendTo(u),d=$("<div>").addClass("trailheadInfo").appendTo(u);$("<div class='trailSource' id='"+s+"'>"+s+"</div>").appendTo(u);$("<div class='trail' >"+c+"</div>").appendTo(p);$("<div class='trailLength' >"+h+" miles long"+"</div>").appendTo(p);$("<div class='parkName' > Park Name</div>").appendTo(p);$("<img class='trailheadIcon' src='img/icon_trailhead_1.png'/>").appendTo(d);$("<div class='trailheadName' >"+n+" Trailhead"+"</div>").appendTo(d);$("<div class='trailheadDistance' >"+o+" miles away"+"</div>").appendTo(d);var v={trailID:f,trailheadID:r,index:a};_.push(v)}if(i.length===0){u=$("<div class='trail-box'>").appendTo("#trailList");$("<span class='trail' id='list|"+n+"'>"+n+" - NO TRAILS ("+[val.properties.trail1,val.properties.trail2,val.properties.trail3].join(", ")+")</span>").appendTo(u);$("<span class='trailSource'>"+s+"</span>").appendTo(u)}});console.log(_)}function Ct(e){return(e*r).toFixed(1)}function kt(e,t){console.log("showTrailDetails");if($(".detailPanel").is(":hidden")){_t(e,t);Lt();D=e;P=t}else if(D==e&&P==t){D=null;P=null;At()}else{_t(e,t);D=e;P=t}}function Lt(){console.log("openDetailPanel");$(".detailPanel").show();$(".accordion").hide();$(".trailhead-trailname.selected").addClass("detail-open")}function At(){console.log("closeDetailPanel");$(".detailPanel").hide();$(".accordion").show();$(".trailhead-trailname.selected").removeClass("detail-open")}function Ot(){console.log("toggleDetailPanelControls");$(".detailPanelControls").toggle()}function Mt(e){console.log("changeDetailPanel");var t=P.properties.id,n=String(D.properties.id);console.log(n);var r,i;for(var s=0;s<_.length;s++)_[s]["trailID"]==n&&_[s]["trailheadID"]==t&&(i=s);console.log(["orderedTrailIndex",i]);if($(e.target).hasClass("controlRight")){i+=1;console.log(["++orderedTrailIndex",i])}if($(e.target).hasClass("controlLeft")){i-=1;console.log(["--orderedTrailIndex",i])}var o=_[i];console.log(o);t=o.trailheadID;console.log(["trailheadID",t]);var u=o.index;console.log(["trailIndex",u]);for(var a=0;a<x.length;a++)x[a].properties.id==t&&(r=x[a]);It(t,u);kt(S[r.trails[u]],r)}function _t(e,t){$(".detailPanel .detailPanelBanner .trailName").html(e.properties.name);$(".detailPanel .detailTrailheadName").html(t.properties.name);e.properties.medium_photo_url&&$(".detailPanel .detailPanelPicture").attr("src",e.properties.medium_photo_url);if(e.properties.hike=="y"){console.log("hike icon replaced");$(".detailPanel .detailTopRow#right #hike").html("<img class='activity-icons' src='img/icon_hike_green.png'>")}if(e.properties.roadbike=="y"){console.log("cycle icon replaced");$(".detailPanel .detailTopRow#right #cycle").html("<img class='activity-icons' src='img/icon_cycle_green.png'>")}if(e.properties.accessible=="y"){console.log("handicap icon replaced");$(".detailPanel .detailTopRow#right #handicap").html("<img class='activity-icons' src='img/icon_handicap_green.png'>")}if(e.properties.equestrian=="y"){console.log("horse icon replaced");$(".detailPanel .detailTopRow#right #horse").html("<img class='activity-icons' src='img/icon_horse_green.png'>")}if(e.properties.xcntryski=="y"){console.log("xcntryski icon replaced");$(".detailPanel .detailTopRow#right #xcountryski").html("<img class='activity-icons' src='img/icon_xcountryski_green.png'>")}$(".detailPanel .detailSource").html(t.properties.source);$(".detailPanel .detailTrailheadDistance").html(Ct(t.properties.distance)+" miles away");$(".detailPanel .detailLength").html(e.properties.length+" miles");$(".detailPanel .detailDifficulty").html(e.properties.difficulty);$(".detailPanel .detailDescription").html(e.properties.description);$(".detailPanel .detailBottomRow .detailTrailheadAmenities .detailTrailheadIcons");$(".detailPanel .detailFooter .detailSource").html(e.properties.steward_fullname).attr("href",e.properties.steward_url);$(".detailPanel .detailFooter .detailSourcePhone").html(e.properties.steward_phone)}function Dt(e){console.log("trailnameClick");Bt(e)}function Pt(e){console.log(e);var t=e.data("trailheadid"),n=e.data("index")||0,r=e.data("trailid"),i={trailheadID:t,highlightedTrailIndex:n,trailID:r};return i}function Ht(e){console.log("populateTrailsForTrailheadDiv");var t;e.target!==this?t=$(this):t=$(e.target);var n=Pt(t);It(n.trailheadID,n.highlightedTrailIndex)}function Bt(e){console.log($(e.target).data("trailheadid"));var t;$(e.target).data("trailheadid")?t=$(e.target):t=$(e.target.parentNode);var n=Pt(t);console.log(n);var r=jt(n.trailheadID);It(n.trailheadID,n.highlightedTrailIndex);var i=S[n.trailID];kt(i,r)}function jt(e){var t;for(var n=0;n<x.length;n++)if(x[n].properties.id==e){t=x[n];break}return t}function It(e,t){console.log("highlightTrailhead");t=t||0;var n=null;n=jt(e);$(".detailPanel").is(":visible")&&$(".trailhead-trailname.selected").removeClass("detail-open");var r=$(n.popupContent),i=n.trails[t];r.find(".trailhead-trailname").removeClass("selected").addClass("not-selected");var s='[data-trailid="'+i+'"]',o=r.find(s);o.addClass("selected").removeClass("not-selected");n.popupContent=r.outerHTML();if(z){E.removeLayer(z.marker);z.marker=(new L.CircleMarker(z.marker.getLatLng(),{color:"#00adef",fillOpacity:1,zIndexOffset:100})).setRadius(4).addTo(E);z.marker.on("click",function(e){return function(){ht(e)}}(z.properties.id))}$(".detailPanel").is(":visible")&&$(".trailhead-trailname.selected").addClass("detail-open");z=n;E.removeLayer(z.marker);z.marker=(new L.Marker(z.marker.getLatLng(),{icon:V,zIndexOffset:100})).addTo(E);z.marker.on("click",function(e){return function(){ht(e)}}(z.properties.id));qt(n,t);var u=(new L.Popup({offset:[0,-12],autoPanPadding:[100,100]})).setContent(n.popupContent).setLatLng(n.marker.getLatLng()).openOn(E);if($(".detailPanel").is(":visible")){console.log("detail is open");console.log($(".trailhead-trailname.selected"));$(".trailhead-trailname.selected").addClass("detail-open")}}function qt(e,t){console.log("getAllTrailPathsForTrailhead");T.type=="FeatureCollection"&&h?Ut(e,t):Rt(e,t)}function Rt(e,t){console.log("getAllTrailPathsForTrailheadRemote");var n=[],r=[];for(var i=0;i<e.trails.length;i++){var s=e.trails[i],o=S[s].properties.name,u="select st_collect(the_geom) the_geom, '"+o+"' trailname from "+G+" segments where "+"(segments.trail1 = '"+o+"' or "+"segments.trail2 = '"+o+"' or "+"segments.trail3 = '"+o+"' or "+"segments.trail4 = '"+o+"' or "+"segments.trail5 = '"+o+"' or "+"segments.trail6 = '"+o+"' or "+"segments.trail1 = '"+o+" Trail' or "+"segments.trail2 = '"+o+" Trail' or "+"segments.trail3 = '"+o+" Trail' or "+"segments.trail4 = '"+o+" Trail' or "+"segments.trail5 = '"+o+" Trail' or "+"segments.trail6 = '"+o+" Trail') and "+"(source = '"+S[s].properties.source+"' or "+(o=="Ohio & Erie Canal Towpath Trail")+")",a=function(e,t){return function(e){var r={type:"GET",path:"/trailsegments.json"};Jt(r,function(r){n[t]=r;e(null,s)})}}(u,i);r.push(a)}async.parallel(r,function(e,r){n=zt(n);Wt(n);Vt(t)})}function Ut(e,t){console.log("getAllTrailPathsForTrailheadLocal");var n=[],r=[];for(var i=0;i<e.trails.length;i++){var s=e.trails[i],o=S[s],u=o.properties.source,a=o.properties.name,f={type:"FeatureCollection",features:[{geometry:{geometries:[],type:"GeometryCollection"},type:"Feature"}]},l=0;for(var c=0;c<T.features.length;c++){var h=$.extend(!0,{},T.features[c]);if((h.properties.trail1==a||h.properties.trail1+" Trail"==a||h.properties.trail2==a||h.properties.trail2+" Trail"==a||h.properties.trail3==a||h.properties.trail3+" Trail"==a||h.properties.trail4==a||h.properties.trail4+" Trail"==a||h.properties.trail5==a||h.properties.trail5+" Trail"==a||h.properties.trail6==a||h.properties.trail6+" Trail"==a)&&(h.properties.source==u||a=="Ohio & Erie Canal Towpath Trail")){f.features[0].properties={trailname:a};l=1;f.features[0].geometry.geometries.push(h.geometry)}}l&&r.push(f)}console.log(r);n=zt(r);Wt(n);Vt(t)}function zt(e){console.log("mergeResponses");var t=$.extend(!0,{},e[0]);if(t.features){t.features[0].properties.order=0;for(var n=1;n<e.length;n++){t.features=t.features.concat(e[n].features);t.features[n].properties.order=n}}else console.log("ERROR: missing segment data for trail.");return t}function Wt(e){console.log("drawMultiTrailLayer");if(N){E.removeLayer(N);C=[]}e.features[0].geometry===null&&alert("No trail segment data found.");N=L.geoJson(e,{style:function(e){var t;if(e.properties.order===0||!e.properties.order){t=Xt("trailActive");return{weight:d,color:p,opacity:1,clickable:!1}}if(e.properties.order===1){t=Xt("trailActive");return{weight:d,color:p,opacity:1,clickable:!1}}if(e.properties.order===2){t=Xt("trailActive");return{weight:d,color:p,opacity:1,clickable:!1}}},onEachFeature:function(e,t){C.push(t)}}).addTo(E).bringToFront();$t(N)}function Xt(e){var t=$("<div class='"+e+"'>").hide().appendTo("body"),n=t.css("background-color");console.log(n);t.remove();return n}function Vt(e){console.log("setCurrentTrail");k&&typeof k.setStyle=="Function"&&k.setStyle({weight:d,color:p});C[e]?k=C[e]:console.log("ERROR: trail layer missing");k.setStyle({weight:y,color:g})}function $t(e){console.log("zoomToLayer");var t=E.getBoundsZoom(e.getBounds());console.log(e.getLayers().length);console.log(["layerBoundsZoom:",t]);if(t<=s&&t>=o)E.fitBounds(e.getBounds(),{paddingTopLeft:[450,0]});else{var n=t>s?s:t;n=n<o?o:n;console.log("setview newZoom:");console.log(n);E.setView(z.marker.getLatLng(),n)}}function Jt(e,t){console.log("makeAPICall");$.isEmptyObject(e.data)||(e.data=JSON.stringify(e.data));var r=n+e.path,i=$.ajax({type:e.type,url:r,dataType:"json",contentType:"application/json; charset=utf-8",data:e.data}).fail(function(e,t,n){$("#results").text("error: "+JSON.stringify(n))}).done(function(e,n,r){typeof t=="function"&&t.call(this,e);console.log(e)})}function Kt(e,t,n){console.log("makeSQLQuery");var r={q:e,format:"geoJSON"},i=$.ajax({dataType:"json",url:endpoint,data:r}).done(function(e,n,r){t(e)}).error(function(t,r,i){if(typeof n=="function")n(t);else{console.log("ERROR:");console.log(e);console.log(i)}})}console.log("trailhead.js");var e="codeforamerica.map-j35lxf9d",t={lat:41.1,lng:-81.5},n="http://trailsyserver-dev.herokuapp.com";window.location.hostname.split(".")[0]=="trailsy-dev"?n="http://trailsyserver-dev.herokuapp.com":window.location.hostname.split(".")[0]=="trailsy"&&(n="http://trailsyserver-prod.herokuapp.com");var r=62137e-8,s=17,o=14,u=13,a=2,f=5,l=10,c=1,h=1,p="#678729",d=3,v="#678729",m=6,g="#445617",y=6,b="#FF0000",w=3,E={},S={},x=[],T=[],N={},C=[],k={},A={},O,M={lengthFilter:[],activityFilter:[],searchFilter:[]},_=[],D=null,P=null,H=null,B=null,F=null,I=null,q=null,R=null,U=null,z=null,W={iconSize:[25,20],iconAnchor:[11,20],popupAnchor:[0,-22]},X=$.extend(W,{iconUrl:"img/icon_trailhead_1.png"}),V=L.icon(X),J=$.extend(W,{iconUrl:"img/icon_trailhead_2.png"}),K=L.icon(J),Q="summit_trailheads",G="summit_trailsegments",Y="summit_traildata";$("#redoSearch").click(tt);$(document).on("click",".trailhead-trailname",Dt);$(document).on("click",".closeDetail",At);$(document).on("click",".detailPanelControls",Mt);$(document).on("change",".filter",rt);$(document).on("mouseover",".leaflet-popup",function(){q&&q.fireEvent("mouseover")});$(document).on("mouseout",".leaflet-popup",function(){q&&q.fireEvent("mouseout")});$(document).on("click",".trail-popup-line-named",wt);$(".search-key").keyup(function(e){it(e)});$(".search-submit").click(it);$(".detailPanel").hover(Ot,Ot);et();var Ft;jQuery.fn.outerHTML=function(e){return e?this.before(e).remove():jQuery("<p>").append(this.eq(0).clone()).html()}}console.log("start");$(document).ready(startup);