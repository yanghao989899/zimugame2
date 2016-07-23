
function game(life,score,step){
    this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.images=["A.png","B.png","C.png","D.png","E.png","F.png","G.png","H.png","I.png","J.png","K.png","L.png","M.png","N.png","O.png","P.png","Q.png","R.png","S.png","T.png","U.png","V.png","W.png","X.png","Y.png","Z.png"];
    this.randomNum=3;
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this.speed=3;
    this.currentPos=[];
    this.letterW=80;
    this.spans=[];
    this.currentLetter=[];
    this.life=10;
    this.score=0;
    this.step=1;
    this.lifeEle=life;
    this.scoreEle=score;
    this.stepEle=step;
    this.currentScore=0;

}

game.prototype={
    play:function(){
        this.createEle(this.randomNum);
        this.move();
        this.key()
    },
    createLetter:function(num){
        var arr=[];
        for(var i=0;i<num;i++){
            var ran=Math.floor(this.letter.length*Math.random());
            while(this.check(this.currentLetter,ran)){
                var ran=Math.floor(this.letter.length*Math.random());
            }
            this.currentLetter.push(ran);
            obj={image:this.images[ran],letter:this.letter[ran]};
            arr.push(obj);
            //var span=document.createElement("span");
            //document.body.appendChild(span);
            //span.innerHTML=arr[i]
        }
        return arr;
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true
            }
        }
        return false
    },
    createEle:function(num){
        var arr=this.createLetter(num)
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            var left=100+(this.clientW-200)*Math.random();
            while(this.letterPos(this.currentPos,left)){
                left=50+(this.clientW-100)*Math.random();
            }
            var obj={minleft:left,maxleft:left+this.letterW};
            this.currentPos.push(obj);
            span.style.cssText="position:absolute;left:"+left+"px;top:"+10*-Math.random()+"px;";
            span.innerHTML="<img src='img/"+arr[i].image+"'>";
            span.setAttribute("letter",arr[i].letter);
            document.body.appendChild(span);
            this.spans.push(span)
        }
    },
    letterPos:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(!((val+this.letterW)<arr[i].minleft||val>arr[i].maxleft)){
                return true
            }
        }
        return false
    },
    move:function(){
        var that=this;
        this.t=setInterval(function(){
             for(var i=0;i<that.spans.length;i++){
                 var top=that.spans[i].offsetTop+that.speed;
                 that.spans[i].style.top=top+"px";
                 if(top>that.clientH){
                     document.body.removeChild(that.spans[i]);
                     that.currentLetter.splice(i,1);
                     that.currentPos.splice(i,1);
                     that.spans.splice(i,1);
                     that.life--;
                     if(that.life<0){
                         clearInterval(that.t);
                         var over=document.getElementsByClassName("over")[0];

                             animate(over,{top:150},1000,function(){
                                 var reset=document.getElementsByClassName("reset")[0];
                                 reset.onclick=function(){
                                     location.reload();
                                 };
                             });



                         //alert("game over");
                         //confirm("是否重新开始");
                         //location.reload();
                     }
                     that.lifeEle.innerHTML=that.life;
                     that.createEle(1)
                 }
             }
        },60)
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var code=String.fromCharCode(e.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(code==that.spans[i].getAttribute("letter")){
                    document.body.removeChild(that.spans[i]);
                    that.currentLetter.splice(i,1);
                    that.currentPos.splice(i,1);
                    that.spans.splice(i,1);
                    that.createEle(1);
                    that.score++;
                    that.currentScore++;
                    that.scoreEle.innerHTML=that.score;
                    if(that.currentScore%20==0){
                        clearInterval(that.t);
                        var Next=document.getElementsByClassName("Next")[0];

                        animate(Next,{top:150},1000,function(){
                            var NEXT=document.getElementsByClassName("NEXT")[0];
                            NEXT.onclick=function(){
                                animate(Next,{top:-170},1000,function(){
                            that.step++;
                            that.stepEle.innerHTML=that.step;
                            that.next()
                                })
                            }
                        });
                        if(that.step>7){
                            var last=document.getElementsByClassName("last")[0];

                            animate(last,{top:150},1000,function(){
                                var LAST=document.getElementsByClassName("LAST")[0];
                                LAST.onclick=function(){
                                    animate(LAST,{top:-170},1000,function(){
                                        location.reload();
                                    })
                                }
                            });
                        }

                    }
                    break;
                }
            }
        }
    },
    next:function(){
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i])
        }
        this.currentNum=[];
        this.currentPos=[];
        this.spans=[];
        if(this.speed>9){
            this.speed=9
        }else{
            this.speed++;
        }
        if(this.randomNum>9){
            this.randomNum=9
        }else{
            this.randomNum++;
        }
        this.currentScore=0;
        this.createEle(this.randomNum);
        this.move();
    }

};