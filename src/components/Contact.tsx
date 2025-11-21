import { openingHours, socials } from "../../constants"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

function Contact() {
    useGSAP(()=>{
        const titleSplit = SplitText.create('#contact h2', {type: 'words'})
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center'
            },
            ease: 'power1.inOut'
        })

        timeline.from(titleSplit.words,{
            opacity: 0,
            yPercent: 100,
            stagger: 0.02   
        }).from('#contact h3, #contact p', {
            opacity: 0,
            yPercent: 100,
            stagger: 0.02   
        }).to('#f-right-leaf', {
            y: '-50', duration: 1, ease: 'power1.inOut'
        }).to('#f-left-leaf', {
            y: '-50', duration: 1, ease: 'power1.inOut'
        }, '<')
    })


  return (
    <footer id="contact">
        <img
          src={`${import.meta.env.BASE_URL}images/footer-right-leaf.png`}
          alt="Right Leaf"
          id="f-right-leaf"
        />
        <img
          src={`${import.meta.env.BASE_URL}images/footer-left-leaf.png`}
          alt="Left Leaf"
          id="f-left-leaf"
        />

        <div className="content">
            <h2>Where to find Us</h2>
            <div>
                <h3>Visit our Bar</h3>
                <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
            </div>
            <div>
                <h3>Contact us</h3>
                <p>(555) 987-6543</p>
                <p>hello@jsmcocktail.com</p>
            </div>
            <div>
                <h3>Open every day</h3>
                {openingHours.map((time)=>{
                    return (
                        <p key={time.day}>{time.day}: {time.time}</p>
                    )
                })}
            </div>
            <div>
                <h3>Socials</h3>
                <div className="flex-center gap-5">
                    {socials.map((item)=>(
                        <a href={item.url} key={item.name} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                            <img src={`${import.meta.env.BASE_URL}${item.icon}`} alt="Social Icon" />
                        </a>
                    ))}
                </div>
            </div>
        </div>

    </footer>
  )
}

export default Contact