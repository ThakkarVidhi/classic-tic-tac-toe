var user_1, user_2;
var turn = 1;
var game_running = true;

var userChosenbtn;
var buttonId;
var user_no;
var user_choose;
var name;

var position = [
    "-", "-", "-", 
    "-", "-", "-", 
    "-", "-", "-"
];

var pos_index_user_1 = [];
var pos_index_user_2 = [];

var win_array = [];

function main()
{    
    document.getElementById('start_btn').style.display = "none";
    user_select()
    setTimeout(function() { document.getElementById('container').style.display = "block"; }, 800);

    setTimeout(function() { user_choice() }, 800);
}

function user_select()
{
    user_1 = document.getElementById("choice").value;
    document.getElementById('user-select').style.display = "none";
    // user_1 = prompt("User 1 Choice : O or X ??");

    if(user_1 == "O")
    {
        user_2 = "X";
    }
    else if(user_1 == "X")
    {
        user_2 = "O";
        console.log(user_1, user_2);
    }
    else
    {
        alert("Please Enter O OR X !!");
        window.location.reload();
    }
}

if(game_running)
{
    function clicking(e) {
        userChosenbtn = $(e).attr("id");
        buttonId = "#" + userChosenbtn;
        $(buttonId).addClass("pressing");

        if(position[userChosenbtn] != "-")
        {
            document.getElementById('wrong_title').style.display = "block";
            setTimeout(function() { document.getElementById('wrong_title').style.display = "none"; }, 800);
        }
        else
        {
            $(buttonId).addClass("pressed");
            user_no = "user_" + turn;
            user_choose = eval(user_no);
            console.log(user_choose);
            
            $(buttonId).text(user_choose);
            
            position[userChosenbtn] = turn;
            console.log(position, "thuis is new position arrayX");

            var name = "pos_index_" + user_no;
            console.log(name);
            console.log(eval(name));
            eval(name).push(parseInt(userChosenbtn));
            //pos_index_user_1.push(userChosenbtn);
            console.log(pos_index_user_1, "This is user 1 array" ,pos_index_user_2, "this is user 2 array");

            setTimeout(function() { $(buttonId).removeClass("pressing"); }, 600);
            game_status();
        }   
    }
}

function user_choice()
{
    console.log("&&&&&&&&&&&&&&&&")
    $("#user_title").text("User " + turn + " Turn");  

}

function game_status()
{
    console.log("*********");
    var winner = check_win();
    var tie = check_tie();
    if(game_running == false)
    {
        if(winner)
        {
            $("#user_title").text("User " + turn + " is Winner !!");
            // console.log(winner);
            $("body").addClass("game-over");
            $(".btn").addClass("disabled_button");
            
        }
        else if(tie)
        {
            $("#user_title").text("Game is Draw !!");
            $("body").addClass("game-draw");
        }
        setTimeout(function() { $("body").click( function() { window.location.reload(); } ); }, 2000);
        
    }
    else
    {
        console.log("/////////");
        predict_last_move();
        console.log("#########");
    }

    return
}

// function check_win()
// {
//     var win_comb = [
//                     [0, 1, 2],
//                     [3, 4, 5],
//                     [6, 7, 8],
//                     [0, 3, 6],
//                     [1, 4, 7],
//                     [2, 5, 8],
//                     [0, 4, 8],
//                     [2, 4, 6]
//                 ];

   
//     var name = "pos_index_" + user_no;
//     console.log(name);
//     console.log(eval(name));

//     for(var sub_arr of win_comb)
//     {
//         var count = 0;
//         for(var each_sub_arr of sub_arr)
//         {
//             for(var each_pos of eval(name))
//             {
//                 if(each_pos == each_sub_arr)
//                 {
//                     count++;
//                     break;
//                 }
//             }
//         }
//         if(count == 3)
//         {
//                game_running = false;
//             return each_sub_arr;
//         }
//     }

//     return false;
// }

function check_win()
{
    console.log("checcccccccckkkkkk winn")
    // row win checking
    if( ( (position[0] != "-") && (position[1] != "-") && (position[2] != "-") ) && ( (position[0] == position[1]) && (position[1] == position[2]) ) )
    {
        console.log("11111111");
        game_running = false;
        win_array = [0,1,2];
        win_display(win_array);
        return position[0];
    }
    else if( ( (position[3] != "-") && (position[4] != "-") && (position[5] != "-") ) && ( (position[3] == position[4]) && (position[4] == position[5]) ) )
    {
        console.log("2222222");
        game_running = false;
        win_array = [3,4,5];
        win_display(win_array);
        return position[3];
    }
    else if( ( (position[6] != "-") && (position[7] != "-") && (position[8] != "-") ) && ( (position[6] == position[7]) && (position[7] == position[8]) ) )
    {
        console.log("33333333");
        game_running = false;
        win_array = [6,7,8];
        win_display(win_array);
        return position[6];
    }
    // column win checking
    else if( ( (position[0] != "-") && (position[3] != "-") && (position[6] != "-") ) && ( (position[0] == position[3]) && (position[3] == position[6]) ) )
    {
        console.log("4444444444");
        game_running = false;
        win_array = [0,3,6];
        win_display(win_array);
        return position[0];
    }
    else if( ( (position[1] != "-") && (position[4] != "-") && (position[7] != "-") ) && ( (position[1] == position[4]) && (position[4] == position[7]) ) )
    {
        console.log("555555555");
        game_running = false;
        win_array = [1,4,7];
        win_display(win_array);
        return position[1];
    }
    else if( ( (position[2] != "-") && (position[5] != "-") && (position[8] != "-") ) && ( (position[2] == position[5]) && (position[5] == position[8]) ) )
    {
        console.log("66666666666");
        game_running = false;
        win_array = [2,5,8];
        win_display(win_array);
        return position[2];
    }
    // diagonal win checking
    else if( ( (position[0] != "-") && (position[4] != "-") && (position[8] != "-") ) && ( (position[0] == position[4]) && (position[4] == position[8]) ) )
    {
        console.log("777777777");
        game_running = false;
        win_array = [0,4,8];
        win_display(win_array);
        return position[0];
    }
    else if( ( (position[6] != "-") && (position[4] != "-") && (position[2] != "-") ) && ( (position[6] == position[4]) && (position[4] == position[2]) ) )
    {
        console.log("88888888888");
        game_running = false;
        win_array = [2,4,6];
        win_display(win_array);
        return position[6];
    }

    return false;

}

function win_display(win_array)
{
    for(var each of win_array)
    {
        var buttonId = "#" + each;
        $(buttonId).addClass("win");
    }
}

function check_tie()
{
    console.log("checcccccccck tieeeeeeeeeeeeeeeeeee");
    if(!position.includes("-"))
    {
        game_running = false;
        return true;
    }
    return false;
}


function user_turn()
{
    if(turn == 1)
    { console.log("*******", turn, "this is turn 1")
        turn = 2;
        console.log("++++", turn);
    }
    else
    {
        console.log("_________________", turn, "this is turn 2")
        turn = 1;
        console.log("----", turn);
    }
    user_choice();
    return
}

function predict_last_move()
{
    var pos_index;
    var count = 0;
    for(var each in position)
    {
        if(position[each] == "-")
        {
            count = count + 1;
            pos_index = each;
            console.log("'''''''''''''''''''''''Each Count inside fun''''''''''''''''''''''''''''", count)
        }
    }
    if(count === 1)
    {
        console.log("<<<<<<<<<<Inside count == 1 >>>>>>>>>>>>>>>>>");
        if(turn == 1)
        {
            turn = 2;
        }
        else
        {
            turn = 1;
        }
        position[pos_index] = turn;
        game_status();
    }
    else
    {
        user_turn();
    }
}

// For Loop Logic Use these
// function predict_last_move()
// {
//     var pos_index;
//     var count = 0;
//     for(var each in position)
//     {
//         if(position[each] == "-")
//         {
//             count++;
//             pos_index = each;
//         }
//     }
//     if(count == 1)
//     {
//         if(turn == 1)
//         {
//             turn = 2;
//         }
//         else
//         {
//             turn = 1;
//         }
//         user_no = "user_" + turn;
//         var name = "pos_index_" + user_no;
//         eval(name).push(parseInt(each));
//         game_status();
//     }
    // else
    // {
    //     user_turn();
    // }
// }