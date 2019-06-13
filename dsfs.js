//FIX by Hacker 0919
//REF: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getData() {

    $.getJSON('wishdata.json', function(data) {
        wishes = data.dataset;
        var length = wishes.length;

        //開始製作每個 wish
        for (var i = length; i > 0; i--) {

            // var showHtml = escapeHtml( wishes[i-1] );
            var showHtml = wishes[i - 1];

            $('.wish-pool').append('<div class="wish hide">' + showHtml + '</div>');
            $('.wish-pool div').eq(length - i).delay((length - i) * 30).fadeIn(800);
        }
    });

};

function saveData() {

    //如果 project name 空白不能送出
    if ($('#giftname').val() == '') {
        alert('Please Write A Gift');
    } else {

        $('#wish-btn').html('★');

        //取得新願望 並塞到前台。
        var newWish = $('#giftname').val();
        newWish = escapeHtml(newWish);

        //把 append 好的 data 存回去
        $.ajax({
            url: "addWish.php",
            type: "POST",
            data: { wish: newWish },
            success: function(data) {
                if (data == '1') {
                    alert('哎呀，好像有什麼東西出錯啦，請稍後再試。');
                } else {
                    $('.wish-pool div').eq(0).before('<div class="wish hide">' + newWish + '</div>');
                    $('.wish-pool div').eq(0).fadeIn(1000);
                }

                $('#giftname').val(''); //清空input
                setTimeout(function() {
                    $('#wish-btn').html('WISH'); //修改按鈕字串
                }, 1000);

            },
            error: function() {
                //console.log(" 新增專案大失敗 :-( ");  
            }
        });
    }
};