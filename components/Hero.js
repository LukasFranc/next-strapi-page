import Link from 'next/link'
import Image from "next/image";
function Hero({homepage}) {
    return (
        homepage ?
            <section className="section section--hero">
                <div className="section__content">
                    <Image src="/light.svg" width={100} height={400} alt="" className="section__decorationImage" />
                    <div className="section__info">
                        {homepage.mainHero.heroSubTitle ? <div className="section__subtitle">{homepage.mainHero.heroSubTitle}</div> : ''}
                        <h1 className="hero__title">{homepage.mainHero.heroTitle}</h1>
                        {homepage.mainHero.heroDescription ? <p className="hero__description">{homepage.mainHero.heroDescription}</p> : ''}
                        {homepage.mainHero.heroButton ? <Link target="_blank" href={homepage.mainHero.heroButton.buttonUrl} className="hero__button btn btn-primary">{homepage.mainHero.heroButton.buttonTitle}</Link> : ''}
                    </div>
                    {homepage.mainHero.heroMainImage ? <div className="section__image"><Image className="hero__image" src={`https://lf-next-project.up.railway.app${homepage.mainHero.heroMainImage.data.attributes.url}`} alt="" width={1080} height={720} /></div> : ''}
                </div>
            </section>
            : null
    )
}

export default Hero