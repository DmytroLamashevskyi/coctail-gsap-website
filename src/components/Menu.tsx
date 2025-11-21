import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { sliderLists } from "../../constants";
import { useRef, useState } from "react";

const Menu = () => {
    const isMobile = useMediaQuery({maxWidth: 767});

    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef()

    const totalDrinks = sliderLists.length; 

    useGSAP(()=>{
        gsap.fromTo('#title', { opacity: 0, }, { opacity: 1, duration: 1 })
        gsap.fromTo('.cocktail img',{ opacity: 0 , xPercent: -100}, {xPercent:0, opacity: 1,duration: 1, ease: 'power1.inOut'})
        gsap.fromTo('.details h2', {yPercent: 100, opacity: 0}, {yPercent: 0 , opacity: 100, ease: 'power1.inOut'})
        gsap.fromTo('.details p', {yPercent: 100, opacity: 0}, {yPercent: 0 , opacity: 100, ease: 'power1.inOut'})

    },[currentIndex])

    const goToSlide = (index: number)=>{
        const newIndex = (index + totalDrinks) % totalDrinks;
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (index: number)=>{
        return sliderLists[(currentIndex + index + totalDrinks) % totalDrinks]
    } 

    const currenDrink = getCocktailAt(0)
    const prevDrink = getCocktailAt(-1)
    const nextDrink =  getCocktailAt(+1)




  return (
    <section id="menu" aria-labelledby="menu-heading">
        <img
          src={`${import.meta.env.BASE_URL}images/slider-left-leaf.png`}
          alt="Left Leaf"
          id="m-left-leaf"
        />
        <img
          src={`${import.meta.env.BASE_URL}images/slider-right-leaf.png`}
          alt="Right Leaf"
          id="m-right-leaf"
        />

        <h2 id="menu-heading" className="sr-only">Cocktail menu</h2>
        <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {
                sliderLists.map((drink,index)=>{
                    const isActive = index === currentIndex;
                    return (
                        <button key={drink.id} className={`${isActive? 'text-white border-white': 'text-white/50 border-white/50'}`}
                        onClick={()=> {goToSlide(index)}}>{drink.name}</button>
                    )
                })
        }
        </nav>

        <div className="content">
            <div className="arrows">
                <button className="text-left" onClick={()=>goToSlide(currentIndex-1)}>
                    <span>{prevDrink.name}</span>
                    <img
                    src={`${import.meta.env.BASE_URL}images/right-arrow.png`}
                    alt="Right arrow" aria-hidden='true'
                    />
                </button>
                <button className="text-left" onClick={()=>goToSlide(currentIndex+1)}>
                    <span>{nextDrink.name}</span>
                    <img
                    src={`${import.meta.env.BASE_URL}images/left-arrow.png`}
                    alt="Left arrow" aria-hidden='true'
                    />
                </button>
            </div>

                <div className="cocktail">
                    <img  src={`${import.meta.env.BASE_URL}${currenDrink.image}`} className="object-contain" alt="Current drink" />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currenDrink.name}</p>
                    </div>
                    <div className="details">
                        <h2>{currenDrink.title}</h2>
                        <p>{currenDrink.description}</p>
                    </div>
                </div>
        </div>
    </section>
  )
}

export default Menu