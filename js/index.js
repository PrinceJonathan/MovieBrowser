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

    var items = null

    $('#page').hide()

    // 滾動事件
    var scrollToElement = function(el, ms) {
        var speed = (ms) ? ms : 800;
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, speed);
    }

    // 從資料庫抓取電影並新增
    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', "https://image.tmdb.org/t/p/w300/" + item.poster_path)
        $h5 = $('<p>').text(item.title)
        $star = $('<i>').attr('class', 'fas').addClass('fa-star').addClass('fa-2x')
        $p = $('<p>').attr('class', 'star').text(item.vote_average)
        $vote = $('<div>').attr('class', 'vote').append($star).append($p)
        $item = $('<div>').attr('class', 'item').append($img).append($h5).append($vote)
        $col = $('<div>').attr('class', 'col-*').addClass('drag').append($item)
        $('#movie-result').append($col)

        $('.drag').draggable({
            cancel: '.modal-body',
            revert: true,
            start: function() {
                // $('#movie-result').css({
                //     'filter': 'blur(2px)',
                //     '-webkit-filter': 'blur(2px)'
                // })
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

    // 幫電影日誌區設立droppable事件
    var dropping = (dropGenre, genreBody) => {
        $(dropGenre).droppable({
            accept: '#movie-result > div',
            drop: function(event, ui) {
                ui.draggable.draggable('destroy')
                ui.draggable
                    .find('div')
                    .append('<i class="far fa-times-circle xclose"></i>')
                ui.draggable
                    .find('.xclose')
                    .on('click', () => {
                        ui.draggable.remove()
                    })
                ui.draggable
                    .find('img')
                    .css({
                        width: '100px',
                        height: '150px'
                    })
                    .removeClass('image')
                ui.draggable
                    .find('p')
                    .css({
                        fontSize: '0.8em'
                    })
                ui.draggable
                    .find('i')
                    .removeClass('fa-2x')
                ui.draggable.detach().appendTo($(genreBody))
                $('.modal-text').hide()
            }
        });
    }


    // 點擊 #createNewGenre 打開 createNewGenreModal
    $('#createNewGenre').on('click', () => {
        $('#createNewGenreModal').modal('show')
    })

    // 點擊 #submitGenre 新增 Genre
    $('#submitGenre').on('click', () => {

        if ($('#genreName').val()) {
            let genreName = $('#genreName').val()
            while (genreName.indexOf(" ") >= 0) {
                genreName = genreName.replace(" ", "_")
            }
            let imgUrl = $('#imgUrl').val()
            let newGenreModalName = genreName + 'Modal'
            let dropNewGenre = 'drop' + genreName
            let newGenreBody = genreName + 'Body'
            let newGenre = `
                <div class="card col-*" style="border-radius: 1em;" id="drop${genreName}">
                    <img src= '${imgUrl}'>
                    <div class="cardbody">
                        <h5 class="card-title">${genreName}</h5>
                        <a href="#" class="btn btn-primary" id="${genreName}">See Ur notes</a>
                    </div>
                    <i class="far fa-times-circle xclose" style="top: -2%;
                    left: 100%;" onclick="document.getElementById('drop${genreName}').remove();"></i>
                </div>
                `
            $('#notes').append(newGenre)



            let newGenreModal = `
                <div id="${newGenreModalName}" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content" style="border-radius: 1rem;">
                            <div class="modal-header" style="background-color: #4e60c3; border-top-left-radius: 1rem;
                            border-top-right-radius: 1rem;">
                                <h5 class="modal-title">${genreName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            </div>
                            <div class="modal-body row" id="${genreName}Body" style="
                            margin-right: 15px;
                            margin-left: 15px;
                        ">
                                <p class="modal-text">Write Ur Own Diary here</p>
                            </div>
                        </div>
                    </div>
                </div>
                `

            $('#' + dropNewGenre).droppable({
                accept: '#movie-result > div',
                drop: function(event, ui) {
                    ui.draggable.draggable('destroy')
                    ui.draggable
                        .find('div')
                        .append('<i class="far fa-times-circle xclose"></i>')
                    ui.draggable
                        .find('.xclose')
                        .on('click', () => {
                            ui.draggable.remove()
                        })
                    ui.draggable
                        .find('img')
                        .css({
                            width: '100px',
                            height: '150px'
                        })
                        .removeClass('image')
                    ui.draggable
                        .find('p')
                        .css({
                            fontSize: '0.8em'
                        })
                    ui.draggable
                        .find('i')
                        .removeClass('fa-2x')
                    ui.draggable.detach().appendTo('#' + newGenreBody)
                    $('.modal-text').hide()
                }
            });

            $('body').append(newGenreModal)

            $('#' + genreName).on('click', () => {
                $('#' + newGenreModalName).modal('show')
            })

            $('#createNewGenreModal').modal('hide')
            scrollToElement($('#' + dropNewGenre), 500);


        } else {
            alert('U better type something, u mather farmer...')
        }

    })


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


    // 呈現電影
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
                            alert('TMDb has been taken over by zombies. Run for ur own life!')
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
                            alert('TMDb has been taken over by zombies. Run for ur own life!')
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

            if (name == '香港') {
                alert('原諒我這一生不羈放縱愛自由')
            }
            scrollToElement('#movie-result', 500)
            if (response) {
                if (response.total_results != 0) {
                    console.log(response)
                    items = response.results
                    pages = response.total_pages
                    console.log(pages)
                    newPage(pages)
                    $('#movie-result').empty()
                    showItem()


                } else {
                    alert("No result. Zombies has taken over the Database. Run for ur own life!")
                    console.log('Run, or U gonna watch the last eposide of Game of Thrones til death.')
                }



            } else {
                alert('TMDb has been taken over by zombies. Run for ur own life!')
            }


        }, "json")
    })

    // dropping 電影類型
    danny()
})