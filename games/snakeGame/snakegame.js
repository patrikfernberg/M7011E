var snake = window.snake || {};

window.onload = function(){

    snake.game = (function()
    {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var status=false;
        var score = 0;
        var old_direction = 'right';
        var direction = 'right';
        var block = 10;
        var score = 0;
        var refresh_rate = 50;
        var pos = [[5,1],[4,1],[3,1],[2,1],[1,1]];
        var scoreboard = document.getElementById('scoreboard');
        var control = document.getElementById('controls');
        var keys = {
            37 : 'left',
            38 : 'up',
            39 : 'right',
            40 : 'down'
            };

        function adjust()
        {
                canvas.width=800;
                canvas.height=500;
                control.style.display='inline';
        }
        var food = [Math.round(Math.random(4)*(canvas.width - 10)), Math.round(Math.random(4)*(canvas.height - 10)),];
        function todraw()
        {
            for(var i = 0; i < pos.length; i++)
            {
                draw(pos[i]);
            }
        }
        function giveLife()
        {
            var nextPosition = pos[0].slice();
            switch(old_direction)
            {
                case 'right':
                    nextPosition[0] += 1;
                    break;
                case 'left':
                    nextPosition[0] -= 1;
                    break;
                case 'up':
                    nextPosition[1] -= 1;
                    break;
                case 'down':
                    nextPosition[1] += 1;
                    break;
            }
            pos.unshift(nextPosition);
            pos.pop();
        }
        function grow()
        {
            var nextPosition = pos[0].slice();
            switch(old_direction)
            {
                case 'right':
                    nextPosition[0] += 1;
                    break;
                case 'left':
                    nextPosition[0] -= 1;
                    break;
                case 'up':
                    nextPosition[1] -= 1;
                    break;
                case 'down':
                    nextPosition[1] += 1;
                    break;
            }
            pos.unshift(nextPosition);
        }
        function loop()
        {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            todraw();
            giveLife();
            feed();
            if(is_catched(pos[0][0]*block,pos[0][1]*block,block,block,food[0],food[1],10,10))
            {
                score += 10;
                createfood();
                scoreboard.innerHTML = score;
                grow();
                if(refresh_rate > 100)
                {
                    refresh_rate -=5;
                }
            }
            snake.game.status = setTimeout(function() { loop(); },refresh_rate);
        }
        window.onkeydown = function(event){
             direction = keys[event.keyCode];
                if(direction)
                {
                    setWay(direction);
                    event.preventDefault();
                }
            };
        function setWay(direction)
        {
            switch(direction)
            {
                case 'left':
                    if(old_direction!='right')
                    {
                        old_direction = direction;
                    }
                    break;
                case 'right':
                    if(old_direction!='left')
                    {
                        old_direction = direction;
                    }
                    break;
                case 'up':
                    if(old_direction!='down')
                    {
                        old_direction = direction;
                    }
                    break;
                case 'down':
                    if(old_direction!='up')
                    {
                        old_direction = direction;
                    }
                    break;
            }

        }
        function feed()
        {
            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.fillRect(food[0],food[1],10,10);
            ctx.fill();
            ctx.closePath();
        }
        function createfood()
        {
            food = [Math.round(Math.random(4)*750), Math.round(Math.random(4)*450)];
        }
        function is_catched(ax,ay,awidth,aheight,bx,by,bwidth,bheight) {
            return !(
            ((ay + aheight) < (by)) ||
            (ay > (by + bheight)) ||
            ((ax + awidth) < bx) ||
            (ax > (bx + bwidth))
            );
        }
        function draw(pos)
        {
            var x = pos[0] * block;
            var y = pos[1] * block;
            if(x >= canvas.width || x <= 0 || y >= canvas.height || y<= 0)
            {
                    document.getElementById('pause').disabled='true';
                    snake.game.status=false;
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.font='40px san-serif';
                    ctx.fillText('Game Over',300,250);
                    ctx.font = '20px san-serif';
                    ctx.fillStyle='#000000';
                    ctx.fillText('Press the restart button to play again',250,300);
                    throw ('Game Over');
            }
            else
            {
                ctx.beginPath();
                ctx.fillStyle='#000000';
                ctx.fillRect(x,y,block,block);
                ctx.closePath();
            }
        }
        function pause(elem)
        {
            if(snake.game.status)
            {
                clearTimeout(snake.game.status);
                snake.game.status=false;
                elem.value='Play'
            }
            else
            {
                loop();
                elem.value='Pause';
            }
        }
        function begin()
        {
            loop();
        }
        function restart()
        {
            location.reload();
        }
        function start()
        {
            ctx.fillStyle='#000000';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle='#ffffff';
            ctx.font='italic 50px san-serif';
            ctx.fillText('Press here to start',220,260);
            var img = new Image();
            img.onload = function()
            {
                ctx.drawImage(img,300,300,200,200);
                ctx.fillRect(410,330,10,10);
            }
        }
			
		/*function post()
		{
			//alert("working");
            //var score = $('score');
			$(document).ready(function(){
			
				$.post('test.php', {scores:score})
				{
				//$('#result').html(data)
				}			
				
			});

            
        }*/
		function post(){
			var score_string = score.toString();
			window.location.href = "test.php?name=" + score_string;
		}
		

        return {
            pause: pause,
            restart : restart,
            start : start,
            begin: begin,
            adjust : adjust,
			post : post,
        };
    })();
    snake.game.start();
}
