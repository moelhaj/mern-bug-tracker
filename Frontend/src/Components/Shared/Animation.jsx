import gsap from "gsap";

export const openModal = (target, targetContent) => {
    gsap.to(target, 0, {
        display: "block"
    })
    gsap.to(targetContent, 0, {
        y: 20
    })
    gsap.to(target, .5, {
        opacity: 1
    })
    gsap.to(targetContent, .5, {
        opacity: 1,
        y: 0
    })
}

export const closeModal = (target, targetContent) => {
    gsap.to(targetContent, .5, {
        opacity: 0,
    })
    gsap.to(target, .5, {
        opacity: 0,
        display: "none"
    })
}

export const openMenu = (target) => {
    gsap.to(target, 0, {
        display: "block"
    })
}

export const closeMenu = (target) => {
    gsap.to(target, 0, {
        display: "none"
    })
}