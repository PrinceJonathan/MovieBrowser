$(() => {

    const dropGenre = [
        '#dropLove',
        '#dropSciFi',
        '#dropComedy',
        '#dropThriller',
        '#dropAction',
    ]
    const genreBody = [
        '#loveBody',
        '#sciFiBody',
        '#comedyBody',
        '#thrillerBody',
        '#actionBody',
    ]
    $('#page').hide()

    var items = null

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', "https://image.tmdb.org/t/p/w300/" + item.poster_path)
        $h5 = $('<p>').attr('class', 'name').addClass('drag').text(item.title)
        $star = $('<i>').attr('class', 'fas').addClass('fa-star').addClass('fa-2x')
        $p = $('<p>').attr('class', 'star').text(item.vote_average)
        $vote = $('<div>').attr('class', 'vote').append($star).append($p)
        $item = $('<div>').attr('class', 'item').append($img).append($h5).append($vote)
        $col = $('<div>').attr('class', 'col-*').append($item)
        $('#movie-result').append($col)

        $col.draggable({
            revert: true,
            start: function() {
                // $('#movie-result').css({
                //     'filter': 'blur(2px)',
                //     '-webkit-filter': 'blur(2px)'
                // })
                var scrollToElement = function(el, ms) {
                    var speed = (ms) ? ms : 800;
                    $('html,body').animate({
                        scrollTop: $(el).offset().top
                    }, speed);
                }
                scrollToElement('#notes', 800);
            }
        })

        // let movie = ''

        // movie += `
        //     <div class="col-* drag" style="position: relative;">
        //     <div class="item"><img class="image" src="https://image.tmdb.org/t/p/w300/${item.poster_path}">
        //     <p class="name cursor">${item.title}</p>
        //     <div class="vote"><i class="fas fa-star fa-2x"></i>
        //     <p class="star">${item.vote_average}</p></div></div></div>
        //     `

        // $('.drag').draggable({
        //     revert: true,
        //     start: function() {
        //         // $('#movie-result').css({
        //         //     'filter': 'blur(2px)',
        //         //     '-webkit-filter': 'blur(2px)'
        //         // })
        //         var scrollToElement = function(el, ms) {
        //             var speed = (ms) ? ms : 800;
        //             $('html,body').animate({
        //                 scrollTop: $(el).offset().top
        //             }, speed);
        //         }
        //         scrollToElement('#notes', 800);
        //     }
        // })

        // $('#movie-result').append(movie)
    }

    var danny = () => {
        $.each(dropGenre, function(i) {
            dropping(dropGenre[i], genreBody[i])
        });
    }


    var dropping = (dropGenre, genreBody) => {
        $(dropGenre).droppable({
            accept: '#movie-result > div',
            drop: function(event, ui) {
                ui.draggable
                    .find("img")
                    .animate({
                        width: "100px",
                        height: "150px"
                    })
                ui.draggable.detach().appendTo($(genreBody))
                $('.modal-text').hide()
            }
        });
    }

    $('.recycle').droppable({
        drop: function(event, ui) {
            ui.draggable.detach().remove()
        }
    });


    // modal 電影日誌
    $('#Love').on('click', () => {
        $('#loveModal').modal('show')
    })

    $('#SciFi').on('click', () => {
        $('#sciFiModal').modal('show')
    })

    $('#Comedy').on('click', () => {
        $('#comedyModal').modal('show')
    })

    $('#Thriller').on('click', () => {
        $('#thrillerModal').modal('show')
    })

    $('#Action').on('click', () => {
        $('#actionModal').modal('show')
    })


    // 新增電影
    var showItem = () => {
        $('#page').show()
        for (var i = 0; i <= items.length; i++) {
            newItem(items[i])
        }
        // newItem()
    }


    // 新增分頁
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


    // 搜尋電影
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

    $('#inputMovie').keypress(function(e) {
        if (e.which == 13) {
            console.log('You click Enter')
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
                    console.log('sdfsdfsd')
                }


            }, "json")
        } else {
            console.log('dsf')
        }
    });

    // dropping 電影類型
    danny()
})