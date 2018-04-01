const galleryUrl = "../../data/gallery.json";
const testimoniesUrl = "../../data/testimonies.json";
const sliderUrl = "../../data/pictures-slider.json";
let allTestimonies = [];

$(".accordion").each(function (index) {
    let panel = $(this).siblings(".panel")[index];
    if ($(this).hasClass('active-panel')) {
        $(this).children('i').removeClass('fa-angle-down');
        $(this).children('i').addClass('fa-angle-up');
        $(panel).css({
            maxHeight: panel.scrollHeight + "px"
        });
    }
    $(this).click(() => {
        $(this).toggleClass('active-panel');
        if (!$(this).hasClass('active-panel')) {
            $(this).children('i').removeClass('fa-angle-up');
            $(this).children('i').addClass('fa-angle-down');
            $(panel).css({
                maxHeight: 0
            });
        } else {
            $(".accordion").not(this).removeClass("active-panel");
            $('.accordion i').removeClass('fa-angle-up');
            $('.accordion i').not(this).children('i').addClass('fa-angle-down');
            $(this).children('i').addClass('fa-angle-up');
            $(".panel").css({
                maxHeight: 0
            })
            $(panel).css({
                maxHeight: panel.scrollHeight + "px"
            });
        }
    });
});


function getJSON(url) {
    return $.get(url)
}

getJSON(galleryUrl).then((photos) => {
    photos.forEach((photo) => {
        $('#gallery').append(`
        <div class="picture-container">
            <img src="${photo.url}" alt="${photo.alt}"/>
            <div class="picture-info">
                <p>${photo.title}</p>
                <p class="likes">${photo.likes}&nbsp;<i class="icon_heart_alt"></i></p>                
            </div>
            <div class="overlay">
                <p>+</p>
            </div>
        </div>
        `)
    })
});

// TODO: Hacer Incrementador de Likes
// $('.likes').each(function(){
//     $(this).click(function(){
//         console.log($(this).html());
//     })
// })

let testimonies = [];
let arraysTestimonies = [];
let currentPage = $("#testimonies").attr('data-current-page');

function drawTestimonies(coincidence) {
    if(coincidence.page >= arraysTestimonies.length){
        $("#next-testimonies").attr("disabled", true);
    } else {
        $("#next-testimonies").attr("disabled", false);
    } 
    if(coincidence.page <= 1) {
        $("#prev-testimonies").attr("disabled", true);
    } else {
        $("#prev-testimonies").attr("disabled", false);
    }
    $('#testimonies').html("");
    coincidence.array.forEach((testimonie) => {
        $('#testimonies').append(`
                <div class="testimonie">
                <div class="img-container">
                <img src="${testimonie.img}" alt="${testimonie.name}-${testimonie.position}"/>
                <div class="overlay">+</div>
                </div>
                <div>
                <h3>${testimonie.name}</h3>
                <h4>${testimonie.position}</h4>
                <p>${testimonie.review}</p>
                </div>
                </div>
                `)
    })
}

getJSON(testimoniesUrl).then((updatedTestimonies) => {
    testimonies = updatedTestimonies;
    const testimoniesPerPage = 4;
    let i;
    let page;
    for (i = 0, page = 0; i < testimonies.length; i += testimoniesPerPage, page++) {
        const pageTestimonie = {
            page: 0,
            array: [],
        };
        pageTestimonie.page = page + 1;
        pageTestimonie.array = testimonies.slice(i, i + testimoniesPerPage);
        arraysTestimonies.push(pageTestimonie);
    }
    let coincidence = arraysTestimonies.find(testimonie => {
        return testimonie.page == currentPage;
    });
    drawTestimonies(coincidence);
});

getJSON(sliderUrl).then((photos) => {
    photos.forEach((photo) => {
        $('#pictures-menu').append(`
        <div class="picture-container">
        <img src="${photo.url}" alt="${photo.alt}"/>
        <div class="overlay">
        </div>
        <div class="picture-info">
        <p><span>${photo.title}</span><br/>${photo.date} | ${photo.category}</p>                
            </div>
            `)
    })
});

$("#next-testimonies").click(() => {
    let currentPage = parseInt($("#testimonies").attr("data-current-page"));
    $("#testimonies").attr("data-current-page", currentPage + 1);
    let coincidence = arraysTestimonies.find(testimonie => {
        return testimonie.page == currentPage + 1;
    });
    drawTestimonies(coincidence);
});

$("#prev-testimonies").click(() => {
    let currentPage = parseInt($("#testimonies").attr("data-current-page"));
    $("#testimonies").attr("data-current-page", currentPage - 1);
    let coincidence = arraysTestimonies.find(testimonie => {
        return testimonie.page == currentPage - 1;
    });
    drawTestimonies(coincidence);
})

let shadingUrl, baseUrl;

$('#partners a').hover(function () {
    shadingUrl = $(this).children('img').attr('src');
    baseUrl = shadingUrl.replace('shading', 'base');
    $(this).children('img').attr('src', baseUrl);
}, function () {
    $(this).children('img').attr('src', shadingUrl);
});

$(".grid--main-nav a:not(#logo)").hover(function () {
    $(this).parent().css("border-top", "5px solid var(--primary-color)");
    $(this).parent().css("line-height", "91px");
}, function () {
    $(this).parent().css("border-top", "none");
    $(this).parent().css("line-height", "inherit");
})