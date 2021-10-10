$(function(){
    
    //监听游戏规则的点击
    $('.youx').click(function(){
        $('.guize').stop().fadeIn(100);
    });
    //监听游戏规则关闭的点击
    $('.close').click(function(){
        $('.guize').stop().fadeOut(100);
    });
    //监听开始游戏按钮的点击
    $('.begin').click(function(){
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用灰太狼动画
        wolfAnimate();

    });
    //监听重新开始按钮的点击
    $('.again_in').click(function(){
        //重新设置进度条
        $('.again').stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //运行灰太狼的方法
        wolfAnimate();
    })
    var wolfTimer;
    
    //定义一个处理滚动条的方法
    function progressHandler(){
        $('.tiao').css({
            width:180
        })
        //开启定时器处理
        var timer = setInterval(function(){
            //获取进度条的宽度
            var proWidth = $('.tiao').width();
            //减少当前的宽度
            proWidth -=1;
            //重新给进度条赋值宽度
            $('.tiao').css({
                width:proWidth
            })

            //判断进度条是否为0
            if(proWidth <=0){
                //关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $('.again').stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimation();
            }
        },100)
    }

    //定义一个专门处理灰太狼动画的方法
    function wolfAnimate(){
        // 1.定义2个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
        {left:"100px",top:"115px"},
        {left:"20px",top:"160px"},
        {left:"190px",top:"142px"},
        {left:"105px",top:"193px"},
        {left:"19px",top:"221px"},
        {left:"202px",top:"212px"},
        {left:"120px",top:"275px"},
        {left:"30px",top:"295px"},
        {left:"209px",top:"297px"}
        ];

        // 3.创建一个图片
        var $wordImg = $("<img src='' class='wordImg'>");
        
        //创建随机出现的值
        var aRandom = Math.round(Math.random()*8);

      

        //4.设置图片的位置
        $wordImg.css({
            position:'absolute',
            left:arrPos[aRandom].left,
            top:arrPos[aRandom].top
        });
        //创建一个随机数组
        var aArray = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;

        //5.设置图片的内容
        //设置默认值为0
        window.wolfIndex = 0;
        //开一个定时器做动画效果
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function(){
            //判断如果大于5
            if(wolfIndex > wolfIndexEnd){
                //删除当前的图片
                $wordImg.remove();
                //停止动画
                clearInterval(wolfTimer);
                //在调用函数
                wolfAnimate();
            }
            //设置图片的动态路径
            $wordImg.attr('src',aArray[wolfIndex]);
            wolfIndex++;
        },300)

        //6.将图片添加到页面上
        $('.main').append($wordImg);

        // 7.调用处理游戏规则的方法
        guizechuli($wordImg);
    }
    function guizechuli($wordImg){
        $wordImg.one('click',function(){
            //修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            //拿到当前点击图片的地址
            var $src = $(this).attr('src')
            //根据图片地址判断是否是灰太狼
            var aZhao = $src.indexOf('h') >=0;
            //根据点击的图片类型增减分数
            if(aZhao){
                $('.count').text(parseInt($('.count').text())+10);
            }
            else{
                $('.count').text(parseInt($('.count').text())-10);
            }
        })
    }
    //停止动画内容
    function stopWolfAnimation(){
        $('.wordImg').remove();
        clearInterval(wolfTimer);
    }
})