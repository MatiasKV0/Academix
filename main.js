const showCart = document.querySelector('.cart');
const hideCart = document.querySelector('.content-cart-items a');
const courses = document.querySelectorAll('.add-to-cart');
const cartContainer = document.querySelector('.container-courses');
const emptyCart = document.querySelector('.cart-empty');
let count = parseInt(document.querySelector('.cart-count').textContent);
let cartCourses = [];


document.addEventListener("DOMContentLoaded", () => {
    addEventListeners();

    const storageCourses = JSON.parse(localStorage.getItem('cartCourses')) || [];
    storageCourses.forEach(course => {
        const courseInfo = {
            img: course.img,
            price: course.price,
            title: course.title,
            id: course.id
        };
        createHTML(courseInfo);
        ;});
});


function addEventListeners() {

    showCart.addEventListener('click', displayCart);

    hideCart.addEventListener('click', hideCartContent);

    courses.forEach(course => { course.addEventListener('click', getCourseData); });

    cartContainer.addEventListener('click', removeCourse);
}


function displayCart(e) {
    e.preventDefault();
    showCart.nextElementSibling.classList.add('show');
}


function hideCartContent(e) {
    e.preventDefault();
    showCart.nextElementSibling.classList.remove('show');
}


function getCourseData(e) {
    e.preventDefault();
    let course = e.target;
    addCourse(course);
}


function addCourse(course) {
    const courseInfo = {
        img: course.parentElement.parentElement.parentElement.firstElementChild.getAttribute('src'),
        price: course.parentElement.firstElementChild.textContent,
        title: course.parentElement.parentElement.firstElementChild.textContent,
        id: course.parentElement.parentElement.getAttribute('id')
    };
    createHTML(courseInfo);
}


function createHTML (courseInfo){
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="course">
            <img src="${courseInfo.img}" alt="course">
            <div>
            <span>${courseInfo.title}</span>
            <span>${courseInfo.price}</span>
            </div>
            <a href="#" class="delete-course" data-id="${courseInfo.id}">X</a>
        </div>
    `;

    let addedCourse = cartCourses.find(course => course.id === courseInfo.id);

    if (addedCourse) {
        return;
    } else {
        count++;
        document.querySelector('.cart-count').textContent = count;
        cartContainer.appendChild(container);
        cartCourses = [...cartCourses, courseInfo];
        localStorage.setItem('cartCourses', JSON.stringify(cartCourses));

        emptyCart.classList.add('hide');
        if (cartCourses.length === 0) {
            emptyCart.classList.remove('hide');
        }
    }
}


function removeCourse(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete-course')) {
        let courseId = e.target.getAttribute('data-id');
        cartCourses = cartCourses.filter(course => course.id !== courseId);
        e.target.parentElement.remove();
        localStorage.setItem('cartCourses', JSON.stringify(cartCourses));
        count--;
        document.querySelector('.cart-count').textContent = count;
        if (cartCourses.length === 0) {
            emptyCart.classList.remove('hide');
        }
    }
}
