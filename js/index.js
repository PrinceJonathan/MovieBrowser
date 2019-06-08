$(() => {

    $('#page').hide()

    var items = null


    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', "https://image.tmdb.org/t/p/w300/" + item.poster_path)
        $h5 = $('<h5>').attr('class', 'name').text(item.title)
        $star = $('<i>').attr('class', 'fas').addClass('fa-star').addClass('fa-2x')
        $p = $('<p>').attr('class', 'star').text(item.vote_average)
        $vote = $('<div>').attr('class', 'vote').append($star).append($p)
        $id = $('<div>').attr('id', item.id)
        $item = $('<div>').attr('class', 'item').append($img).append($h5).append($vote).append($id)


        $col = $('<div>').attr('class', 'col-*').append($item)
        $('#movie-result').append($col)
    }

    var showItem = () => {
        $('#page').show()
        for (var i = 0; i <= items.length; i++) {
            newItem(items[i])
        }
    }

    var newPage = (n) => {
        var pageNum = n

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        if (n <= 10) {
            for (var i = 1; i <= pageNum; i++) {
                $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

                $a.on('click', function() {
                    var i = $(this).text()
                    var name = $('#inputMovie').val()
                    $.get('https://api.themoviedb.org/3/search/movie?api_key=21cfec695b765679aaad63530491a284&language=en-US&query=' + name + '&page=' + i, function(response) {
                        if (response) {
                            console.log(response)
                            items = response.results
                            pages = response.total_pages
                            console.log(pages)
                            newPage(pages)
                            $('#movie-result').empty()
                            showItem()



                        } else {
                            $('#heroName').text('伺服器出錯')
                            $('#exampleModal').modal('show')
                        }


                    }, "json")
                })

                $li = $('<li>').attr('class', 'page-item').append($a)
                $('#page-number').append($li)
            }
        } else {
            var bridge = n / 10
            bridge = (n % 10 != 0) ? bridge + 1 : bridge
            for (var i = 1; i <= 10; i++) {
                $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

                $a.on('click', function() {
                    var i = $(this).text()
                    var name = $('#inputMovie').val()
                    $.get('https://api.themoviedb.org/3/search/movie?api_key=21cfec695b765679aaad63530491a284&language=en-US&query=' + name + '&page=' + i, function(response) {
                        if (response) {
                            console.log(response)
                            items = response.results
                            pages = response.total_pages
                            console.log(pages)
                            newPage(pages)
                            $('#movie-result').empty()
                            showItem()



                        } else {
                            $('#heroName').text('伺服器出錯')
                            $('#exampleModal').modal('show')
                        }


                    }, "json")
                })

                $li = $('<li>').attr('class', 'page-item').append($a)
                $('#page-number').append($li)
            }
        }
        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)

    }



    $('#search').on('click', () => {
        var name = $('#inputMovie').val()
        $.get('https://api.themoviedb.org/3/search/movie?api_key=21cfec695b765679aaad63530491a284&language=en-US&query=' + name + '&page=1&include_adult=false', function(response) {
            if (response) {
                console.log(response)
                items = response.results
                pages = response.total_pages
                console.log(pages)
                newPage(pages)
                $('#movie-result').empty()
                showItem()



            } else {
                $('#heroName').text('伺服器出錯')
                $('#exampleModal').modal('show')
            }


        }, "json")
    })

    // $('#search').keypress(function() {
    //     console.log("Handler for .keypress() called.");
    //     showItem()
    // });

})