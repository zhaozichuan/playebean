
     var canvasDivId,canvasId;
     var hQueue=[];
	 var limits=[999999,0],vLimits=[];
	 var canvas;
	 var ctx;
	 var _width=0,_height=0;
	 var _width=0,_height=0;
	 var _top=25,_bottom=5,_left=60,_right=3,_scalex;
	 var _timeH=25,_priceH=0,_volumeH=0,_indInfoH=20;
	 var columnNum=4;
	 var rowNum=4;
	 var start=0;defaultNum=60,end=0;
	 var date=[],time=[],open=[],high=[],low=[],close=[],volume=[],value=[],ma5=[],ma10=[],ma20=[],ma30=[],ma60=[];
	 var drag=false;
	 var xx=0,yy=0;
	 var indType="VOLUME";
	 var canvas1=null;
	 var hLine,vLine,tip,highTip,lowTip,tCursor,pCursor,loadingDiv,pyFields=[],iyFields=[],timeFields=[],kInfoFields=[],kTipFields=[],indInfoFields=[];
	 var canvasRect;
	 var vIndex=-1;
	 var period="100",hPeriod="100";
	 var dif=[],dea=[],macd=[];
	 var kdj_k,kdj_d,kdj_k;
	 var rsi_rsi1,rsi_rsi2,rsi_rsi3;
	 var boll_upper,boll_lower,boll_boll;
	 var cci; 
	 var symbol="300150",name="";
	 var decimal=2,highLimits=0,lowLimits=0;
	 var tx1=0,ty1=0,tx2=0,ty2=0,hMouseX=0,hMouseY=0;
	 var logoImg,logoDiv;
	 var httpServer="http://127.0.0.1";
	 var authorizeFlag=true;
	 
	 window.onload= function(){
	    drawKline('chartDiv','chart');
	 }
	 
	 window.onkeydown=function(event){
	      var keyCode=event.keyCode;
		  if(event.ctrlKey==true) 
		  { 
			return;
		  }
		  if(keyCode==39)
		  {
		     vIndex++;
			 var num=end-start;
			 if(vIndex>=num)
			 {
			   start++;
			   end++;
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   if((start+num)>(size))
			   {
					start=size-defaultNum;
					end=size;
			   }
			   paintComponent();
			 }
			 
			 if(vIndex>=num)
			 {
			   vIndex=num-1;
			 }
			 
			 createMoveLine(hMouseX,hMouseY);
			 updIndInfo(hMouseX,hMouseY);
			 createTip(hMouseX,hMouseY);
			 createMaInfo(hMouseX,hMouseY);
			 createTCursor(hMouseX,hMouseY);
			 createPCursor(hMouseX,hMouseY);
		  }
		  else if(keyCode==37)
		  {
		     vIndex--;
			 if(vIndex<0&&start>0)
			 {
			   start--;
			   end--;
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   var num=end-start;
			   if((start+num)>(size))
			   {
					start=size-defaultNum;
					end=size;
			   }
			   
			   paintComponent();
			 }
			 
			 if(vIndex<0)
			 { 
			   vIndex=0;
			 }
			 createMoveLine(hMouseX,hMouseY);
			 updIndInfo(hMouseX,hMouseY);
			 createTip(hMouseX,hMouseY);
			 createMaInfo(hMouseX,hMouseY);
			 createTCursor(hMouseX,hMouseY);
			 createPCursor(hMouseX,hMouseY);
		  }
		  else if(keyCode==40)
		  {
		      var num=end-start;
		      var extent=num+20;
			   
			   start-=20;
			   
			   var size=date.length;
			   if(extent>=size)
			   {
			     extent=size;
			   }
			   if (start <= 0) {
					start = 0;
			   } 
			   
			   if((start+extent)>(size))
			   {
					start=size-extent;
					end=size;
			   }
			   if(start<0)
			   {
				start=0;
				end=size;
			   }
			   if(vIndex<0)
			   { 
				   vIndex=0;
			   }
			   if(vIndex>=extent)
			   { 
				   vIndex=extent-1;
			   }
			   
			   vIndex=-1;
			   hideCursor();
			   paintComponent();
			   
			   
			   /*
			   createMoveLine(hMouseX,hMouseY);
			   updIndInfo(hMouseX,hMouseY);
			   createTip(hMouseX,hMouseY);
			   createMaInfo(hMouseX,hMouseY);
			   createTCursor(hMouseX,hMouseY);
			   createPCursor(hMouseX,hMouseY);
			   */
			 
		  }
		  else if(keyCode==38)
		  {
		     var num=end-start;
		     var extent=num-20;
			 
			 if(extent>20)
			 {
			   start+=20;
			   if(extent>=size)
			   {
			     extent=size;
			   }
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   if((start+extent)>(size))
			   {
					start=size-extent;
					end=size;
			   }
			   if(start<0)
			   {
				start=0;
				end=size;
			   }
			   if(vIndex<0)
			   { 
				   vIndex=0;
			   }
			   if(vIndex>=extent)
			   { 
				   vIndex=extent-1;
			   }
			   //_scalex=(_width - _right - _left) / defaultNum;
			   //alert(vIndex);
			   vIndex=-1;
			   hideCursor();
			   paintComponent();
			   /*
			   createMoveLine(hMouseX,hMouseY);
			   updIndInfo(hMouseX,hMouseY);
			   createTip(hMouseX,hMouseY);
			   createMaInfo(hMouseX,hMouseY);
			   createTCursor(hMouseX,hMouseY);
			   createPCursor(hMouseX,hMouseY);
			   */
			 }
			
		  }
		  event.returnValue = false;
		  //return 0;
	      alert(e.keyCode);
		  
	 }
	 
	 window.onresize = function(){
	 	return ;
	 	// 下面的代码会导致canvas拉伸
         if(canvas)
		 {
		   //canvas.width=document.body.clientWidth-5;
		   //canvas.height=document.body.clientHeight-5;
		    canvas.width=document.documentElement.clientWidth-5;
		    canvas.height=document.documentElement.clientHeight-5;
			_width=canvas.width;
		    _height=canvas.height;
			/*
			if(_width<_height)
			{
			    defaultNum=100;
				columnNum=3;
			}
			else
			{  
			     defaultNum=60;
				 columnNum=4;
			}
			defaultNum=150;
			*/
			//updateRange();
			paintComponent();
		 }
    }
	 
	 function onPeriodClick(p)
	 {
	     this.period=p;
		 
	     reset();
		 //setDebugMsg('');
		 	$.ajax({
             type: "get",
             async: false,
             url: httpServer+"/k?mid=1&code="+symbol+"&kType="+period+"&len=200",
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onKLineRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 //alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
	     
	 }
	 function onChangeInd(code)
	 {
	    	 var indCodes=["VOLUME","MACD","BOLL","KDJ","RSI","CCI"];
			 var idx=indCodes.indexOf(code);
			 if(idx>=0)
			 {
				 indType=code
			 }
			 paintComponent();
	 }
	 
	 function setDebugMsg(msg)
	 {
	       var debug=document.getElementById('debug');
		   debug.style.height = '200px';
           debug.style.width = '200px';
           debug.style.left =canvasRect.left+canvasRect.width+'px';
           debug.style.top = '1px';
		   debug.innerHTML=msg;
	 }
	 function reset()
	 {
	     	//ctx.clearRect(0,0,_width,_height);
			//ctx.save();
			//date=[];
			//time=[];
			//open=[];
			//high=[];
			//low=[];
			//close=[];
			//volume=[];
			//value=[];
			vIndex=-1;
			
	 }
	 function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
      }
	 
     function drawKline(canvasDivId,canvasId)
	 {
	     this.canvasDivId=canvasDivId;
		 this.canvasId=canvasId;
		 this.symbol=GetQueryString("symbol");
		 if(symbol==null||symbol=="")
		 {
		    symbol="300150";
		 }
		 this.period=GetQueryString("period");
		 if(period==null||symbol=="")
		 {
		    period="100";
		 }
		 this.indType=GetQueryString("indtype");
		 if(indType==null||indType=="")
		 {
		    indType="VOLUME";
		 }  
		 this.decimal=GetQueryString("decimal");
		 if(decimal==null||decimal=="")
		 {
		    decimal=2;
		 }
		 
	     canvas=document.getElementById(this.canvasId);
		 canvas.width=document.documentElement.clientWidth;
		 canvas.height=document.documentElement.clientHeight;
		 //canvas.width=document.body.clientWidth-5;
		 //canvas.height=document.body.clientHeight-5;
		 var browser_Agent=navigator.userAgent;
		 /*
		 if(browser_Agent.indexOf("Mobile")>=0&&browser_Agent.indexOf("Firefox")>=0)
		 {
		   canvas.width=document.body.clientWidth-5;
		   canvas.height=document.body.clientHeight-40;
		 }
		 */
		
		 this.addEventListener("mousedown",doMouseDown,false);
		 this.addEventListener('mouseup',  doMouseUp, false);
		 this.addEventListener('mousemove', doMouseMove,false);
		 this.addEventListener('click', doMouseClick,false);
		 canvas.addEventListener('mouseout', doMouseOut,false);
		 this.addEventListener('touchstart', onTouchStart, false);
         this.addEventListener('touchmove', onTouchMove, false);
         this.addEventListener('touchend', onTouchEnd, false);
		 //alert(document.documentElement.clientHeight);
		 canvasRect=canvas.getBoundingClientRect();
		 ctx=canvas.getContext("2d"); 
		 _width=canvas.width;
		 _height=canvas.height;
		 
		 defaultNum=40;
		 columnNum=2;
			
		 paintComponent();
		 createLoadingDiv();
		 //alert("aaa");
		 //Ajax.get(httpServer+"/FreeHQWebServer/KLineResource1?symbol="+symbol+"&num=300&period="+period,onKLineRecvData,canvasId,false);
		 	$.ajax({
             type: "get",
             async: false,
             url: httpServer+"/k?mid=1&code="+symbol+"&kType="+period+"&len=200",
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onKLineRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 alert(json);
             },
             error: function(){
                 alert('fail');
             }
         });
		 
		 setInterval("onTimer()",1000*8);
		 
		 if(hLine==null)
		   {
		       hLine = document.createElement('DIV');
			   document.body.appendChild(hLine);
			   hLine.zIndex="998"; 
		   }
		   if(vLine==null)
		   {
		       vLine = document.createElement('DIV');
			   document.body.appendChild(vLine);
			   vLine.zIndex="998"; 
		   }
	 }

	 function onKLineRecvData(client)
	 {
	     alert("kkkkk");
	      dispalyLoadingDiv();
		  
		  var rs=client.data;
		  //alert(rs.length);
		  name=client.n;
		  //alert(name);
		  
		  var klineQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i];
			 
			  var item = {
                date: ""+cts.d,
				time:""+cts.t,
                open: parseFloat(cts.o),
                high: parseFloat(cts.h),
                low: parseFloat(cts.l),
                close: parseFloat(cts.c),
                volume: parseFloat(cts.v),
                value: parseFloat(cts.a)
               };
			  
			  klineQueue[i]=item;
		  }
		 
		  
		  //alert(hPeriod+","+period);
		  if(hPeriod==period)
		  {
		     if(hQueue.length==0)
			 {
			   hQueue=klineQueue;
			   initKlineData();
			   resetRange();
			 }
		     else if((end!=hQueue.length)||(end==hQueue.length-1))
			 {
			   //alert('1');
			   hQueue=klineQueue;
			   initKlineData();
			   var size=date.length;
			   end=size;
			   //resetRange();
			 }
			 else
			 {
			    //alert('2');
			    var num=klineQueue.length-hQueue.length;
				if(num<=0)
				num=0;
				//alert(start+"||"+end);
				start+=num;
				end+=num;
                
				//alert(start+"||"+end);
				
			    hQueue=klineQueue;
				var size=hQueue.length;
				if((start+defaultNum)>(size))
				 {
				    start=size-defaultNum;
					end=size;
				 }
				 if(start<0)
				{  
				   
				   start=0;
				   end=defaultNum;
				 }
				initKlineData();
			 }
		     
			 
		  }
		  else
		  {
		       
		       hQueue=klineQueue;
			   initKlineData();
			   resetRange();
		  }
		  
		  hPeriod=period;
		  
		  vIndex=defaultNum-1;
		  if(vIndex>=time.length)
		  {
		    vIndex=(time.length-1);
		  }
		  _scalex=(_width - _right - _left) / defaultNum;
		  if(drag==false)
		  paintComponent();
	 }
	 
	 function onKLineUpdRecvData(client)
	 {
	      dispalyLoadingDiv();
	      var xmlDoc = client.responseXML;
		  var strResult = unescape(client.responseText);
		  //alert(strResult);
		  var rs=strResult.split("\n");
		  //alert(rs.length);
		  name=rs[1];
		  if(rs.length>=2)
				rs=rs.slice(2,rs.length);
	      //alert(rs.length);
		  var klineQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i].split(",");
			  if(cts.length<5)
			  continue;
			  //alert(cts.length);
			  var item = {
                date: cts[0],
				time:cts[1],
                open: parseFloat(cts[2]),
                high: parseFloat(cts[3]),
                low: parseFloat(cts[4]),
                close: parseFloat(cts[5]),
                volume: parseFloat(cts[6]),
                value: parseFloat(cts[7])
               };
			  klineQueue[i]=item;
		  }
		 
		  
		  
		  if(hPeriod==period)
		  {
		     if(hQueue.length==0)
			 {
			   hQueue=klineQueue;
			   initKlineData();
			   resetRange();
			 }
		     else if((end==hQueue.length)||(end==hQueue.length-1))
			 {
			   //alert('1');
			   hQueue=klineQueue;
			   initKlineData();
			   //resetRange();
			   var size=date.length;
			   end=size;
			 }
			 else
			 {
			    //alert('2');
			    var num=klineQueue.length-hQueue.length;
				if(num<=0)
				num=0;
				//alert(start+"||"+end);
				start+=num;
				end+=num;
                
				//alert(start+"||"+end);
				
			    hQueue=klineQueue;
				var size=hQueue.length;
				if((start+defaultNum)>(size))
				 {
				    start=size-defaultNum;
					end=size;
				 }
				 if(start<0)
				{  
				   
				   start=0;
				   end=defaultNum;
				 }
				initKlineData();
			 }
		     
			 
		  }
		  else
		  {
		       
		       hQueue=klineQueue;
			   initKlineData();
			   resetRange();
		  }
		  
		  hPeriod=period;
		  
		  //vIndex=defaultNum-1;
		  if(vIndex>=time.length)
		  {
		    vIndex=(time.length-1);
		  }
		  _scalex=(_width - _right - _left) / defaultNum;
		  if(drag==false)
		  paintComponent();
	 }
	 
	 function initKlineData()
	 {
	 		date=[];
			time=[];
			open=[];
			high=[];
			low=[];
			close=[];
			volume=[];
			value=[];
	      var klineData;
	      for(var i=0;i<hQueue.length;i++)
		  {
		      klineData=hQueue[i];
		      date[i]=klineData.date;
			  time[i]=klineData.time;
			  open[i]=klineData.open;
			  high[i]=klineData.high;
			  low[i]=klineData.low;
			  close[i]=klineData.close;
			  volume[i]=klineData.volume;
			  value[i]=klineData.value;
		  }
		  ma5=MA(close,5);
		  ma10=MA(close,10);
		  ma20=MA(close,20);
		  ma30=MA(close,30);
		  //ma60=MA(close,60);
	 }
	 
	 function onTimer()
	 {

		 	$.ajax({
             type: "get",
             async: false,
             url: httpServer+"/k?mid=1&code="+symbol+"&kType="+period+"&len=200",
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onKLineRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                // alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
			 //reset();
		 
	 }
	 	 
	 function createLoadingDiv()
	 {
	       
		   if(loadingDiv==null)
		   {
		       loadingDiv = document.createElement('DIV');
			   document.body.appendChild(loadingDiv);
		   }
		  
		   loadingDiv.style.display = 'block';
           loadingDiv.style.position = 'absolute';
           loadingDiv.style.height = '36px';
           loadingDiv.style.width = '36px';
		   
		   var xx=canvasRect.left+_width/2-36/2;
		    
           loadingDiv.style.left =xx+'px';
           loadingDiv.style.top = canvasRect.top+_height/2+'px';
           //loadingDiv.style.background = cursorLineColor;
		   var innerHtml='<img src=\"img/loading.gif\"/>';
		   loadingDiv.innerHTML=innerHtml;
		  
	 }
	 
	 function dispalyLoadingDiv()
	 {
	         if(loadingDiv!=null)
			 {
			   loadingDiv.style.display = 'none';
			 }
	 }
	 
	 function doMouseDown(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseDown"+x+","+y);
		  var point=getPointOnCanvas(canvas,x,y);
		  //alert("doMouseDown"+x+","+y+"||"+"x"+point.x+","+point.y);
		  if(date.length<=0)
		   return;
		  if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		  drag=true;
		  xx=x;
		  yy=y;

		  }
	 }
	 function doMouseUp(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseUp");
		  //var point=getPointOnCanvas(canvas,x,y);
		  drag=false;
		  xx=0;
		  yy=0;
		  var chartDiv=document.getElementById(canvasDivId);
		  chartDiv.style.cursor='';
	 }
	 function doMouseOut(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseOut");
		  //var point=getPointOnCanvas(canvas,x,y);
		  drag=false;
		  xx=0;
		  yy=0;
	 }
	 function doMouseClick(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseOut");
          
		  var point=getPointOnCanvas(canvas,x,y);
		  //point.x=x;
		  //point.y=y;
	      if(point.x>_left&&point.x<(_width-_right)&&point.y>(_top+_priceH+_timeH+canvas.offsetTop)&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		     //alert("2");
		     //indType="CCI";
			 var indCodes=["VOLUME","MACD","BOLL","KDJ","RSI","CCI"];
			 var idx=indCodes.indexOf(indType);
			 if(idx>=0)
			 {
			     idx++;
				 if(idx>=indCodes.length)
				 {
				    idx=0;
				 }
				 indType=indCodes[idx];
			 }
			 paintComponent();
		  }
	 }
	 
	 
	 function doMouseMove(event)
	 {
	      //event.preventDefault();
	      if(date.length<=0)
		   return;
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseMove");
		  var point=getPointOnCanvas(canvas,x,y);
		  //alert(x+","+y+","+point.x+","+point.y);
		  //point.x=x;
		  //point.y=y;
		  if(drag)
		  { 
		     if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+_priceH+_timeH+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
			 {
			 var chartDiv=document.getElementById(canvasDivId);
		     chartDiv.style.cursor='w-resize';//cursor:w-resize;
		     hideCursor();
		     var size=date.length;
		     if(xx!=0)
			 {
			    if((x-xx)>1)
				{
				  start--;
				  end--;
				}
				if((x-xx)<1)
				{
				  start++;
				  end++;
				}
				 var num=end-start;
				 if((start+num)>(size))
				 {
				    start=size-num;
					end=size;
				 }
				 if(start<0)
				{
				   start=0;
				 }
				 //alert(start);
				 paintComponent();
				 xx=x;
				 yy=y;
				 }
			 }
		     return;
		  }
		  else
		  {
		  
		   if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
		   {
		    
		     vIndex=parseInt((x-canvasRect.left-_left)/_scalex);
			 if((vIndex+start)<this.date.length)
			 {
			 hMouseX=x;
			 hMouseY=y;
		     createMoveLine(x,y);
			 updIndInfo(x,y);
			 createTip(x,y);
			 createMaInfo(x,y);
			 createTCursor(x,y);
			 createPCursor(x,y);
			 }
			 else
			 {
			   hideCursor();
			  }
		   }
		   else
		   {
		      hideCursor();
		   }
		  }
	 }
	 

	 function createTip(x,y)
	 {      
	       var xx;
		   var yy=canvas.offsetTop+_top+15;
		   //alert(canvasRect.top);
		   var h=148,w=95;
		   if((canvasRect.left+ _left+vIndex*_scalex+_scalex/2)>(canvasRect.left+_left+(_width-_right-_left)/2))
		   {
		       xx=canvasRect.left+ _left+vIndex*_scalex+_scalex/2-(w+15);
			   xx=canvasRect.left+_left+15;
		   }
		   else
		   {
		       xx=canvasRect.left+ _left+vIndex*_scalex+_scalex/2+15;
			   xx=_width-_right-15-w;
		   }
	       if(tip==null)
		   {
		       tip = document.createElement('DIV');
			   document.body.appendChild(tip);
			   tip.style.position = 'absolute';
			   tip.style.background = '#ffffff';
			   tip.style.border='solid 1px #bbbbbb';
			   tip.style.filter='alpha(Opacity=100)';
			   tip.style.opacity='1';
			   tip.style.zIndex="999";  
			   tip.style.overflow='hidden';
			   tip.style.wordBreak='keep-all';
			   tip.style.whiteSpace='nowrap';
			   tip.style.height = h+'px';
			   tip.style.width = w+'px';
			   tip.style.top = yy+'px';
		   }
		   
           tip.style.display = 'block';
           tip.style.left =xx+'px';
           
		   var off=vIndex+start;
		   var poff=vIndex+start-1;
		   var pClose=this.close[poff];
		   if(poff<0)
		   {
		       pClose=this.open[off];
		   }
		   var diffRate=(this.close[off]-pClose)/pClose*100;
		   
		   var dStr='';
		   var volumeDecimal=1;
		   if(period=="100"||period=="200"||period=="300"||period=="400")
			{
				    dStr=formatDate(this.date[off]);
					volumeDecimal=0;
			}
			else
			{
				    dStr=formatmmdd(this.date[off])+" "+formatHHmm(completeByBefore(time[off],4,'0'));
					volumeDecimal=1;
			}
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   var values=[];
		   values[0]=dStr;
		   values[1]=formatNumber(this.open[off],decimal);
		   values[2]=formatNumber(this.high[off],decimal);
		   values[3]=formatNumber(this.low[off],decimal);
		   values[4]=formatNumber(this.close[off],decimal);
		   values[5]=formatNumber(diffRate,2)+"%";
		   values[6]=formatVolume(this.volume[off],volumeDecimal);
		   values[7]=formatVolume(this.volume[off]*this.close[off]*100,0);
		   
		   var colors=[lableColor,,formatNumber(this.high[off],decimal),klineMa3Color,klineMa4Color];
		   colors[0]=lableColor;
		   colors[1]=getColor(this.open[off],pClose);
		   colors[2]=getColor(this.high[off],pClose);
		   colors[3]=getColor(this.low[off],pClose);
		   colors[4]=getColor(this.close[off],pClose);
		   colors[5]=getColor(this.close[off],pClose);
		   colors[6]=lableColor;
		   colors[7]=lableColor;
		   
		   var names=["","开:","高:","低:","收:","涨幅:","量:","额:"];
		   
		   var field;
		   var h=18;
		   var w=60;
		   //alert(canvas.offsetTop);
		   var top=0;
		   var left=5;
		  
		   for(var i=0;i<values.length;i++)
		   {
		      field=kTipFields[i];
			  if(field==null)
			  {
			     	field= document.createElement('DIV');
					tip.appendChild(field);
					kTipFields[i]=field;
					field.style.display = 'block';
					field.style.position = 'absolute';
					field.style.height = h+'px';
					field.style.background = '#ffffff';
					field.style.border='solid 1px #ffffff';
					field.style.filter='alpha(Opacity=100)';
					field.style.opacity='1';
					field.style.top = top+'px'; 
					field.style.left =left+'px';
			  }
			   var metrics = ctx.measureText(names[i]+values[i]);
		       var textWidth = metrics.width+5;
				field.style.width = textWidth+'px';
				var innerHtml='<div  class=\'kline_toptip\' >'+names[i]+'<font color=\"'+colors[i]+'\">'+values[i]+'</font></div>';
				field.innerHTML=innerHtml;
				
				top+=18;
		   }
			
		   
		   
	 }
	 
	 function createMaInfo(x,y)
	 {
	       
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   
		   var ma5=formatPrice(this.ma5[vIndex+start],decimal);
		   var ma10=formatPrice(this.ma10[vIndex+start],decimal);
		   var ma20=formatPrice(this.ma20[vIndex+start],decimal);
		   var ma30=formatPrice(this.ma30[vIndex+start],decimal);
           var values=["MA","5","10","20","=",ma5,ma10,ma20];
		   var colors=[lableColor,klineMa1Color,klineMa2Color,klineMa3Color,lableColor,klineMa1Color,klineMa2Color,klineMa3Color];
		   var field;
		   var h=18;
		   var w=60;
		   //alert(canvas.offsetTop);
		   var top=2+canvas.offsetTop;
		   var left=5+canvas.offsetLeft;
		  
		   for(var i=0;i<values.length;i++)
		   {
		      field=kInfoFields[i];
			  if(field==null)
			  {
			     	field= document.createElement('DIV');
					document.body.appendChild(field);
					kInfoFields[i]=field;
					field.style.display = 'block';
				    field.style.position = 'absolute';
					field.style.background = '#ffffff';
				    field.style.border='solid 1px #ffffff';
				    field.style.filter='alpha(Opacity=100)';
				    field.style.opacity='1';
			  }
			  
			   var metrics = ctx.measureText(values[i]);
		       var textWidth = metrics.width+5;
			   
				field.style.height = h+'px';
				field.style.width = textWidth+'px';
				field.style.left =left+'px';
				field.style.top = top+'px'; 
				var innerHtml='<div  class=\'kline_toptip\' ><font color=\"'+colors[i]+'\">'+values[i]+'</font></div>';
				field.innerHTML=innerHtml;
				
				left+=textWidth;
		   }
		   
	 }
	 function updIndInfo(x,y)
	 {
	       
		   var values=[];
		   var colors=[];
		   if(indType=="MACD")
		   {
		      values=["MACD(12,24,9)","DIF:"+formatNumber(this.dif[start+vIndex],3),"DEA:"+formatNumber(this.dea[start+vIndex],3),"MACD:"+formatNumber(this.macd[start+vIndex],3)];
			  colors=[lableColor,klineMa1Color,klineMa2Color,klineMa3Color,klineMa3Color,klineMa3Color];
			  values=["MACD(12,24,9)"];
			  colors=[lableColor];
		   }
			else if(indType=="VOLUME")
			{
			  values=["VOLUME"];
			  colors=[lableColor]
			}
			else if(indType=="KDJ")
			{
			  values=["KDJ(9,3,3)"];
			  colors=[lableColor]
			}
			else if(indType=="RSI")
			{
			  values=["RSI(6,12,24)"];
			  colors=[lableColor]
			}
			else if(indType=="BOLL")
			{
			  values=["BOLL(20)"];
			  colors=[lableColor]
			}
			else if(indType=="CCI")
			{
			  values=["CCI(14)"];
			  colors=[lableColor]
			}
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   var field;
		   var h=18;
		   var w=60;
		   var top=_top+_priceH+_timeH+1+canvas.offsetTop;
		   var left=_left+3+canvas.offsetLeft;
		   if(values.length>0&&values.length!=indInfoFields.length)
		   {
		       
		       for(var i=0;i<indInfoFields.length;i++)
			   {
			       if(indInfoFields[i]!=null)
				   {
				      document.body.removeChild(indInfoFields[i]);
				   }
			   }
			   indInfoFields=[];
		   }
		   
		   //alert(values.length);
		   for(var i=0;i<values.length;i++)
		   {
		      field=indInfoFields[i];
			  if(field==null)
			  {
			     	field= document.createElement('DIV');
					document.body.appendChild(field);
					indInfoFields[i]=field;
					field.style.display = 'block';
					field.style.position = 'absolute';
					field.style.height = h+'px';
					field.style.filter='alpha(Opacity=100)';
					field.style.opacity='1';
			  }
			  
			   var metrics = ctx.measureText(values[i]);
		       var textWidth = metrics.width+5;
				field.style.width = textWidth+'px';
				field.style.left =left+'px';
				field.style.top = top+'px'; 
				var innerHtml='<div  class=\'kline_toptip\' ><font color=\"'+colors[i]+'\">'+values[i]+'</font></div>';
				field.innerHTML=innerHtml;
				
				left+=textWidth+5;
		   }
	 }
	 function createMoveLine(x,y)
	 {
	       	if(hLine==null)
		   {
		       hLine = document.createElement('DIV');
			   document.body.appendChild(hLine);
		   }
		   hLine.style.zIndex="999"; 
		   hLine.style.display = 'block';
           hLine.style.position = 'absolute';
           hLine.style.height = (_height-_top-_bottom)+'px';
           hLine.style.width = '1px';
           hLine.style.left =canvasRect.left+ _left+vIndex*_scalex+_scalex/2+'px';
           hLine.style.top = canvas.offsetTop+_top+1+'px';
           hLine.style.background = cursorLineColor;
		   
		   if(vLine==null)
		   {
		       vLine = document.createElement('DIV');
			   document.body.appendChild(vLine);
		   }
		   vLine.style.zIndex="999"; 
		   vLine.style.display = 'block';
           vLine.style.position = 'absolute';
           vLine.style.height = '1px';
           vLine.style.width = _width-_left-_right+'px';
           vLine.style.left = canvasRect.left+_left+1+'px';
           vLine.style.top = y+'px';
           vLine.style.background = cursorLineColor;
	 }
	 
	 function createTCursor(x,y)
	 {
	       if(true)
		   return;
	       var dStr;
	       	if(period=="100"||period=="200"||period=="300"||period=="400")
			   {
				  dStr=formatDate(date[vIndex+start]);
			   }
			 else
			   {
				   dStr=formatmmdd(date[vIndex+start])+" "+formatHHmm(completeByBefore(time[vIndex+start],4,'0'));
			   }
		   var metrics = ctx.measureText(dStr);
		   var textWidth = metrics.width;
		   if(tCursor==null)
		   {
		       tCursor = document.createElement('DIV');
			   document.body.appendChild(tCursor);
			   tCursor.style.zIndex="999"; 
			   tCursor.style.display = 'block';
			   tCursor.style.position = 'absolute';
			   tCursor.style.height = _timeH+'px';
			   tCursor.style.top =canvas.offsetTop+_top+_priceH+'px';
               tCursor.style.background = cursorLineColor;
		   }

           tCursor.style.width = textWidth+5+'px';
		   var xx=(canvasRect.left+ _left+vIndex*_scalex+_scalex/2-(textWidth+5)/2);
		   if((xx+textWidth)>(_width-_right))
		   {
		      xx=canvasRect.left+_width-_right-(textWidth+5)+1;
		   }
		   else if(xx<_left)
		   {
		       xx=canvasRect.left+_left;
		   }
		   //alert(canvasRect.top+","+canvas.offsetTop+","+canvas.getBoundingClientRect().top);
           tCursor.style.left =xx+'px';

		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+dStr+'</font></div>';
		   tCursor.innerHTML=innerHtml;
	 }
	 
	 function createPCursor(x,y)
	 {
	 	   if(true)
		   return;
	       if(y>canvasRect.top+_top+_priceH)
		   {
		      if(pCursor!=null)
			  {
			     pCursor.style.display = 'none';
			  }
			  return ;
		   }
	       var py =pLimits[1]-(y-canvasRect.top-_top-1)*(pLimits[1]-pLimits[0])/_priceH;
	       var priceStr=formatNumber(py,decimal);
		   var metrics = ctx.measureText(priceStr);
		   
		   var textWidth = metrics.width;
		   if(pCursor==null)
		   {
		       pCursor = document.createElement('DIV');
			   document.body.appendChild(pCursor);
			   pCursor.style.display = 'block';
			   pCursor.style.position = 'absolute';
			   pCursor.style.height = '20px';
			   pCursor.style.width =_left-2+'px';
			   pCursor.style.left =(2)+'px';
			   pCursor.style.background = cursorLineColor;
		   }
           pCursor.style.top = (y-9)+'px';
           
		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+priceStr+'</font></div>';
		   pCursor.innerHTML=innerHtml;
	 }
	 
	 
	 
	 function hideCursor()
	 {
	       
	       if(hLine!=null)
		   {
		       hLine.style.display = 'none';
		   }
		   if(vLine!=null)
		   {
		       vLine.style.display = 'none';
		   }
		   if(tip!=null)
		   {
		       tip.style.display = 'none';
		   }
		   if(pCursor!=null)
		   {
		       pCursor.style.display = 'none';
		   }
		   if(tCursor!=null)
		   {
		       tCursor.style.display = 'none';
		   }
		   
		   
	 }
	 
	 function onTouchStart(event)
	 {
	     //alert("onTouchStart");
		  //event.preventDefault(); 
		  var x = event.touches[0].pageX;;  
          var y = event.touches[0].pageY;  
	      //alert("onTouchStart"+x+","+y);
		  drag=true;
		  xx=x;
		  yy=y;
	 }
	 function onTouchMove(event)
	 {
	      //event.preventDefault();
		  var eventType=event.touches.length;
		  //alert(eventType);
		  var size=date.length;
		  if(eventType==1)
		  {
		     var x = event.touches[0].pageX;  
             var y = event.touches[0].pageY; 
		  	 var point=getPointOnCanvas(canvas,x,y);
			 point.x=x;
		     point.y=y;
             if(point.x>_left&&point.x<(_width-_right)&&point.y+canvas.offsetTop>_top+_priceH+_timeH&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		      		  
		      
		   	   if((x-xx)>0.3)
				{
				  start-=1;
				  end-=1;
				}
				
				if((x-xx)<0.3)
				{
				  start+=1;
				  end+=1;
				}
				var num=end-start;
				//alert(start+"||"+end);
				 if((start+num)>(size))
				 {
				    start=size-num;
					end=size;
				 }
				 if(start<0)
				{
				   
				   start=0;
				   //end=defaultNum;
				 }
				 xx=x;
		         yy=y;
				 paintComponent();
		  }
		  else
		  {
	 		if(point.x>_left&&point.x<(_width-_right)&&point.y+canvas.offsetTop>_top&&point.y<(_height-_bottom+canvas.offsetTop))
		   {
		    
		      vIndex=parseInt((x-canvasRect.left-_left)/_scalex);
			 if((vIndex+start)<this.date.length)
			 {
		     createMoveLine(x,y);
			 createTip(x,y);
			 createMaInfo(x,y);
			 createTCursor(x,y);
			 createPCursor(x,y);
			 updIndInfo(x,y);
			 }
			 else
			 {
			   hideCursor();
			  }
		   }
		   else
		   {
		      hideCursor();
		   }
		  }
		  }
		  else{
		    
		    var x1 = event.touches[0].pageX;  
            var y1 = event.touches[0].pageY; 
			var x2 = event.touches[1].pageX;  
            var y2 = event.touches[1].pageY; 
			
			//alert("x1:"+x1+"y1:"+y1+"x2:"+x2+"y2:"+y2);
			if(tx1!=0&&ty1!=0&&tx2!=0&&ty2!=0)
			{
			      if((x1-tx1)<0&&(x2-tx2)>0)
				  {
				     defaultNum+=5;
					 if(defaultNum>=200)
					 {
					   defaultNum=200;
					 }
					 if(defaultNum<=25)
					 {
					   defaultNum=25;
					 }
					 var size=date.length;
					 end = size;
					 start = end - defaultNum;
					 if (start <= 0) {
						start = 0;
					 } 
					 if((start+defaultNum)>(size))
					 {
						start=size-defaultNum;
						end=size;
					 }
					 if(start<0)
					{
					   
					   start=0;
					   end=defaultNum;
					 }
					 paintComponent();
					 tx1=0;
					 ty1=0;
					 tx2=0;
					 ty2=0;
					 return;
				  }
				  if((x1-tx1)>0&&(x2-tx2)<0)
				  {
				     defaultNum-=5;
					 if(defaultNum>=200)
					 {
					   defaultNum=200;
					 }
					 if(defaultNum<=25)
					 {
					   defaultNum=25;
					 }
					 var size=date.length;
					 end = size;
					 start = end - defaultNum;
					 if (start <= 0) {
						start = 0;
					 }
					 if((start+defaultNum)>(size))
					 {
						start=size-defaultNum;
						end=size;
					 }
					 if(start<0)
					{
					   
					   start=0;
					   end=defaultNum;
					 }
					 paintComponent();
					 tx1=0;
					 ty1=0;
					 tx2=0;
					 ty2=0;
					 return;
				  }
			}
			
			tx1=x1;
			ty1=y1;
			tx2=x2;
			ty2=y2;
			
		  }
		  
	 }
	 function onTouchEnd(event)
	 {
	     //alert("onTouchEnd");
	 }
	 
	function getPointOnCanvas(canvas, x, y) {  
       var bbox = canvas.getBoundingClientRect();  
	    return { x: x,  
            y: y  
            };  
	   /*
       return { x: x - bbox.left * (canvas.width  / bbox.width),  
            y: y - bbox.top  * (canvas.height / bbox.height)  
            };  
	   */
     } 
	 
	 
	 
	 function paintComponent()
	 {
	       //setDebugMsg('7788');
	       drawBasic(); 
		   //drawLogo(); 
		   drawChart();
		   if(vIndex>=0&&drag==false)
		   {
		       //alert(vIndex);
		       createMaInfo(0,0);
		   }
	 }
	 
	 
	 function drawBasic()
	 {
	        _priceH=(_height-_top-_bottom-_timeH)*7/10;
			_volumeH=(_height-_top-_bottom-_timeH)*3/10;
			_scalex=(_width - _right - _left) / (end-start);
			//alert('1');
			
			
			//(_priceH+"||_volumeH:"+_volumeH);
	        ctx.clearRect(0,0,_width,_height);
			ctx.save();
			
		   ctx.lineWidth=1;
		   ctx.strokeStyle=boderColor; 
		   ctx.rect(convertXY(_left),convertXY(_top),parseInt(_width-_left-_right),parseInt(_priceH)); 
		   ctx.stroke();
		   
		   ctx.lineWidth=1;
		   ctx.strokeStyle=boderColor; 
		   ctx.rect(convertXY(_left),convertXY(_top+_priceH+_timeH),parseInt(_width-_left-_right),parseInt(_volumeH)); 
		   ctx.stroke();
		   
		   var top=_top;
		   var avgH=_priceH/rowNum;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<rowNum-1;i++)
		   {
		       top+=avgH;
		       ctx.moveTo(convertXY(_left),convertXY(top));
			   ctx.lineTo(convertXY(_width-_right),convertXY(top));
		   }           	   
           ctx.stroke();  
		   
		   var top=_top+_priceH+_timeH;
		   var avgH=_volumeH/2;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<2-1;i++)
		   {
		       top+=avgH;
		       ctx.moveTo(convertXY(_left),convertXY(top));
			   ctx.lineTo(convertXY(_width-_right),convertXY(top));
		   }           	   
           ctx.stroke();  
		   
		   var left=_left;
		   var avgW=(_width-_right-_left)/columnNum;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
			/*
		   for(var i=0;i<columnNum-1;i++)
		   {
		       left+=avgW;
		       ctx.moveTo(convertXY(left),convertXY(_top));
			   ctx.lineTo(convertXY(left),convertXY(_top+_priceH));
			   
			   ctx.moveTo(convertXY(left),convertXY(_top+_priceH+_timeH));
			   ctx.lineTo(convertXY(left),convertXY(_height-_bottom));
		   }           	  
           */		   
           ctx.stroke();  
		   
	 }
	 function drawLogo()
	 {
	        ctx.fontSize=12;
			ctx.font="宋体";
	        var value="联系QQ:350952803";
	      	var metrics = ctx.measureText(value);
		    var textWidth = metrics.width+20;
			textWidth=115;
			if(logoDiv==null)
			{
			   logoDiv = document.createElement('DIV');
			   document.body.appendChild(logoDiv);
			}
			var h=25; 
			var left=_width-_right-textWidth-5+canvas.offsetLeft;
			var top=_top+_priceH-30+canvas.offsetTop;
			logoDiv.style.display = 'block';
			logoDiv.style.position = 'absolute';
			logoDiv.style.height = h+'px';
			logoDiv.style.width = textWidth+'px';
			logoDiv.style.left =left+'px';
			logoDiv.style.top = top+'px'; 
			//logoDiv.style.background = '#ffffff';
			//logoDiv.style.border='solid 1px #ffffff';
			logoDiv.style.filter='alpha(Opacity=100)';
			logoDiv.style.opacity='1';
			var innerHtml='<div  class=\'kline_toptip\' ><font color=\"0x333\">'+value+'</font></div>';
			logoDiv.innerHTML=innerHtml;
		  /*
		  if(logoImg==null)
		  { 
			logoImg=new Image();
			logoImg.src = 'img/logo.png';
			logoImg.onload = function()
			 {
				ctx.drawImage(logoImg,_width-_right-logoImg.width-10,_top+_priceH-logoImg.height-10);
				ctx.beginPath(); 
			 }
		  }
		  else{
		   if(logoImg!=null)
		   {
				ctx.drawImage(logoImg,_width-_right-logoImg.width-10,_top+_priceH-logoImg.height-10);
				ctx.beginPath(); 
		   }
		  }
		  */
	 }
	 
	 
	 function convertXY(xy)
	 {
	      var temp=parseInt(xy);
		  temp+=0.5;
		  return temp;
	 }
	 
	 function updateRange()
	 {
	    var size=date.length;
		start = end-defaultNum;
        if (start <= 0) {
            start = 0;
        }
		if(end>size&&size>defaultNum)
		{
		   //end=size-1;
		}
	 }
	 
	 function resetRange()
	 {
	    var size=date.length;
		end = size;
		start = end - defaultNum;
        if (start <= 0) {
            start = 0;
        }
	 }
	 
	 
	 function drawChart()
	 {
	    
		if(date.length<=0)
		   return;
		
		

		drawKLine();
        drawAvgLine();
		
		drawXAxisDate();
		
		if(indType=="VOLUME")
		   drawVolume();
		else if(indType=="MACD")
		   drawMACD();
		else if(indType=="KDJ")
		   drawKDJ();
		else if(indType=="RSI")
		   drawRSI();
		else if(indType=="BOLL")
		   drawBOLL();
		else if(indType=="CCI")
		   drawCCI();
		
		
		
	 }
	 function drawKLine()
	 {
	     var size=date.length;
		 pLimits=calLimit(start,end,[low,high,ma5,ma10,ma20,ma30]);
		 var tLimits=calLimit(start,end,[low,high]);
		 highLimits=tLimits[1];
		 lowLimits=tLimits[0];
	     var change=pLimits[1]-pLimits[0];

		 if(change==0)
		 {
		   pLimits[0]-=(pLimits[0])/15;
		   pLimits[1]+=(pLimits[0])/15;
		 }
		 else{
		   pLimits[0]-=(change)/15;
		   pLimits[1]+=(change)/15;
		  }
		 //calPriceLimits();
		 drawPriceYAxis(pLimits, decimal);
		 
		 var top=_top;
		 var x1,y1,y2,y3,y4;
		 var off=0;
		 var candleW = _scalex - 2;
		 if (candleW <= 0.5) {
            candleW = 0.5;
        }
		 var lowCount=0;
		 var highCount=0;
		 for(var i=0;i<(end - start);i++)
		 {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			
            x1 =  _left + _scalex * i;
            y1 = (top + (pLimits[1] - open[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			y2 = (top + (pLimits[1] - high[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			y3 = (top + (pLimits[1] - low[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			y4 = (top + (pLimits[1] - close[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if (close[off] >= open[off]) {
			      ctx.strokeStyle = kUpFillColor;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo(convertXY(x1+_scalex/2),convertXY(y2));
			      ctx.lineTo(convertXY(x1+_scalex/2),convertXY(y3));
				  ctx.stroke(); 
				  ctx.fillStyle=kUpFillColor;
				  ctx.fillRect(convertXY(x1+1),convertXY(Math.min(y1,y4)),convertXY(candleW),convertXY(Math.abs(y1-y4)));  
			 }
			 else
			 {
			      ctx.strokeStyle =kDownFillColor;  
                  ctx.lineWidth = 1;  
			      ctx.beginPath();
				  ctx.moveTo(convertXY(x1+_scalex/2),convertXY(y2));
			      ctx.lineTo(convertXY(x1+_scalex/2),convertXY(y3));
				  ctx.stroke();  
				  ctx.fillStyle=kDownFillColor;
				  ctx.fillRect(convertXY(x1+1),convertXY(Math.min(y1,y4)),convertXY(candleW),convertXY(Math.abs(y1-y4)));
			 }
			 //alert(high[off]+","+pLimits[1]);
			 /*
			 if(high[off]==highLimits&&highCount==0)
			 {
				   var priceStr=formatNumber(high[off],decimal);
				   var metrics = ctx.measureText(priceStr);
				   
				   var textWidth = metrics.width+15;
				   if(highTip==null)
				   {
					   highTip = document.createElement('DIV');
					   document.body.appendChild(highTip);
				   }
				   highTip.style.display = 'block';
				   highTip.style.position = 'absolute';
				   highTip.style.height ='18px';
				   highTip.style.width =textWidth+'px';
				   if(x1>_width/2)
				   {
				     highTip.style.left =x1-textWidth-10+'px';
					 ctx.strokeStyle = lableColor;  
					 ctx.lineWidth = 1;  
					 ctx.beginPath();
					 ctx.moveTo(convertXY(x1+_scalex/2-2),convertXY(y2));
					 ctx.lineTo(convertXY(x1+_scalex/2-14),convertXY(y2));
					 ctx.stroke(); 
				   }
				   else{
				     ctx.strokeStyle = lableColor;  
					 ctx.lineWidth = 1;  
					 ctx.beginPath();
					 ctx.moveTo(convertXY(x1+_scalex/2+2),convertXY(y2));
					 ctx.lineTo(convertXY(x1+_scalex/2+14),convertXY(y2));
					 ctx.stroke(); 
				     highTip.style.left =x1+canvas.offsetLeft+_scalex+10+'px';
				   }
				  
				   highTip.style.top = (y2+canvas.offsetTop-9)+'px';
				   //highTip.style.background = cursorLineColor;
				   highTip.style.boderColor = lableColor;
				   highTip.style.border = "1px solid "+lableColor;
				   var innerHtml='<div class=\'cursortxt\' ><font color=\"#0\">'+priceStr+'</font></div>';
				   highTip.innerHTML=innerHtml;
				   highCount++;
			 }
			 if(low[off]==lowLimits&&lowCount==0)
			 {
			       
				   var priceStr=formatNumber(low[off],decimal);
				   var metrics = ctx.measureText(priceStr);
				   
				   var textWidth = metrics.width+15;
				   if(lowTip==null)
				   {
					   lowTip = document.createElement('DIV');
					   document.body.appendChild(lowTip);
				   }
				   lowTip.style.display = 'block';
				   lowTip.style.position = 'absolute';
				   lowTip.style.height ='18px';
				   lowTip.style.width =textWidth+'px';
				   if(x1>_width/2)
				   {
				     lowTip.style.left =x1-textWidth-10+'px';
					 ctx.strokeStyle = lableColor;  
					 ctx.lineWidth = 1;  
					 ctx.beginPath();
					 ctx.moveTo(convertXY(x1+_scalex/2-2),convertXY(y3));
					 ctx.lineTo(convertXY(x1+_scalex/2-14),convertXY(y3));
					 ctx.stroke(); 
				   }
				   else{
				     ctx.strokeStyle = lableColor;  
					 ctx.lineWidth = 1;  
					 ctx.beginPath();
					 ctx.moveTo(convertXY(x1+_scalex/2+2),convertXY(y3));
					 ctx.lineTo(convertXY(x1+_scalex/2+14),convertXY(y3));
					 ctx.stroke(); 
				     lowTip.style.left =x1+canvas.offsetLeft+_scalex+10+'px';
				   }
				   
				   lowTip.style.top = (y3+canvas.offsetTop-9)+'px';
				   //highTip.style.background = cursorLineColor;
				   lowTip.style.boderColor = lableColor;
				   lowTip.style.border = "1px solid "+lableColor;
				   var innerHtml='<div class=\'cursortxt\' ><font color=\"#0\">'+priceStr+'</font></div>';
				   lowTip.innerHTML=innerHtml;
				   lowCount++;
				 
			 }
			  */
		 }
		 
	 }
	 function drawAvgLine()
	 {
	       var size=date.length;
		   var top=_top;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0,x4=0,y4=0;
		   var off=0;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			//alert(ma5[off]);
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (pLimits[1] - ma5[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineMa1Color;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 
				  //alert(x1+","+y1+","+x+","+y);				  
			}
			x1=x;
			y1=y;
			
			y = (top + (pLimits[1] - ma10[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if(x2!=0&&y2!=0)
			{
			      ctx.strokeStyle = klineMa2Color;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x2),(y2));
				  ctx.stroke(); 
			}
			x2=x;
			y2=y;
			y = (top + (pLimits[1] - ma20[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if(x3!=0&&y3!=0)
			{
			      ctx.strokeStyle = klineMa3Color;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x3),(y3));
				  ctx.stroke(); 
			}
			x3=x;
			y3=y;
			
			/*
			y = (top + (pLimits[1] - ma30[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if(x4!=0&&y4!=0)
			{
			      ctx.strokeStyle = klineMa4Color;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x4),(y4));
				  ctx.stroke(); 
			}
			x4=x;
			y4=y;
			*/
			
			
		   }
		   
	 }
	 
	
	 
	 function drawVolume()
	 {
	     var size=date.length;
		 vLimits=calLimit(start,end,[volume]);
	     //calVolumeLimits();
		 drawVolumeYAxis(vLimits, 0);
		 
		 var top=_top+_priceH+_timeH+_indInfoH;
		 var x1,y1;
		 var off=0;
		 var candleW = _scalex - 2;
		 if (candleW <= 0.5) {
            candleW = 0.5;
        }
		var height=_volumeH-_indInfoH;
		 
		 for(var i=0;i<(end - start);i++)
		 {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			
            x1 =  _left + _scalex * i;
            y1 = (top + (vLimits[1] - volume[off]) / (vLimits[1] - vLimits[0]) * height);
			
			if (close[off] >= open[off]) {
			      ctx.strokeStyle = kUpFillColor;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.fillStyle=kUpFillColor;
				  ctx.fillRect(convertXY(x1+1),convertXY(y1),convertXY(candleW),convertXY(Math.abs(_height-_bottom-y1)));  
			 }
			 else
			 {
			      ctx.strokeStyle = kDownFillColor;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.fillStyle=kDownFillColor;
				  ctx.fillRect(convertXY(x1+1),convertXY(y1),convertXY(candleW),convertXY(Math.abs(_height-_bottom-y1)));  
			 }
			
		 }
	 }
	 
	 function drawMACD()
	 {
	       calMACDDatas();
		   var size=date.length;
		   var vLimits=calLimit(start,end,[dif,dea,macd]);
		   drawIndicatorYAxis(vLimits, 3);
		   var top=_top+_timeH+_priceH+_indInfoH;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;
		   var off=0;
		   var height=_volumeH-_indInfoH;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (vLimits[1] - dif[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineMacdColor1;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 		  
			}
			x1=x;
			y1=y;
			y = (top + (vLimits[1] - dea[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x2!=0&&y2!=0)
			{
			      ctx.strokeStyle = klineMacdColor2;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x2),(y2));
				  ctx.stroke(); 		  
			}
			x2=x;
			y2=y;
			if (macd[off] != 0) {
                if (macd[off] > 0) {
                    ctx.strokeStyle = kUpFillColor;  
					ctx.fillStyle=kUpFillColor;
                } else {
                    ctx.strokeStyle = kDownFillColor;  
					ctx.fillStyle=kDownFillColor;
                }
                var a = top + (vLimits[1]) * height / (vLimits[1] - vLimits[0]);
                var b = top + (vLimits[1]) * height / (vLimits[1] - vLimits[0]) - macd[off] * _volumeH / (vLimits[1] - vLimits[0]);
                //ctx.lineWidth = 1;  
				//ctx.beginPath();
				//ctx.fillRect(convertXY(x+1),convertXY(Math.min(a,b)),convertXY(1),convertXY(Math.abs(a-b))); 
				
				//ctx.strokeStyle =boderColor;  
				ctx.lineWidth = 1;  
				ctx.beginPath();
				ctx.moveTo(convertXY(x),convertXY(a));
				ctx.lineTo(convertXY(x),convertXY(b));
				ctx.stroke();   	
            }
			
		   }
		   
		   
	 }
	 function calMACDDatas()
	 {
	       var ema12_close =EMA(close, 12);
           var ema26_close =EMA(close, 26);
           var dif =[];
		   var size=date.length;
           for (var i = 0; i < size; i++) {
               dif[i] = ema12_close[i] - ema26_close[i];
           }
           var dea = EMA(dif, 9);
           var macd = [];
           for (var i = 0; i < size; i++) {
               macd[i] = 2 * (dif[i] - dea[i]);
           }
		   this.dif=dif;
		   this.dea=dea;
		   this.macd=macd;
		   
	 }
	 
	 function drawKDJ()
	 {
	       calKDJDatas();
		   var vLimits=calLimit(start,end,[kdj_k,kdj_d,kdj_j]);
		   drawIndicatorYAxis(vLimits, 2);
		   var size=date.length;
		   var top=_top+_timeH+_priceH+_indInfoH;
		   var height=_volumeH-_indInfoH;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;
		   var off=0;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (vLimits[1] - kdj_k[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineKDJColor1;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 		  
			}
			x1=x;
			y1=y;
			
			y = (top + (vLimits[1] - kdj_d[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x2!=0&&y2!=0)
			{
			      ctx.strokeStyle = klineKDJColor2;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x2),(y2));
				  ctx.stroke(); 		  
			}
			x2=x;
			y2=y;
			
			y = (top + (vLimits[1] - kdj_j[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x3!=0&&y3!=0)
			{
			      ctx.strokeStyle = klineKDJColor3;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x3),(y3));
				  ctx.stroke(); 		  
			}
			x3=x;
			y3=y;
			}
	 }
	 
	 function calKDJDatas()
	 {
            var llv_low14 =LLV(low, 9);
            var hhv_high14 =HHV(high, 9);
			var rsv=[];
			var size =date.length;
			
			for (var i = 0; i < size; i++) {
            if (!isNaN(llv_low14[i])&&!isNaN(hhv_high14[i])&&llv_low14[i]!=null&&hhv_high14[i]!=null&&llv_low14[i] != 0 && hhv_high14[i] != 0) {
                
				rsv[i] = (close[i] - llv_low14[i]) / (hhv_high14[i] - llv_low14[i]) * 100;
              }
			  else{ 
			    rsv[i]=0;
			  }
			  if(isNaN(rsv[i]))
			  {
			   rsv[i]=0;
			  }
			}  
			//alert(rsv);
			var kdj_k =SMA(rsv, 3, 1);
            var kdj_d =SMA(kdj_k, 3, 1);
			
			var kdj_j=[];
			for (var i = 0; i < size; i++) {
            if (isNaN(kdj_k[i])||kdj_k[i]==null) {
                kdj_k[i] = 0;
            }
            if (isNaN(kdj_d[i])||kdj_d[i]==null) {
                kdj_d[i] = 0;
            }
            kdj_j[i] = 3 * kdj_k[i] - 2 * kdj_d[i];
            }
			//alert(kdj_k);
           //alert(kdj_j);
		   this.kdj_k=kdj_k;
		   this.kdj_d=kdj_d;
		   this.kdj_j=kdj_j;
	 }
	 
	 function drawRSI()
	 {
	        calRSIDatas();
			var vLimits =calLimit(start, end, [rsi_rsi1, rsi_rsi2, rsi_rsi3]);
			drawIndicatorYAxis(vLimits, 2);
            var size=date.length;
		   var top=_top+_timeH+_priceH+_indInfoH;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;
		   var off=0;
		   var height=_volumeH-_indInfoH;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (vLimits[1] - rsi_rsi1[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineRSIColor1;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 		  
			}
			x1=x;
			y1=y;
			
			y = (top + (vLimits[1] - rsi_rsi2[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x2!=0&&y2!=0)
			{
			      ctx.strokeStyle = klineRSIColor2;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x2),(y2));
				  ctx.stroke(); 		  
			}
			x2=x;
			y2=y;
			
			y = (top + (vLimits[1] - rsi_rsi3[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x3!=0&&y3!=0)
			{
			      ctx.strokeStyle = klineRSIColor3;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x3),(y3));
				  ctx.stroke(); 		  
			}
			x3=x;
			y3=y;
			}
	 }
	 
	 function calRSIDatas()
	 {
	        var size =date.length;
	        var lc =REF(close, 1);
			var llc_max = [];
            var llc_abs = [];
			for (var i = 0; i < size; i++) {
				llc_max[i] = Math.max((close[i] - lc[i]), 0);
				llc_abs[i] = Math.abs(close[i] - lc[i]);
			}
			var llc_max_sma6 = SMA(llc_max, 6, 1);
			var llc_abs_sma6 = SMA(llc_abs, 6, 1);
			var llc_max_sma12 = SMA(llc_max, 14, 1);
			var llc_abs_sma12 = SMA(llc_abs, 14, 1);
			var llc_max_sma24 = SMA(llc_max, 24, 1);
			var llc_abs_sma24 = SMA(llc_abs, 24, 1);
			var rsi1=[];
			var rsi2=[];
			var rsi3=[];
			for (var i = 0; i < size; i++) {
            rsi1[i] = llc_max_sma6[i] / llc_abs_sma6[i] * 100;
            rsi2[i] = llc_max_sma12[i] / llc_abs_sma12[i] * 100;
            rsi3[i] = llc_max_sma24[i] / llc_abs_sma24[i] * 100;
            if (isNaN(rsi1[i])) {
                rsi1[i] = 0;
            }
            if (isNaN(rsi2[i])) {
                rsi2[i] = 0;
            }
            if (isNaN(rsi3[i])) {
                rsi3[i] = 0;
            }
			
        }
		rsi_rsi1=rsi1;
		rsi_rsi2=rsi2;
		rsi_rsi3=rsi3;

	 }
	 
	 function drawBOLL()
	 {
	       calBOLLDatas();
		   var vLimits =calLimit(start, end, [boll_upper, boll_lower,low,high]);
		   drawIndicatorYAxis(vLimits, decimal);
           var size=date.length;
		   var top=_top+_timeH+_priceH+_indInfoH;
			 var x,y,x1,y1,y2,y3,y4,x5,y5,x6,y6,x7,y7;
			 var off=0;
			 var candleW = _scalex - 2;
			 if (candleW <= 0.5) {
				candleW = 0.5;
			}
			var height=_volumeH-_indInfoH;
			 for(var i=0;i<(end - start);i++)
			 {
				 off = start + i;
				if (off >= size) {
					continue;
				}
				
				x1 =  _left + _scalex * i;
				y1 = (top + (vLimits[1] - open[off]) / (vLimits[1] - vLimits[0]) * height);
				y2 = (top + (vLimits[1] - high[off]) / (vLimits[1] - vLimits[0]) * height);
				y3 = (top + (vLimits[1] - low[off]) / (vLimits[1] - vLimits[0]) * height);
				y4 = (top + (vLimits[1] - close[off]) / (vLimits[1] - vLimits[0]) * height);
				if (close[off] >= open[off]) {
					  ctx.strokeStyle = kUpFillColor;  
					  ctx.lineWidth = 1;  
					  ctx.beginPath();
					  ctx.moveTo(convertXY(x1+_scalex/2),convertXY(y2));
					  ctx.lineTo(convertXY(x1+_scalex/2),convertXY(y3));
					  ctx.stroke(); 
					  ctx.fillStyle=kUpFillColor;
					  ctx.fillRect(convertXY(x1+1),convertXY(Math.min(y1,y4)),convertXY(candleW),convertXY(Math.abs(y1-y4)));  
				 }
				 else
				 {
					  ctx.strokeStyle = kDownFillColor;  
					  ctx.lineWidth = 1;  
					  ctx.beginPath();
					  ctx.moveTo(convertXY(x1+_scalex/2),convertXY(y2));
					  ctx.lineTo(convertXY(x1+_scalex/2),convertXY(y3));
					  ctx.stroke();  
					  ctx.fillStyle=kDownFillColor;
					  ctx.fillRect(convertXY(x1+1),convertXY(Math.min(y1,y4)),convertXY(candleW),convertXY(Math.abs(y1-y4)));
				 }
				
				x=x1;
				y = (top + (vLimits[1] - boll_upper[off]) / (vLimits[1] - vLimits[0]) * height);
				if(x5!=0&&y5!=0)
				{
					  ctx.strokeStyle = klineBOLLColor2;  
					  ctx.lineWidth = 1;  
					  ctx.beginPath();
					  ctx.moveTo((x),(y));
					  ctx.lineTo((x5),(y5));
					  ctx.stroke(); 		  
				}
				x5=x;
				y5=y;
				
				y = (top + (vLimits[1] - boll_lower[off]) / (vLimits[1] - vLimits[0]) * height);
				if(x6!=0&&y6!=0)
				{
					  ctx.strokeStyle = klineBOLLColor3;  
					  ctx.lineWidth = 1;  
					  ctx.beginPath();
					  ctx.moveTo((x),(y));
					  ctx.lineTo((x6),(y6));
					  ctx.stroke(); 		  
				}
				x6=x;
				y6=y;
				
				y = (top + (vLimits[1] - boll_boll[off]) / (vLimits[1] - vLimits[0]) * height);
				if(x7!=0&&y7!=0)
				{
					  ctx.strokeStyle = klineBOLLColor1;  
					  ctx.lineWidth = 1;  
					  ctx.beginPath();
					  ctx.moveTo((x),(y));
					  ctx.lineTo((x7),(y7));
					  ctx.stroke(); 		  
				}
				x7=x;
				y7=y;
			 }
	 }
	 
	 function calBOLLDatas()
	 {
	       var size =date.length;
		   var boll =MA(close, 20);
		   var std20 =STD(close, 20);
		   var upper=[];
		   var lower=[];
		   for (var i = 0; i < size; i++) {
            upper[i] = boll[i] + 2 * std20[i];
            lower[i] = boll[i] - 2 * std20[i];
            }
			boll_upper=upper;
			boll_lower=lower;
			boll_boll=boll;
	 }
	 
	 function drawCCI()
	 {
	        calCCIDatas();
			var vLimits =calLimit(start, end, [cci]);
		    drawIndicatorYAxis(vLimits, 2);
            var size=date.length;
			var top=_top+_timeH+_priceH+_indInfoH;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;
		   var off=0;
		   var height=_volumeH-_indInfoH;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (vLimits[1] - cci[off]) / (vLimits[1] - vLimits[0]) * height);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineCCIColor;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 		  
			}
			x1=x;
			y1=y;
			
			}
			
	 }
	 function calCCIDatas()
	 {
	        var size =date.length;
			//alert(size);
			var typ=[];
			for (var i = 0; i < size; i++) {
                 typ[i] = (high[i] + low[i] + close[i]) / 3;
             }
			
			var typ_avedev14 =AVEDEV(typ, 14);
			var cci=[];
			var typ_ma14 =MA(typ, 14);
			//this.cci=typ_ma14;
			for (var i = 0; i < size; i++) {
			  if(typ_ma14[i]!=null&&typ_avedev14[i]!=null)
			  {
               cci[i] = (typ[i] - typ_ma14[i]) / (0.015 * typ_avedev14[i]);
			   }
              if (isNaN(cci[i])) {
                cci[i] = 0;
             }
			 if(cci[i]<-1000&&cci[i-1]!=null)
			 {
			   cci[i]=cci[i-1];
			   //alert((typ[i] - typ_ma14[i])+" "+(0.015 * typ_avedev14[i])+"||"+typ_avedev14[i]);
			   //alert("i:"+i+" "+ (typ[i] - typ_ma14[i]) / (0.015 * typ_avedev14[i]));
			 }
			 else if(cci[i]>1000&&cci[i-1]!=null)
			 {
			   cci[i]=cci[i-1];
			   //alert((typ[i] - typ_ma14[i])+" "+(0.015 * typ_avedev14[i])+"||"+typ_avedev14[i]);
			   //alert("i:"+i+" "+ (typ[i] - typ_ma14[i]) / (0.015 * typ_avedev14[i]));
			 }
			// alert("i:"+i+" "+ (typ[i] - typ_ma14[i]) / (0.015 * typ_avedev14[i]));
            }
			
			//alert("cci "+cci);
			this.cci=cci;
			
	 }
	 
	 function drawXAxisDate()
	 {
	     
	      var top = _top + _priceH+canvas.offsetTop+1;
		  var size = date.length;
		  
		  var str = "";
		  var off=0;
		  var num=(end-start);
		  var cnum = num /columnNum;
		  var x;
		  var field;
		  var h=18;
		  var w=60;
          ctx.font="12px Arial";
		  ctx.textAlign = "left";
		  var count=0;
		  
		  //alert(columnNum);
		  
		  for (var i = 0; i <num; i++) {
		       off = start + i;
				if (off >= size) {
					continue;
				}
			    var flag = false;
				
				if (i == 0 || (i == (num - 1) && size >= defaultNum)) {
                flag = true;
                }
				/*
				for (var j = 0; j < cnum; j++) {
				
                if (parseInt(j * (cnum)) == i) {
                    flag = true;
                    break;
                }
				 }
				 */
				if (flag==true) {
				   var dStr="";
				   if(period=="100"||period=="200"||period=="300"||period=="400")
				   {
				      
				       dStr=formatDate(date[off]);
				   }
				   else
				   {
				      dStr=formatmmdd(date[off])+" "+formatHHmm(completeByBefore(time[off],4,'0'));
				   }
				   	
		            var metrics = ctx.measureText(dStr);
		            var textWidth = metrics.width+5;
				   x = _left + (_scalex * i)+_scalex/2-textWidth/2-1;
				   if ((x+textWidth ) >= _width) {
                    x = canvasRect.left+_width-textWidth;
                   } else if (x < 0) {
                    x = 0;
                   }
				   x+=canvas.offsetLeft;
				   field=timeFields[count];
				  if(field==null)
				  {
					field= document.createElement('DIV');
					document.body.appendChild(field);
					timeFields[count]=field;
					
				    field.style.position = 'absolute';
				    field.style.height = h+'px';
				    field.style.background = '#ffffff';
				    field.style.border='solid 1px #ffffff';
				    field.style.filter='alpha(Opacity=100)';
				    field.style.opacity='1';
				  }
				field.style.display = 'block';
				field.style.top = top+'px'; 
				field.style.width = textWidth+'px';
				field.style.left =x+'px';

				var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
				field.innerHTML=innerHtml;
				   
				   count++;
				   
				 }
           
		  }
		  
		  //alert(count);
		 
	 }
	 
	 function drawPriceYAxis(limits,decimal)
	 {    
	      var num = rowNum;
		  var change = limits[1] - limits[0];
		  var left=0;
		  var top=_top+canvas.offsetTop;
		  var x=canvas.offsetLeft,y;
		  var field;
		  var h=20;
		  var w=_left-2;
		  //alert(pyFields.length);
		  for (var i = 0; i < num + 1; i++) {
		     var value = limits[1] - i * change / num;
			 field=pyFields[i];
			 if(field==null)
			 {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				pyFields[i]=field;
				field.style.display = 'block';
                field.style.position = 'absolute';
				field.style.background = '#ffffff';
				field.style.border='solid 1px #ffffff';
				field.style.filter='alpha(Opacity=100)';
				field.style.opacity='1';
				field.style.height = h+'px';
                field.style.width = w+'px';
                field.style.left =x+'px';
			 }
			 
			 y=top;
			 if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-20;
			  else
			    y=top-10;
				
            field.style.top = y+'px';
			//field.style.z-index='0';
			var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"#'+klineYAxisPriceColor+'\">'+formatNumber(value,decimal)+'</font></div>';
		    field.innerHTML=innerHtml;
			top+=_priceH/rowNum;
		  }

	 }
	 
	function drawVolumeYAxis(limits,decimal)
	 {  
	      var num = 2;
		  var change = limits[1] - limits[0];
		  var left=0;
		  var top=_top+_priceH+_timeH+canvas.offsetTop;
		  var x,y;
		  var field;
		  var h=20;
		  var w=_left-2;
		  
		   //ctx.fillStyle=klineYAxisVolumeColor;
		  for (var i = 0; i < num + 1; i++) {
		      var value = limits[1] - i * change / num;
			  field=iyFields[i];
		      if(field==null)
			  {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				iyFields[i]=field;
				  field.style.display = 'block';
				  field.style.position = 'absolute';
				  field.style.height = h+'px';
				  field.style.width = w+'px';
				  field.style.left =x+'px';
				  field.style.background = '#ffffff';
				  field.style.border='solid 1px #ffffff';
				  field.style.filter='alpha(Opacity=100)';
				  field.style.opacity='1';
			  }
			   y=top;
			 if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-20;
			  else
			    y=top-10;
			 
              field.style.top = y+'px';

			  var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"'+lableColor+'\">'+formatVolume(value,2)+'</font></div>';
		      field.innerHTML=innerHtml;
			  top+=_volumeH/num;
		   }
	 }
	 
	 function drawIndicatorYAxis(limits,decimal)
	 {  
	      var num = 2;
		  var change = limits[1] - limits[0];
		  var left=0+canvas.offsetLeft;
		  var top=_top+_priceH+_timeH+canvas.offsetTop;
		  var x,y;
		  var field;
		  var h=20;
		  var w=_left-2;
		  
		  for (var i = 0; i < num + 1; i++) {
		      var value = limits[1] - i * change / num;
			  field=iyFields[i];
		      if(field==null)
			  {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				iyFields[i]=field;
				field.style.display = 'block';
                field.style.position = 'absolute';
                field.style.height = h+'px';
                field.style.width = w+'px';
                field.style.left =x+'px';
			    field.style.background = '#ffffff';
		        field.style.border='solid 1px #ffffff';
		        field.style.filter='alpha(Opacity=100)';
		        field.style.opacity='1';
			  }
			   y=top;
			 if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-20;
			  else
			    y=top-10;
			  
              field.style.top = y+'px';
			  var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"'+lableColor+'\">'+formatNumber(value,2)+'</font></div>';
		      field.innerHTML=innerHtml;
			  top+=_volumeH/num;
		   }
	 }
	 
	 function getColor(price1,price2)
	 {
	        var color="#000000";
	        if(price1>price2)
			   color="red";
			else if(price1<price2)
			   color="green";
			
			return color;
	 }
