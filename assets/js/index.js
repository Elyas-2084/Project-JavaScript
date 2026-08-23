'use strict'
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
    });
});

//Fixed Header
const topHeader = document.querySelector('.container-top');
const bottomHeader = document.querySelector('.container-second-header');
const mobileHeader = document.querySelector('.mobile-header');
window.addEventListener('scroll', () => {

    if (window.scrollY > 100) {
        topHeader.classList.add('hide');
        bottomHeader.classList.add('sticky');
        mobileHeader.classList.add('sticky');
    } else {
        topHeader.classList.remove('hide');
        bottomHeader.classList.remove('sticky');
        mobileHeader.classList.remove('sticky');
    }

});

//Mobile Header
const moreIcon = document.querySelector('.mobile-header .more-icon i.ellipsis')
const moreBoxes = document.querySelector('.more-icon .more-box')
moreIcon.addEventListener('click', () => {
    moreBoxes.classList.toggle('show')
    moreIcon.classList.toggle('active')
    menu.classList.remove('active')
    arrow.classList.remove('active')
    menuBtn.classList.remove('active')
})

document.addEventListener('click', (e) => {
    if (!e.target.closest('.more-icon')) {
        moreBoxes.classList.remove('show');
        moreIcon.classList.remove('active');
    }
});
// left menu mobile//
const menuBtn = document.querySelector('.menu-icon i.bars');
const menu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-menu');
const arrow = document.querySelector('.menu-icon i.arrow');

//open menu
menuBtn.addEventListener('click', () => {
    menu.classList.add('active')
    moreBoxes.classList.remove('show')
    menuBtn.classList.add('active');
    arrow.classList.add('active')
})

arrow.addEventListener('click', () => {
    menu.classList.remove('active')
    moreBoxes.classList.remove('show')
    menuBtn.classList.remove('active');
    arrow.classList.remove('active')
})

//zir menu
document.querySelectorAll('.has-sub').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open')
    })
})

//Active Section 
const menuItems = document.querySelectorAll('.left-nav > ul > li');
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    menuItems.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });
});
document.querySelector('.home').classList.add('active');
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const sectionId = item.classList[0];
        const target = document.getElementById(sectionId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// sliders
const megaSlides = document.querySelectorAll('.megaMenu-tours-boxes .megaMenu-tours-img img');
const mainSlides = document.querySelectorAll('.slider .slide');
const indicator = document.querySelector('.slider .indicator');
const indicatorMegaMenu = document.querySelector('.megaMenu .megaMenu-tours .megaMenu-tours-point')
let sliderSetup = (slides, interval, step, indicatorContainer = null) => {
    let indexSlide = 0;
    let timer;

    let nextSlide = () => {
        indexSlide = indexSlide + step;
        if (indexSlide >= slides.length) {
            indexSlide = 0;
        }
        showSlide();
    }

    let showSlide = () => {
        slides.forEach(el => {
            el.classList.remove('active');
        })
        slides[indexSlide].classList.add('active');

        if (step === 2 && slides[indexSlide + 1]) {
            slides[indexSlide + 1].classList.add('active');
        }
        updateIndicator();
    }

    let startAuto = () => {
        timer = setInterval(nextSlide, interval);
    }

    let restTime = () => {
        clearInterval(timer);
        startAuto();
    }

    let createIndicator = () => {
        if (!indicatorContainer) return;

        let count;
        if (step === 2) {
            count = Math.floor(slides.length / 2)
        } else {
            count = slides.length
        }
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            if (i === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                dot.classList.add('click-anim');
                setTimeout(() => {
                    dot.classList.remove('click-anim');
                }, 300);

                indexSlide = i * step;

                showSlide();
                restTime();
            });

            indicatorContainer.appendChild(dot);
        }
    }

    let updateIndicator = () => {
        if (!indicatorContainer) return;

        for (let i = 0; i < indicatorContainer.children.length; i++) {
            indicatorContainer.children[i].classList.remove('active');
        }

        let activeIndex;
        if (step === 2) {
            activeIndex = Math.floor(indexSlide / 2);
        } else {
            activeIndex = indexSlide;
        }

        if (indicatorContainer.children[activeIndex]) {
            indicatorContainer.children[activeIndex].classList.add('active');
        }
    }

    createIndicator();
    showSlide();
    startAuto();
}
sliderSetup(megaSlides, 3000, 2, indicatorMegaMenu);
sliderSetup(mainSlides, 5000, 1, indicator);


//Other Tour Title//
const containerTours = document.querySelector('.container-tours')
const container_toursTitle = document.querySelector('.box-tours-title .tours-title')
const toursTitle = document.querySelector('.box-tours-title .tours-title h3')
const arrow_toursTitle = document.querySelector('.box-tours-title .tours-title span')
window.addEventListener('scroll', () => {
    const rect = containerTours.getBoundingClientRect();
    rect.bottom < window.innerHeight - 50 ? container_toursTitle.classList.add('show') : container_toursTitle.classList.remove('show')
})
toursTitle.addEventListener('mouseenter', () => {
    arrow_toursTitle.classList.add('show')
})

toursTitle.addEventListener('mouseleave', () => {
    arrow_toursTitle.classList.remove('show')
})

//btn top
const Box_btnTop = document.querySelector('.btn-top')
const btnTop = document.querySelector('.btn-top a')
window.addEventListener('scroll', () => {
    window.pageYOffset > 500 ? Box_btnTop.classList.add('show') : Box_btnTop.classList.remove('show')
})
btnTop.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

//Horizon//
const headerHorizon = document.querySelectorAll('.titles-Horizons ul li');
const pHorizon = document.querySelectorAll('.info-Horizons .description-Horizons p');
const indicatorEL = document.querySelector('.tab-indicator');
const titleHorizon = document.querySelector('.header-Horizons h1');
const horizons_Section = document.querySelector('.Horizons');
let indexTab = 0;

window.addEventListener('scroll', () => {
    const rectTag = horizons_Section.getBoundingClientRect();
    rectTag.top < window.innerHeight - 120 ? titleHorizon.classList.add('show') : titleHorizon.classList.remove('show')
})

let moveIndicator = (el) => {
    indicatorEL.style.width = el.offsetWidth + 'px'
    indicatorEL.style.left = el.offsetLeft + 'px'
}

// Change Active Tab
let changeTitle = () => {
    headerHorizon.forEach(element => {
        element.classList.remove('active')
    });
    headerHorizon[indexTab].classList.add('active')
    moveIndicator(headerHorizon[indexTab])
}

let changeText = () => {
    pHorizon.forEach(element => {
        element.classList.remove('active')
    });
    pHorizon[indexTab].classList.add('active')
}

headerHorizon.forEach((item, index) => {
    item.addEventListener('click', () => {
        indexTab = index
        changeTitle()
        changeText()
        console.log(indexTab)
    })
});

window.addEventListener('load', () => {
    moveIndicator(document.querySelector('.titles-Horizons ul li.active'))
})

//HOT TOURS//
const container_Hot_Tours = document.querySelector('.hot-tours-container')
const hot_Tours_Title = document.querySelector('.hot-tours-title')
const hot_tours_first = document.querySelector('.hot-tours-first')
const hot_tours_second = document.querySelector('.hot-tours-second')

window.addEventListener('scroll', () => {
    const rect = container_Hot_Tours.getBoundingClientRect();
    const rectSecond = hot_tours_first.getBoundingClientRect();

    rect.top < window.innerHeight - 20 ? hot_Tours_Title.classList.add('show') : hot_Tours_Title.classList.remove('show')

    rect.top < window.innerHeight - 100 ? hot_tours_first.classList.add('show') : hot_tours_first.classList.remove('show')

    rectSecond.bottom < window.innerHeight - 50 ? hot_tours_second.classList.add('show') : hot_tours_second.classList.remove('show')

    if (rect.top < window.innerHeight - 100) {
        hot_tours_first.classList.add('show')
        hot_tours_second.classList.add('show')
    }
    else {
        hot_tours_first.classList.remove('show')
        hot_tours_second.classList.remove('show')
    }

})

// different People
const box_People = document.querySelectorAll('.different-people-body .people')
const different_container = document.querySelector('.different-people-container')
const different_title = document.querySelector('.different-people-title')

window.addEventListener('scroll', () => {
    const rect = different_container.getBoundingClientRect();
    rect.top < window.innerHeight - 100 ? different_title.classList.add('show') : different_title.classList.remove('show')
})

box_People.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('show')
    })
    element.addEventListener('mouseleave', () => {
        element.classList.remove('show')
    })
});

// First-class
const text_one_first_class = document.querySelector('.first-class-description .first-class-title h1')
const text_tow_first_class = document.querySelector('.first-class-description .first-class-title h2')
const text_three_first_class = document.querySelector('.first-class-description .first-class-text p')
const first_class_container = document.querySelector('.first-class-container')

window.addEventListener('scroll', () => {
    const rect = first_class_container.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        text_one_first_class.classList.add('show')
        text_tow_first_class.classList.add('show')
    }
    else {
        text_one_first_class.classList.remove('show')
        text_tow_first_class.classList.remove('show')
        text_three_first_class.classList.remove('show')
    }

    rect.top < window.innerHeight - 150 ? text_three_first_class.classList.add('show') : text_three_first_class.classList.remove('show')
})


// People-say
const people_say_container = document.querySelector('.people-say-container')
const people_say_title = document.querySelector('.people-say-title h1')
const people_say = document.querySelectorAll('.people-say-body .people')

window.addEventListener('scroll', () => {
    const rect = people_say_container.getBoundingClientRect();
    rect.top < window.innerHeight - 100 ? people_say_title.classList.add('show') : people_say_title.classList.remove('show')

    people_say.forEach((element, i) => {
        if (rect.top < window.innerHeight - 200) {
            element.classList.add('show')
            element.style.transitionDelay = `${i * 120}ms`
        }
        else {
            element.classList.remove('show')
            element.style.transitionDelay = '0ms'
        }
    });
})

//Following 
const following_title = document.querySelector('.following-title h1');
const following_counters = document.querySelectorAll('.following-box h1');
const sectionFollowing = document.querySelector('.following');

let hasCounted = false;

window.addEventListener('scroll', () => {
    const top = sectionFollowing.getBoundingClientRect().top;
    const trigger = window.innerHeight - 200;

    top < trigger && following_title.classList.add('show')

    if (hasCounted || top > trigger) return;
    hasCounted = true;

    following_counters.forEach((el, i) => {
        let count = 0;
        const target = +el.dataset.target;

        const update = () => {
            if (count < target) {
                count++;
                el.textContent = i === 1 ? `${count}+` : count;
                setTimeout(update, 2);
            } else {
                el.textContent = i === 1 ? `${target}+` : target;
            }
        };

        update();
    });
});

//SignUp
const sign_up_title = document.querySelector('.sign-up-text h1')
const sign_up_description = document.querySelector('.sign-up-text p')
const sign_up_input = document.querySelector('.sign-up-form input')
const sign_up_btn = document.querySelector('.sign-up-form a')
const sign_up_container = document.querySelector('.sign-up-container')
window.addEventListener('scroll', () => {
    const rect = sign_up_container.getBoundingClientRect()
    rect.top < window.innerHeight - 100 ? sign_up_title.classList.add('show') : sign_up_title.classList.remove('show')
    rect.top < window.innerHeight - 150 ? sign_up_description.classList.add('show') : sign_up_description.classList.remove('show')

    if (rect.top < window.innerHeight - 250) {
        sign_up_input.classList.add('show')
        sign_up_btn.classList.add('show')
    }
    else {
        sign_up_input.classList.remove('show')
        sign_up_btn.classList.remove('show')
    }
})

// Blog Post
const wrapper = document.querySelector('.blog-post-wrapper');
const indicatorsContainer = document.querySelector('.blog-post-indicator ul');
let slides = [];
let indicators = [];
let indexBlogPost = 0;
let timer;

/* ---------- MOBILE ---------- */
if (window.innerWidth <= 767) {
    const desktopWrappers = document.querySelectorAll('.blog-post-wrapper > div');
    const mobileCards = [];
    const desktopSlides = document.querySelectorAll('.wrapper-one, .wrapper-second, .wrapper-three');
    desktopSlides.forEach(item => {
        item.style.display = 'none';
    });

    desktopWrappers.forEach(wrapperItem => {
        const cards = wrapperItem.querySelectorAll('.blog-post-card');
        cards.forEach(card => {
            const slide = document.createElement('div');
            slide.classList.add('mobile-slide');
            slide.appendChild(card.cloneNode(true));
            mobileCards.push(slide);
        });
    });

    indicatorsContainer.innerHTML = '';
    const mobileContainer = document.createElement('div');
    mobileContainer.classList.add('mobile-wrapper');
    wrapper.appendChild(mobileContainer);

    mobileCards.forEach((slide, i) => {
        mobileContainer.appendChild(slide);
        const li = document.createElement('li');
        if (i === 0) li.classList.add('active');
        indicatorsContainer.appendChild(li);
    });

    slides = document.querySelectorAll('.mobile-slide');
    indicators = document.querySelectorAll('.blog-post-indicator ul li');
}

/* ---------- DESKTOP ---------- */
else {

    slides = document.querySelectorAll('.blog-post-wrapper > div');
    indicators = document.querySelectorAll('.blog-post-indicator ul li');
}

/* ---------- SHOW ---------- */
let showSlide = () => {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === indexBlogPost) {
            slide.classList.add('active');
        }
        else if (i > indexBlogPost) {
            slide.classList.add('next');
        }
        else {
            slide.classList.add('prev');
        }
    });
    indicators.forEach(item => {
        item.classList.remove('active');
    });

    indicators[indexBlogPost].classList.add('active');
}

/* ---------- NEXT ---------- */
let nextSlide = () => {
    indexBlogPost++;
    if (indexBlogPost >= slides.length) {
        indexBlogPost = 0;
    }
    showSlide();
}

/* ---------- AUTO ---------- */
let startAuto = () => {
    timer = setInterval(() => {
        nextSlide();
    }, 3000);
}
let resetTime = () => {
    clearInterval(timer);
    startAuto();
}

/* ---------- INDICATORS ---------- */
indicators.forEach((item, pointIndex) => {
    item.addEventListener('click', () => {
        item.classList.add('click-anim');
        indexBlogPost = pointIndex;
        showSlide();
        resetTime();
    });

    item.addEventListener('animationend', () => {
        item.classList.remove('click-anim');
    });

});
showSlide();
startAuto();

//Gallery
const sliderGallery = document.querySelector('.gallery-part-body');
const leftBtn = document.querySelector('.gallery-part-container .left-slide');
const rightBtn = document.querySelector('.gallery-part-container .right-slide');
const items = document.querySelectorAll('.gallery-part-body .img-box');

rightBtn.addEventListener('click', () => {
    sliderGallery.scrollLeft += 400;
});

leftBtn.addEventListener('click', () => {
    sliderGallery.scrollLeft -= 300;
});

const images = document.querySelectorAll('.gallery-part-body img');
const previewBox = document.querySelector('.gallery-part .preview-box');
const previewImg = previewBox.querySelector('img');
const closeBtnBox = document.querySelector('.preview-box .detail .iconClose');
const current = document.querySelector('.preview-box .detail .current-img');
const total = document.querySelector('.preview-box .detail .total-img');
const shadow = document.querySelector('.gallery-part .shadow');
const nextBtn = document.querySelector('.img-detail .next');
const prevBtn = document.querySelector('.img-detail .prev');
let indexImg = 0;
total.textContent = images.length;

// open preview
images.forEach((img, i) => {
    img.addEventListener('click', () => {
        indexImg = i;
        openPreview();
    });
});

function openPreview() {
    updatePreview();
    previewBox.classList.add('show');
    shadow.style.display = 'block';
}

function updatePreview() {
    previewImg.src = images[indexImg].src;
    current.textContent = indexImg + 1;

    prevBtn.style.display = indexImg === 0 ? 'none' : 'block';
    nextBtn.style.display = indexImg === images.length - 1 ? 'none' : 'block';
}

nextBtn.addEventListener('click', () => {
    if (indexImg < images.length - 1) {
        indexImg++;
        updatePreview();
    }
});

prevBtn.addEventListener('click', () => {
    if (indexImg > 0) {
        indexImg--;
        updatePreview();
    }
});

closeBtnBox.addEventListener('click', closePreview);
shadow.addEventListener('click', closePreview);

function closePreview() {
    previewBox.classList.remove('show');
    shadow.style.display = 'none';
}

//Footer//
const footer_container = document.querySelector('.footer-container')
const footer_left = document.querySelector('.footer-container .left-part')
const footer_center = document.querySelector('.footer-container .center-part')
const footer_right = document.querySelector('.footer-container .right-part')

window.addEventListener('scroll', () => {
    const rect = footer_container.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        footer_left.classList.add('show')
        footer_center.classList.add('show')
        footer_right.classList.add('show')
    }
    else {
        footer_left.classList.remove('show')
        footer_center.classList.remove('show')
        footer_right.classList.remove('show')
    }
})